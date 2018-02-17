// Object to hold the user's salt that will be needed 
// for authentication
function Identifier(salt) {
  this.salt = salt || '';
}
module.exports = Identifier;