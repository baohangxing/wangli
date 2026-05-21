import {Link} from "react-router-dom";
import {Calendar, Tag} from "lucide-react";
import type {Story} from "@/types/story";

interface Props {
  story: Story;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function StoryCard({story}: Props) {
  return (
    <article className="group bg-warm-100 dark:bg-warm-900/30 border border-warm-200 dark:border-warm-800 rounded-lg p-6 hover:border-warm-300 dark:hover:border-warm-700 hover:shadow-md transition-all duration-200">
      <Link to={`/stories/${story.slug}`} className="block">
        <h2 className="font-serif text-xl font-semibold text-warm-900 dark:text-warm-100 group-hover:text-warm-600 dark:group-hover:text-warm-300 transition-colors leading-snug mb-2">
          {story.title}
        </h2>
      </Link>

      {story.description && (
        <p className="text-warm-700 dark:text-warm-400 text-sm leading-relaxed mb-4 line-clamp-2 font-serif">
          {story.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-warm-500 dark:text-warm-500">
        {story.date && (
          <span className="flex items-center gap-1 font-sans">
            <Calendar size={12} />
            {formatDate(story.date)}
          </span>
        )}

        {story.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Tag size={12} />
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-warm-200 dark:bg-warm-800 text-warm-700 dark:text-warm-300 rounded-full font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <Link
        to={`/stories/${story.slug}`}
        className="inline-block mt-4 text-xs text-warm-500 dark:text-warm-500 hover:text-warm-700 dark:hover:text-warm-300 font-sans transition-colors"
      >
        阅读全文 →
      </Link>
    </article>
  );
}
