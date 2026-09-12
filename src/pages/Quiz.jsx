import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { lessonsData } from '../data/lessons';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import './Quiz.css';

const Quiz = () => {
  const { language, updateProgress } = useContext(AppContext);
  const navigate = useNavigate();
  const [currentLesson] = useState(lessonsData[0]); // Defaulting to first lesson
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = currentLesson.quizQuestions;

  const handleAnswer = (optionIdx) => {
    setSelectedOption(optionIdx);
    
    setTimeout(() => {
      if (optionIdx === questions[currentQIdx].correct) {
        setScore(score + 1);
      }

      if (currentQIdx + 1 < questions.length) {
        setCurrentQIdx(currentQIdx + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        // Calculate percentage
        const finalScore = Math.round(((score + (optionIdx === questions[currentQIdx].correct ? 1 : 0)) / questions.length) * 100);
        updateProgress('quizScores', finalScore);
        if (finalScore === 100) {
          updateProgress('badges', 'Bharathi Scholar');
        }
      }
    }, 1000);
  };

  return (
    <div className="quiz-page container">
      <div className="glass-card quiz-card">
        {showResult ? (
          <div className="quiz-result text-center">
            <Award size={80} color="var(--color-gold)" className="mx-auto mb-4" />
            <h2 className="gradient-text mb-4">
              {language === 'en' ? 'Quiz Completed!' : 'வினாடி வினா நிறைவடைந்தது!'}
            </h2>
            <div className="score-display">
              <span className="score-number">{Math.round((score / questions.length) * 100)}%</span>
            </div>
            <p className="mb-4">
              {language === 'en' 
                ? `You got ${score} out of ${questions.length} correct.`
                : `நீங்கள் ${questions.length} இல் ${score} சரியாக பதிலளித்துள்ளீர்கள்.`}
            </p>
            <div className="quiz-actions flex justify-center gap-4 mt-4">
              <button className="secondary-btn" onClick={() => navigate('/classroom')}>
                {language === 'en' ? 'Retry' : 'மீண்டும் முயற்சி செய்'}
              </button>
              <button className="primary-btn" onClick={() => navigate('/progress')}>
                {language === 'en' ? 'View Progress' : 'முன்னேற்றத்தைக் காண்க'}
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-active">
            <div className="quiz-header">
              <span className="question-count">
                {language === 'en' ? `Question ${currentQIdx + 1} of ${questions.length}` : `கேள்வி ${currentQIdx + 1} / ${questions.length}`}
              </span>
              <div className="progress-bar-bg mt-2">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${((currentQIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="question-text my-4 text-xl">
              {questions[currentQIdx].question}
            </h3>

            <div className="options-list">
              {questions[currentQIdx].options.map((opt, idx) => {
                let btnClass = "option-btn";
                if (selectedOption !== null) {
                  if (idx === questions[currentQIdx].correct) {
                    btnClass += " correct";
                  } else if (idx === selectedOption) {
                    btnClass += " wrong";
                  }
                }
                
                return (
                  <button 
                    key={idx} 
                    className={btnClass}
                    onClick={() => selectedOption === null && handleAnswer(idx)}
                    disabled={selectedOption !== null}
                  >
                    {opt}
                    {selectedOption !== null && idx === questions[currentQIdx].correct && <CheckCircle className="icon-right" size={20} />}
                    {selectedOption === idx && idx !== questions[currentQIdx].correct && <XCircle className="icon-wrong" size={20} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
