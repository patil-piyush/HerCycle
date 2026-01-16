const mongoose = require(`mongoose`);

const ImageDataTestSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imagePath: { type: String, required: true },
    modelOutput: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamp: true });

const ImageDataTest = mongoose.model(`ImageDataTest`, ImageDataTestSchema);


module.exports = ImageDataTest;