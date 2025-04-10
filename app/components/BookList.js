// src/components/BookList.js
import Link from "next/link";

export default function BookList({ books }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Search Results ({books.length})
      </h2>
      <ul className="divide-y divide-gray-200">
        {books.map((book) => (
          <li
            key={book.id}
            className="py-4 hover:bg-gray-10 transition duration-150"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <Link
                  href={`/book/${book.id}`}
                  className="block p-2 rounded-md"
                >
                  <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-gray-600">by {book.author}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
