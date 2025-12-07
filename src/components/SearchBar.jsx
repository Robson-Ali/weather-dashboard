import React, { useState } from 'react'


export default function SearchBar({ onSearch, recent = [], onSelectRecent }) {
const [q, setQ] = useState('')


function submit(e) {
  e.preventDefault()
    if (!q.trim()) return
      onSearch(q.trim())
        setQ('')
}


return (
  <div className="w-full max-w-2xl mx-auto p-4">
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city (e.g. Nairobi)"
        className="flex-1 rounded-md p-2 border shadow-sm"
        />
      <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Search</button>
    </form>


{recent?.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-2">
    {recent.map((r) => (
    <button
      key={r}
      onClick={() => onSelectRecent(r)}
      className="text-sm px-3 py-1 rounded bg-gray-100"
      >
      {r}
    </button>
  ))}
  </div>
)}
  </div>
)
}
