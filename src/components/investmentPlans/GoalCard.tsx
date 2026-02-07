import React from 'react';
import { motion } from 'framer-motion';

interface Goal {
  title: string;
  icon: string;
  timeline: string;
  suggestedAmount: string;
  strategy: string;
  color: string;
}
interface GoalCardProps {
  goal: Goal;
  openApplyModal?: (loanType?: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, openApplyModal }) => {
  return (
    <div className="relative bg-white/80 rounded-2xl shadow-xl p-16 glassmorphism hover:scale-105 transition-all duration-300 w-full border border-gray-100 hover:border-blue-200 group">
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-30 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-30 mix-blend-multiply pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
            {goal.title}
          </h3>
          <div className="text-4xl sm:text-6xl md:text-7xl text-blue-400 group-hover:text-blue-500 transition-colors">
            {goal.icon}
          </div>
        </div>
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-4">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-400"></span>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">Timeline: {goal.timeline}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-400"></span>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">Suggested Amount: {goal.suggestedAmount}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-400"></span>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">Strategy: {goal.strategy}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium group-hover:scale-105"
            onClick={() => openApplyModal && openApplyModal(`Investment Goal - ${goal.title}`)}
          >
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
