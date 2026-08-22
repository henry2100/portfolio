import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
}) => (
  <div className={`max-w-6xl w-full mobile:!px-4 mobile:!py-2 tablet:p-8 ${className}`}>
    {children}
  </div>
);

export default SectionContainer;
