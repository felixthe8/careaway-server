const api = {};

api.shutdownDB = (UserRepo, DB) => (req, res) => {
    const username = req.body.username;

    DB.then(database => {
        var userRepo = new UserRepo(database);
        userRepo.FindUser(username).then(function(value){
            var queriedUser = value.User;
            if (queriedUser.length === 0) {
                res.json({error: 'User does not exist.'});
            } else {
                queriedUser = queriedUser[0];
                var role = queriedUser.accountType.role;
                if (role === 'system-admin') {
                    // shut down
                    console.log('beep');
                    database.close();
                    console.log('boop');
                    res.json({success: true});
                } else {
                    res.json({error: 'User is not an admin.'});
                }
            }
        });
    });
}


module.exports = api;