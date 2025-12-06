import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    onSearch(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 justify-center">
      <input
        className="px-4 py-2 rounded-lg text-black w-60"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium">
        Search
      </button>
    </form>
  );
}
