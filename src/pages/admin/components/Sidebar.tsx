import React, { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PanelLeftClose, LogOut, Sun, Moon } from "lucide-react";
import { NAV_ITEMS } from "../navConfig";
import SidebarFlyout from "./SidebarFlyout";
import { clearToken } from "services/siteData";
import { useTheme } from "context/ThemeContext";

let _toggleMobile: (() => void) | null = null;
let _toggleCollapse: (() => void) | null = null;

export function toggleMobileSidebar() {
  _toggleMobile?.();
}
export function toggleCollapseSidebar() {
  _toggleCollapse?.();
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onMobileClose: () => void;
  mobileOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapsed,
  onMobileClose,
  mobileOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [flyoutVisible, setFlyoutVisible] = useState(false);
  const [flyoutTop, setFlyoutTop] = useState(0);

  const mobileToggle = useCallback(() => {
    if (mobileOpen) {
      onMobileClose();
    } else {
      document.querySelector<HTMLElement>("[data-mobile-toggle]")?.click();
    }
  }, [mobileOpen, onMobileClose]);

  const collapseToggle = useCallback(() => {
    onToggleCollapsed();
  }, [onToggleCollapsed]);

  useEffect(() => {
    _toggleMobile = mobileToggle;
    _toggleCollapse = collapseToggle;
    return () => {
      _toggleMobile = null;
      _toggleCollapse = null;
    };
  }, [mobileToggle, collapseToggle]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const isChildActive = (path: string) => location.pathname === path;

  const handleNavParentMouseEnter = (e: React.MouseEvent) => {
    if (!collapsed) return;
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setFlyoutTop(rect.top);
    setFlyoutVisible(true);
  };

  const handleFlyoutMouseLeave = () => {
    hideTimer.current = setTimeout(() => {
      setFlyoutVisible(false);
    }, 200);
  };

  const handleFlyoutMouseEnter = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const handleLogout = () => {
    clearToken();
    navigate("/dashboard/login");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onMobileClose} />
      )}

      <aside
        className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${
          mobileOpen ? "sidebar--mobile-open" : ""
        }`}
      >
        {/* Brand */}
        <div className={`sidebar-brand ${collapsed ? "sidebar-brand--collapsed" : ""}`}>
          <div className="sidebar-brand-logo">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          {!collapsed && (
            <div className="sidebar-brand-text">
              <span className="font-bold text-sm leading-tight">Portfolio</span>
              <span className="text-[11px] leading-tight">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ title, path, icon: Icon }) => {
            const active = isChildActive(path);
            return (
              <NavLink
                key={path}
                to={path}
                title={title}
                onClick={onMobileClose}
                onMouseEnter={handleNavParentMouseEnter}
                onMouseLeave={() => {
                  if (collapsed) {
                    handleFlyoutMouseLeave();
                  }
                }}
                className={`sidebar-nav-item ${active ? "sidebar-nav-item--active" : ""} ${
                  collapsed ? "sidebar-nav-item--collapsed" : ""
                }`}
              >
                <Icon className="sidebar-nav-icon" />
                {!collapsed && <span className="sidebar-nav-label">{title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`sidebar-footer ${collapsed ? "sidebar-footer--collapsed" : ""}`}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`sidebar-logout ${collapsed ? "sidebar-logout--collapsed" : ""}`}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="sidebar-nav-icon" />
            ) : (
              <Moon className="sidebar-nav-icon" />
            )}
            {!collapsed && (
              <span className="sidebar-nav-label">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>

          <div className={`sidebar-user ${collapsed ? "sidebar-user--collapsed" : ""}`}>
            <div className="sidebar-user-avatar">
              <span className="text-white text-xs font-bold">HA</span>
            </div>
            {!collapsed && (
              <div className="sidebar-user-info">
                <span className="text-sm font-medium leading-tight truncate">
                  Henry Adedugba
                </span>
                <span className="text-[11px] leading-tight">
                  Administrator
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`sidebar-logout ${collapsed ? "sidebar-logout--collapsed" : ""}`}
            title="Logout"
          >
            <LogOut className="sidebar-nav-icon" />
            {!collapsed && <span className="sidebar-nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Flyout for collapsed mode */}
      {collapsed && (
        <SidebarFlyout
          items={NAV_ITEMS}
          top={flyoutTop}
          visible={flyoutVisible}
          onMouseEnter={handleFlyoutMouseEnter}
          onMouseLeave={handleFlyoutMouseLeave}
          onNavigate={() => setFlyoutVisible(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
