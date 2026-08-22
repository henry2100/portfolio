import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { NavItem } from "../navConfig";

interface SidebarFlyoutProps {
  items: NavItem[];
  top: number;
  visible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: () => void;
}

const SidebarFlyout: React.FC<SidebarFlyoutProps> = ({
  items,
  top,
  visible,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom > vh) {
      el.style.top = `${Math.max(8, vh - rect.height - 8)}px`;
    }
  }, [visible, top]);

  if (!visible) return null;

  return createPortal(
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="sidebar-flyout"
      style={{ top: `${top}px` }}
    >
      <nav className="flex flex-col gap-0.5 py-2">
        {items.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `sidebar-flyout-item ${isActive ? "sidebar-flyout-item--active" : ""}`
            }
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            <span className="text-[13px] font-medium truncate">{title}</span>
          </NavLink>
        ))}
      </nav>
    </div>,
    document.body
  );
};

export default SidebarFlyout;
