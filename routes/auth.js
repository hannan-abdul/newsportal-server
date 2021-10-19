const router = require("express").Router();
const auth_control = require("../controllers/auth");

router.post("/register", auth_control.Register);
router.post("/login", auth_control.Login);
router.get("/allusers", auth_control.Alluser);
// router.put("/:id", auth_control.updateuser);

module.exports = router;
