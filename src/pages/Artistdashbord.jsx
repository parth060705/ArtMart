import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/UseAuth';
import { getArtworksByArtist, deleteArtwork } from '../services/ArtworkServices';
import { Link } from 'react-router-dom';

const ArtistDashboard = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getArtworksByArtist(user?.id);
        setArtworks(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load your artworks.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchArtworks();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;

    try {
      await deleteArtwork(id);
      setArtworks((prev) => prev.filter((art) => art.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete artwork.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Artworks</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : artworks.length === 0 ? (
        <p className="text-center text-gray-500">No artworks uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div key={art.id} className="border rounded-lg shadow-md p-4 bg-white">
              <img
                src={art.images?.[0]}
                alt={art.title}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold">{art.title}</h2>
              <p className="text-gray-600">${art.price}</p>
              <p className="text-sm text-gray-400">Uploaded: {new Date(art.createdAt).toLocaleDateString()}</p>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/artwork/${art.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>
                <Link
                  to={`/edit-artwork/${art.id}`}
                  className="text-green-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(art.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
