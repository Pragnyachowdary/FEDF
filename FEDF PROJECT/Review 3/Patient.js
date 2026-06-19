const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed', default: null },
  roomNumber: { type: String, required: true },
  wardType: { type: String, required: true, enum: ['General', 'ICU', 'Emergency', 'Recovery'], default: 'General' },
  status: { type: String, required: true, enum: ['Stable', 'Critical', 'Under Observation', 'Discharged'], default: 'Stable' },
  medicineSchedule: { type: String, default: 'Medication schedule pending' },
  vitals: {
    heartRate: { type: Number, default: 72 },
    bloodPressure: { type: String, default: '120/80' },
    oxygenSaturation: { type: Number, default: 98 }
  },
  history: { type: String, default: 'Patient history and notes will appear here.' },
  assignedBy: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
