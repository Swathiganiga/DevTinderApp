const mangoose = require('mongoose');
const validator = require('validator');
const userSchema = new mangoose.Schema({
    firstName: {
        type: String,
        required: true,
        MinLength: 3,
        MaxLength: 20
    },
    lastName: {
        type: String,
        MinLength: 3,
        MaxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format');        
            }
        }},
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,

    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('Invalid gender value');
            }
        }
    },
    photourl: {
        type: String,
        default: 'https://www.example.com/default-photo.jpg',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalid photo URL format');        
            }
    }},
    about: {
        type: String,
        Maxlength: 200
    },
    skillSet: {type: [String]}
}, { timestamps: true });

const User = mangoose.model('User', userSchema);

module.exports = User;

