var axios = require('axios');
var jwt = require('jwt-simple');

async function getData(req, res) {
  try {
    //const resMerchant = await axios.post(`http://host.docker.internal:3002/getData/?code=${split[3]}`, { code: split[3]});  productor: '/productorsData',
    const resMerchant = await axios.get('http://'+host.merchant+':'+port.merchant+''+path.getData+'');
    //data.push(resMerchant.data.message);

    const resCarrier = await axios.get('http://'+host.carrier+':'+port.carrier+''+path.getData+'');
    //data.push(resCarrier.data.message);

    const resAcopio = await axios.get('http://'+host.acopio+':'+port.acopio+''+path.getData+'');
    //data.push(resAcopio.data.message);

    const resProductor = await axios.get('http://'+host.productor+':'+port.productor+''+path.getData+'');
    //data.push(resProductor.data.message);

    res.status(200).send({ productor: resProductor.data.message, acopio: resAcopio.data.message, carrier: resCarrier.data.message, merchant: resMerchant.data.message });
  } catch (error) {
    //console.log(error);
    console.log(error);
    res.status(200).send({ message: error });
  }
}

function merchantsData(req, res){
    serviceInitMerchants(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
          res.status(200).send({ message: data.message, addData: data.addData });
            //console.log(data);
        }
    });
}

function serviceInitMerchants(req, next) {
    var url = 'http://'+host.merchant+':'+port.merchant+''+path.merchant+'';
    axios.post(url, {
        fid: req.body.fid,
        code: req.body.code,
        ubication: req.body.ubication,
        name: req.body.name,
        previousStage: req.body.previousStage,
        currentStage: req.body.currentStage
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
    serviceInitCarriers(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
          res.status(200).send({ message: data.message, addData: data.addData });
            //console.log(data);
        }
    });
}

function serviceInitCarriers(req, next) {
    var url = 'http://'+host.carrier+':'+port.carrier+''+path.carrier+'';
    axios.post(url, {
      fid: req.body.fid,
      ubication: req.body.ubication,
      name: req.body.name,
      previousStage: req.body.previousStage,
      currentStage: req.body.currentStage
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
    serviceInitAcopios(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
          res.status(200).send({ message: data.message, addData: data.addData });
            //console.log(data);
        }
    });
}

function serviceInitAcopios(req, next) {
    var url = 'http://'+host.acopio+':'+port.acopio+''+path.acopio+'';
    axios.post(url, {
      fid: req.body.fid,
      ubication: req.body.ubication,
      name: req.body.name,
      previousStage: req.body.previousStage,
      currentStage: req.body.currentStage
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
  console.log(req.body);
    serviceInitProductors(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
          res.status(200).send({ message: data.message, addData: data.addData });
            //console.log(data);
        }
    });
}

function serviceInitProductors(req, next) {
    var url = 'http://'+host.productor+':'+port.productor+''+path.productor+'';
    axios.post(url, {
      fid: req.body.fid,
      ubication: req.body.ubication,
      name: req.body.name,
      harvestDate: req.body.harvestDate,
      caducationDate: req.body.caducationDate,
      previousStage: req.body.previousStage,
      currentStage: req.body.currentStage,
      description: req.body.description,
      image: req.body.image,
      documentation: req.body.documentation
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

function getInitialNonce(req, res){
  console.log(req.body);
  serviceInitGetNonce(req, function(data, err) {
    if (err) {
      res.status(500).send({ message: err });
    }else {
      if (data.res == false) {
        res.status(200).send({ res: data.res, A: data.A, na: data.na });
      }else {
        res.status(200).send({ A: data.A, na: data.na, nb: data.nb });
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

function getEmail(req, res){
    serviceInitGetEmail(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
            //console.log(err);
        }else {
            res.status(200).send({ message: data.message });
            //console.log(data);
        }
    });
}

function serviceInitGetEmail(req, next) {
    var url = 'http://'+host.users+':'+port.users+''+path.getEmail+'?code='+req.query.code+'&email='+req.query.email+'';
    console.log(url);
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
              console.log(err);
              res.status(500).send({ message: err });
            }else {
                res.status(200).send({ message: data.message, user: data.user, token: data.token });
                //console.log(data);
            }
        });
    }else if(req.body.typeOfUser == 'Merchant' || req.body.typeOfUser == 'Carrier' || req.body.typeOfUser == 'Acopio' || req.body.typeOfUser == 'Productor'){
        serviceInitUserCreation(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
                res.status(200).send({ message: data.message });
                //console.log(data);
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
        //console.log(error.response.data.message);
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
        surnameP: req.body.surnameP,
        surnameM: req.body.surnameM,
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

function decodeToken(token){
    var secret = 'secret_key';
    var payload = jwt.decode(token, secret);
    return payload;
}

module.exports = {
  getData,
  getInitialNonce,
  getEmail,
  login,
  userCreation,
  userDetails,
  usersDetails,
  userUpdate,
  userDelete,
  merchantsData,
  carriersData,
  acopiosData,
  productorsData
};
