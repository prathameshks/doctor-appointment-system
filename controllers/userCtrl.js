const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');

// register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User Already Exist"
            })
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);

        await newUser.save();
        res.status(200).send({
            success: true,
            message: "Registered Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Register Ctrl ${error.message}`
        })
    }
};

const loginController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(200).send({
                success: false,
                message: "User Not Found"
            });
        }

        const checkPassword = await bcrypt.compare(req.body.password, existingUser.password);

        if (!checkPassword) {
            return res.status(200).send({
                success: false,
                message: "Password is incorrect"
            })
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Login Controller Error : ${error.message}`
        });
    }
};

const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })

        user.password = undefined

        if (!user) {
            return res.status(200).send({
                message: "User Not Found",
                success: false
            });
        } else {
            res.status(200).send({
                success: true,
                data: user
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Auth Controller Error",
            error
        })
    }
}

const applyDoctorController = async (req,res) => {
    try {
        const newDoctor = await doctorModel({...req.body,status:'Pending'})
        await newDoctor.save()

        const adminUser = await userModel.findOne({isAdmin:true});

        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} has Applied to Become a Doctor`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        
        await userModel.findByIdAndUpdate(adminUser._id,{notification})

        res.status(201).send({
            success:true,
            message:"Doctor Account Applied Successfully",
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error While Applying For Doctor"
        })
    }
}

module.exports = { loginController, registerController, authController,applyDoctorController };