import React from 'react'
export default function ErrorMessage({ message }) {
  if (!message) return null
    return (
      <div className="max-w-2xl mx-auto p-3 bg-red-50 border border-red-200 text-red-800 rounded mt-4">
        {message}
      </div>
    )
}
