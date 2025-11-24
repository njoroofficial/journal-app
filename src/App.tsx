import { BookOpen, Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import JournalEntryCard from "./components/JournalEntryCard";
import { fetchWithRetry } from "./lib/api-service";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

interface JournalEntry {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State to track locally marked important entries
  const [importantEntries, setImportantEntries] = useState(new Set<number>());

  // Fetch initial entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchWithRetry(API_BASE_URL, {});
        // Get only the first 10 entries
        setEntries(data.slice(0, 10));
      } catch (err) {
        console.error("Error fetching entries:", err);
        setError("Failed to load journal entries. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Local Importance Toggle Handler
  const handleToggleImportant = (id: number) => {
    setImportantEntries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // CRUD Handlers

  const handleDeleteEntry = async (id: number) => {
    try {
      // DELETE request
      await fetchWithRetry(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      // Remove from state
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry. Please try again.");
    }
  };

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
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <Loader2 size={32} className="animate-spin text-blue-500 mb-4" />
            <p className="text-lg">Loading your previous thoughts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-md my-4 dark:bg-red-900 dark:border-red-700 dark:text-red-300">
            <p className="font-bold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && entries.length === 0 && (
          <div className="text-center p-12 border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Journal Entries Found</h3>
            <p className="mt-2">
              Click "New Entry" to start writing your first thought!
            </p>
          </div>
        )}

        {!isLoading && !error && entries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                onEdit={() => {}}
                onDelete={handleDeleteEntry}
                isImportant={importantEntries.has(entry.id)}
                onToggleImportant={handleToggleImportant}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
