type WeavePayLogoProps = {
  className?: string;
};

export function WeavePayLogo({ className = "" }: WeavePayLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 132 74"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="weavepay-mark-gradient" x1="13" x2="118" y1="64" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--ink)" />
          <stop offset="0.62" stopColor="#2F6A43" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <path
        d="M13 15c0 10 8 14 16 22 7 7 8 13 8 19 0 6-4 10-9 10-7 0-12-8-12-17 0-6 2-12 5-17l16-17c5 18 9 31 15 47 5-18 10-31 16-47l16 17c3 5 5 11 5 17 0 9-5 17-12 17-5 0-9-4-9-10 0-6 1-12 8-19 8-8 16-12 16-22 0-6-4-11-10-11-7 0-12 7-12 17 0 5 2 11 5 16l18 20m0 0c3-12 14-21 26-21 9 0 16 5 16 13 0 8-7 13-16 13h-14m0-26v47"
        stroke="url(#weavepay-mark-gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <path
        d="M102 55c0-13 11-23 24-23"
        stroke="var(--paper-soft)"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}
