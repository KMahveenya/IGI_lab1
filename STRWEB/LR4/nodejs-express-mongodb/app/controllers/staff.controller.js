const db = require("../models");
const Staff = db.staffs;

exports.create = (req, res) => {
    console.log(req.body.firstname);
    if (!req.body.firstname) // добавить все поля, которым нельзя быть null
    {
        res.status(400).send({ message: "Не может быть нулевым!" });
        return;
    }

    const staff = new Staff({
        firstname: req.body.firstname,
        surname: req.body.surname,
        lastname: req.body.lastname,
        position: req.body.position,
        email: req.body.email,
        image: req.body.image
    });

    staff
    .save(staff)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Ошибка при создании объекта New."
        });
    });
};

exports.findAll = (req, res) => {
  
    Staff.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске New."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Staff.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Не найдено New с id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Ошибка при поиске New с id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body)
    {
        return res.status(400).send({
            message: "Не может быть нулевым!"
        });
    }

    const id = req.params.id;

    Staff.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Нельзя обновить New с id=${id}. Возможно New не найден!`
        });
        } else res.send({ message: "New успешно обновлен." });
    })
    .catch(err => {
        res.status(500).send({
        message: "Ошибка при обновлении New с id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    
    Staff.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Нельзя удалить New с id=${id}. Возможно New не найден!`
          });
        } else {
          res.send({
            message: "New успешно удален!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Нельзя удалить New с id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Staff.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} News успешно удалены!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при удалении некоторых Medicines."
      });
    });
};

/*exports.findAllPublished = (req, res) => {
    Medicine.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};*/