import React, { useState } from 'react';

interface CreatePollFormProps {
  onCreatePoll: (topic: string, description: string) => void;
}

const CreatePollForm: React.FC<CreatePollFormProps> = ({ onCreatePoll }) => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && description.trim()) {
      onCreatePoll(topic, description);
      setTopic('');
      setDescription('');
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-sky-300 mb-6">發起一個新議題</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
            議題主題
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="例如：我們應該禁止使用塑膠吸管嗎？"
            required
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-md p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
            議題描述
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="詳細說明這個議題的背景、利弊等，讓大家能更全面地了解..."
            required
            rows={5}
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-md p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full sm:w-auto float-right bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
          >
            送出議題
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePollForm;
