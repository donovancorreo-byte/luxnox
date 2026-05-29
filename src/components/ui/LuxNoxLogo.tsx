import Image from "next/image";

interface LuxNoxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 140, height: 56 },
  md: { width: 220, height: 89 },
  lg: { width: 380, height: 153 },
};

export default function LuxNoxLogo({ className = "", size = "md" }: LuxNoxLogoProps) {
  const s = sizes[size];
  return (
    <Image
      src="/logo.jpg"
      alt="LUX NOX — La raíz del arte"
      width={s.width}
      height={s.height}
      className={className}
      priority
    />
  );
}
