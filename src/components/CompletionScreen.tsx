import { motion } from 'motion/react';
import { Trophy, RotateCcw, Flame, Award, Target } from 'lucide-react';
import { Button } from './ui/button';
import { soundEffects } from '../utils/soundEffects';
import { useEffect } from 'react';

interface CompletionScreenProps {
  score: number;
  total: number;
  onReset: () => void;
}

export function CompletionScreen({ score, total, onReset }: CompletionScreenProps) {
  const percentage = (score / total) * 100;
  
  // Play completion sound when screen loads
  useEffect(() => {
    soundEffects.complete();
    
    // Send message to parent window when results screen appears
    console.log('Quiz completed! Sending postMessage to parent window...');
    window.parent.postMessage({ type: 'complete' }, '*');
    console.log('PostMessage sent: { type: "complete" }');
  }, []);
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return { title: 'Perfect Score!', message: 'Outstanding knowledge of building construction types.', color: 'text-emerald-400' };
    if (percentage >= 80) return { title: 'Excellent Work!', message: 'You have a strong understanding of fire-resistive construction.', color: 'text-emerald-400' };
    if (percentage >= 60) return { title: 'Good Job!', message: 'Solid foundation, but review the concepts you missed.', color: 'text-blue-400' };
    return { title: 'Keep Studying!', message: 'Review the construction types and try again.', color: 'text-orange-400' };
  };

  const performance = getPerformanceMessage();

  const handleReset = () => {
    soundEffects.reset();
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#c74542] p-3 rounded-xl">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">Building Construction Quiz</h1>
            <p className="text-slate-400 text-sm">Assessment Complete</p>
          </div>
        </div>
      </div>

      {/* Main Results Card */}
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-[#802f2d]/20 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3, duration: 0.6 }}
          >
            <Trophy className="w-12 h-12 text-[#d95550]" />
          </motion.div>
          <h2 className={`mb-3 ${performance.color} text-3xl`}>
            {performance.title}
          </h2>
          <p className="text-slate-300 text-xl">
            {performance.message}
          </p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            className="bg-slate-900/50 rounded-xl p-6 text-center border border-slate-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Target className="w-6 h-6 text-[#d95550] mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{score}</div>
            <p className="text-slate-400 text-base">Correct</p>
          </motion.div>
          
          <motion.div
            className="bg-slate-900/50 rounded-xl p-6 text-center border border-slate-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Award className="w-6 h-6 text-[#d95550] mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{percentage}%</div>
            <p className="text-slate-400 text-base">Score</p>
          </motion.div>
          
          <motion.div
            className="bg-slate-900/50 rounded-xl p-6 text-center border border-slate-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Flame className="w-6 h-6 text-[#d95550] mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{total}</div>
            <p className="text-slate-400 text-base">Total</p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-base mb-2">
            <span className="text-slate-400">Questions Correct</span>
            <span className="text-slate-300">{score}/{total} questions</span>
          </div>
          <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className="h-full bg-gradient-to-r from-[#802f2d] to-[#c74542]"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Try Again Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={handleReset}
          className="w-full bg-[#c74542] hover:bg-[#d95550] text-white h-14 rounded-xl group text-lg"
          size="lg"
        >
          <RotateCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Try Again</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}