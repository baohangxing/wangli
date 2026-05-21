import {SITE} from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-warm-200 dark:border-warm-800 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-sm text-warm-500 dark:text-warm-500 font-sans">
          © {year} {SITE.author}
        </p>
      </div>
    </footer>
  );
}
