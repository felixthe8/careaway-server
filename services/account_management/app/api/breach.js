const api = {};

api.shutdownDB = (UserRepo, DB) => (req, res) => {
    // grab user from body
    const username = req.body.username;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                // user not found
                res.json({error: 'User does not exist.'});
            } else {
                // check if user is system admin, and only shut down db if user is admin
                queriedUser = queriedUser[0];
                var role = queriedUser.accountType.role;
                if (role === 'system-admin') {
                    // shut down
                    database.close();
                    res.json({success: true});
                } else {
                    res.json({error: 'User is not an admin.'});
                }
            }
        });
    });
}


module.exports = api;