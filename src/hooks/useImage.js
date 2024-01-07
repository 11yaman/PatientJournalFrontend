import { useState } from 'react';

const useImage = (canvasRef) => {
  const [imageBlob, setImageBlob] = useState(null);
  const [imageName, setImageName] = useState('');

  const searchImage = async (searchInput) => {
    try {
      const response = await fetch(`http://vm.cloud.cbh.kth.se:2533/api/v1/image/${searchInput}`);
      if (response.ok) {
        setImageName(searchInput);
        const blob = await response.blob();
        setImageBlob(blob);
      } else {
        throw new Error('Image not found');
      }
    } catch (error) {
      console.error('Something went wrong while fetching the image:', error);
    }
  };

  const saveImage = async (imageName) => {
    try {
      const blob = await new Promise((resolve) => {
        canvasRef.current.toBlob((blob) => resolve(blob));
      });

      if (blob) {
        const formData = new FormData();
        formData.append('image', blob, `${imageName}`);

        const response = await fetch('http://vm.cloud.cbh.kth.se:2533/api/v1/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Image uploaded successfully:', data);
        } else {
          throw new Error('Error uploading image');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return { imageBlob, searchImage, saveImage };
};

export default useImage;
