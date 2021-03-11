var axios = require('axios');
var jwt = require('jwt-simple');


function merchantsData(req, res){
    serviceInitMerchants(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
            res.status(200).send({ message: data.message });
            //console.log(data);
        }
    });
}

function serviceInitMerchants(req, next) {
    var url = 'http://'+host+':'+port.merchant+''+path.merchant+'';
    axios.post(url, {
        map: req.body.map,
        id: req.body.id,
        fId: req.body.fId,
        date: req.body.date,
        description: req.body.description,
        type: req.body.type
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
            res.status(200).send({ message: data.message });
            //console.log(data);
        }
    });
}

function serviceInitCarriers(req, next) {
    var url = 'http://'+host+':'+port.carrier+''+path.carrier+'';
    axios.post(url, {
        map: req.body.map,
        id: req.body.id,
        fId: req.body.fId,
        date: req.body.date,
        description: req.body.description,
        type: req.body.type
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
            res.status(200).send({ message: data.message });
            //console.log(data);
        }
    });
}

function serviceInitAcopios(req, next) {
    var url = 'http://'+host+':'+port.acopio+''+path.acopio+'';
    axios.post(url, {
        map: req.body.map,
        id: req.body.id,
        fId: req.body.fId,
        date: req.body.date,
        description: req.body.description,
        type: req.body.type
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
    serviceInitProductors(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
            res.status(200).send({ message: data.message });
            //console.log(data);
        }
    });
}

function serviceInitProductors(req, next) {
    var url = 'http://'+host+':'+port.productor+''+path.productor+'';
    axios.post(url, {
        map: req.body.map,
        id: req.body.id,
        fId: req.body.fId,
        date: req.body.date,
        description: req.body.description,
        type: req.body.type
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

function getInitialToken(req, res){
    serviceIniGetToken(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: err });
        }else {
          if(data.token){
                res.status(200).send({ message: data.message, token: data.token });
                //console.log(data);
          }else {
            res.status(200).send({ message: data.message });
          }
        }
    });
}

function serviceIniGetToken(req, next) {
    var url = 'http://'+host+':'+port.users+''+path.getInitialToken;
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
    var url = 'http://'+host+':'+port.users+''+path.getEmail+'?code='+req.query.code+'&email='+req.query.email+'';
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
    var url = 'http://'+host+':'+port.users+''+path.userLogin+'';
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
                res.status(500).send({ message: err });
            }else {
                res.status(200).send({ message: data.message, user: data.user, token: data.token });
                //console.log(data);
            }
        });
    }else if(req.body.typeOfUser == 'Mechant' || req.body.typeOfUser == 'Carrier' || req.body.typeOfUser == 'Acopio' || req.body.typeOfUser == 'Productor'){
        serviceInitUserCreation(req, function(data, err) {
            if (err) {
                res.status(500).send({ message: err });
            }else {
                res.status(200).send({ message: data.message });
                //console.log(data);
            }
        });
    }else if (req.body.typeOfUser == 'Consumer') {
      serviceInitUserCreation(req, function(data, err) {
          if (err) {
            res.status(500).send({ message: err });
          }else {
            res.status(200).send({ message: data.message, user: data.user, token: data.token });
              //console.log(data);
          }
      });
    }
}

function serviceInitUserCreationRoot(req, next) {
    var url = 'http://'+host+':'+port.users+''+path.userCreation+'';
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
        //console.log(error.response.data.message);
        next(null, error.response.data.message);
    });
}

function serviceInitUserCreation(req, next) {
    var url = 'http://'+host+':'+port.users+''+path.userCreation+'';
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
    var url = 'http://'+host+':'+port.users+''+path.userDetails+''+req.params.id;
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
    var url = 'http://'+host+':'+port.users+''+path.usersDetails+''+req.params.page;
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
    var url = 'http://'+host+':'+port.users+''+path.userUpdate+''+req.params.id;
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
    var url = 'http://'+host+':'+port.users+''+path.userUpdate+''+req.params.id;
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
    var url = 'http://'+host+':'+port.users+''+path.userDelete+''+req.params.id;
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
  getInitialToken,
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
