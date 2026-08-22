import React from "react";
import { FadeUp } from "./MotionWrapper";

interface SectionTitleProps {
  children: React.ReactNode;
  delay?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, delay }) => (
  <FadeUp delay={delay}>
    <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl tablet:text-Primary group-hover:text-Primary uppercase" style={{ color: 'var(--site-text-secondary)' }}>
      {children}
    </span>
  </FadeUp>
);

export default SectionTitle;
