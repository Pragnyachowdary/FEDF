const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['available', 'occupied', 'cleaning'], default: 'available' },
  wardType: { type: String, required: true, enum: ['General', 'ICU', 'Emergency', 'Recovery'], default: 'General' },
  roomNumber: { type: String, required: true },
  isICU: { type: Boolean, default: false },
  isEmergency: { type: Boolean, default: false },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Bed', bedSchema);
