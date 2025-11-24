import { Edit, Loader2, MessageSquare, Star, Trash2 } from "lucide-react";
import { useState } from "react";

// defining types
interface JournalEntry {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: number) => void;
  isImportant: boolean;
  onToggleImportant: (id: number) => void;
}

const JournalEntryCard = ({
  entry,
  onEdit,
  onDelete,
  isImportant,
  onToggleImportant,
}: JournalEntryCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    // Start deletion
    setIsDeleting(true);
    setShowConfirm(false); // Close confirmation UI
    try {
      await onDelete(entry.id);
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // card style based on importance
  const cardClasses = `border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between relative ${
    isImportant
      ? "bg-yellow-50 dark:bg-yellow-900/50 border-yellow-400 dark:border-yellow-700 ring-4 ring-yellow-200 dark:ring-yellow-900"
      : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
  }`;

  return (
    <div className={cardClasses}>
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {entry.title}
          </h3>
          {/* Importance Toggle Button */}
          <button
            onClick={() => onToggleImportant(entry.id)}
            className={`p-1 rounded-full ml-2 transition-colors shrink-0 ${
              isImportant
                ? "text-yellow-500 hover:text-yellow-600"
                : "text-gray-400 hover:text-yellow-500"
            }`}
            aria-label={
              isImportant ? "Unmark as important" : "Mark as important"
            }
          >
            <Star size={20} fill={isImportant ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center">
          <MessageSquare size={14} className="mr-1" />
          User ID: {entry.userId} | Post ID: {entry.id}
        </p>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
          {entry.body}
        </p>
      </div>

      <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-600 relative">
        {/* Custom Confirmation Overlay */}
        {showConfirm && (
          <div className="absolute inset-x-0 bottom-full mb-2 p-3 bg-red-50 dark:bg-red-900 rounded-lg shadow-xl border border-red-200 dark:border-red-700 z-20">
            <p className="text-sm font-medium text-red-800 dark:text-red-100 mb-2">
              Are you sure you want to delete this entry?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 text-xs font-semibold text-gray-700 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => onEdit(entry)}
          className="flex-1 inline-flex items-center justify-center p-2 text-sm bg-gray-50 dark:bg-gray-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition duration-200 font-medium"
        >
          <Edit size={16} className="mr-1" /> Edit
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex-1 inline-flex items-center justify-center p-2 text-sm bg-gray-50 dark:bg-gray-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-800 transition duration-200 font-medium disabled:opacity-50"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} className="mr-1" />
          )}
          {isDeleting ? "Deleting" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default JournalEntryCard;
