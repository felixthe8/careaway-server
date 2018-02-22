// Object to hold the user's salt that will be needed 
// for authentication
function Identifier(salt, saltA1, saltA2, saltA3) {
  this.salt = salt || ''; //salt for password
  this.saltA1 = saltA1 || ''; //salt for security answer 1
  this.saltA2 = saltA2 || ''; //salt for security answer 2
  this.saltA3 = saltA3 || ''; //salt for security answer 3
}
module.exports = Identifier;