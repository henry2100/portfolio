import React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className = "" }) => (
  <span
    className={`px-3 py-1 rounded-full border border-Primary/40 text-xs bg-Primary_Accents_2xs ${className}`}
    style={{ color: 'var(--site-text-gray)' }}
  >
    {children}
  </span>
);

export default Tag;
