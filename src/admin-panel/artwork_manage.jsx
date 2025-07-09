import React from 'react';

const artworks = [
  { id: 1, title: 'Starry Night', artist: 'Vincent van Gogh', year: 1889 },
  { id: 2, title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 1503 },
  { id: 3, title: 'The Scream', artist: 'Edvard Munch', year: 1893 },
];

const ArtworkManage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Artwork Management</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Artist</th>
              <th className="p-4">Year</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((art) => (
              <tr key={art.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{art.title}</td>
                <td className="p-4">{art.artist}</td>
                <td className="p-4">{art.year}</td>
                <td className="p-4 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtworkManage;
