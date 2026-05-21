import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";
import {useAllStories} from "@/hooks/useStories";
import StoryCard from "@/components/Story/StoryCard";
import {SITE} from "@/config/site";

export default function Home() {
  const recent = useAllStories().slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="text-center py-16 mb-12 border-b border-warm-200 dark:border-warm-800">
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-warm-900 dark:text-warm-100 mb-4 tracking-wide">
          {SITE.title}
        </h1>
        <p className="font-serif text-lg text-warm-600 dark:text-warm-400 italic">
          {SITE.description}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-warm-300 dark:bg-warm-700" />
          <span className="text-warm-400 dark:text-warm-600 text-lg">❦</span>
          <div className="h-px w-16 bg-warm-300 dark:bg-warm-700" />
        </div>
      </section>

      {/* Recent stories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-warm-800 dark:text-warm-200">
            最近故事
          </h2>
          <Link
            to="/stories"
            className="flex items-center gap-1 text-sm text-warm-500 dark:text-warm-500 hover:text-warm-700 dark:hover:text-warm-300 transition-colors font-sans"
          >
            全部故事 <ArrowRight size={14} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-20 text-warm-400 dark:text-warm-600 font-serif">
            <p className="text-5xl mb-4">📖</p>
            <p>故事正在路上……</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {recent.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        )}

        {recent.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-warm-300 dark:border-warm-700 text-warm-700 dark:text-warm-300 rounded-lg hover:bg-warm-100 dark:hover:bg-warm-900/50 hover:border-warm-400 transition-all font-sans text-sm"
            >
              查看全部故事 <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
