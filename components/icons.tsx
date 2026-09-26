import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({
  children,
  size = 18,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);
export const Check = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);
export const ChevronDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
export const Clock = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
export const Flame = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 21c4 0 7-2.8 7-7 0-3.3-2-5.8-5-8.5.1 2.2-.7 3.5-2.1 4.3C12 6.4 10.4 4 8 3c.2 3.6-3 5.5-3 10.3C5 17.8 8.1 21 12 21Z" />
  </Icon>
);
export const Heart = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 8.8 2.5Z" />
  </Icon>
);
export const Menu = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);
export const Search = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m16 16 4 4" />
  </Icon>
);
export const Star = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.7l6.2-.9L12 3Z" />
  </Icon>
);
export const X = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
);
