import React, { useEffect, useState, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, verifyToken } from "../../services/siteData";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopNav";
import Spinner from "components/atoms/Spinner";

const AdminLayout = () => {
  const token = getToken();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authValid, setAuthValid] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => sessionStorage.getItem("admin_sidebar_collapsed") === "true"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("admin_sidebar_collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!token) {
      setCheckingAuth(false);
      return;
    }
    verifyToken(token)
      .then(setAuthValid)
      .catch(() => setAuthValid(false))
      .finally(() => setCheckingAuth(false));
  }, [token]);

  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner borderStyle="border-4 border-Primary border-r-transparent w-8 h-8" />
      </div>
    );
  }

  if (!authValid) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        onMobileClose={handleMobileClose}
        mobileOpen={mobileOpen}
      />
      <div className={`app-main ${collapsed ? "app-main--collapsed" : ""}`}>
        <TopBar onToggleMobileSidebar={() => setMobileOpen((o) => !o)} />
        <main className="main-content">
          <div className="main-content-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
