import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-12 py-6 bg-white border-t border-gray-200 text-sm text-gray-900 ">
      <div className="flex flex-col items-center space-y-3">
        <p className="flex items-center gap-2">
          <span className="animate-bounce-slow">💻</span>
          <span>+ </span>
          <span className="animate-wiggle">🎮</span>
          <span>by</span>
          <a
            href="https://github.com/faycal-ghozzi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Faycal Ghozzi
          </a>
        </p>

        <div className="flex space-x-4">
          <a
            href="mailto:faycal.ghozzi@gmail.com"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Email"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.2L12 13 2 5.2V4zm0 3.1l10 7.5 10-7.5V20a2 2 0 01-2 2H4a2 2 0 01-2-2V7.1z" />
            </svg>
          </a>

          <a
            href="https://github.com/faycal-ghozzi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="GitHub"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.58 2 12.14c0 4.45 2.87 8.22 6.84 9.55.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1.01.07 1.55 1.06 1.55 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.38-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.17 9.17 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.91v2.83c0 .27.18.6.69.49A10.15 10.15 0 0022 12.14C22 6.58 17.52 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/faycal-ghozzi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 20h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.5c0-1.32-.03-3.02-1.84-3.02-1.85 0-2.14 1.44-2.14 2.93v5.59h-3v-10h2.89v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.6z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
