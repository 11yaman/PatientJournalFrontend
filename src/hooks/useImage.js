import { useState } from 'react';
import useAuth from './useAuth';  // Assuming the correct path to useAuth

const useApi = require('./useApi').default;  // Assuming the correct path to useApi

const useImage = (canvasRef) => {
  const [imageBlob, setImageBlob] = useState(null);
  const [imageName, setImageName] = useState('');
  const { user } = useAuth();
  const { get, post } = useApi();  // Destructuring get and post from useApi

  const searchImage = async (searchInput) => {
    try {
      if (user && user.token) {
        const fetchedImage = await get(`https://patient-image-microservice.app.cloud.cbh.kth.se/api/v1/image/${searchInput}`, user.token);

        setImageName(searchInput);
        setImageBlob(fetchedImage);
      } else {
        throw new Error('User not authenticated');
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

        if (user && user.token) {
          const response = await post('https://patient-image-microservice.app.cloud.cbh.kth.se/api/v1/upload', formData, user.token, {}, 'multipart/form-data');

          if (response) {
            console.log('Image uploaded successfully:', response);
          } else {
            throw new Error('Error uploading image');
          }
        } else {
          throw new Error('User not authenticated');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return { imageBlob, searchImage, saveImage };
};

export default useImage;
