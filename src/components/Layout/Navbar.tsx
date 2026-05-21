import {Link, NavLink} from "react-router-dom";
import {Sun, Moon, BookOpen} from "lucide-react";
import {useTheme} from "@/context/ThemeContext";
import {SITE} from "@/config/site";

export default function Navbar() {
  const {theme, toggle} = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-sm border-b border-warm-200 dark:border-warm-800">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-serif text-xl font-semibold text-warm-800 dark:text-warm-200 hover:text-warm-600 dark:hover:text-warm-300 transition-colors"
        >
          <BookOpen size={20} className="text-warm-500" />
          <span>{SITE.title}</span>
          <span className="text-sm font-normal text-warm-500 dark:text-warm-500 hidden sm:inline">
            · {SITE.subtitle}
          </span>
        </Link>

        {/* Links + Toggle */}
        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({isActive}) =>
              `px-3 py-1.5 rounded text-sm transition-colors font-sans ${
                isActive
                  ? "text-warm-700 dark:text-warm-300 bg-warm-100 dark:bg-warm-900/50"
                  : "text-warm-600 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-900/30"
              }`
            }
          >
            首页
          </NavLink>
          <NavLink
            to="/stories"
            className={({isActive}) =>
              `px-3 py-1.5 rounded text-sm transition-colors font-sans ${
                isActive
                  ? "text-warm-700 dark:text-warm-300 bg-warm-100 dark:bg-warm-900/50"
                  : "text-warm-600 dark:text-warm-400 hover:text-warm-800 dark:hover:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-900/30"
              }`
            }
          >
            故事
          </NavLink>

          <button
            onClick={toggle}
            aria-label="切换主题"
            className="ml-2 p-2 rounded-full text-warm-500 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-900/50 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
