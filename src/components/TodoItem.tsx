import React from 'react';
import { Todo, Priority } from '@/types/todo';
import { Check, Trash2, Archive, RotateCcw } from 'lucide-react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onArchive: (id: string) => void;
    onRestore?: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
    High: 'bg-red-900/50 text-red-200 border-red-700',
    Medium: 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
    Low: 'bg-blue-900/50 text-blue-200 border-blue-700',
};

export const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    onToggle,
    onDelete,
    onArchive,
    onRestore,
}) => {
    return (
        <div
            className={`group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-300 ${todo.completed
                ? 'bg-gray-800/50 border-gray-700 opacity-60'
                : 'bg-gray-800 border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl'
                }`}
        >
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all duration-200 ${todo.completed
                            ? 'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30'
                            : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-200 hover:bg-gray-700'
                        }`}
                >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500' : 'border-current'
                        }`}>
                        {todo.completed && <Check size={10} className="text-gray-900" />}
                    </div>
                    <span className="text-sm font-medium">
                        {todo.completed ? 'Completed' : 'Complete'}
                    </span>
                </button>

                <div className="flex flex-col gap-1">
                    <span
                        className={`text-lg transition-all ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-100'
                            }`}
                    >
                        {todo.text}
                    </span>
                    <span
                        className={`text-xs px-2.5 py-1 rounded-md border w-fit font-medium ${priorityColors[todo.priority]
                            }`}
                    >
                        {todo.priority}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {todo.archived ? (
                    <button
                        onClick={() => onRestore?.(todo.id)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Restore"
                    >
                        <RotateCcw size={18} />
                    </button>
                ) : (
                    <button
                        onClick={() => onArchive(todo.id)}
                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                        title="Archive"
                    >
                        <Archive size={18} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};
