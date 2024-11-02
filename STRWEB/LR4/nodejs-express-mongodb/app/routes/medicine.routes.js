module.exports = app => {
    const medicines = require("../controllers/medicine.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", medicines.create);
  
    // Retrieve all Tutorials
    router.get("/", medicines.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", medicines.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", medicines.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", medicines.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", medicines.delete);
  
    // Delete all Tutorials
    router.delete("/", medicines.deleteAll);
  
    app.use('/api/medicines', router);
  };