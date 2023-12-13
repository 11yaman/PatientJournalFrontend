import React, { useState, useEffect, useRef } from 'react';
import useImage from '../../hooks/useImage'

const ImageEmployee = () => {
  const [searchInput, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const [tool, setTool] = useState('Pen');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState('Medium');

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawing = useRef(false);

  const { imageBlob, searchImage, saveImage } = useImage(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    if (imageBlob) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        contextRef.current.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = URL.createObjectURL(imageBlob);
    }
  }, [imageBlob]);

  useEffect(() => {
    if (selectedImage) {
      displaySelectedImage();
    }
  }, [selectedImage]);

  const displaySelectedImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (selectedImage) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = URL.createObjectURL(selectedImage);
    }
  };

  const handleSearchImage = () => {
    searchImage(searchInput);
  };

  const handleSaveImage = () => {
    saveImage(imageName);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      setSelectedImage(file);
      setImageName(file.name);
    } else {
      alert('Please choose a valid .png file.');
    }
  };

  const startDrawing = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    contextRef.current.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing.current) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    contextRef.current.fillStyle = color;
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = getSizeValue();

    if (tool === 'Pen') {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
      contextRef.current.beginPath();
      contextRef.current.arc(x, y, getSizeValue() / 2, 0, Math.PI * 2);
      contextRef.current.fill();
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    } else {
      const text = prompt('Enter text:');
      contextRef.current.font = `bold ${getSizeValue() * 5}px Arial`;
      contextRef.current.fillText(text, x, y);
    }
  };

  const getSizeValue = () => {
    switch (size) {
      case 'Small':
        return 3;
      case 'Medium':
        return 6;
      case 'Large':
        return 9;
      default:
        return 6;
    }
  };

  return (
    <div>
      <h1>Bildhantering</h1>
      <input
        type="file"
        accept=".png"
        onChange={handleImageUpload}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <input
        type="text"
        placeholder="Sök efter bild"
        value={searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchImage}>Search</button>
      <br />
      <div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
        ></canvas>
        <label>
          Tool:
          <select value={tool} onChange={(e) => setTool(e.target.value)}>
            <option value="Pen">Pen</option>
            <option value="Text">Text</option>
          </select>
        </label>
        <label>
          Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>
          Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>
        <button onClick={handleSaveImage}>Save</button>
      </div>
    </div>
  );
};

export default ImageEmployee;
