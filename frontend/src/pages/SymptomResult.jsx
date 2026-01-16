import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

const SymptomResult = () => {
  return (
    <div className="container page-spacing" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-10">
        <span className="badge">Analysis Complete</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Symptom <span style={{ color: '#D6689C' }}>Results</span></h1>
      </div>

      {/* Main Result Area */}
      <div className="card mb-8">
        <div className="flex" style={{ gap: '40px', flexWrap: 'wrap' }}>
          
          {/* Circle Graph */}
          <div style={{ flex: 1, minWidth: '250px', textAlign: 'center', borderRight: '1px solid #eee' }}>
            <h4 style={{ color: '#718096', marginBottom: '20px' }}>PCOS Probability Based on Symptoms</h4>
            <div className="circle-progress-wrap" style={{ '--percentage': 65 }}>
              <div className="circle-inner">
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D6689C' }}>65%</span>
                <span style={{ fontSize: '0.8rem', color: '#718096' }}>Probability</span>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <span className="risk-badge risk-moderate">Moderate Risk</span>
            </div>
          </div>

          {/* Symptom Bars */}
          <div style={{ flex: 2 }}>
            <h4 style={{ marginBottom: '20px' }}>Symptom Impact Analysis</h4>
            <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { label: "Irregular Periods", val: 85 },
                { label: "Weight Gain", val: 70 },
                { label: "Excess Hair Growth", val: 55 },
                { label: "Acne", val: 45 },
                { label: "Insulin Resistance", val: 60 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span style={{ fontWeight: 'bold' }}>{item.val}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F7FAFC', borderRadius: '4px' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: '#D6689C', borderRadius: '4px', opacity: 0.8 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Explanation Text */}
      <div className="card mb-8">
        <h3 style={{ marginBottom: '10px' }}>Understanding Your Results</h3>
        <p style={{ color: '#4A5568', fontSize: '0.95rem', marginBottom: '10px' }}>
          Based on your symptom responses, our AI model has identified patterns that are commonly associated with PCOS.
          The feature importance chart shows which symptoms contributed most significantly to this assessment.
        </p>
        <p style={{ color: '#718096', fontSize: '0.85rem' }}>
          <strong>Remember:</strong> This is a screening tool, not a diagnosis. We strongly recommend consulting with a healthcare provider.
        </p>
      </div>

       {/* Action Buttons (Updated Spacing) */}
       <div className="action-buttons-container">
        <Link to="/check/combined" className="btn btn-primary">
          + Combine with Image Test
        </Link>
        <button className="btn btn-outline" onClick={() => alert("Report Downloading...")}>
          <FaDownload /> Download Report
        </button>
        <Link to="/diet" className="btn btn-white border" style={{ border: '2px solid #E2E8F0' }}>
          View Recommendations <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default SymptomResult;