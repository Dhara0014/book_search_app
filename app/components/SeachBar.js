import React from "react";

const SeachBar = ({ data, onSearch, setData, setBooks }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Search for books by title or author..."
          className="w-full px-4 py-3 pr-10 border placeholder-gray-400 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />

        {data && (
          <button
            onClick={() => {
              setData("");
              setBooks([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-lg"
            type="button"
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SeachBar;
