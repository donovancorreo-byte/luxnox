import Image from "next/image";

interface LuxNoxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { textH: 44, svgSize: 48, gap: 6  },
  md: { textH: 70, svgSize: 78, gap: 10 },
  lg: { textH: 128, svgSize: 142, gap: 18 },
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

// lux-la-raiz.png is ~500x500, nox-del-arte.png is ~560x500 (approx square)
export default function LuxNoxLogo({ className = "", size = "md" }: LuxNoxLogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${className}`} style={{ gap: s.gap }}>
      {/* LUX — La raíz */}
      <Image
        src="/lux-la-raiz.png"
        alt="LUX La raíz"
        height={s.textH}
        width={s.textH}
        style={{ objectFit: "contain" }}
      />

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

      {/* NOX — del arte */}
      <Image
        src="/nox-del-arte.png"
        alt="NOX del arte"
        height={s.textH}
        width={s.textH}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
