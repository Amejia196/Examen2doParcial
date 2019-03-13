var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');

  lib.getEmployees = (handler)=>{
    empColl.find({}).toArray(
      (err , docs) => {
        if(err){
          handler(err, null);
        }else{
          handler(null, docs);
        }
      }
     );
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesById = (id, handler) => {
    empColl.findOne({ "_id": new ObjectId(id)}, (err, doc)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, doc);
      }
    }); 
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByCompany = (company, handler) => {
    empColl.findOne(company, (err, doc)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, doc);
      }
    });
    // implementar
    // solo mostrar name, email, company
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    var queryObject= {"tag": {"$in": Array.isArray(tags)? tag: [tag]}};
    empColl.find(queryObject).toArray((err, docs) => {
      if(err){
        handler(err, null);
      }else{
        handler(null, docs);
      }
    });
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    return handler(new Error("No Implementado"), null);
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    var curatedTags = Array.isArray(tag)? tags: [tags];
    var updateObject = { "$set": { "tag": curatedTags}};
    empColl.updateOne({"_id": ObjectId(id)}, updateObject, (err, rsult)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, rsult.result);
        }
    } );
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    return handler(new Error("No Implementado"), null);
  }

  lib.removeEmployee = (id, handler) => {
    empColl.deleteOne({"_id": ObjectId(id)}, (err, rslt)=>{
      if(err){
        console.log(err);
        handler(err, null);
      } else {
        handler(null, rslt.result);
      }
    });
    //Implementar
    //Se requiere eliminar un documento de la colección
    return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
