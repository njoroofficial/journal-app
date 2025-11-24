import { Edit2, Trash2 } from "lucide-react";

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
}

const JournalEntryCard = ({
  entry,
  onEdit,
  onDelete,
}: JournalEntryCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 flex-1">
          {entry.title}
        </h3>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(entry)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded-lg transition"
            aria-label="Edit entry"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded-lg transition"
            aria-label="Delete entry"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
        {entry.body}
      </p>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Entry #{entry.id}
        </span>
      </div>
    </div>
  );
};

export default JournalEntryCard;
