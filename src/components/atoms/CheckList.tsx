import React from "react";
import { CheckCircle2 } from "lucide-react";

interface CheckListProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  icon?: React.ElementType;
}

const CheckList: React.FC<CheckListProps> = ({
  items,
  className = "",
  itemClassName = "",
  icon: Icon = CheckCircle2,
}) => {
  return (
    <ul className={`w-full grid grid-cols-1 mobile:grid-cols-1 gap-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={`flex items-start gap-3 text-left ${itemClassName}`}>
          <Icon className="w-5 h-5 mobile:w-4 mobile:h-4 text-Primary mt-0.5 flex-shrink-0" />
          <span className="text-sm mobile:text-xs leading-relaxed" style={{ color: 'var(--site-text-secondary)' }}>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default CheckList;
