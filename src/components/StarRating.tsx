import { Star } from 'lucide-react';

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ value, onChange, size = 22, showValue = false }: Props) {
  const interactive = !!onChange;
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= rounded;
        const half = !filled && i - 0.5 <= value;
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(i)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-transform ${interactive ? 'hover:scale-110 active:scale-95' : ''}`}
            aria-label={`${i}/5`}
          >
            <Star
              width={size}
              height={size}
              className={filled
                ? 'fill-gold-400 text-gold-400'
                : half
                  ? 'fill-gold-200 text-gold-300'
                  : 'fill-gray-100 text-gray-200'}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="ms-2 text-sm font-bold text-gray-700">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
