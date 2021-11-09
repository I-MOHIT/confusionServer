const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadershipSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    abbr:{
        type: String
    },
    description:{
        type: String,
        required: true
    },
    featured:{
        type: String,
        default: false
    }
}, {
    timestamps: true
});

var Leaderships = mongoose.model('Leadership', leadershipSchema);

module.exports = Leaderships;