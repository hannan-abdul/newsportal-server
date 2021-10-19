const auth = require('../models/Auth');
const bcrypt = require('bcrypt');

// Register
const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(16);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new auth({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            role: req.body.role
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

//Login
const Login = async (req, res) => {
    try {
        const authuser = await auth.findOne({ email: req.body.email });
        !authuser && res.status(400).json("Wrong Credentials!");

        const validated = await bcrypt.compare(req.body.password, authuser.password);
        !validated && res.status(400).json("Wrong Credentials!");

        const { password, ...others } = authuser._doc;
        res.status(200).json({ message: 'Login Successfully!', others })
    }
    catch (err) {
        res.status(500).json(err);
    }
};

//all user
const Alluser = async (req, res) => {
    try {
        const authuser = await auth.find();
        res.status(200).json(authuser);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
};

// //update user 
// const updateuser = async (req, res) => {
//     try {
//         const user = await auth.findById(req.params.id);
//         if (user.email === req.body.email) {
//             try {
//                 const updateuser = await auth.findByIdAndUpdate(
//                     req.params.id,
//                     { $set: req.body },
//                     { new: true }
//                 );
//                 res.status(200).json(updateuser);
//             } catch (err) {
//                 res.status(500).json(err);
//             }
//         } else {
//             res.status(401).json("You can update only your data");
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }
// };

module.exports = {
    Register,
    Login,
    Alluser,
    // updateuser
}