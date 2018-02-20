// Object to hold the user's salt that will be needed 
// for authentication
function Identifier(salt, saltA1, saltA2, saltA3) {
  this.salt = salt || '';
  this.saltA1 = saltA1 || '';
  this.saltA2 = saltA2 || '';
  this.saltA3 = saltA3 || '';
}
module.exports = Identifier;