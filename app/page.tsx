'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hello, Tailwind!
        </h1>

        <p className="mt-4 text-gray-600">This is a Tailwind CSS page.</p>
      </div>
    </div>
  );
}
