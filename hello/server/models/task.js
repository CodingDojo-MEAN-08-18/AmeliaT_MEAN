const mongoose = require('mongoose');

mongoose.model('Task', new mongoose.Schema ({
    task: { type: String, required: true, minlength: 5, maxlength: 50 },
    description: { type: String, required: true, minlength: 5, maxlength: 255 },
    completed: { type: Boolean, required: true }
}, { timestamps: true }));
