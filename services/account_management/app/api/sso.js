
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
const api = {};

api.ssoRegistration = (User, Security, Salt,UserRepo, DB) => (req, res) => {
  try{
    var decoded = jwt.verify(req.body.token,"2disbetterthan3d");
    console.log("Verified Token");
    var ssoUser = jwt.decode(req.body.token,{complete: true});
    DB.then(database => {
        var userRepo = new UserRepo(database);
        console.log(ssoUser.payload.securityQ1);
        var sQ = [ 
          new Security(ssoUser.payload.securityQ1,ssoUser.payload.securityA1),
          new Security(ssoUser.payload.securityQ2,ssoUser.payload.securityA2),
          new Security(ssoUser.payload.securityQ3,ssoUser.payload.securityA3)
        ];
        var identifier = new Salt(ssoUser.payload.salt, ssoUser.payload.saltA1, ssoUser.payload.saltA2, ssoUser.payload.saltA3);
        var newUser = new User(ssoUser.payload.username,ssoUser.payload.password, {}, sQ ,identifier);
        userRepo.Create(newUser);
        res.json({success: true});
    });
  } catch(err){
    console.log("Received a bad token");
    res.json({success: false});
  }
};

api.ssoLogin = (UserRepo, DB) => (req, res) => {
    try{
        var decoded = jwt.verify(req.body.token,"2disbetterthan3d");
        console.log("Verified Token");
        var ssoUser = jwt.decode(req.body.token,{complete: true});
        DB.then(database => {
            var username = ssoUser.payload.username;
            var password = ssoUser.payload.password;
            var userRepo = new UserRepo(database);
            // find user in db
            userRepo.FindUser(username).then(function(value){
                var queriedUser = value.User;
                if (queriedUser.length === 0) {
                    // user was not found
                    res.json({error: 'User does not exist.'});
                } else {
                    // user was found
                    user = queriedUser[0];
                    // hash password from request and compare with hashed password in db
                    const passHashed = CryptoJS.HmacSHA256(password,user.identifier.salt).toString();
                    if (passHashed === user.password) {
                        if((Object.keys(user.accountType).length ===0)){
                            res.json({success: true, needRegister: true});
                        }else{
                            if (user.accountType.role == 'system-admin') {
                                res.sendFile('/sys-ad.html',{root: 'services/' });
                            } 
                            else {
                                res.json({success: true, accountType: queriedUser.accountType.role});
                            }
                      }
                    } else {
                      //res.json({error: 'Wrong password.'})
                      console.log("Wrong pass");
                      resolve(null);      
                    }
                }
            });
        });
    } catch(err){
        console.log("Received a bad token");
        res.json({success: false});
      }
    

};


api.ssoResetPassword= (UserRepo, DB) => (req, res) => {
    try{
        var decoded = jwt.verify(req.body.token,"2disbetterthan3d");
        console.log("Verified Token");
        var ssoUser = jwt.decode(req.body.token,{complete: true});
        DB.then(database => {
            var userRepo = new UserRepo(database);
            userRepo.FindUser(ssoUser.payload.username).then(function(value){
                var queriedUser = value.User;
                if (queriedUser.length === 0) {
                    // user does not exist
                    res.json({error: 'User does not exist.'});
                } else {
                    // generate new salt and hash new password with new salt
                    queriedUser = queriedUser[0];
                    const newSalt = CryptoJS.lib.WordArray.random(128/8).toString();
                    const passHashed = CryptoJS.HmacSHA256(ssoUser.payload.password,newSalt).toString();
                    // update db with new hashed password and salt
                    userRepo.ResetCredential(ssoUser.payload.username,passHashed,newSalt);
                    res.json({success: true});
                }
            });
        });
      } catch(err){
        console.log("Received a bad token");
        res.json({success: false});
      }
};




module.exports = api;