import React, { useState } from 'react';
import { FaAppleAlt, FaDumbbell, FaMoon, FaLeaf, FaBan, FaQuestion, FaChevronDown } from 'react-icons/fa';

const DietExercise = () => {
  // State for FAQ Accordion
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Can diet alone cure PCOS?",
      answer: "While diet cannot 'cure' PCOS, a balanced, anti-inflammatory diet can significantly manage symptoms, improve insulin sensitivity, and help regulate menstrual cycles."
    },
    {
      question: "How quickly will I see results from exercise?",
      answer: "Most women notice improvements in energy and mood within 2-3 weeks. Changes in weight and menstrual regularity typically take 3-6 months of consistent lifestyle changes."
    },
    {
      question: "Should I follow a specific diet like keto or paleo?",
      answer: "There's no one-size-fits-all diet for PCOS. While some women benefit from low-carb approaches like keto, others do well with Mediterranean or anti-inflammatory diets. The key is finding a sustainable eating pattern that keeps blood sugar stable and includes plenty of whole foods."
    },
    {
      question: "Is cardio or strength training better for PCOS?",
      answer: "A combination is best. Strength training improves insulin sensitivity and metabolism, while moderate cardio supports heart health. High-intensity cardio should be balanced to avoid spiking cortisol levels."
    },
    {
      question: "What supplements should I consider?",
      answer: "Common supplements for PCOS include Inositol (for insulin sensitivity), Vitamin D, Omega-3s, and Magnesium. Always consult your healthcare provider before starting any new supplement regimen."
    }
  ];

  return (
    <div className="container page-spacing">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="badge">Lifestyle Guide</span>
        <h1 style={{ fontSize: '3rem', margin: '15px 0' }}>Diet & <span style={{ color: '#D6689C' }}>Exercise</span></h1>
        <p style={{ color: '#718096' }}>Evidence-based nutrition and fitness recommendations tailored for PCOS management</p>
      </div>

      {/* ==========================
          1. NUTRITION SECTION 
         ========================== */}
      <div className="diet-section-header">
        <div className="icon-header-lg">
          <FaAppleAlt />
        </div>
        <h2 style={{ fontSize: '2rem' }}>Nutrition <span style={{ color: '#D6689C' }}>Guidelines</span></h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        
        {/* Foods to Embrace */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            <FaLeaf style={{ color: '#48BB78' }} /> Foods to Embrace
          </h3>
          
          <div className="diet-list-item dot-green">
            <span className="diet-list-title">Leafy Greens</span>
            <span className="diet-list-desc">Spinach, kale, and broccoli help reduce inflammation</span>
          </div>
          <div className="diet-list-item dot-green">
            <span className="diet-list-title">Lean Proteins</span>
            <span className="diet-list-desc">Fish, chicken, and legumes for stable blood sugar</span>
          </div>
          <div className="diet-list-item dot-green">
            <span className="diet-list-title">Whole Grains</span>
            <span className="diet-list-desc">Quinoa, oats, and brown rice for sustained energy</span>
          </div>
          <div className="diet-list-item dot-green">
            <span className="diet-list-title">Healthy Fats</span>
            <span className="diet-list-desc">Avocados, nuts, and olive oil support hormone balance</span>
          </div>
          <div className="diet-list-item dot-green">
            <span className="diet-list-title">Berries</span>
            <span className="diet-list-desc">Antioxidant-rich fruits that combat oxidative stress</span>
          </div>
        </div>

        {/* Foods to Limit */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            <FaBan style={{ color: '#F56565' }} /> Foods to Limit
          </h3>

          <div className="diet-list-item dot-red">
            <span className="diet-list-title">Refined Carbs</span>
            <span className="diet-list-desc">White bread, pastries, and sugary snacks</span>
          </div>
          <div className="diet-list-item dot-red">
            <span className="diet-list-title">Sugary Drinks</span>
            <span className="diet-list-desc">Sodas, fruit juices, and sweetened beverages</span>
          </div>
          <div className="diet-list-item dot-red">
            <span className="diet-list-title">Processed Foods</span>
            <span className="diet-list-desc">Fast food, packaged snacks, and ready meals</span>
          </div>
          <div className="diet-list-item dot-red">
            <span className="diet-list-title">Excessive Dairy</span>
            <span className="diet-list-desc">May worsen hormonal imbalances in some</span>
          </div>
          <div className="diet-list-item dot-red">
             <span className="diet-list-title">Alcohol</span>
             <span className="diet-list-desc">Can affect hormone levels and liver function</span>
          </div>
        </div>
      </div>

      {/* ==========================
          2. EXERCISE SECTION 
         ========================== */}
      <div className="diet-section-header" style={{ marginTop: '80px' }}>
        <div className="icon-header-lg">
          <FaDumbbell />
        </div>
        <h2 style={{ fontSize: '2rem' }}>Exercise <span style={{ color: '#D6689C' }}>Recommendations</span></h2>
        <p style={{ color: '#718096', marginTop: '10px' }}>Tailored exercise routines based on your risk level</p>
      </div>

      <div className="result-grid-3" style={{ marginTop: '30px' }}>
        
        {/* Low Risk */}
        <div className="card">
          <span className="risk-tag tag-low">Low Risk</span>
          
          <div className="exercise-box">
            <span className="exercise-name">Brisk Walking</span>
            <span className="exercise-detail">30 min • Daily</span>
          </div>
          <div className="exercise-box">
            <span className="exercise-name">Yoga</span>
            <span className="exercise-detail">45 min • 3x/week</span>
          </div>
          <div className="exercise-box">
            <span className="exercise-name">Swimming</span>
            <span className="exercise-detail">30 min • 2x/week</span>
          </div>
        </div>

        {/* Moderate Risk */}
        <div className="card">
          <span className="risk-tag tag-mod">Moderate Risk</span>
          
          <div className="exercise-box">
            <span className="exercise-name">HIIT Training</span>
            <span className="exercise-detail">20 min • 3x/week</span>
          </div>
          <div className="exercise-box">
            <span className="exercise-name">Strength Training</span>
            <span className="exercise-detail">45 min • 3x/week</span>
          </div>
          <div className="exercise-box">
            <span className="exercise-name">Cycling</span>
            <span className="exercise-detail">30 min • 4x/week</span>
          </div>
        </div>

        {/* High Risk */}
        <div className="card">
          <span className="risk-tag tag-high">High Risk</span>
          
          <div className="exercise-box">
            <span className="exercise-name">Gentle Walking</span>
            <span className="exercise-detail">20 min • Daily</span>
          </div>
          <div className="exercise-box">
            <span className="exercise-name">Restorative Yoga</span>
            <span className="exercise-detail">30 min • 4x/week</span>
          </div>
          <div className="exercise-box">
            <span className="exercise-name">Light Stretching</span>
            <span className="exercise-detail">15 min • Daily</span>
          </div>
        </div>
      </div>

      {/* ==========================
          3. SLEEP SECTION 
         ========================== */}
      <div className="card" style={{ marginTop: '60px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', fontSize: '1.5rem' }}>
          <div style={{ width: '40px', height: '40px', background: '#F3E8FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9F7AEA' }}>
            <FaMoon />
          </div>
          Sleep & Stress Management
        </h3>

        <div className="grid md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Quality Sleep Tips</h4>
            <ul className="diet-list-item" style={{ listStyle: 'none', padding: 0 }}>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Aim for 7-9 hours of sleep per night</li>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Maintain consistent sleep and wake times</li>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Create a dark, cool sleeping environment</li>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Limit screen time 1 hour before bed</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Stress Reduction</h4>
            <ul className="diet-list-item" style={{ listStyle: 'none', padding: 0 }}>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Practice meditation or deep breathing daily</li>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Try journaling to process emotions</li>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Connect with supportive friends and family</li>
              <li className="diet-list-desc" style={{ marginBottom: '10px' }}>• Consider professional counseling if needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ==========================
          4. FAQ SECTION (Moved Here) 
         ========================== */}
      <div style={{ marginTop: '80px', marginBottom: '40px' }}>
        <div className="diet-section-header">
          <div className="icon-header-lg">
            <FaQuestion />
          </div>
          <h2 style={{ fontSize: '2.5rem' }}>Frequently Asked <span style={{ color: '#D6689C' }}>Questions</span></h2>
        </div>

        <div style={{ maxWidth: '900px', margin: '40px auto 0 auto' }}>
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'faq-open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-header">
                <span>{item.question}</span>
                <FaChevronDown className="faq-icon" size={14} />
              </div>
              
              {activeIndex === index && (
                <div className="faq-body">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DietExercise;