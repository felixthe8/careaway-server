const service = {};
const models = require('@accountModels');
const UserRepo = models.UserRepo;
const DB = models.DB;
/**
 * Checks if the user id passed in is an actual user in our system.
 * @param {*} id The user id
 * @return {*} A promise object that contains the result:
 * true if the user's id is a valid id in our system, false otherwise.
 */
const isRealUser = (id) => {
  return new Promise((fulfill, reject) => {
    DB.then(database => {
      const repo = new UserRepo(database);
      repo.FindUserById(id).then(user => {
        const theUser = user.User;
        
        if(theUser && theUser.length > 0) {
          // If the query returns at least one user, then success.
          fulfill({result: true});
        } else {
          // No user with this ID, not a valid user.
          fulfill({result: false});
        } 
      });
    });
  });
}

/**
 * Validates whether or not this user is authenticated.
 * If the user is authenticated, then passes the request to the next
 * function, otherwise ends the request.
 * @param {*} req - The request object from a client.
 * @param {*} res - The response object.
 * @param {*} next - The next function to handle this request if the user is authenticated.
 */
service.isAuthenticated = (req, res, next) => {
  if(req.cookies) {
    const userID = req.cookies.user;
    // Tests for the user cookie.
    if(userID) {
      // Validates whether this is actually a user id in our system.
      isRealUser(userID).then(valid => {
        if(valid.result) {
          // Valid user, lets their request continue to its destination route.
          next();
        } else {
          // Ends their request here, only a valid user can access the rest of the routes.
          res.end();
        }
      });
    } else {
      // Ends their request here, only an authenticated user can access the remaining routes.
      res.end();
    }
  } else {
    // Ends their request here, only an authenticated user can access the remaining routes.
    res.end();
  }
}

/**
 * Logs out a user by destroying their cookies.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next function to be invoked.
 */
service.logout = (req, res, next) => {
  if(req.cookies) {
    // The client had cookies
    const user = req.cookies.user;
    if(user) {
      // If the client had a cookie for the user, destroys it.
      res.clearCookie(user);
      res.end();
    } else {
      res.end();
    }
  } else {
    res.end();
  }
}

module.exports = service;
