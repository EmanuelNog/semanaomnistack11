/**pelas normas de mvc nao posso ter mais que 5 comandos em um unico controller
 * portanto, foi necessario fazer um novo controller para listar os casos
 * especificos de uma ong, ele sera o responsavel pelo perfil de uma ong.
 */

/**coneccao com o banco */
const connection = require( '../database/connection');


 module.exports = {
     async index(request,response){
         /**acessar dados da ong logada */
         const ong_id = request.headers.authorization

         /**buscar os incidents onde a ong logada tem */
         const incidents = await connection('incidents')
         .where('ong_id', ong_id)
         .select('*');

         return response.json(incidents);
     }
 }