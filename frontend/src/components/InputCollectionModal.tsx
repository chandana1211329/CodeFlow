import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Play, X, HelpCircle, Terminal } from 'lucide-react';

interface InputCollectionModalProps {
  isOpen: boolean;
  prompts: string[];
  onClose: () => void;
  onConfirm: (inputs: string[]) => void;
}

export const InputCollectionModal: React.FC<InputCollectionModalProps> = ({
  isOpen,
  prompts,
  onClose,
  onConfirm,
}) => {
  const [inputFields, setInputFields] = useState<string[]>([]);

  // Reset fields when modal is opened or prompts change
  useEffect(() => {
    if (isOpen) {
      // Initialize fields with prompts or at least one empty field
      setInputFields(prompts.length > 0 ? [...prompts].map(() => '') : ['']);
    }
  }, [isOpen, prompts]);

  if (!isOpen) return null;

  const handleInputChange = (index: number, val: string) => {
    const next = [...inputFields];
    next[index] = val;
    setInputFields(next);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, '']);
  };

  const handleRemoveField = (index: number) => {
    // Keep at least one field if prompts are empty, otherwise allow deleting all
    if (inputFields.length > 1) {
      const next = inputFields.filter((_, i) => i !== index);
      setInputFields(next);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(inputFields);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-[#090d16]/95 border border-white/10 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative z-10 overflow-hidden"
        >
          {/* Top glow decoration */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            title="Cancel"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-11 h-11 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/5">
              <Terminal size={22} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Program Input Required</h3>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                We detected runtime input operations. Please define values to feed stdin.
              </p>
            </div>
          </div>

          {/* Fields list */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-h-[260px] overflow-y-auto pr-1.5 space-y-3.5 custom-scrollbar">
              {inputFields.map((value, idx) => {
                // Label from code scan, or default fallback
                const promptLabel = prompts[idx] || `Additional Input #${idx + 1}`;
                
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1.5 relative group"
                  >
                    <label className="text-[10px] font-bold text-blue-400 font-mono uppercase tracking-widest block">
                      {promptLabel}
                    </label>
                    <div className="flex gap-2.5 items-center">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        placeholder={`Enter value for input...`}
                        autoFocus={idx === 0}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all text-white font-mono placeholder:text-gray-600"
                      />
                      {inputFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveField(idx)}
                          className="p-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl text-red-400 transition-all"
                          title="Remove Field"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Helper to Add Inputs */}
            <div className="flex justify-between items-center pt-2.5 border-t border-white/5">
              <button
                type="button"
                onClick={handleAddField}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={14} /> Add Input Row
              </button>
              <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                <HelpCircle size={10} /> Use additional rows for loops
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 border border-white/10 hover:bg-white/5 rounded-2xl text-xs font-bold text-gray-400 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Play size={12} fill="white" /> Run with Inputs
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InputCollectionModal;
