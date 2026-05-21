interface Props {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

export default function TagFilter({tags, selected, onToggle}: Props) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={`px-3 py-1 rounded-full text-xs font-sans transition-colors ${
              active
                ? "bg-warm-600 text-warm-50 dark:bg-warm-500 dark:text-warm-950"
                : "bg-warm-100 dark:bg-warm-900/50 text-warm-600 dark:text-warm-400 border border-warm-200 dark:border-warm-700 hover:border-warm-400 dark:hover:border-warm-500 hover:text-warm-800 dark:hover:text-warm-200"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
