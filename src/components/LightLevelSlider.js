import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

const LightLevelSlider = ({ min = 200, max = 1400, value, onChange }) => {
  const [range, setRange] = useState(value || [650, 800]);

  const handleChange = (newRange) => {
    setRange(newRange);
    if (onChange) onChange(newRange); // Gửi giá trị lên parent component
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">Light level</h3>

      <div className="flex justify-between w-full text-sm font-medium">
        <span>MAX - {max} W/m²</span>
        <span>MIN - {min} W/m²</span>
      </div>

      <div className="relative w-full flex flex-col items-center">
        <Slider.Root
          className="relative flex items-center w-full h-10"
          min={min}
          max={max}
          step={10}
          value={range}
          onValueChange={handleChange}
        >
          <Slider.Track className="relative h-1 w-full bg-yellow-500">
            <Slider.Range className="absolute h-1 bg-red-500" />
          </Slider.Track>

          {range.map((value, index) => (
            <Slider.Thumb
              key={index}
              className="w-5 h-5 bg-red-500 rounded-full border-2 border-white cursor-pointer shadow-md"
            />
          ))}
        </Slider.Root>
      </div>

      <div className="text-center">
        <p className="text-red-500">
          <strong>Upper:</strong> {range[1]} W/m²
        </p>
        <p className="text-red-500">
          <strong>Lower:</strong> {range[0]} W/m²
        </p>
      </div>
    </div>
  );
};

export default LightLevelSlider;
