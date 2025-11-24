'use client';

import React, { useState, useEffect } from 'react';
import { Todo, Priority } from '@/types/todo';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Archive, ListTodo } from 'lucide-react';

export const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showArchived, setShowArchived] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('todo-app-data');
        if (saved) {
            try {
                setTodos(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse todos', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('todo-app-data', JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = (text: string, priority: Priority) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            archived: false,
            priority,
            createdAt: Date.now(),
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const archiveTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, archived: true } : todo
            )
        );
    };

    const restoreTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, archived: false } : todo
            )
        );
    };

    const priorityOrder: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 };

    const activeTodos = todos
        .filter((t) => !t.archived)
        .sort((a, b) => {
            // Sort by completion status (incomplete first)
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            // Then by priority
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            // Then by date (newest first)
            return b.createdAt - a.createdAt;
        });

    const archivedTodos = todos
        .filter((t) => t.archived)
        .sort((a, b) => b.createdAt - a.createdAt);

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    Task Master
                </h1>
                <p className="text-gray-400">Stay organized, stay focused.</p>
            </header>

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setShowArchived(!showArchived)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${showArchived
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                        }`}
                >
                    {showArchived ? <ListTodo size={18} /> : <Archive size={18} />}
                    <span>{showArchived ? 'View Active Tasks' : 'View Archived'}</span>
                </button>
            </div>

            {showArchived ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-6 flex items-center gap-2">
                        <Archive className="text-yellow-500" />
                        Archived Tasks
                    </h2>
                    <TodoList
                        todos={archivedTodos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onArchive={archiveTodo}
                        onRestore={restoreTodo}
                        emptyMessage="No archived tasks"
                    />
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <TodoForm onAdd={addTodo} />
                    <TodoList
                        todos={activeTodos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onArchive={archiveTodo}
                        emptyMessage="No active tasks. Add one above!"
                    />
                </div>
            )}
        </div>
    );
};
