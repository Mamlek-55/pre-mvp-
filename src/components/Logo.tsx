interface Props {
  size?: number;
  withText?: boolean;
  textColor?: string;
}

export function Logo({ size = 40, withText = false, textColor = 'text-gray-900' }: Props) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path
          d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 Z"
          stroke="#C9A05C"
          strokeWidth="4"
        />
        <path
          d="M30 45 L42 38 L50 46 L58 38 L70 45 V62 L50 72 L30 62 Z"
          stroke="#C9A05C"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="50" cy="34" r="5" fill="#C9A05C" />
      </svg>
      {withText && (
        <span className={`font-bold tracking-wide ${textColor}`} style={{ fontSize: size * 0.42 }}>
          MAMLEK
        </span>
      )}
    </div>
  );
}
