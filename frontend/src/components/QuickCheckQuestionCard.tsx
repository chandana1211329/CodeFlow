import React, { useMemo } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

export interface QuizQuestionData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuickCheckQuestionCardProps {
  questionData: QuizQuestionData;
  questionIndex: number;
  lessonId: string;
  selectedOptionIndex: number | undefined;
  onSelectOption: (originalOptionIndex: number) => void;
}

interface ShuffledOption {
  text: string;
  originalIndex: number;
  isCorrect: boolean;
}

export const QuickCheckQuestionCard: React.FC<QuickCheckQuestionCardProps> = ({
  questionData,
  questionIndex,
  lessonId,
  selectedOptionIndex,
  onSelectOption
}) => {
  // Stably shuffle options using a deterministic seed based on lessonId and question text
  const shuffledOptions = useMemo(() => {
    const items: ShuffledOption[] = questionData.options.map((optText, idx) => ({
      text: optText,
      originalIndex: idx,
      isCorrect: idx === questionData.correctAnswer
    }));

    // Generate seed from lessonId + question + options
    const seedStr = `${lessonId}:${questionData.question}:${questionData.options.join('|')}`;
    let seed = 5381;
    for (let i = 0; i < seedStr.length; i++) {
      seed = (seed * 33) ^ seedStr.charCodeAt(i);
    }
    seed = seed >>> 0;

    // Mulberry32 PRNG generator
    const rand = () => {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Fisher-Yates shuffle
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }, [questionData.question, questionData.options, questionData.correctAnswer, lessonId]);

  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
      <p className="text-base font-semibold text-gray-100 flex items-start gap-2">
        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs font-mono font-bold shrink-0 mt-0.5">
          Q{questionIndex + 1}
        </span>
        <span>{questionData.question}</span>
      </p>

      <div className="grid grid-cols-1 gap-2.5">
        {shuffledOptions.map((opt, displayIdx) => {
          const isSelected = selectedOptionIndex === opt.originalIndex;
          const letter = String.fromCharCode(65 + displayIdx); // A, B, C, D

          let style = 'bg-black/30 border-white/10 hover:bg-white/10 text-gray-300';
          if (isSelected) {
            style = opt.isCorrect
              ? 'bg-green-500/15 border-green-500/50 text-green-300 font-medium'
              : 'bg-red-500/15 border-red-500/50 text-red-300 font-medium';
          }

          return (
            <button
              key={displayIdx}
              onClick={() => onSelectOption(opt.originalIndex)}
              className={`w-full p-3.5 rounded-xl text-left border text-sm transition-all flex items-center justify-between group ${style}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors shrink-0 mt-0.5">
                  {letter}.
                </span>
                <span>{opt.text}</span>
              </div>

              {isSelected && (
                opt.isCorrect ? (
                  <CheckCircle2 size={18} className="text-green-400 shrink-0 ml-2" />
                ) : (
                  <Zap size={18} className="text-red-400 shrink-0 ml-2" />
                )
              )}
            </button>
          );
        })}
      </div>

      {selectedOptionIndex !== undefined && questionData.explanation && (
        <p className="text-xs text-gray-400 pt-2 italic leading-relaxed border-t border-white/5 mt-3">
          💡 {questionData.explanation}
        </p>
      )}
    </div>
  );
};

export default QuickCheckQuestionCard;
