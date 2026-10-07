const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 160 },
    subtitle: { type: String, trim: true, maxlength: 240, default: '' },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    imageUrl: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
