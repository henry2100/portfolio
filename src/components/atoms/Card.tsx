import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border transition-colors duration-300 ${className}`}
    style={{ borderColor: "var(--site-card-border)", background: "var(--site-card-bg)" }}
  >
    {children}
  </div>
);

export default Card;
