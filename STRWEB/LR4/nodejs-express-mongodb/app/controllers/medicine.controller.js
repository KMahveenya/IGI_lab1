const db = require("../models");
const Medicine = db.medicines;

exports.create = (req, res) => {
    if (!req.body.name) // добавить все поля, которым нельзя быть null
    {
        res.status(400).send({ message: "Не может быть нулевым!" });
        return;
    }

    const medicine = new Medicine({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        discount: req.body.discount,
        instruction: req.body.instruction,
        category: req.body.category,
        image: req.body.image
    });

    medicine
    .save(medicine)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Ошибка при создании объекта Medicine."
        });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    const sort = req.query.sort;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {}; // поисковик
  
    if (sort == 'up')
    {
      Medicine.find().sort({price: 1})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске Medicine."
        });
      });
    }
    else if (sort == 'down')
    {
      Medicine.find().sort({price: -1})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске Medicine."
        });
      });
    }
    else
    {
      Medicine.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске Medicine."
        });
      });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Medicine.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Не найдено Medicine с id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Ошибка при поиске Medicine с id=" + id });
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

    Medicine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Нельзя обновить Medicine с id=${id}. Возможно Medicine не найден!`
        });
        } else res.send({ message: "Medicine успешно обновлен." });
    })
    .catch(err => {
        res.status(500).send({
        message: "Ошибка при обновлении Medicine с id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    
    Medicine.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Нельзя удалить Medicine с id=${id}. Возможно Medicine не найден!`
          });
        } else {
          res.send({
            message: "Medicine успешно удален!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Нельзя удалить Medicine с id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Medicine.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Medicines успешно удалены!`
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