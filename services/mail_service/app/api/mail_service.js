const api = {};

// ajax post request to mail document
api.createMail = (MailRepo, MailModel, DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    var mail = new MailModel(req.body.sender, req.body.message);
    mailRepo.CreateMail(req.body.sender, req.body.receiver, mail);
    res.json({ success: true });
  });
}

// ajax get request to mail document
api.getMail = (MailRepo,DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.GetMail(req.query.username).then(result => {
      res.json(result);
    });
  });
}

// ajax delete request to mail document
api.deleteMail = (MailRepo,DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    console.log(req.body);
    mailRepo.DeleteMail(req.body.sender, req.body.receiver, req.body.message);
    res.json({ success: true });
  })

}

module.exports = api;
