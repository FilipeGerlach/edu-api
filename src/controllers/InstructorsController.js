const knex = require('../databases/knex');
const fieldValidator = require('../utils/FieldValidator');

exports.create = async (req, res) => {
  try {
    const invalidFields = fieldValidator(req.body, ['fullName', 'avatarUrl']);

    if (invalidFields.length) {
      return res.status(400).send({
        status: 'invalid request',
        invalidFields
      });
    }

    const [instructorId] = await knex.insert(req.body).into('instructors');
    
    const [instructorCreated] = await knex.select('*')
      .from('instructors').where({ id: instructorId });
      
    return res.status(200).send({
      status: 'success',
      data: instructorCreated
    })
  } catch (e) {
    return res.status(500).send({ error: e.message || e });
  }
}
exports.find = async(req, res) =>{
  try {
    const instructor = await knex.select('*').from('instructors')

    return res.status(200).send(instructor)
  } catch (e) {
    return res.status(500).send({ error: e.message || e });
  }
}

exports.update = async (req, res) =>{
  try {
    const { id } = req.params
  const newInstructor = req.body

  const instructor = await knex.select('*').from('instructors').where({id}).first()
  
  
  if(!instructor){
    return res.status(400).send({status: `não foi encontrado um professor com o id${id}`})
  }
  
  await knex.update(newInstructor).from('instructors').where({id})

  const instructorUpdated = await knex.select('*').from('instructors').where({id}).first()
  return res.status(200).send(instructorUpdated)

  } catch (e) {
    return res.status(500).send({error: e.message || e})
  }
}
exports.deleteInstructor = async(request, response)=>{
  try {
    const params = request.params
    const [excluir] = await knex.select('*').from('instructors').where({id:params.id}).limit(1)

    if(!excluir){
      return response.status(404).send('não encontrado')
    }
    await knex.delete({title:excluir.title}).from('instructors').where({id:excluir.id})
    return response.status(204).send({status:"deletado"})
    
  } catch (e) {
    return response.status(500).send({error: e?.message || e})
  }
}
exports.findById= async (req, res) =>{
  try {
    const {id} = req.params
    const instructor = await knex.select('*').from('instructors').where({id}).first()
    
    if(!instructor){
      return res.status(404).send({satatus:`instrutor com o id ${id}não encontrado`})
    }

    return res.status(200).send(instructor)

  } catch (e) {
    return res.status(500).send({error: e.message || e})
  }
}