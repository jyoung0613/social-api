const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Set up GET all and POST at /api/users
router.route('/').get(getUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Set up at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
