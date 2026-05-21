import {useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Calendar, Tag, ArrowLeft} from "lucide-react";
import {useStory} from "@/hooks/useStories";
import StoryContent from "@/components/Story/StoryContent";

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

/** Thin reading-progress bar at top of page */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-warm-500 dark:bg-warm-400 z-[100] transition-all duration-75"
      style={{width: `${progress}%`}}
    />
  );
}

export default function StoryPost() {
  const {slug} = useParams<{slug: string}>();
  const navigate = useNavigate();
  const story = useStory(slug ?? "");

  useEffect(() => {
    if (story) {
      document.title = `${story.title}`;
    }
    return () => {
      document.title = "衔蝉";
    };
  }, [story]);

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-serif text-5xl mb-6 text-warm-300 dark:text-warm-700">
          404
        </p>
        <p className="text-warm-500 dark:text-warm-500 font-serif mb-8">
          故事不见了……
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-warm-600 dark:text-warm-400 hover:underline font-sans"
        >
          ← 返回上一页
        </button>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          to="/stories"
          className="inline-flex items-center gap-1 text-sm text-warm-500 dark:text-warm-500 hover:text-warm-700 dark:hover:text-warm-300 transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} /> 所有故事
        </Link>

        {/* Story header */}
        <header className="mb-10 pb-8 border-b border-warm-200 dark:border-warm-800">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-warm-900 dark:text-warm-100 leading-snug mb-4">
            {story.title}
          </h1>

          {story.description && (
            <p className="font-serif text-warm-600 dark:text-warm-400 text-lg italic leading-relaxed mb-4">
              {story.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-warm-500 dark:text-warm-500">
            {story.date && (
              <span className="flex items-center gap-1.5 font-sans">
                <Calendar size={14} />
                {formatDate(story.date)}
              </span>
            )}
            {story.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <Tag size={14} />
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-warm-100 dark:bg-warm-900/50 border border-warm-200 dark:border-warm-700 text-warm-600 dark:text-warm-400 rounded-full text-xs font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Story body */}
        <StoryContent content={story.content} />

        {/* Footer divider */}
        <footer className="mt-16 pt-8 border-t border-warm-200 dark:border-warm-800 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-warm-200 dark:bg-warm-800" />
          <span className="text-warm-300 dark:text-warm-700 text-lg">❦</span>
          <div className="h-px w-16 bg-warm-200 dark:bg-warm-800" />
        </footer>

        <div className="mt-8 text-center">
          <Link
            to="/stories"
            className="inline-flex items-center gap-1 text-sm text-warm-500 dark:text-warm-500 hover:text-warm-700 dark:hover:text-warm-300 transition-colors font-sans"
          >
            <ArrowLeft size={14} /> 返回故事列表
          </Link>
        </div>
      </article>
    </>
  );
}
