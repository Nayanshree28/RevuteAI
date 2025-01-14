const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  reportData: {
    type: Object, // Adjust as per your data structure
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', ReportSchema);
