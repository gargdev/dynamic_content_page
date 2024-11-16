const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL for images
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
