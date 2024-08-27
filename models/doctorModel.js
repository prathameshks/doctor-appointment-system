const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    phone: {
        type: String,
        required: [true, 'Phone Number is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is Required']
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is Required']
    },
    experience: {
        type: String,
        required: [true, 'Experience is Required']
    },
    feesPerConsultation: {
        type: String,
        required: [true, 'fee is Required']
    },
    status: {
        type:String,
        default:"Pending"
    },
    timings: {
        type: Object,
        required: [true, 'Work Time Is Required']
    },
}, { timestamps: true });

const doctorModel = mongoose.model('doctors', doctorSchema)

module.exports = doctorModel