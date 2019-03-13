var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', (req, res, next) => {
    empModel.getEmployees(
      function(err, docs){
        if(err) {
          console.log(err);
          return res.status(500).json({error:"Error"});
        }
        return res.status(200).json(docs);
      }
    );
  });

  router.get('/byid/:id', (req, res, next)=>{
    empModel.getEmployeesById(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Erro"});
      }
      return res.status(200).json(Doc);
    } );
  });

  router.get('/bycompany/:company', (req, res, next)=>{
    empModel.getEmployeesByCompany(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error"});
      }
      return res.status(200).json(Doc);
    } );
  });
  

  router.get('/bytag/:tag', (req, res, next)=>{
    empModel.getEmployeesByTag((req.params.tag || '').split('_'), (err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error"});
      }else{
        return res.status(200).json(docs);
      }
    } ); 
  }); 
  
  router.put('/addtag/:id', (req, res, next)=>{
    empModel.addEmployeeATag((req.body.tag || '').split('|'), req.params.id, (err, rsult)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"No se puede actualizar"});
      }
      return res.status(200).json(rsult);
    });
  });
  
  router.delete('/delete/:id', function(req, res, next){
    var _id = req.params.id;
    empModel.removeEmployee(_id, (err, result)=>{
      if(err){
        return res.status(500).json({"error":"No se pudo eliminar datos"});
      }
      return res.status(200).json(result);
    }); 
  });

  return router;
}

module.exports = initEmployee;
