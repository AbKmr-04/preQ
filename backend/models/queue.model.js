const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'in_triage', 'waiting', 'with_doctor', 'completed', 'rejected'],
    default: 'pending'
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  roomNumber: {
    type: String
  },
  requestTime: {
    type: Date,
    default: Date.now
  },
  approvalTime: {
    type: Date
  },
  triageStartTime: {
    type: Date
  },
  triageEndTime: {
    type: Date
  },
  consultationStartTime: {
    type: Date
  },
  consultationEndTime: {
    type: Date
  },
  priority: {
    type: Number,
    default: 3, // 1 = highest, 5 = lowest
    min: 1,
    max: 5
  },
  symptoms: [{
    question: String,
    answer: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  triageSummary: {
    type: Map,
    of: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queue queries
queueSchema.index({ status: 1, requestTime: 1 });
queueSchema.index({ assignedDoctor: 1, status: 1 });

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue; 