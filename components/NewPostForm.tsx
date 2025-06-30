
import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';

interface NewPostFormProps {
  onGeneratePost: (topic: string) => void;
  isLoading: boolean;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onGeneratePost, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    onGeneratePost(topic.trim());
    setTopic('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., 'The Impact of Quantum Computing'"
        className="flex-grow w-full px-4 py-3 rounded-lg bg-base-200 dark:bg-dark-300 text-base-content dark:text-dark-content border border-base-300 dark:border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-primary rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-base-100 dark:focus:ring-offset-dark-200 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <BrainCircuit className="w-5 h-5" />
            <span>Generate</span>
          </>
        )}
      </button>
    </form>
  );
};

export default NewPostForm;
