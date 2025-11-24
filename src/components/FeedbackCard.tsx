import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { constructionTypes } from '../data/constructionTypes';
import { soundEffects } from '../utils/soundEffects';
import { useEffect } from 'react';

interface FeedbackCardProps {
  isCorrect: boolean;
  selectedAnswer: string;
  correctAnswer: string;
  score: number;
  totalAnswered: number;
  onNext: () => void;
  onReset: () => void;
}

export function FeedbackCard({ 
  isCorrect, 
  selectedAnswer, 
  correctAnswer, 
  score, 
  totalAnswered, 
  onNext, 
  onReset 
}: FeedbackCardProps) {
  const feedbackText = isCorrect 
    ? constructionTypes[correctAnswer].correctFeedback
    : constructionTypes[correctAnswer].incorrectFeedback;

  // Play sound when feedback is shown
  useEffect(() => {
    if (isCorrect) {
      soundEffects.correct();
    } else {
      soundEffects.incorrect();
    }
    
    // Send message to parent window when final question feedback is shown
    if (totalAnswered === 5) {
      window.parent.postMessage({ type: 'complete' }, '*');
    }
  }, [isCorrect, totalAnswered]);

  const handleNext = () => {
    soundEffects.next();
    onNext();
  };

  const handleReset = () => {
    soundEffects.reset();
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with Score */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#c74542] p-3 rounded-xl">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">Building Construction Quiz</h1>
            <p className="text-slate-400 text-sm">Question {totalAnswered} of 5</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-white">
              <span className="text-3xl">{score}</span>
              <span className="text-slate-400">/{totalAnswered}</span>
            </div>
            <p className="text-slate-400 text-sm">Score</p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Feedback Card */}
      <motion.div
        className={`rounded-2xl p-8 mb-6 border-2 ${
          isCorrect 
            ? 'bg-emerald-500/10 border-emerald-500/50' 
            : 'bg-red-500/10 border-red-500/50'
        }`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="flex items-start gap-4 mb-6">
          {isCorrect ? (
            <CheckCircle2 className="w-12 h-12 text-emerald-400 flex-shrink-0" />
          ) : (
            <XCircle className="w-12 h-12 text-red-400 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h2 className={`mb-2 text-2xl ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h2>
            {!isCorrect && (
              <div className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-base mb-1">You selected:</p>
                <p className="text-white text-lg">{constructionTypes[selectedAnswer].label}</p>
                <p className="text-slate-400 text-base mt-3 mb-1">Correct answer:</p>
                <p className="text-emerald-400 text-lg">{constructionTypes[correctAnswer].label}</p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Feedback */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="text-[rgb(255,201,199)] uppercase tracking-wider text-base mb-3">
            Learning Point
          </div>
          <div className="text-slate-300 leading-relaxed whitespace-pre-line text-lg">
            {feedbackText}
          </div>
        </div>
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={handleNext}
          className="w-full bg-[#c74542] hover:bg-[#d95550] text-white h-14 rounded-xl group text-lg"
          size="lg"
        >
          <span>{totalAnswered === 5 ? 'View Results' : 'Next Question'}</span>
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
}