export const MotivationalQuote = ({ quote }) => {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
        <div className="mb-4">
          <svg className="w-8 h-8 text-blue-200 opacity-70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p className="text-lg font-medium mb-4">{quote.quote}</p>
        <p className="text-blue-200 text-right">— {quote.author}</p>
      </div>
    );
  };