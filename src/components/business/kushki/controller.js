const keys = require('../../../utils/credentials');
const CircularJSON = require('circular-json');
const IO = require('../external/IO')

const createTransfer = (request) => {

  return new Promise((resolve, reject) => {
    try {
      if(!request || !request.headers || request.headers['public-merchant-id'] == null){
        reject("public-merchant-id header is mandatory")
      } else {
        const publicKey = request.headers['public-merchant-id'];
        const key = keys.filter((k)=>k.public == publicKey);
        if(key.length == 0){
          reject("public-merchant-id is not valid")
        }
        const privateKey = key[0].private;
        var payload = request.body ?? {}
        var url = 'https://api-uat.kushkipagos.com/transfer/v1/init'
        IO.query(payload,url,'POST',null).then((r)=>{
          const strResp = CircularJSON.stringify(r);
          const resp = JSON.parse(strResp);
          resolve(resp ? resp.data : {});
        })
        .catch((err)=>{
          reject(err)
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {
  createTransfer
}