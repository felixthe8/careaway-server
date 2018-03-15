var jwt = require('jsonwebtoken');
module.exports = {
    decodeJWT(token) {
        var newUser;
        try{
            var decoded = jwt.verify(token,"db3OIsj+BXE9NZsDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==");
            var newUser = jwt.decode(token,{complete: true});
        }
        catch(err){
            newUser = err;
        }
        return newUser;
    }

};