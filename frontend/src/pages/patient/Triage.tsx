import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Question {
  text: string;
  options: string[];
}

interface TriageResponse {
  question: Question | null;
  isComplete: boolean;
  summary?: Map<string, string>;
}

const PatientTriage: React.FC = () => {
  const { queueId } = useParams<{ queueId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [triageComplete, setTriageComplete] = useState(false);
  const [summary, setSummary] = useState<Map<string, string> | null>(null);

  useEffect(() => {
    startTriage();
  }, [queueId]);

  const startTriage = async () => {
    try {
      const response = await axios.post<TriageResponse>(
        `${process.env.REACT_APP_API_URL}/api/triage/start/${queueId}`
      );
      setCurrentQuestion(response.data.question);
    } catch (error) {
      setError('Failed to start triage');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    try {
      setLoading(true);
      const response = await axios.post<TriageResponse>(
        `${process.env.REACT_APP_API_URL}/api/triage/respond/${queueId}`,
        {
          question: currentQuestion?.text,
          answer
        }
      );

      if (response.data.isComplete) {
        setTriageComplete(true);
        setSummary(response.data.summary);
      } else {
        setCurrentQuestion(response.data.question);
      }
    } catch (error) {
      setError('Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (triageComplete) {
    return (
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Triage Complete
            </h3>
            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                {summary && Array.from(summary.entries()).map(([key, value]) => (
                  <div key={key} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/patient')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          {currentQuestion && (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {currentQuestion.text}
              </h3>
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientTriage; 