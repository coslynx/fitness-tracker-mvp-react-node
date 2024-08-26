import { useState } from 'react';
import { useStore } from '@/store';

interface GoalInputProps {
  onClose: () => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onClose }) => {
  const [goalType, setGoalType] = useState('weightLoss');
  const [targetValue, setTargetValue] = useState('');
  const [deadline, setDeadline] = useState('');
  const { addGoal } = useStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGoal = {
      type: goalType,
      target: parseInt(targetValue, 10),
      deadline: new Date(deadline),
    };
    addGoal(newGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 md:w-1/2 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Set a New Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="goalType" className="block text-gray-700 font-bold mb-2">
              Goal Type:
            </label>
            <select
              id="goalType"
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleGain">Muscle Gain</option>
              <option value="distanceRun">Distance Run</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="targetValue" className="block text-gray-700 font-bold mb-2">
              Target Value:
            </label>
            <input
              type="number"
              id="targetValue"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
              Deadline:
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Set Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalInput;