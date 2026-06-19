const express = require('express');
const Bed = require('../models/Bed');
const Patient = require('../models/Patient');
const { authMiddleware, roleGuard } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const beds = await Bed.find().populate('patient');
  res.json(beds);
});

router.get('/summary', async (req, res) => {
  const totalBeds = await Bed.countDocuments();
  const occupiedBeds = await Bed.countDocuments({ status: 'occupied' });
  const availableBeds = await Bed.countDocuments({ status: 'available' });
  const cleaningBeds = await Bed.countDocuments({ status: 'cleaning' });
  const icuBeds = await Bed.countDocuments({ isICU: true });
  const emergencyBeds = await Bed.countDocuments({ isEmergency: true });
  res.json({ totalBeds, occupiedBeds, availableBeds, cleaningBeds, icuBeds, emergencyBeds });
});

router.put('/:id/admit', roleGuard('receptionist', 'doctor'), async (req, res) => {
  const bed = await Bed.findById(req.params.id);
  if (!bed) return res.status(404).json({ message: 'Bed not found' });

  const { patientId } = req.body;
  const patient = await Patient.findById(patientId);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  bed.status = 'occupied';
  bed.patient = patient._id;
  bed.wardType = patient.wardType;
  await bed.save();

  patient.bed = bed._id;
  patient.roomNumber = bed.roomNumber;
  patient.status = 'Under Observation';
  patient.assignedBy = req.user.name;
  await patient.save();

  res.json({ message: 'Patient admitted', bed, patient });
});

router.put('/:id/discharge', roleGuard('receptionist', 'doctor'), async (req, res) => {
  const bed = await Bed.findById(req.params.id).populate('patient');
  if (!bed) return res.status(404).json({ message: 'Bed not found' });

  if (bed.patient) {
    const patient = await Patient.findById(bed.patient._id);
    patient.status = 'Discharged';
    patient.bed = null;
    await patient.save();
  }

  bed.status = 'available';
  bed.patient = null;
  await bed.save();

  res.json({ message: 'Patient discharged', bed });
});

router.put('/:id/update-status', roleGuard('nurse', 'doctor'), async (req, res) => {
  const { status } = req.body;
  const bed = await Bed.findById(req.params.id).populate('patient');
  if (!bed || !bed.patient) return res.status(404).json({ message: 'Bed or patient not found' });

  const patient = await Patient.findById(bed.patient._id);
  patient.status = status || patient.status;
  patient.assignedBy = req.user.name;
  await patient.save();

  res.json({ message: 'Patient status updated', patient });
});

router.put('/:id/clean', roleGuard('receptionist', 'doctor'), async (req, res) => {
  const bed = await Bed.findById(req.params.id);
  if (!bed) return res.status(404).json({ message: 'Bed not found' });
  bed.status = 'cleaning';
  await bed.save();
  res.json({ message: 'Bed set to cleaning mode', bed });
});

module.exports = router;
