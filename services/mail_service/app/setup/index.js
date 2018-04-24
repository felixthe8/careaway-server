const dbConnection = require('@dataAccess/db_connection');

const MailRepo = require('@dataAccess/mail_repository');
const MailModel = require('@models/mail');

const model = {
  DB: new dbConnection().Connect(),
  MailRepo: MailRepo,
  MailModel: MailModel
}

module.exports = model;
