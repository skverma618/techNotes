const mogoose = require('mongoose')

const schema = new mongoose.schema({
    userName : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true,
    },
    roles: [{
        type : String,
        default : 'employee'
    }],
    active:{
        type : Boolean,
        default: true,
    }
})