'use strict'
require('dotenv/config');
const AWS = require('aws-sdk');
var multer = require('multer');
var uuid = require('uuid');

var axios = require('axios');
var jwt = require('jwt-simple');

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

function getHistory(req, res) {
  var typeOfUser = req.query.typeOfUser;
  if(typeOfUser == 'Merchant'){
    serviceInitHistoryM(req, function(data, err) {
      if (err) {
        res.status(500).send({ message: err });
      }else {
        res.status(200).send({ history: data.history });
      }
    });
  } else if(typeOfUser == 'Carrier'){
    serviceInitHistoryC(req, function(data, err) {
      if (err) {
        res.status(500).send({ message: err });
      }else {
        res.status(200).send({ history: data.history });
      }
    });
  } else if(typeOfUser == 'Acopio'){
    serviceInitHistoryA(req, function(data, err) {
      if (err) {
        res.status(500).send({ message: err });
      }else {
        res.status(200).send({ history: data.history });
      }
    });
  } else if(typeOfUser == 'Productor'){
    //console.log('toy');
    serviceInitHistoryP(req, function(data, err) {
      if (err) {
        res.status(500).send({ message: err });
      }else {
        res.status(200).send({ history: data.history });
      }
    });
  }
}

function serviceInitHistoryM(req, next) {
    var url = 'http://'+host.merchantIn+':'+port.merchantIn+''+path.getHistory+'?nameOfCompany='+req.query.nameOfCompany+'&typeOfUser='+req.query.typeOfUser;
    //console.log(url);
    axios.get(url)
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function serviceInitHistoryC(req, next) {
    var url = 'http://'+host.carrier+':'+port.carrier+''+path.getHistory+'?nameOfCompany='+req.query.nameOfCompany+'&typeOfUser='+req.query.typeOfUser;
   //console.log(url);
    axios.get(url)
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function serviceInitHistoryA(req, next) {
    var url = 'http://'+host.acopioIn+':'+port.acopioIn+''+path.getHistory+'?nameOfCompany='+req.query.nameOfCompany+'&typeOfUser='+req.query.typeOfUser;
    //console.log(url);
    axios.get(url)
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function serviceInitHistoryP(req, next) {
    var url = 'http://'+host.productor+':'+port.productor+''+path.getHistory+'?nameOfCompany='+req.query.nameOfCompany+'&typeOfUser='+req.query.typeOfUser;
    //console.log(url);
    axios.get(url)
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}


function traceability(req, res) {
  serviceInitTraceability(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, names: data.names });
          //console.log(data);
      }
  });
}

function serviceInitTraceability(req, next) {
    var url = 'http://'+host.traceability+':'+port.traceability+''+path.traceability+'';
    axios.post(url, {
        QR: req.body.QR,
        ID: req.body.ID
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

/*
function traceabilityM(req, res) {
  serviceInitTraceabilityM(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, names: data.names });
          //console.log(data);
      }
  });
}

function serviceInitTraceabilityM(req, next) {
    var url = 'http://'+host.traceability+':'+port.traceability+''+path.traceabilityM+'';
    axios.post(url, {
        QR: req.body.QR,
        ID: req.body.ID
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function traceabilityC(req, res) {
  serviceInitTraceabilityC(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, names: data.names });
          //console.log(data);
      }
  });
}

function serviceInitTraceabilityC(req, next) {
    var url = 'http://'+host.traceability+':'+port.traceability+''+path.traceabilityC+'';
    axios.post(url, {
        QR: req.body.QR,
        ID: req.body.ID
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function traceabilityA(req, res) {
  serviceInitTraceabilityA(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, names: data.names });
          //console.log(data);
      }
  });
}

function serviceInitTraceabilityA(req, next) {
    var url = 'http://'+host.traceability+':'+port.traceability+''+path.traceabilityA+'';
    axios.post(url, {
        QR: req.body.QR,
        ID: req.body.ID
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function traceabilityP(req, res) {
  serviceInitTraceabilityP(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, names: data.names });
          //console.log(data);
      }
  });
}

function serviceInitTraceabilityP(req, next) {
    var url = 'http://'+host.traceability+':'+port.traceability+''+path.traceabilityP+'';
    axios.post(url, {
        QR: req.body.QR,
        ID: req.body.ID
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}
*/
async function getData(req, res) {
  try {
    //const resMerchant = await axios.post(`http://host.docker.internal:3002/getData/?code=${split[3]}`, { code: split[3]});  productor: '/productorsData',
    const resMerchant = await axios.get('http://'+host.merchantIn+':'+port.merchantIn+''+path.getData+'');
    //data.push(resMerchant.data.message);

    const resCarrier = await axios.get('http://'+host.carrier+':'+port.carrier+''+path.getData+'');
    //data.push(resCarrier.data.message);

    const resAcopio = await axios.get('http://'+host.acopioIn+':'+port.acopioIn+''+path.getData+'');
    //data.push(resAcopio.data.message);

    const resProductor = await axios.get('http://'+host.productor+':'+port.productor+''+path.getData+'');
    //data.push(resProductor.data.message);

    res.status(200).send({ productor: resProductor.data.message, acopio: resAcopio.data.message, carrier: resCarrier.data.message, merchant: resMerchant.data.message });
  } catch (error) {
    //console.log(error);
    //console.log(error);
    res.status(200).send({ message: error });
  }
}

function uploadImages(req, next) {
  if (req.files.vehiclePhotos == undefined && req.files.productPhotos == undefined || req.files.vehiclePhotos == 'undefined' && req.files.productPhotos == 'undefined') {
    //console.log("undefined for vehiclePhotos and productPhotos");
    for(var fileImage of req.files.image){
      let myFile = fileImage.originalname.split(".");
      const fileType = myFile[myFile.length - 1];
      const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${uuid.v4()}.${fileType}`,
          Body: fileImage.buffer
      };
      s3.upload(params, (error, dataAWS) => {
        if(error){
          next(null, error);
          //res.status(500).send(error);
        }else {
          next(dataAWS.Key, null);
        }
      });
    }
  }else {
    var fileNames = [];
    for(var fileImage of req.files.image){
      let myFile = fileImage.originalname.split(".");
      const fileType = myFile[myFile.length - 1];
      const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${uuid.v4()}.${fileType}`,
          Body: fileImage.buffer
      };
      s3.upload(params, (error, dataAWS) => {
        if(error){
          next(null, error);
          //res.status(500).send(error);
        }else {
          fileNames.push(dataAWS.Key);
          //console.log("0: " +fileNames);
          for(var fileVehicle of req.files.vehiclePhotos){
            let myFile = fileVehicle.originalname.split(".");
            const fileType = myFile[myFile.length - 1];
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuid.v4()}.${fileType}`,
                Body: fileVehicle.buffer
            };
            s3.upload(params, (error, dataAWS) => {
              if(error){
                next(null, error);
                //res.status(500).send(error);
              }else {
                fileNames.push(dataAWS.Key);
                //console.log("1: " +fileNames);
                for(var fileProduct of req.files.productPhotos){
                  let myFile = fileProduct.originalname.split(".");
                  const fileType = myFile[myFile.length - 1];
                  const params = {
                      Bucket: process.env.AWS_BUCKET_NAME,
                      Key: `${uuid.v4()}.${fileType}`,
                      Body: fileProduct.buffer
                  };
                  s3.upload(params, (error, dataAWS) => {
                    if(error){
                      next(null, error);
                      //res.status(500).send(error);
                    }else {
                      fileNames.push(dataAWS.Key);
                      //console.log("2: " +fileNames);
                      next(fileNames, null);
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
}

function getFileStream(req, res) {
  const params = {
    Key: req.query.id,
    Bucket: process.env.AWS_BUCKET_NAME
  };
  //Convert image to base64
  /*s3.getObject(params, (err, rest) => {
    if (err) throw err;

    const b64 = Buffer.from(rest.Body).toString('base64');
    // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
    const mimeType = 'image/png'; // e.g., image/png

    res.send(`<img src="data: ${mimeType}; base64, ${b64}" />`);
    //res.send(`<img src="${b64}" />`);
  });*/
  s3.getObject(params)
  .createReadStream()
  .on('error', function(err) {
    //console.log(err);
    res.status(500).send({ message: err.message });
  })
  .pipe(res);
}

function merchantsCompany(req, res) {
  serviceInitMerchantsCompany(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitMerchantsCompany(req, next) {
    var url = 'http://'+host.merchantIn+':'+port.merchantIn+''+path.merchantsCompany+'';
    axios.post(url, {
        email: req.body.email,
        nameOfCompany: req.body.nameOfCompany
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function getCompanyM(req, res) {
  serviceInitGetCompanyM(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitGetCompanyM(req, next) {
    var url = 'http://'+host.merchantIn+':'+port.merchantIn+''+path.getCompanyM+'';
    axios.post(url, {
        email: req.body.email
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function merchantsData(req, res){
  uploadImages(req, function(imageName, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        req.body.image = imageName;
        serviceInitMerchants(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
              res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
                //console.log(data);
            }
        });
      }
  });
}

function serviceInitMerchants(req, next) {
    var url = 'http://'+host.merchantIn+':'+port.merchantIn+''+path.merchantIn+'';
    axios.post(url, {
        fid: req.body.fid,
        code: req.body.code,
        ubication: req.body.ubication,
        name: req.body.name,
        previousStage: req.body.previousStage,
        currentStage: req.body.currentStage,
        nameOfCompany: req.body.nameOfCompany,
        image: req.body.image,
        description: req.body.description,
        arrivalDate: req.body.arrivalDate
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function merchantsDataOut(req, res){
  uploadImages(req, function(imageName, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        req.body.image = imageName;
        serviceInitMerchantsOut(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
              res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
                //console.log(data);
            }
        });
      }
  });
}

function serviceInitMerchantsOut(req, next) {
    var url = 'http://'+host.merchantOut+':'+port.merchantOut+''+path.merchantOut+'';
    axios.post(url, {
        fid: req.body.fid,
        code: req.body.code,
        ubication: req.body.ubication,
        name: req.body.name,
        previousStage: req.body.previousStage,
        currentStage: req.body.currentStage,
        nameOfCompany: req.body.nameOfCompany,
        image: req.body.image,
        description: req.body.description,
        departureDate: req.body.departureDate
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function carriersCompany(req, res) {
  serviceInitCarriersCompany(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitCarriersCompany(req, next) {
    var url = 'http://'+host.carrier+':'+port.carrier+''+path.carriersCompany+'';
    axios.post(url, {
        email: req.body.email,
        nameOfCompany: req.body.nameOfCompany
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function getCompanyC(req, res) {
  serviceInitGetCompanyC(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitGetCompanyC(req, next) {
    var url = 'http://'+host.carrier+':'+port.carrier+''+path.getCompanyC+'';
    axios.post(url, {
        email: req.body.email
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function carriersData(req, res){
  uploadImages(req, function(imageNames, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        //console.log(imageNames);
        req.body.image = imageNames[0];
        req.body.vehiclePhotos = imageNames[1];
        req.body.productPhotos = imageNames[2];
        serviceInitCarriers(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
              res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
                //console.log(data);
            }
        });
      }
  });
}

function serviceInitCarriers(req, next) {
    var url = 'http://'+host.carrier+':'+port.carrier+''+path.carrier+'';
    axios.post(url, {
      fid: req.body.fid,
      code: req.body.code,
      ubication: req.body.ubication,
      name: req.body.name,
      previousStage: req.body.previousStage,
      currentStage: req.body.currentStage,
      nameOfCompany: req.body.nameOfCompany,
      image: req.body.image,
      description: req.body.description,
      driverName: req.body.driverName,
      origin: req.body.origin,
      destination: req.body.destination,
      plates: req.body.plates,
      productPhotos: req.body.productPhotos,
      vehiclePhotos: req.body.vehiclePhotos,
      tracking: req.body.tracking
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function acopiosCompany(req, res) {
  serviceInitAcopiosCompany(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitAcopiosCompany(req, next) {
    var url = 'http://'+host.acopioIn+':'+port.acopioIn+''+path.acopiosCompany+'';
    axios.post(url, {
        email: req.body.email,
        nameOfCompany: req.body.nameOfCompany
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function getCompanyA(req, res) {
  serviceInitGetCompanyA(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitGetCompanyA(req, next) {
    var url = 'http://'+host.acopioIn+':'+port.acopioIn+''+path.getCompanyA+'';
    axios.post(url, {
        email: req.body.email
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function acopiosData(req, res){
  uploadImages(req, function(imageName, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        req.body.image = imageName;
        serviceInitAcopios(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
              res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
                //console.log(data);
            }
        });
      }
  });
}

function serviceInitAcopios(req, next) {
  var url = 'http://'+host.acopioIn+':'+port.acopioIn+''+path.acopioIn+'';
  axios.post(url, {
    fid: req.body.fid,
    code: req.body.code,
    ubication: req.body.ubication,
    name: req.body.name,
    previousStage: req.body.previousStage,
    currentStage: req.body.currentStage,
    nameOfCompany: req.body.nameOfCompany,
    image: req.body.image,
    description: req.body.description,
    arrivalDate: req.body.arrivalDate,
    //departureDate: req.body.departureDate,
    clasification: req.body.clasification,
    quantity: req.body.quantity,
    measure: req.body.measure,
    whoReceives: req.body.whoReceives,
    //whoDelivers: req.body.whoDelivers
  })
  .then(response => {
    //console.log(response.data);
    next(response.data, null);
  })
  .catch(error => {
    //console.log(error);
    next(null, error.response.data.message);
  });
}

function acopiosDataOut(req, res){
  uploadImages(req, function(imageName, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        req.body.image = imageName;
        serviceInitAcopiosOut(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
              res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
                //console.log(data);
            }
        });
      }
  });
}

function serviceInitAcopiosOut(req, next) {
  var url = 'http://'+host.acopioOut+':'+port.acopioOut+''+path.acopioOut+'';
  axios.post(url, {
    fid: req.body.fid,
    code: req.body.code,
    ubication: req.body.ubication,
    name: req.body.name,
    previousStage: req.body.previousStage,
    currentStage: req.body.currentStage,
    nameOfCompany: req.body.nameOfCompany,
    image: req.body.image,
    description: req.body.description,
    //arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    clasification: req.body.clasification,
    quantity: req.body.quantity,
    measure: req.body.measure,
    //whoReceives: req.body.whoReceives,
    whoDelivers: req.body.whoDelivers
  })
  .then(response => {
    //console.log(response.data);
    next(response.data, null);
  })
  .catch(error => {
    //console.log(error);
    next(null, error.response.data.message);
  });
}

function updateTransaction(req, res){
  serviceInitAcopiosUpdate(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      res.status(200).send({ message: data.message, info: data.info });
    }
  });
}

function serviceInitAcopiosUpdate(req, next) {
  var url = 'http://'+host.acopioIn+':'+port.acopioIn+''+path.acopiosDataUpdate+'';
  axios.put(url, {
    _id: req.body._id,
    departureDate: req.body.departureDate,
    whoDelivers: req.body.whoDelivers,
  })
  .then(response => {
    //console.log(response.data);
    next(response.data, null);
  })
  .catch(error => {
    //console.log(error);
    next(null, error.response.data.message);
  });
}

function productorsCompany(req, res) {
  serviceInitProductorsCompany(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitProductorsCompany(req, next) {
    var url = 'http://'+host.productor+':'+port.productor+''+path.productorsCompany+'';
    axios.post(url, {
        email: req.body.email,
        nameOfCompany: req.body.nameOfCompany
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function getCompanyP(req, res) {
  serviceInitGetCompanyP(req, function(data, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user });
          //console.log(data);
      }
  });
}

function serviceInitGetCompanyP(req, next) {
    var url = 'http://'+host.productor+':'+port.productor+''+path.getCompanyP+'';
    axios.post(url, {
        email: req.body.email
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function productorsData(req, res){
  uploadImages(req, function(imageName, err) {
      if (err) {
          res.status(500).send({ message: err });
      }else {
        //console.log(imageName);
        req.body.image = imageName;
        serviceInitProductors(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
              res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
                //console.log(data);
            }
        });
      }
  });
}

function serviceInitProductors(req, next) {
    var url = 'http://'+host.productor+':'+port.productor+''+path.productor+'';
    axios.post(url, {
      fid: req.body.fid,
      code: req.body.code,
      ubication: req.body.ubication,
      name: req.body.name,
      harvestDate: req.body.harvestDate,
      caducationDate: req.body.caducationDate,
      previousStage: req.body.previousStage,
      currentStage: req.body.currentStage,
      description: req.body.description,
      image: req.body.image,
      documentation: req.body.documentation,
      nameOfCompany: req.body.nameOfCompany,
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        //console.log(error.response.data.message);
        next(null, error.response.data.message);
    });
}

function getInitialNonce(req, res){
  //console.log(req.body);
  serviceInitGetNonce(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      //console.log(data);
      if (data.message == 'deny') {
        res.status(200).send({  message: data.message, A: data.A, NA: data.NA });
      }else {
        res.status(200).send({ A: data.A, NA: data.NA, NB: data.NB });
      }
    }
  });
}

function serviceInitGetNonce(req, next) {
  var url = 'http://'+host.users+':'+port.users+''+path.getInitialNonce;
  axios.post(url, {
    na: req.body.na, //se comenta mientras se hacen las pruenas sin un cliente que pueda usar estos datos
    session: req.session.id
  })
  .then(response => {
    //console.log(response.data);
    next(response.data, null);
  })
  .catch(error => {
    //console.log(error);
    next(null, error.response.data.message);
  });
}

function verifyEmail(req, res){
  serviceInitGetEmail(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
      //console.log(err);
    }else {
      //res.status(200).send({ message: data.message });
      if (data.message == true) {
        res.render('confirmation', { message: 'El correo ha sido confirmado' });
      }else {
        res.render('404', { message: data.message });
      }
      //console.log(data);
    }
  });
}

function serviceInitGetEmail(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.verifyEmail+'?code='+req.query.code+'&email='+req.query.email+'';
    //console.log(url);
    axios.get(url)
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function login(req, res){
  serviceInitLogin(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      res.status(200).send({ message: data.message, token: data.token, user: data.user });
      //console.log(data);
    }
  });
}

function serviceInitLogin(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.userLogin+'';
    axios.post(url, {
        email: req.body.email,
        password: req.body.password,
        //typeOfUser: req.body.typeOfUser,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function userCreation(req, res){
  if(req.body.typeOfUser == 'Root'){
    serviceInitUserCreationRoot(req, function(data, err) {
      if (err) {
        //console.log(err);
        res.status(500).send({ message: err });
      }else {
        if(data.user){
          res.status(200).send({ message: data.message, A: data.A, tokenNANB: data.tokenNANB, user: data.user, token: data.token });
        }else if(data.sessionID){
          res.status(200).send({ message: data.message, sessionID: data.sessionID, token: data.token});
        }else {
          res.status(200).send({ message: data.message, A: data.A, tokenNANB: data.tokenNANB});
        }
        //res.status(200).send({ message: data.message, user: data.user, token: data.token });
        //console.log(data);
      }
    });
  }else if(req.body.typeOfUser == 'Administrator' || req.body.typeOfUser == 'Merchant' || req.body.typeOfUser == 'Carrier' || req.body.typeOfUser == 'Acopio' || req.body.typeOfUser == 'Productor'){
    serviceInitUserCreation(req, function(data, err) {
      if (err) {
        res.status(500).send({ message: err });
      }else {
        //console.log(data);
        res.status(200).send({ message: data.message });
      }
    });
  }else if(req.body.typeOfUser == 'Consumer'){
    serviceInitUserCreationConsumer(req, function(data, err) {
      if (err) {
        res.status(500).send({ message: err });
      }else {
        res.status(200).send({ message: data.message, user: data.user, token: data.token });
        //res.status(200).send({ message: data.message });
        //console.log(data);
      }
    });
  }
}

function serviceInitUserCreationRoot(req, next) {
  var url = 'http://'+host.users+':'+port.users+''+path.userCreation+'';
    axios.post(url, {
        email: req.body.email,
        password: req.body.password,
        surnameA: req.body.surnameA,
        surnameB: req.body.surnameB,
        nameOfUser: req.body.nameOfUser,
        typeOfUser: req.body.typeOfUser,
        status: req.body.status,
        creationDate: req.body.creationDate,
        initialToken: req.body.initialToken,
        dp: req.body.dp,
        addressU: req.body.addressU,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation,
        hashX: req.body.hashX,
    },
    {
        headers: {
            'Authorization': req.headers.authorization,
            'Session': req.headers.session
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        //console.log(error.response.data.message);
        next(null, error.response.data.message);
    });
}

function serviceInitUserCreation(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.userCreation+'';
    axios.post(url, {
      email: req.body.email,
      password: req.body.password,
      surnameA: req.body.surnameA,
      surnameB: req.body.surnameB,
      nameOfUser: req.body.nameOfUser,
      typeOfUser: req.body.typeOfUser,
      status: req.body.status,
      creationDate: req.body.creationDate,
      initialToken: req.body.initialToken,
      dp: req.body.dp,
      addressU: req.body.addressU,
      typeOfOperation: req.body.typeOfOperation,
      nameOfOperation: req.body.nameOfOperation,
      hashX: req.body.hashX,
    },
    {
      headers: {
        'Authorization': req.headers.authorization
      }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        //next(null, error.response.data.message);
        next(null, error.response.data.message);

    });
}

function serviceInitUserCreationConsumer(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.userCreation+'';
    axios.post(url, {
        email: req.body.email,
        password: req.body.password,
        surnameA: req.body.surnameA,
        surnameB: req.body.surnameB,
        nameOfUser: req.body.nameOfUser,
        typeOfUser: req.body.typeOfUser,
        status: req.body.status,
        creationDate: req.body.creationDate,
        initialToken: req.body.initialToken,
        //dp: req.body.dp,
        addressU: req.body.addressU,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation,
        hashX: req.body.hashX,
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        //console.log(error.response.data.message);
        next(null, error.response.data.message);
    });
}

function userDetails(req, res){
    serviceInitUserDetails(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
            //console.log(err);
        }else {
            res.status(200).send({ user: data.user });
            //console.log(data);
        }
    });
}

function serviceInitUserDetails(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.userDetails+''+req.params.id;
    axios.get(url, {
        headers: {
            'Authorization': req.headers.authorization
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function usersDetails(req, res){
    serviceInitUsersDetails(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
            res.status(200).send({ users: data.users, total_items: data.total_items });
        }
    });
}

function serviceInitUsersDetails(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.usersDetails+''+req.params.page;
    axios.get(url, {
        headers: {
            'Authorization': req.headers.authorization
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function userUpdate(req, res){
    var payload = decodeToken(req.headers.authorization);
    if(payload.typeOfUser == 'Consumer'){
        serviceInitUserUpdateConsumer(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
                res.status(200).send({ message: data.message, token: data.token, user: data.user });
            }
        });
    }else{
        serviceInitUserUpdate(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
                if(req.body.nameOfOperation == 'updateMe'){
                    res.status(200).send({ message: data.message, token: data.token, user: data.user });

                }else{
                    res.status(200).send({ message: data.message });
                    //console.log(data);
                }
            }
        });
    }
}

function serviceInitUserUpdate(req, next) {
    //console.log(req.body);
    var url = 'http://'+host.users+':'+port.users+''+path.userUpdate+''+req.params.id;
    axios.put(url, {
        email: req.body.email,
        password: req.body.password,
        typeOfUser: req.body.typeOfUser,
        initialToken: req.body.initialToken,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation,
        surnameA: req.body.surnameA,
        surnameB: req.body.surnameB,
        addressU: req.body.addressU,
        nameOfUser: req.body.nameOfUser,
        status: req.body.status,
        dp: req.body.dp,
        hashX: req.body.hashX
    },
    {
        headers: {
            'Authorization': req.headers.authorization
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function serviceInitUserUpdateConsumer(req, next) {
    //console.log(req.body);
    var url = 'http://'+host.users+':'+port.users+''+path.userUpdate+''+req.params.id;
    axios.put(url, {
        email: req.body.email,
        password: req.body.password,
        nameOfUser: req.body.nameOfUser,
        typeOfOperation: req.body.typeOfOperation,
        nameOfOperation: req.body.nameOfOperation,
        surnameA: req.body.surnameA,
        surnameB: req.body.surnameB
    },
    {
        headers: {
            'Authorization': req.headers.authorization
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function userDelete(req, res){
    serviceInitUserDelete(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
            res.status(200).send({ message: data.message });
            //console.log(data);
        }
    });
}

function serviceInitUserDelete(req, next) {
    //console.log(req.headers.authorization);
    var url = 'http://'+host.users+':'+port.users+''+path.userDelete+''+req.params.id;
    axios.delete(url, {
        headers: {
            'Authorization': req.headers.authorization
        },
        data: {
            typeOfOperation: req.body.typeOfOperation,
            nameOfOperation: req.body.nameOfOperation,
        }
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function emailToReset(req, res) {
  serviceInitEmailToReset(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
      }else {
          res.status(200).send({ message: data.message });
          //console.log(data);
      }
  });
}

function serviceInitEmailToReset(req, next) {
  var url = 'http://'+host.users+':'+port.users+''+path.emailToReset+'';
  axios.post(url, {
    email: req.body.email,
  })
  .then(response => {
    //console.log(response.data);
    next(response.data, null);
  })
  .catch(error => {
    //console.log(error);
    next(null, error.response.data.message);
  });
}

function resetPasswordGET(req, res) {
  serviceInitResetPasswordGET(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      if(data.message == true){
        res.render('reset', { code: req.query.code, email: req.query.email });
      }else if(data.message == false){
        res.render('404', { message: 'La petición no existe' });
      }
    }
  });
}

function serviceInitResetPasswordGET(req, next) {
  var url = 'http://'+host.users+':'+port.users+''+path.resetPassword+'?code='+req.query.code+'&email='+req.query.email+'';
    axios.get(url)
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function resetPasswordPUT(req, res) {
  //console.log(req.body);
  serviceInitResetPasswordPUT(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      res.status(200).send({ message: data.message });
      //console.log(data);
    }
  });
}

function serviceInitResetPasswordPUT(req, next) {
  var url = 'http://'+host.users+':'+port.users+''+path.resetPassword+'?code='+req.query.code+'&email='+req.query.email+'';
    axios.put(url, {
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        //console.log(error);
        next(null, error.response.data.message);
    });
}

function decodeToken(token){
    var secret = 'secret_key';
    var payload = jwt.decode(token, secret);
    return payload;
}

module.exports = {
  traceability,
  getHistory,
  //traceabilityM,
  //traceabilityC,
  //traceabilityA,
  //traceabilityP,
  getData,
  getFileStream,
  getInitialNonce,
  verifyEmail,
  login,
  userCreation,
  userDetails,
  usersDetails,
  userUpdate,
  userDelete,
  emailToReset,
  //resetPassword,
  resetPasswordGET,
  resetPasswordPUT,
  getCompanyM,
  merchantsCompany,

  merchantsData,
  merchantsDataOut,

  getCompanyC,
  carriersCompany,
  carriersData,
  getCompanyA,
  acopiosCompany,

  acopiosData,
  acopiosDataOut,

  updateTransaction,
  getCompanyP,
  productorsCompany,
  productorsData
};
