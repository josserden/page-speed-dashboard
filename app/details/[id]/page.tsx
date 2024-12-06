import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const slug = (await params).id;
  const decodedSlug = decodeURIComponent(slug);

  return <div>My test: {decodedSlug}</div>;
}
