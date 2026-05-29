interface LuxNoxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: 21, sub: 8,  svgSize: 54,  gap: 8  },
  md: { text: 34, sub: 12, svgSize: 86,  gap: 14 },
  lg: { text: 62, sub: 18, svgSize: 156, gap: 22 },
};

// Coordenadas exactas del SVG original (viewBox 0 0 936 905)
const dots: [number, number, number, string][] = [
  [461,  79, 70, "#2E3192"],
  [144, 262, 70, "#005AAB"],
  [461, 262, 59, "#005AAB"],
  [779, 262, 70, "#005AAB"],
  [302, 354, 59, "#00A0E4"],
  [620, 354, 59, "#00A0E4"],
  [461, 445, 47, "#3AB54A"],
  [302, 538, 59, "#FFD504"],
  [620, 538, 59, "#FFD504"],
  [144, 629, 70, "#F7941D"],
  [461, 629, 59, "#F7941D"],
  [779, 629, 70, "#F7941D"],
  [461, 813, 70, "#ED1B24"],
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
        viewBox="0 0 936 905"
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
