import React, { useState } from 'react';
import { Priority } from '@/types/todo';
import { Plus } from 'lucide-react';

interface TodoFormProps {
    onAdd: (text: string, priority: Priority) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text, priority);
        setText('');
        setPriority('Medium');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 bg-gray-900 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                />

                <div className="flex gap-2">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        className="bg-gray-900 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[120px]"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Add</span>
                    </button>
                </div>
            </div>
        </form>
    );
};
