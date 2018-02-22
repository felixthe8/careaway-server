/*
  Model for System Admin on the CareAway system. The System Admin object will be 
  stored inside the User accountType attribute of the User. 
*/
function SystemAdmin () {
    this.role = 'system-admin';
}
module.exports = SystemAdmin;