import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const questions = [
  {
    id: 1,
    question: "How regular are your menstrual cycles?",
    options: ["Very regular (28-30 days)", "Somewhat irregular (varies by a few days)", "Very irregular (skip months)", "No periods at all"]
  },
  {
    id: 2,
    question: "Have you experienced significant weight gain recently without diet changes?",
    options: ["No weight change", "Slight weight gain", "Moderate weight gain", "Significant rapid weight gain"]
  },
  {
    id: 3,
    question: "Do you have excess hair growth on face, chest, or back?",
    options: ["No excess hair growth", "Slight increase in hair", "Noticeable dark/coarse hair", "Significant unwanted hair growth"]
  },
  {
    id: 4,
    question: "How would you describe your skin condition?",
    options: ["Clear skin", "Occasional breakouts", "Persistent acne", "Severe cystic acne or very oily skin"]
  },
  {
    id: 5,
    question: "Have you noticed thinning hair on your scalp?",
    options: ["No hair loss", "Slight shedding", "Noticeable thinning at part line", "Significant hair loss"]
  },
  {
    id: 6,
    question: "Do you notice darkening of skin around neck or armpits?",
    options: ["No darkening", "Very slight darkening", "Noticeable dark patches", "Significant dark velvety patches"]
  }
];

const SymptomTest = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentQ]: option });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      navigate('/result/symptom');
    }
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="container page-spacing" style={{ maxWidth: '800px' }}>
      
      {/* Header & Progress */}
      <div className="text-center mb-8">
        <span className="badge">Question {currentQ + 1} of {questions.length}</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Symptom <span style={{ color: '#D6689C' }}>Assessment</span></h1>
        
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', color: '#2D3748' }}>
          {questions[currentQ].question}
        </h3>

        <div className="options-list">
          {questions[currentQ].options.map((option, index) => (
            <div 
              key={index} 
              className={`option-card ${answers[currentQ] === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              <div style={{ 
                width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #CBD5E0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: answers[currentQ] === option ? '#D6689C' : 'transparent',
                borderColor: answers[currentQ] === option ? '#D6689C' : '#CBD5E0'
              }}>
                <FaCheck size={12} />
              </div>
              <span style={{ fontSize: '1rem', color: '#4A5568' }}>{option}</span>
            </div>
          ))}
        </div>

        {/* Buttons with Proper Distance */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            style={{ opacity: currentQ === 0 ? 0.5 : 1 }}
          >
            <FaArrowLeft /> Back
          </button>

          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            disabled={!answers[currentQ]}
            style={{ opacity: !answers[currentQ] ? 0.5 : 1 }}
          >
            {currentQ === questions.length - 1 ? 'Finish Assessment' : 'Next'} <FaArrowRight />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SymptomTest;