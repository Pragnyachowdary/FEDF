const express = require('express');
const Patient = require('../models/Patient');
const Bed = require('../models/Bed');
const { authMiddleware, roleGuard } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const patients = await Patient.find().populate('bed');
  res.json(patients);
});

router.put('/:id', roleGuard('doctor'), async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  Object.assign(patient, req.body);
  await patient.save();
  res.json({ message: 'Patient updated', patient });
});

router.put('/:id/vitals', roleGuard('nurse', 'doctor'), async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  patient.vitals = { ...patient.vitals, ...req.body.vitals };
  patient.assignedBy = req.user.name;
  await patient.save();

  res.json({ message: 'Vitals updated', patient });
});

router.put('/:id/status', roleGuard('nurse', 'doctor'), async (req, res) => {
  const { status } = req.body;
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  patient.status = status;
  patient.assignedBy = req.user.name;
  await patient.save();
  res.json({ message: 'Patient status updated', patient });
});

router.put('/:id/assign', roleGuard('doctor'), async (req, res) => {
  const { bedId } = req.body;
  const patient = await Patient.findById(req.params.id);
  const bed = await Bed.findById(bedId);
  if (!patient || !bed) return res.status(404).json({ message: 'Patient or bed not found' });

  bed.status = 'occupied';
  bed.patient = patient._id;
  patient.bed = bed._id;
  patient.roomNumber = bed.roomNumber;
  await bed.save();
  await patient.save();

  res.json({ message: 'Bed assigned to patient', patient, bed });
});

module.exports = router;
