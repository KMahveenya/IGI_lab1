module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: { type: String, required: true },
        description: { type: String },
        text:  { type: String, required: true  },
        image:  { type: String },
      },
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
      
    const New = mongoose.model("new", schema);
    return New;
  };