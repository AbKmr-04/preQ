const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth.middleware');
const Queue = require('../models/queue.model');

// Request to join queue (Patient only)
router.post('/request', auth, authorize('patient'), async (req, res) => {
  try {
    const existingRequest = await Queue.findOne({
      patient: req.user._id,
      status: { $in: ['pending', 'approved', 'in_triage', 'waiting', 'with_doctor'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have an active queue request' });
    }

    const queue = new Queue({
      patient: req.user._id,
      requestTime: new Date()
    });

    await queue.save();
    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get queue status (Patient)
router.get('/status', auth, authorize('patient'), async (req, res) => {
  try {
    const queueEntry = await Queue.findOne({
      patient: req.user._id,
      status: { $in: ['pending', 'approved', 'in_triage', 'waiting', 'with_doctor'] }
    }).populate('assignedDoctor', 'firstName lastName roomNumber');

    if (!queueEntry) {
      return res.status(404).json({ message: 'No active queue entry found' });
    }

    // Get position in queue if approved
    let position = null;
    if (queueEntry.status !== 'pending') {
      const aheadInQueue = await Queue.countDocuments({
        status: queueEntry.status,
        requestTime: { $lt: queueEntry.requestTime }
      });
      position = aheadInQueue + 1;
    }

    res.json({ queueEntry, position });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get pending requests (Help Desk)
router.get('/pending', auth, authorize('helpdesk'), async (req, res) => {
  try {
    const pendingRequests = await Queue.find({ status: 'pending' })
      .populate('patient', 'firstName lastName dateOfBirth')
      .sort('requestTime');
    
    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve/reject request (Help Desk)
router.put('/:queueId/process', auth, authorize('helpdesk'), async (req, res) => {
  try {
    const { status, roomNumber, doctorId } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const queue = await Queue.findById(req.params.queueId);
    if (!queue) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    if (queue.status !== 'pending') {
      return res.status(400).json({ message: 'Queue entry already processed' });
    }

    queue.status = status;
    queue.approvalTime = new Date();
    
    if (status === 'approved') {
      if (!roomNumber || !doctorId) {
        return res.status(400).json({ message: 'Room number and doctor are required for approval' });
      }
      queue.roomNumber = roomNumber;
      queue.assignedDoctor = doctorId;
    }

    await queue.save();
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get doctor's queue (Doctor)
router.get('/doctor-queue', auth, authorize('doctor'), async (req, res) => {
  try {
    const queue = await Queue.find({
      assignedDoctor: req.user._id,
      status: { $in: ['waiting', 'with_doctor'] }
    })
      .populate('patient', 'firstName lastName dateOfBirth')
      .sort('requestTime');
    
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update patient status (Doctor)
router.put('/:queueId/status', auth, authorize('doctor'), async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['waiting', 'with_doctor', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const queue = await Queue.findOne({
      _id: req.params.queueId,
      assignedDoctor: req.user._id
    });

    if (!queue) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    queue.status = status;
    
    if (status === 'with_doctor') {
      queue.consultationStartTime = new Date();
    } else if (status === 'completed') {
      queue.consultationEndTime = new Date();
    }

    await queue.save();
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 