const connection = require('../database/connection'); // conexao com o banco
const crypto = require ('crypto');// crypto e para criptografica, mas nos iremos utiliza-lo para criar uma string aleatoria


module.exports = {
    async index (request, response){  
        const ongs = await connection('ongs').select('*');//listar todas as ongs do banco de dados
    
        return response.json(ongs);
    },

    async create(request, response){ //  o request guarda todos dados que vem da requisicao do usuario | e o response é o responsavel por retornar uma resposta ao usuario; 
        //const body = request.body; // comando para requisitar ( pode ser o query, params, body, etc)
    const {name, email, whatsapp, city, uf} = request.body; // garante que o usuario nao ira conseguir enviar nenhum outra informacao a nao ser as definidas

    const id = crypto.randomBytes(4).toString('HEX'); // gera 4 bytes de caracteres aleatorios e converte-os em uma string do tipo hexadecimal

    //console.log(data); /*devolve a resposta no console para ver se a informacao chega ate o atributo*/

    await connection('ongs').insert({//quando o codigo chegar no await, ele ira esperar o retorno, e so entam prosseguir para a proxima linha de comando
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({id});// esse id e retornado para que a ong tenha um "cpf", uma identificacao dessa ong
    }
}