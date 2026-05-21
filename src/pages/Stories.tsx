import {useFilteredStories} from "@/hooks/useStories";
import StoryCard from "@/components/Story/StoryCard";
import SearchBar from "@/components/UI/SearchBar";
import TagFilter from "@/components/UI/TagFilter";
import {ChevronLeft, ChevronRight} from "lucide-react";

export default function Stories() {
  const {
    stories,
    total,
    search,
    setSearch,
    allTags,
    selectedTags,
    toggleTag,
    page,
    setPage,
    totalPages,
  } = useFilteredStories();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-warm-200 dark:border-warm-800">
        <h1 className="font-serif text-3xl font-semibold text-warm-900 dark:text-warm-100 mb-1">
          全部故事
        </h1>
        <p className="text-sm text-warm-500 dark:text-warm-500 font-sans">
          共 {total} 篇
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <TagFilter
          tags={allTags}
          selected={selectedTags}
          onToggle={toggleTag}
        />
      </div>

      {/* Story list */}
      {stories.length === 0 ? (
        <div className="text-center py-20 text-warm-400 dark:text-warm-600 font-serif">
          <p className="text-5xl mb-4">🔍</p>
          <p>没有找到匹配的故事</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg border border-warm-200 dark:border-warm-700 text-warm-600 dark:text-warm-400 disabled:opacity-40 hover:bg-warm-100 dark:hover:bg-warm-900/50 transition-colors"
            aria-label="上一页"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-sans transition-colors ${
                p === page
                  ? "bg-warm-600 dark:bg-warm-500 text-warm-50 dark:text-warm-950"
                  : "border border-warm-200 dark:border-warm-700 text-warm-600 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-900/50"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-warm-200 dark:border-warm-700 text-warm-600 dark:text-warm-400 disabled:opacity-40 hover:bg-warm-100 dark:hover:bg-warm-900/50 transition-colors"
            aria-label="下一页"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
