const router = require("express").Router();
const {
  register,
  activateAccount,
  getAllUsers,
  mailTesting,
  login,
  passwordResetEmailChecking,
  passwordResetTokenMatching,
  profile,
  createHistory
} = require("../controllers/userController");

router.post("/register", register);

router.post("/profile/:id", profile);
router.post("/history/:id", createHistory);
router.get("/activateaccount/:token", activateAccount);

router.get("/all", getAllUsers);

router.get("/mailcheaking", mailTesting);
router.post("/login", login);
router.post("/forgot-password", passwordResetEmailChecking);
router.post("/forget-password-token", passwordResetTokenMatching);
module.exports = router;
