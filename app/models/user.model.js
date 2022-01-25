module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        name: String,
        age:Number,
        email:String,
        description: String,
        active: Boolean
      },
      { timestamps: true }
    )
  );

  return User;
};