import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadArtwork } from '../service/artworkService';
// import { useAuth } from '../hooks/useAuth';

const UploadArtwork = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    medium: '',
    dimensions: '',
    images: [],
    video: null,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images') {
      const fileArray = Array.from(files).slice(0, 4);
      setForm((prev) => ({ ...prev, images: fileArray }));
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file)));
    } else if (name === 'video') {
      const videoFile = files[0];
      setForm((prev) => ({ ...prev, video: videoFile }));
      setVideoPreview(URL.createObjectURL(videoFile));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, images } = form;

    if (!title || !description || !price || images.length === 0) {
      setError('Please fill all required fields and upload at least one image.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'images') {
          val.forEach((img) => formData.append('images', img));
        } else if (key === 'video' && val) {
          formData.append('video', val);
        } else {
          formData.append(key, val);
        }
      });
      formData.append('artistId', user?.id);

      await uploadArtwork(formData);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to upload artwork. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-12 bg-white shadow-xl rounded-2xl text-black">
      <h1 className="text-4xl font-semibold text-center mb-8">Upload New Artwork</h1>
      {error && <div className="text-red-600 text-center mb-4 font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Text Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Title*</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Artwork Title"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description*</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description"
              rows={4}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Price*</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Abstract"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Medium</label>
              <input
                type="text"
                name="medium"
                value={form.medium}
                onChange={handleChange}
                placeholder="e.g. Oil, Acrylic"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Dimensions</label>
              <input
                type="text"
                name="dimensions"
                value={form.dimensions}
                onChange={handleChange}
                placeholder="e.g. 24in x 36in"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right: Media Uploads */}
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Images (up to 4)*</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full"
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="h-32 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Optional Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              className="w-full"
            />
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="w-full h-48 object-cover rounded-lg mt-3"
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all w-full md:w-1/2 text-lg"
          >
            {loading ? 'Uploading...' : 'Submit Artwork'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadArtwork;
