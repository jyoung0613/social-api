const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: "email address is required",
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    createdBy: {
      type: String,
      required: true,
    }, 
    thoughts: [
      {
        value: "_id",
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        value: "_id",
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of friends on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

// create the User model using UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
