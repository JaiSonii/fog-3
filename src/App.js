import { useState, useEffect } from "react";

function App() {
  const [rows, setRows] = useState(15);
  const [columns, setColumns] = useState(20);
  const [clicked, setClicked] = useState(null);
  const [size, setSize] = useState(1);
  const [running, setRunning] = useState(false);
  const speed = 500;

  const color = { r: 32, g: 247, b: 0 };
  const blackColor = { r: 51, g: 56, b: 52 };

  const handleClick = (r, c) => {
    setClicked({ row: r, col: c });
    setSize(1);
    setRunning(true);
  };

  useEffect(() => {
    if (!running || !clicked) return;

    const interval = setInterval(() => {
      setSize((prev) => {
        if (
          clicked.row - prev < 0 &&
          clicked.row + prev >= rows &&
          clicked.col - prev < 0 &&
          clicked.col + prev >= columns
        ) {
          return 1; // Reset size when boundaries are reached
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [running, clicked, rows, columns]);

  const getColor = (r, c) => {
    if (!clicked) {
      return `rgb(${blackColor.r}, ${blackColor.g}, ${blackColor.b})`;
    }
    const row = clicked.row;
    const col = clicked.col;

    if (
      (r === row - size || r === row + size || c === col - size || c === col + size) &&
      (r >= row - size && r <= row + size) &&
      (c >= col - size && c <= col + size)
    ) {
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-neon text-4xl font-bold mb-4 text-white">Dynamic Grid (FOG-2)</h1>
      <div className="grid-container bg-gray-900 p-2 rounded-lg shadow-lg overflow-hidden">
        {Array.from({ length: rows }).map((_, j) => (
          <div key={j} className="flex">
            {Array.from({ length: columns }).map((_, i) => (
              <div
                key={i}
                className="h-[30px] w-[30px] border border-gray-700 rounded-sm transition-all duration-150 hover:scale-110 shadow-lg"
                onClick={() => handleClick(j, i)}
                style={{ backgroundColor: getColor(j, i) }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;