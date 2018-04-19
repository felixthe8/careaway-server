const dbConnection = require('@dataAccess/db_connection');

const MailRepo = require('@mailRepo/mail_service');

const model = {
  DB: new dbConnection().Connect(),
  MailRepo: MailRepo
}

module.exports = model;
