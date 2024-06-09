import React, { useEffect, useState } from 'react';

const colors = [
  '',
  '#ffadad',
  '#ffbf70',
  '#ffe359',
  '#b5e48c',
  '#42cdbf',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff',
  '#bdcddc',
];

const ColorPicekrInput = ({ value, onChange }) => {
  const [selectedColor, setSelectedColor] = useState(value || '');

  useEffect(() => {
    setSelectedColor(value)
  }, [value])


  const handleColorClick = (color) => {
    const newColor = selectedColor === color ? '' : color;
    setSelectedColor(newColor);
    console.log(`Selected color: ${newColor}`);
    if (onChange) {
      onChange(newColor); // 선택된 색상 또는 빈 값을 전달합니다.
    }
  };

  return (
    <div className="color-selector">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-box ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        >
          {selectedColor === color && <div className="checkmark">✔</div>}
        </div>
      ))}
    </div>
  );
};

export default ColorPicekrInput;
