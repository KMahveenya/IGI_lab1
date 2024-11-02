const db = require("../models");
const New = db.news;

exports.create = (req, res) => {
    if (!req.body.title) // добавить все поля, которым нельзя быть null
    {
        res.status(400).send({ message: "Не может быть нулевым!" });
        return;
    }

    const mynew = new New({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        image: req.body.image
    });

    mynew
    .save(mynew)
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
  
    New.find()
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

    New.findById(id)
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

    New.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    
    New.findByIdAndDelete(id)
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
    New.deleteMany({})
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