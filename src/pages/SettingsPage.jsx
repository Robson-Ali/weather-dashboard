import React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings & Preferences</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg text-gray-700">
          This is where future features like dark/light mode toggles, API key management, or default city settings would go.
        </p>
        <div className="mt-4 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Unit Setting</h3>
          <p className="text-gray-600">
            Note: Unit toggling is currently controlled on the Weather Dashboard page.
          </p>
        </div>
      </div>
    </div>
  );
}
