var moment = require('moment');

const api = {};

// ajax post request to mail document
api.createMail = (MailRepo, DB) => (req,res) {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.CreateMail(req.patient, req.mp, req.message);
    res.json({ success: true });
  });
}

// ajax get request to mail document
api.getMail = (MailRepo,DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.GetMail(req.patient, req.mp, req.message).then(result => {
      res.json(result);
    });
  });
}

// ajax delete request to mail document
api.deleteMail = (MailRepo,DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.DeleteMail(req.patient, req.mp, req.message);
    res.json({ success: true });
  })

}

module.exports = api;
