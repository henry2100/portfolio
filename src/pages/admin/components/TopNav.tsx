import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  PanelLeftClose,
  ExternalLink,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { findNavItem } from "../navConfig";
import { clearToken } from "services/siteData";
import { toggleCollapseSidebar } from "./Sidebar";
import { useTheme } from "context/ThemeContext";

interface TopBarProps {
  onToggleMobileSidebar: () => void;
}

const buildBreadcrumbs = (pathname: string) => {
  const crumbs: { label: string; path?: string; icon?: React.ReactNode }[] = [];

  crumbs.push({
    label: "Home",
    path: "/dashboard/overview",
    icon: <LayoutDashboard className="w-3.5 h-3.5" />,
  });

  const navItem = findNavItem(pathname);
  if (navItem) {
    crumbs.push({
      label: navItem.title,
    });
  }

  return crumbs;
};

const TopBar: React.FC<TopBarProps> = ({ onToggleMobileSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const breadcrumbs = buildBreadcrumbs(location.pathname);

  const handleLogout = () => {
    clearToken();
    navigate("/dashboard/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Mobile hamburger */}
        <button
          data-mobile-toggle
          onClick={onToggleMobileSidebar}
          className="topbar-btn topbar-btn--mobile"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop collapse button */}
        <button
          onClick={toggleCollapseSidebar}
          className="topbar-btn topbar-btn--desktop"
          title="Toggle sidebar"
        >
          <PanelLeftClose className="w-[18px] h-[18px]" />
        </button>

        {/* Breadcrumbs */}
        <nav className="topbar-breadcrumbs">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight className="topbar-breadcrumb-sep" />}
                {crumb.path && !isLast ? (
                  <Link to={crumb.path} className="topbar-breadcrumb-link">
                    {crumb.icon && <span className="flex-shrink-0">{crumb.icon}</span>}
                    <span>{crumb.label}</span>
                  </Link>
                ) : (
                  <span className={`topbar-breadcrumb-current ${isLast ? "" : ""}`}>
                    {crumb.icon && <span className="flex-shrink-0">{crumb.icon}</span>}
                    <span>{crumb.label}</span>
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <div className="topbar-right">
        <button
          onClick={toggleTheme}
          className="topbar-btn"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
        <Link
          to="/main"
          target="_blank"
          className="topbar-action"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="topbar-action-label">View Site</span>
        </Link>
        <button onClick={handleLogout} className="topbar-action topbar-action--danger">
          <LogOut className="w-4 h-4" />
          <span className="topbar-action-label">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
