import { BookOpen, Plus, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import JournalForm from "./components/JournalForm";
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // CRUD Handlers

  const handleOpenForm = (entry: JournalEntry | null = null) => {
    setCurrentEntry(entry);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentEntry(null);
  };

  const handleSaveEntry = async (newEntry: JournalEntry, isNew: boolean) => {
    if (isNew) {
      // CREATE: POST request
      const createdEntry = await fetchWithRetry(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mock a unique ID for local state to avoid key collisions with existing API data
        body: JSON.stringify({
          ...newEntry,
          id: entries.length + 101,
          userId: 1,
        }),
      });
      // Prepend the new entry to state
      setEntries((prev) => [createdEntry, ...prev]);
    } else {
      // UPDATE: PUT request
      const updatedEntry = await fetchWithRetry(
        `${API_BASE_URL}/${newEntry.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        }
      );
      // Update the state with the new entry data
      setEntries((prev) =>
        prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
      );
    }
  };

  const handleDeleteEntry = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }

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
            onClick={() => handleOpenForm(null)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.02] active:scale-95 text-sm md:text-base disabled:opacity-50"
            aria-label="Create New Entry"
          >
            <Plus size={20} className="mr-1" />
            New Entry
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center p-12">
            <Loader2
              size={48}
              className="mx-auto mb-4 animate-spin text-blue-600"
            />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Loading journal entries...
            </h3>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center p-12 border-4 border-dashed border-red-200 dark:border-red-800 rounded-xl">
            <AlertCircle size={48} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
              Error Loading Entries
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && entries.length === 0 && (
          <div className="text-center p-12 border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Journal Entries Found</h3>
            <p className="mt-2">
              Click "New Entry" to start writing your first thought!
            </p>
          </div>
        )}

        {/* Entries Grid */}
        {!isLoading && !error && entries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <JournalEntryCard />
            ))}
          </div>
        )}
      </main>

      {/* Journal Form Modal */}
      {isFormOpen && <JournalForm />}
    </div>
  );
}

export default App;
