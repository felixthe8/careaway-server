const dbConnection = require('@dataAccess/db_connection');

const MailRepo = require('@dataAccess/mail_repository');

const model = {
  DB: new dbConnection().Connect(),
  MailRepo: MailRepo
}

module.exports = model;
