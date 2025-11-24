import { Loader2, Send, X } from "lucide-react";
import { useState, type FormEvent } from "react";

interface JournalEntry {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface JournalFormProps {
  entry: JournalEntry | null;
  onClose: () => void;
  onSave: (payload: JournalEntry, isNew: boolean) => Promise<void>;
}

const JournalForm = ({ entry, onClose, onSave }: JournalFormProps) => {
  const [title, setTitle] = useState(entry ? entry.title : "");
  const [body, setBody] = useState(entry ? entry.body : "");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); // State for displaying API errors in modal
  const isNew = !entry;

  // Client-side validation is enforced by the 'required' attribute on inputs,
  // and the final submission check here.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setFormError(null);
    setIsSaving(true);

    // Prepare payload (using mock userId=1 for JSONPlaceholder POST/PUT requests)
    const payload = {
      title: title.trim(),
      body: body.trim(),
      userId: entry ? entry.userId : 1,
      id: entry ? entry.id : Date.now(), // Use existing ID or mock a new one
    };

    try {
      await onSave(payload, isNew);
      onClose();
    } catch (error) {
      console.error("Error saving entry:", error);
      setFormError(
        "Failed to save journal entry. Please check your connection."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg md:max-w-3xl overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isNew ? "New Journal Entry" : "Edit Entry"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition"
              aria-label="Close"
              disabled={isSaving}
            >
              <X size={20} />
            </button>
          </div>

          {/* Error Message Box */}
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm dark:bg-red-900 dark:border-red-700 dark:text-red-300">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title (e.g., A Day in the City)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-shadow"
              required
              disabled={isSaving}
            />
            <textarea
              placeholder="What's on your mind today? Write your entry here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none transition-shadow"
              required
              disabled={isSaving}
            />
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                disabled={isSaving || !title.trim() || !body.trim()}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    {isNew ? "Create Entry" : "Update Entry"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;
