interface LuxNoxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: 18, sub: 8, dot: 5, gap: 7, containerH: 60 },
  md: { text: 28, sub: 11, dot: 7, gap: 10, containerH: 90 },
  lg: { text: 52, sub: 16, dot: 12, gap: 17, containerH: 160 },
};

const dots = [
  // [cx, cy, color] — normalized to a 100x100 grid
  [50, 5, "#3730A3"],   // top — indigo
  [35, 22, "#1D4ED8"],  // row2 left — blue
  [50, 22, "#2563EB"],  // row2 center
  [65, 22, "#1D4ED8"],  // row2 right
  [38, 38, "#0EA5E9"],  // row3 left — cyan
  [62, 38, "#0EA5E9"],  // row3 right
  [50, 50, "#22C55E"],  // center — green
  [38, 62, "#EAB308"],  // row5 left — yellow
  [62, 62, "#EAB308"],  // row5 right
  [35, 78, "#F97316"],  // row6 left — orange
  [50, 78, "#F97316"],  // row6 center
  [65, 78, "#F97316"],  // row6 right
  [50, 95, "#EF4444"],  // bottom — red
];

export default function LuxNoxLogo({ className = "", size = "md" }: LuxNoxLogoProps) {
  const s = sizes[size];
  const dotScale = s.dot / 7; // normalized from md

  return (
    <div className={`flex items-center gap-${size === "lg" ? "6" : "3"} ${className}`}>
      {/* LUX */}
      <div className="text-right">
        <p
          className="font-black tracking-tight text-white leading-none"
          style={{ fontSize: s.text }}
        >
          LUX
        </p>
        <p
          className="text-foreground/40 font-medium tracking-widest uppercase"
          style={{ fontSize: s.sub }}
        >
          La raíz
        </p>
      </div>

      {/* Dot constellation */}
      <svg
        viewBox="0 0 100 100"
        style={{ width: s.containerH * 0.55, height: s.containerH * 0.55 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map(([cx, cy, color], i) => (
          <circle key={i} cx={cx} cy={cy} r={s.dot} fill={color as string} />
        ))}
      </svg>

      {/* NOX */}
      <div className="text-left">
        <p
          className="font-black tracking-tight text-foreground leading-none"
          style={{ fontSize: s.text }}
        >
          NOX
        </p>
        <p
          className="text-foreground/40 font-medium tracking-widest uppercase"
          style={{ fontSize: s.sub }}
        >
          del arte
        </p>
      </div>
    </div>
  );
}
