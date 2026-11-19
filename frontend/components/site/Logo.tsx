import Image from "next/image";

type Props = { variant?: "blanc" | "rouge" | "noir"; size?: number; className?: string };

export function Logo({ variant = "blanc", size = 36, className }: Props) {
  return (
    <Image
      src={`/brand/studio-castel-c-${variant}.svg`}
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  );
}
