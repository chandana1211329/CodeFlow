import React from 'react';

interface ControlsProps {
  onRun: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
  hasSteps: boolean;
  currentStepIndex: number;
  totalSteps: number;
}

const Controls: React.FC<ControlsProps> = ({
  onRun,
  onNext,
  onPrevious,
  isLoading,
  hasSteps,
  currentStepIndex,
  totalSteps,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onRun}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Running...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Run
          </>
        )}
      </button>

      {hasSteps && (
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={currentStepIndex <= 0}
            className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-400 text-white px-3 py-2 rounded-md text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <span className="text-sm text-gray-400 min-w-[80px] text-center">
            Step {currentStepIndex + 1} / {totalSteps}
          </span>

          <button
            onClick={onNext}
            disabled={currentStepIndex >= totalSteps - 1}
            className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-400 text-white px-3 py-2 rounded-md text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
