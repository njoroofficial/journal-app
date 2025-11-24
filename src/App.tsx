import { BookOpen, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen size={28} className="text-blue-600" />
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              My Simple Journal
            </h1>
          </div>
          {/* button to handle to new form entry */}
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.02] active:scale-95 text-sm md:text-base disabled:opacity-50"
            aria-label="Create New Entry"
          >
            <Plus size={20} className="mr-1" />
            New Entry
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center p-12 border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400">
          <BookOpen size={48} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold">No Journal Entries Found</h3>
          <p className="mt-2">
            Click "New Entry" to start writing your first thought!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
