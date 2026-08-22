import React from "react";

interface KeyValuePairRowProps {
  label: string;
  value: string;
  className?: string;
}

const KeyValuePairRow: React.FC<KeyValuePairRowProps> = ({
  label,
  value,
  className = "",
}) => (
  <div
    className={`flex justify-between items-center gap-3 mobile:gap-2 px-5 mobile:px-3 py-3 mobile:py-2.5 rounded-lg border hover:border-Primary transition-colors duration-300 ${className}`}
    style={{ borderColor: 'var(--site-card-border)', background: 'var(--site-card-bg)' }}
  >
    <span className="text-sm mobile:text-xs text-left min-w-0 flex-shrink" style={{ color: 'var(--site-text-secondary)' }}>{label}</span>
    <span className="text-sm mobile:text-xs font-semibold text-Primary whitespace-nowrap flex-shrink-0">
      {value}
    </span>
  </div>
);

export default KeyValuePairRow;
