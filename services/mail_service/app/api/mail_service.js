const api = {};

// ajax post request to mail document
api.createMail = (MailRepo, DB) => (req,res) => {

  console.log("in post");
  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.CreateMail(req.body.patient, req.body.mp, req.body.message);
    res.json({ success: true });
  });
}

// ajax get request to mail document
api.getMail = (MailRepo,DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.GetMail(req.body.patient, req.body.mp, req.body.message).then(result => {
      res.json(result);
    });
  });
}

// ajax delete request to mail document
api.deleteMail = (MailRepo,DB) => (req,res) => {

  DB.then(database => {
    var mailRepo = new MailRepo(database);
    mailRepo.DeleteMail(req.body.patient, req.body.mp, req.body.message);
    res.json({ success: true });
  })

}

module.exports = api;
