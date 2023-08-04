const mongoose = require('mongoose')

const noteSchema = new mongoose.schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title : {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true 
    },
    completed: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true, // by setting this true, mongodb will give us created at and updated at timestamps 
})


noteSchema.plugin(AutoIncreament,{
    inc_field : 'ticket',
    id: 'ticketNums',
    start_seq: 5000
})

module.exports = mongoose.model('Note', noteSchema)
