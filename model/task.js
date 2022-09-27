const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
title: {type: String, default: null, unique: true, required: true},
desc: {type: String, default: null},
completed: {type: Boolean, default: false, required: true},
token: { type: String },
});

module.exports = mongoose.model("task", taskSchema);