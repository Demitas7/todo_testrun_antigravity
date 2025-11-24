import React from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onArchive: (id: string) => void;
    onRestore?: (id: string) => void;
    emptyMessage?: string;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    onToggle,
    onDelete,
    onArchive,
    onRestore,
    emptyMessage = 'No tasks found',
}) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    onRestore={onRestore}
                />
            ))}
        </div>
    );
};
