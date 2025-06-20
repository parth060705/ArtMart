import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const artworkDB = {
    1: {
        title: 'Sunset Dreams',
        artist: 'Jane Doe',
        year: 2022,
        medium: 'Oil on canvas',
        dimensions: '60 x 80 cm',
        price: '₹1200',
        imageUrl: 'https://via.placeholder.com/500x400?text=Sunset+Dreams',
        description: 'A calming depiction of the sky just before twilight.',
        availability: 'In Stock',
    },
    2: {
        title: 'Cosmic Whispers',
        artist: 'Arjun Singh',
        year: 2023,
        medium: 'Acrylic',
        dimensions: '90 x 60 cm',
        price: '₹1800',
        imageUrl: 'https://via.placeholder.com/500x400?text=Cosmic+Whispers',
        description: 'Stars conversing across galaxies in a swirl of color.',
        availability: 'In Stock',
    },
};

const ArtworkDetail = () => {
    const { id } = useParams();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [artwork, setArtwork] = useState(null);

    useEffect(() => {
        setArtwork(artworkDB[id]);
    }, [id]);

    if (!artwork) {
        return (
            <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 text-center py-24 text-gray-500 text-xl">Loading artwork...</div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 py-12 px-6 sm:px-12 flex justify-center items-start">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden md:flex">

                {/* Artwork Image */}
                <div className="md:w-1/2 bg-gray-100">
                    <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Artwork Info */}
                <div className="md:w-1/2 p-8 space-y-6 text-gray-800">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{artwork.title}</h1>
                        <p className="text-md text-gray-600">
                            by <span className="font-medium">{artwork.artist}</span>
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">{artwork.year}</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{artwork.medium}</span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{artwork.dimensions}</span>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{artwork.description}</p>

                    <div className="text-sm font-semibold text-green-600">{artwork.availability}</div>
                    <div className="text-3xl font-extrabold text-purple-700">{artwork.price}</div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition">
                            Add to Cart
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
                            Buy Now
                        </button>
                        <button onClick={() => setIsWishlisted(prev => !prev)}>
                            <Heart
                                className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'
                                    }`}
                            />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetail;
