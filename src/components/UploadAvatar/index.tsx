import { forwardRef, useState } from 'react';

// eslint-disable-next-line react/display-name
const UploadAvatar = forwardRef(({ ...props }, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      // Replace with your API endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        // Handle success (e.g., show success message, reset form)
      } else {
        console.error('Upload failed');
        // Handle error
      }
    } catch (error) {
      console.error('Error uploading:', error);
      // Handle error
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col">
      <button
        onClick={handleUpload}
        disabled={!selectedImage}
        className={`w-full box-border py-2 px-4 rounded-lg ${
          selectedImage
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Upload Image
      </button>
    </div>
  );
});

export default UploadAvatar;
