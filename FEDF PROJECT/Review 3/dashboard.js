const express = require('express');
const Bed = require('../models/Bed');
const Patient = require('../models/Patient');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/analytics', async (req, res) => {
  const beds = await Bed.find();
  const patients = await Patient.find();

  const occupancyRate = beds.length ? Math.round((beds.filter(b => b.status === 'occupied').length / beds.length) * 100) : 0;
  const wardSummary = beds.reduce((acc, bed) => {
    acc[bed.wardType] = (acc[bed.wardType] || 0) + 1;
    return acc;
  }, {});

  res.json({ occupancyRate, wardSummary, totalBeds: beds.length, totalPatients: patients.length });
});

module.exports = router;
