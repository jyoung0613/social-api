const { Schema, model, Types } = require("mongoose");
const { isEmail } = require('validator');

const FriendSchema = new Schema(
  {
    // set custom id to avoid confusion with parent user_id
    friendId: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

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
      required: true,
      unique: true,
      validate: { validator: isEmail , message: 'Invalid email.' }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [FriendSchema],
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
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// get total count of comments and replies on retrieval
UserSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

// create the User model using UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
