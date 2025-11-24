import { useState } from 'react';
import { QuizQuestion } from './components/QuizQuestion';
import { FeedbackCard } from './components/FeedbackCard';
import { CompletionScreen } from './components/CompletionScreen';
import { constructionTypes } from './data/constructionTypes';

export default function App() {
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion([]));
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  function generateQuestion(asked: string[]) {
    const types = Object.keys(constructionTypes);
    const remaining = types.filter(type => !asked.includes(type));
    
    if (remaining.length === 0) return null;
    
    const correctType = remaining[Math.floor(Math.random() * remaining.length)];
    return {
      description: constructionTypes[correctType].description,
      correctAnswer: correctType,
      options: types
    };
  }

  function handleAnswer(answer: string) {
    const correct = answer === currentQuestion!.correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    setTotalAnswered(prev => prev + 1);
    setAskedQuestions(prev => [...prev, currentQuestion!.correctAnswer]);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  }

  function handleNext() {
    setShowFeedback(false);
    setSelectedAnswer(null);
    const nextQuestion = generateQuestion(askedQuestions);
    setCurrentQuestion(nextQuestion);
  }

  function handleReset() {
    setScore(0);
    setTotalAnswered(0);
    setAskedQuestions([]);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setCurrentQuestion(generateQuestion([]));
  }

  // Show completion screen after all 5 questions
  if (totalAnswered === 5 && !showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <CompletionScreen
            score={score}
            total={5}
            onReset={handleReset}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {!showFeedback ? (
          <QuizQuestion
            question={currentQuestion!}
            score={score}
            totalAnswered={totalAnswered}
            onAnswer={handleAnswer}
            onReset={handleReset}
          />
        ) : (
          <FeedbackCard
            isCorrect={isCorrect}
            selectedAnswer={selectedAnswer!}
            correctAnswer={currentQuestion!.correctAnswer}
            score={score}
            totalAnswered={totalAnswered}
            onNext={handleNext}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}