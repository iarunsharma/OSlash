const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },

    shorturl: {
		type: String,
		lowercase: true,
		trim: true
	},
  
    description: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        trim: true
    },
  
}, { timestamps: true });

module.exports = mongoose.model('url', urlSchema)