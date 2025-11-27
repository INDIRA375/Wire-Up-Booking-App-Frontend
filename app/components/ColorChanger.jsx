"use client";

export default function ColorChanger({ onColorChange }) {
  return (
    <div className="fixed top-4 right-4 flex gap-2">
      {["#ffffff", "#f3f4f6", "#e5e7eb", "#d1d5db"].map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className="w-6 h-6 rounded-full border shadow"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}