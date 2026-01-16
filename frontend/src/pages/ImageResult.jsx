import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaArrowRight, FaEye } from 'react-icons/fa';

const ImageResult = () => {
  return (
    <div className="container page-spacing" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-10">
        <span className="badge">Analysis Complete</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Image <span style={{ color: '#D6689C' }}>Results</span></h1>
      </div>

      {/* Main Result Card */}
      <div className="card mb-8">
        <div className="flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          
          {/* Circle Graph */}
          <div style={{ flex: 1, minWidth: '250px', textAlign: 'center' }}>
            <h4 style={{ color: '#718096', marginBottom: '20px' }}>PCOS Probability</h4>
            <div className="circle-progress-wrap" style={{ '--percentage': 72 }}>
              <div className="circle-inner">
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D6689C' }}>72%</span>
                <span style={{ fontSize: '0.8rem', color: '#718096' }}>Probability</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#FFF5F5', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>⚠️ Risk Level</h4>
              <span className="risk-badge risk-moderate">Moderate Risk</span>
            </div>
            
            <div style={{ background: '#F7FAFC', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ marginBottom: '10px' }}>AI Confidence</h4>
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px' }}>
                <div style={{ width: '89%', height: '100%', background: '#D6689C', borderRadius: '4px' }}></div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '5px' }}>89% confident in follicle analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Card */}
      <div className="card mb-8">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaEye style={{ color: '#D6689C' }} /> AI Attention Heatmap
        </h4>
        <div className="heatmap-box">
          Heatmap visualization showing areas the AI focused on
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#718096', marginTop: '10px' }}>
          Red areas indicate regions with characteristics commonly associated with PCOS
        </p>
      </div>

      {/* Action Buttons (Updated Spacing) */}
      <div className="action-buttons-container">
        <Link to="/check/combined" className="btn btn-primary">
          + Combine with Symptoms
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

export default ImageResult;