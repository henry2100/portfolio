const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    proficiency: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
}, {
    timestamps: true
});

SkillSchema.path('images').validate(function (images) {
    return images && images.length > 0;
}, 'At least one image is required.');

const Skills = mongoose.model('Skill', SkillSchema);
module.exports = Skills;