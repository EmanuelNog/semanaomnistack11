/**coneccao com o banco */
const connection = require( '../database/connection');

module.exports = {
    async index(request,response) {
        /**paginacao dos incidents */
        const { page = 1 } = request.query;    
        
        /** as chaves em [count] retorna apenas a primeira posicao do array,
         * e o comando retorno o numero total de registros em incidents*/ 
        const [count] = await connection ('incidents').count();


         /**limito em ate 5 incidents */
         /**tem que comecar na pagina 0 entao subtrai 1, e mostrar os registros 
          * de 0 ate 5, de 5 ate 10 e etc, entao 1-1=0*5=0, depois 2-1=1*5=5 */
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') /* fazendo isso voce busca os dados da onge referente ao incident*/
        .limit(5)
        .offset((page - 1) * 5)
        /* quando voce da aquele join, o id do incident vira o id da ong, entao nos so queremos selecionar tudo menos o id da ong*/
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        /**retorna no header o total de registros que foi requisitado mais a cima */
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create (request, response){
        const { title, description, value}= request.body; // o id nao vem aqui, pois quando ocorre o acesso por um cadastro, ou seja login, o id vem pelo cabecalho da requisicao e nao pelo corpo
        const ong_id = request.headers.authorization; //busca o id da ong pelo headers

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },


    /**Metodo de delecao, para deletar um requisicao com um id, claro que
     * verificando a ong logada
     */
    async delete(request, response){
        const { id } = request.params;

        /**busca o id da ong para verificar se o id que quer deletar é o id ao qual ele pertence para que uma ong nao possa deletar alguma coisa de outra ong
         * */
        const ong_id = request.headers.authorization; 

        /** busca o incident de dentro da tabela incidents, where busca onde 
         * o id e igual o id que for recebido, e seleciona apenas a coluna ong_id
         * e como eu sei que so existe uma coluna com esse resultado eu seleciono
         * ela com o first
         * */ 
        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        /**se o o id que foi recebido e diferente do id que esta enviando o comando 
         * ele retorna um status 401 ( que olhando nos codigos de responta de http 
         * significa que é "Unauthorized", ou seja nao autorizado), juntamente com
         * uma mensagem de erro que diz "Operation not permitted"
         */
        if(incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operation not permitted.'});
        }
        // se tudo deu certo ele seleciona o id igual o id da operacao e deleta
        await connection('incidents').where('id', id).delete();

        /*retorna um status 204 que significa que nao ha conteudo a ser enviado para  
        o front end ou seja uma resposta que deu certo mas nao ha conteudo para mostrar*/
         return response.status(204).send();
    } 
}; 