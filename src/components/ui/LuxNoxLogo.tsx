interface LuxNoxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: 21, sub: 8,  svgSize: 54,  gap: 8  },
  md: { text: 34, sub: 12, svgSize: 86,  gap: 14 },
  lg: { text: 62, sub: 18, svgSize: 156, gap: 22 },
};

// [cx, cy, r, color] — viewBox "-2 -2 104 104"
// Top/bottom moved further from rows 2/6 for correct proportional gap
const dots: [number, number, number, string][] = [
  [50,   6, 8.5, "#312E81"],  // top — deep indigo (large)
  [17,  28, 8.5, "#1565C0"],  // row2 left — deep blue (large)
  [50,  28, 6.0, "#1565C0"],  // row2 center — blue
  [83,  28, 8.5, "#1565C0"],  // row2 right — deep blue (large)
  [32,  41, 6.0, "#29B6F6"],  // row3 left — sky cyan
  [68,  41, 6.0, "#29B6F6"],  // row3 right — sky cyan
  [50,  51, 5.0, "#43A047"],  // center — green (smallest)
  [32,  61, 6.0, "#EAB308"],  // row5 left — yellow
  [68,  61, 6.0, "#EAB308"],  // row5 right — yellow
  [17,  74, 8.5, "#F97316"],  // row6 left — orange (large)
  [50,  74, 6.0, "#F97316"],  // row6 center — orange
  [83,  74, 8.5, "#F97316"],  // row6 right — orange (large)
  [50,  94, 8.5, "#E53935"],  // bottom — red (large)
];

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, #545454, #111111)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function LuxNoxLogo({ className = "", size = "md" }: LuxNoxLogoProps) {
  const s = sizes[size];

  return (
    <div
      className={`flex items-center ${className}`}
      style={{ gap: s.gap }}
    >
      {/* LUX */}
      <div className="text-right leading-none">
        <p
          className="font-black tracking-tight leading-none"
          style={{ fontSize: s.text, ...gradientStyle }}
        >
          LUX
        </p>
        <p
          className="font-medium tracking-widest uppercase"
          style={{ fontSize: s.sub, color: "#888888", marginTop: s.text * 0.06 }}
        >
          La raíz
        </p>
      </div>

      {/* Dot constellation */}
      <svg
        viewBox="-2 -4 104 108"
        width={s.svgSize}
        height={s.svgSize}
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map(([cx, cy, r, color], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={color} />
        ))}
      </svg>

      {/* NOX */}
      <div className="text-left leading-none">
        <p
          className="font-black tracking-tight leading-none"
          style={{ fontSize: s.text, ...gradientStyle }}
        >
          NOX
        </p>
        <p
          className="font-medium tracking-widest uppercase"
          style={{ fontSize: s.sub, color: "#888888", marginTop: s.text * 0.06 }}
        >
          del arte
        </p>
      </div>
    </div>
  );
}
