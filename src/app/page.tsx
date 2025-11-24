import { TodoApp } from '@/components/TodoApp';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative">
        <TodoApp />
      </div>
    </main>
  );
}
