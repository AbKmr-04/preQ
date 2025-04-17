const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth.middleware');
const Queue = require('../models/queue.model');

// Start triage session
router.post('/start/:queueId', auth, authorize('patient'), async (req, res) => {
  try {
    const queue = await Queue.findOne({
      _id: req.params.queueId,
      patient: req.user._id,
      status: 'approved'
    });

    if (!queue) {
      return res.status(404).json({ message: 'Queue entry not found or not approved' });
    }

    queue.status = 'in_triage';
    queue.triageStartTime = new Date();
    queue.symptoms = [];
    await queue.save();

    // Initial triage question
    const initialQuestion = generateInitialQuestion();
    res.json({ question: initialQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit symptom response and get next question
router.post('/respond/:queueId', auth, authorize('patient'), async (req, res) => {
  try {
    const { answer } = req.body;
    const queue = await Queue.findOne({
      _id: req.params.queueId,
      patient: req.user._id,
      status: 'in_triage'
    });

    if (!queue) {
      return res.status(404).json({ message: 'Active triage session not found' });
    }

    // Store the response
    queue.symptoms.push({
      question: req.body.question,
      answer: answer,
      timestamp: new Date()
    });

    // Generate next question based on previous answers
    const nextQuestion = generateNextQuestion(queue.symptoms);
    
    if (!nextQuestion) {
      // Triage complete
      queue.status = 'waiting';
      queue.triageEndTime = new Date();
      queue.triageSummary = generateTriageSummary(queue.symptoms);
    }

    await queue.save();

    res.json({
      question: nextQuestion,
      isComplete: !nextQuestion,
      summary: !nextQuestion ? queue.triageSummary : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get triage summary
router.get('/summary/:queueId', auth, async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.queueId);
    
    if (!queue) {
      return res.status(404).json({ message: 'Queue entry not found' });
    }

    // Check authorization
    if (
      req.user.role !== 'doctor' && 
      req.user.role !== 'helpdesk' && 
      queue.patient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this summary' });
    }

    res.json({
      symptoms: queue.symptoms,
      summary: queue.triageSummary
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper functions for AI triage (placeholder implementations)
function generateInitialQuestion() {
  return {
    text: "What is your main symptom today?",
    options: [
      "Fever",
      "Headache",
      "Chest Pain",
      "Stomach Pain",
      "Difficulty Breathing",
      "Other"
    ]
  };
}

function generateNextQuestion(previousSymptoms) {
  // This is a placeholder implementation
  // In a real application, this would use an AI model to generate relevant follow-up questions
  const lastSymptom = previousSymptoms[previousSymptoms.length - 1];
  
  if (previousSymptoms.length >= 5) {
    return null; // End triage after 5 questions
  }

  const questionBank = {
    "Fever": {
      text: "How long have you had the fever?",
      options: ["Less than 24 hours", "1-3 days", "More than 3 days"]
    },
    "Headache": {
      text: "How would you describe the pain?",
      options: ["Throbbing", "Constant", "Sharp", "Dull"]
    },
    "Chest Pain": {
      text: "Is the pain worse with movement or breathing?",
      options: ["Yes", "No", "Unsure"]
    },
    "Stomach Pain": {
      text: "Where is the pain located?",
      options: ["Upper abdomen", "Lower abdomen", "All over"]
    },
    "Difficulty Breathing": {
      text: "When did this start?",
      options: ["Today", "Past few days", "Over a week"]
    }
  };

  return questionBank[lastSymptom.answer] || {
    text: "Are you experiencing any other symptoms?",
    options: ["Yes", "No"]
  };
}

function generateTriageSummary(symptoms) {
  // This is a placeholder implementation
  // In a real application, this would use an AI model to analyze symptoms and generate a structured summary
  const summary = new Map();
  
  summary.set('primarySymptom', symptoms[0]?.answer || 'Unknown');
  summary.set('duration', symptoms[1]?.answer || 'Unknown');
  summary.set('severity', 'Moderate'); // Placeholder severity
  summary.set('recommendedAction', 'Medical evaluation needed');
  
  const symptomList = symptoms.map(s => `${s.question}: ${s.answer}`).join('; ');
  summary.set('fullSymptomHistory', symptomList);

  return summary;
}

module.exports = router; 