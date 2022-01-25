module.exports = mongoose => {
    const CareGiver = mongoose.model(
      "caregiver",
      mongoose.Schema(
        {
          name: String,
          age:Number,
          email:String,
          description: String,
          enabled: Boolean
        },
        { timestamps: true }
      )
    );
  
    return CareGiver;
  };