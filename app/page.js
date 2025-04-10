"use client";

import BookList from "./components/BookList";
import { useState, useEffect } from "react";
import SeachBar from "./components/SeachBar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    if (data?.trim().length == 0) {
      return;
    }
    const response = await fetch(`/api/search?book=${data}`).then((res) =>
      res.json()
    );
    const { status, message, result } = response;
    if (status) {
      setBooks(result);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBook = {
      title: formData.get("title"),
      author: formData.get("author"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
    };

    const response = await fetch("/api/books/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();

    if (data.status) {
      setBooks((prev) => [...prev, data.result]);
      setShowModal(false);
    } else {
      alert("Failed to add book: " + data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Book Search</h1>
          <p className="text-gray-600 text-lg">
            Discover your next favorite book
          </p>
        </header>

        <main>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <SeachBar
              data={data}
              onSearch={handleSearch}
              setData={setData}
              setBooks={setBooks}
            />
          </div>

          <div className="mt-8 mb-4 text-center flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="inline-block px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-200"
            >
              Add a New Book
            </button>
          </div>

          {true && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {false ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              ) : books.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  No books found matching your search. Try a different term.
                </div>
              ) : (
                <BookList books={books} />
              )}
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                  Add New Book
                </h2>

                <form onSubmit={handleAdd} className="space-y-4">
                  <label className="text-gray-600">Title</label>
                  <input
                    name="title"
                    placeholder="Title"
                    className="w-full border p-2 rounded text-gray-500"
                    required
                  />

                  <label className="text-gray-600">Author Name</label>
                  <input
                    name="author"
                    placeholder="Author"
                    className="w-full border p-2 rounded text-gray-500"
                    required
                  />

                  <label className="text-gray-600">Image URL</label>
                  <input
                    name="imageUrl"
                    placeholder="Image URL"
                    className="w-full border p-2 rounded text-gray-500"
                    required
                  />

                  <div className="flex justify-between items-center mt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="text-gray-600 hover:text-gray-700 px-4 py-2 bg-gray-200 rounded "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
