module.exports = app => {
    const staffs = require("../controllers/staff.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", staffs.create);
  
    // Retrieve all Tutorials
    router.get("/", staffs.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", medicines.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", staffs.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", staffs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", staffs.delete);
  
    // Delete all Tutorials
    router.delete("/", staffs.deleteAll);
  
    app.use('/api/staffs', router);
  };