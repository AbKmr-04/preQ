import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import Button from '../../../components/common/Button';

// Mock questionnaire data
const questions = [
  {
    id: '1',
    text: "What's the main reason for your visit today?",
    type: 'text',
    options: []
  },
  {
    id: '2',
    text: "How long have you been experiencing these symptoms?",
    type: 'radio',
    options: [
      'Less than a day',
      '1-3 days',
      '4-7 days',
      '1-2 weeks',
      'More than 2 weeks'
    ]
  },
  {
    id: '3',
    text: "Rate your pain level (if applicable)",
    type: 'slider',
    min: 0,
    max: 10,
    options: []
  },
  {
    id: '4',
    text: "Select any additional symptoms you're experiencing",
    type: 'checkbox',
    options: [
      'Fever',
      'Chills',
      'Fatigue',
      'Headache',
      'Cough',
      'Shortness of breath',
      'Nausea',
      'None of the above'
    ]
  },
  {
    id: '5',
    text: "Any recent changes in your medication?",
    type: 'radio',
    options: [
      'Yes',
      'No'
    ]
  },
  {
    id: '6',
    text: "Is there anything else you'd like to tell the doctor?",
    type: 'textarea',
    options: []
  }
];

const PatientQuestionnaire: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuestionnaire();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleTextAnswer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value
    });
  };
  
  const handleRadioAnswer = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option
    });
  };
  
  const handleSliderAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value
    });
  };
  
  const handleCheckboxAnswer = (option: string) => {
    const currentAnswer = answers[currentQuestion.id] || [];
    const newAnswer = currentAnswer.includes(option)
      ? currentAnswer.filter((item: string) => item !== option)
      : [...currentAnswer, option];
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: newAnswer
    });
  };
  
  const submitQuestionnaire = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      
      // Simulate queue joining - in a real app, this would add the patient to the queue
      setTimeout(() => {
        navigate('/dashboard/patient');
      }, 3000);
    }, 2000);
  };
  
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            className="input-field w-full"
            value={answers[currentQuestion.id] || ''}
            onChange={handleTextAnswer}
            placeholder="Type your answer..."
          />
        );
      
      case 'textarea':
        return (
          <textarea
            className="input-field w-full min-h-32"
            value={answers[currentQuestion.id] || ''}
            onChange={handleTextAnswer}
            placeholder="Type your answer..."
          ></textarea>
        );
      
      case 'radio':
        return (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label 
                key={option} 
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion.id] === option 
                    ? 'bg-primary-50 border-primary-400' 
                    : 'border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                    checked={answers[currentQuestion.id] === option}
                    onChange={() => handleRadioAnswer(option)}
                  />
                  <span className="ml-3">{option}</span>
                </div>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label 
                key={option} 
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion.id]?.includes(option) 
                    ? 'bg-primary-50 border-primary-400' 
                    : 'border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={answers[currentQuestion.id]?.includes(option) || false}
                    onChange={() => handleCheckboxAnswer(option)}
                  />
                  <span className="ml-3">{option}</span>
                </div>
              </label>
            ))}
          </div>
        );
      
      case 'slider':
        const value = answers[currentQuestion.id] || 0;
        return (
          <div>
            <div className="flex justify-between mb-2">
              <span>No Pain</span>
              <span>Severe Pain</span>
            </div>
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              value={value}
              onChange={handleSliderAnswer}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-2xl font-bold text-primary-600">
              {value}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Pre-Appointment Questionnaire</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {!isCompleted ? (
          <div className="p-6">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% completed</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2.5">
                <div 
                  className="bg-primary-400 h-2.5 rounded-full transition-all" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">{currentQuestion.text}</h2>
              {renderQuestion()}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handleNext}
                disabled={
                  isSubmitting || 
                  (currentQuestion.type !== 'checkbox' && !answers[currentQuestion.id])
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="bg-primary-100 p-4 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-primary-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Questionnaire Completed!</h2>
            <p className="text-neutral-600 text-center max-w-md mb-8">
              Thank you for completing the questionnaire. You have been added to the queue.
            </p>
            <div className="bg-primary-50 border border-primary-200 p-4 rounded-lg mb-6 flex items-center">
              <Clock className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
              <p className="text-primary-700">
                You'll be automatically redirected to your queue status...
              </p>
            </div>
          </div>
        )}
      </div>
      
      {!isCompleted && (
        <div className="mt-8 bg-neutral-50 p-4 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-neutral-700 font-medium">Important Note</p>
            <p className="text-neutral-600 text-sm">
              Your answers help the doctor prepare for your appointment. This is not a diagnostic tool
              and does not replace medical advice. For urgent health concerns, please seek immediate medical attention.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientQuestionnaire;