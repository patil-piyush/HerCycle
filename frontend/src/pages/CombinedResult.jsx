import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaArrowRight, FaImage, FaClipboardList, FaStar } from 'react-icons/fa';

const CombinedResult = () => {
  return (
    <div className="container page-spacing" style={{ maxWidth: '1100px' }}>
      <div className="text-center mb-10">
        <span className="badge">Analysis Complete</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Your Complete <span style={{ color: '#D6689C' }}>Results</span></h1>
      </div>

      {/* Score Grid */}
      <div className="result-grid-3">
        <div className="card" style={{ textAlign: 'center' }}>
          <FaImage size={30} style={{ color: '#D6689C', marginBottom: '15px' }} />
          <h4 style={{ color: '#718096' }}>Image Score</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D6689C' }}>72%</div>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <FaClipboardList size={30} style={{ color: '#9F7AEA', marginBottom: '15px' }} />
          <h4 style={{ color: '#718096' }}>Symptom Score</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#9F7AEA' }}>65%</div>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #D6689C 0%, #B370B0 100%)', color: 'white' }}>
          <FaStar size={30} style={{ marginBottom: '15px', opacity: 0.8 }} />
          <h4 style={{ color: 'rgba(255,255,255,0.8)' }}>Final Probability</h4>
          <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>78%</div>
          <span style={{ background: 'white', color: '#D6689C', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Moderate-High Risk</span>
        </div>
      </div>

      {/* Details Card */}
      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Understanding Your Results</h3>
        <p style={{ color: '#4A5568', marginBottom: '10px' }}>
          Your combined analysis shows a <strong>Moderate-High</strong> probability of PCOS based on both your ultrasound image and reported symptoms.
        </p>
        <p style={{ color: '#718096', fontSize: '0.9rem' }}>
          Confidence Level: <strong>92%</strong> (High)
        </p>
      </div>

      {/* Recommendations */}
      <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Personalized Recommendations</h3>
      <div className="result-grid-3" style={{ marginTop: '10px' }}>
        <div className="card">
          <h4>Dietary Changes</h4>
          <ul style={{ marginTop: '15px', color: '#4A5568', lineHeight: '1.8' }}>
            <li>• Lower refined carbohydrate intake</li>
            <li>• Increase fiber-rich foods</li>
            <li>• Focus on anti-inflammatory diet</li>
          </ul>
        </div>
        <div className="card">
          <h4>Exercise Plan</h4>
          <ul style={{ marginTop: '15px', color: '#4A5568', lineHeight: '1.8' }}>
            <li>• 150 mins moderate activity/week</li>
            <li>• Strength training 2 days/week</li>
            <li>• Yoga for stress reduction</li>
          </ul>
        </div>
        <div className="card">
          <h4>Medical Advice</h4>
          <ul style={{ marginTop: '15px', color: '#4A5568', lineHeight: '1.8' }}>
            <li>• Consult a gynecologist</li>
            <li>• Check insulin levels</li>
            <li>• Monitor menstrual cycle</li>
          </ul>
        </div>
      </div>

      {/* Footer Buttons (Updated Spacing) */}
      <div className="action-buttons-container">
        <button className="btn btn-primary" onClick={() => alert("Downloading PDF...")}>
          <FaDownload /> Download PDF Report
        </button>
        <Link to="/diet" className="btn btn-outline">
          View Full Diet & Exercise Guide <FaArrowRight />
        </Link>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#A0AEC0', marginTop: '30px' }}>
         Important: This AI screening tool is for educational purposes only and should not replace professional medical advice.
      </p>
    </div>
  );
};

export default CombinedResult;