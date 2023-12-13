import React, { useState, useEffect, useRef } from 'react';
import useImage from '../../hooks/useImage';

const ImageEmployee = () => {
  const [searchInput, setSearchQuery] = useState('');
  const canvasRef = useRef(null);
  const { imageBlob, searchImage } = useImage(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
        if (imageBlob) {
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
          };
          img.src = URL.createObjectURL(imageBlob);
        }
  }, [imageBlob]);

  const handleSearchImage = () => {
    searchImage(searchInput);
  };

  return (
    <div>
      <h1>Bildhantering</h1>
      <input
        type="text"
        placeholder="Sök efter bild"
        value={searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchImage}>Search</button>
      <br />
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default ImageEmployee;
