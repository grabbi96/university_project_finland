const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const common = {
    type: String,
    required: true,
    trim: true
};

const historySchema = new Schema({
    place: { ...common },
    duration: { ...common },
    bill: { ...common }
}, { timestamps: true });

const History = mongoose.model("History", historySchema);

module.exports = History;
