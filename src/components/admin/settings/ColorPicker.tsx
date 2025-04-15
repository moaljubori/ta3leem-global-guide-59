
import { useState, useRef, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const predefinedColors = [
    "#1e40af", // blue-800
    "#1d4ed8", // blue-700
    "#2563eb", // blue-600
    "#3b82f6", // blue-500
    "#0f766e", // teal-700
    "#047857", // emerald-700
    "#15803d", // green-700
    "#4d7c0f", // lime-700
    "#a16207", // yellow-700
    "#b45309", // amber-700
    "#c2410c", // orange-700
    "#b91c1c", // red-700
    "#be123c", // rose-700
    "#9d174d", // pink-700
    "#7e22ce", // purple-700
    "#4338ca", // indigo-700
    "#000000", // black
    "#1f2937", // gray-800
    "#6b7280", // gray-500
    "#e5e7eb", // gray-200
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="w-8 h-8 rounded-md border border-gray-200 shadow-sm cursor-pointer"
            style={{ backgroundColor: color }}
            aria-label="اختر لونًا"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="p-2">
          <div className="grid grid-cols-5 gap-1 p-2">
            {predefinedColors.map((predefinedColor) => (
              <button
                key={predefinedColor}
                type="button"
                className="w-6 h-6 rounded-md border border-gray-200 cursor-pointer flex items-center justify-center"
                style={{ backgroundColor: predefinedColor }}
                onClick={() => handleColorSelect(predefinedColor)}
                aria-label={`اللون ${predefinedColor}`}
              >
                {color.toLowerCase() === predefinedColor.toLowerCase() && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLightColor(predefinedColor) ? "black" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string) => {
  // Convert hex color to RGB
  let r, g, b;
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    return true; // Default to true for non-hex colors
  }
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};
