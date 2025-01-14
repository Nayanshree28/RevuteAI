const express = require('express');
const router = express.Router();
const Report = require('../Model/ReportSchema');

// Save a report
router.post('/savedata', async (req, res) => {
  try {
    const { userId, reportData } = req.body;
    const newReport = new Report({ userId, reportData });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save report', error });
  }
});

// Fetch reports by userId
router.get('/fetchdata/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({ userId });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports', error });
  }
});

module.exports = router;
