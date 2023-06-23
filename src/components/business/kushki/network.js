const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./controller')


router.post('/transfer', function (req, res){
  try{
      controller.createTransfer(req)
          .then((data) => {
              if(data){
                  response.success(req, res, data);
              } else {
                  response.error(req, res, 200, "Error");   
              }
          })
          .catch((message) => {
              response.error(req, res, 400, message);
          });
  }catch (err) {
      response.error(req, res, 500, err)
  }
  
})

router.post('/cash', function (req, res){
    try{
        controller.initCash(req)
            .then((data) => {
                if(data){
                    response.success(req, res, data);
                } else {
                    response.error(req, res, 200, "Error");   
                }
            })
            .catch((message) => {
                response.error(req, res, 400, message);
            });
    }catch (err) {
        response.error(req, res, 500, err)
    }
    
  })

router.post('/card', function (req, res){
try{
    controller.payCard(req)
        .then((data) => {
            if(data){
                response.success(req, res, data);
            } else {
                response.error(req, res, 200, "Error");   
            }
        })
        .catch((message) => {
            response.error(req, res, 400, message);
        });
}catch (err) {
    response.error(req, res, 500, err)
}

})

module.exports = router;