import { motion } from 'motion/react';
import { Flame, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { constructionTypes } from '../data/constructionTypes';

interface QuizQuestionProps {
  question: {
    description: string;
    correctAnswer: string;
    options: string[];
  };
  score: number;
  totalAnswered: number;
  onAnswer: (answer: string) => void;
  onReset: () => void;
}

export function QuizQuestion({ question, score, totalAnswered, onAnswer, onReset }: QuizQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
            <p className="text-slate-400 text-sm">Question {totalAnswered + 1} of 5</p>
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
            onClick={onReset}
            variant="outline"
            size="icon"
            className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-2 text-[rgb(255,201,199)] uppercase tracking-wider text-sm">
          Question
        </div>
        <h2 className="text-white mb-4 text-2xl">
          Identify the building construction type:
        </h2>
        <p className="text-slate-300 text-xl leading-relaxed">
          {question.description}
        </p>
      </motion.div>

      {/* Answer Options */}
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onAnswer(option)}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-left hover:bg-slate-700/50 hover:border-[#c74542]/50 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-700 group-hover:bg-[#802f2d]/20 flex items-center justify-center transition-colors duration-300">
                <span className="text-slate-400 group-hover:text-[#d95550] text-xl">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-white group-hover:text-[#d95550] transition-colors duration-300 text-xl">
                  {constructionTypes[option].label}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}