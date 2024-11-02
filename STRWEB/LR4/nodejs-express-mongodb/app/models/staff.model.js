module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        lastname: { type: String, required: true },
        position: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String},
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Staff = mongoose.model("staff", schema);
    return Staff;
  };