import React from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Image,
  Images,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useSiteData } from "context/SiteDataContext";
import { cardClass } from "../components/ui";
import AdminPageHeader from "../components/AdminPageHeader";

const Overview = () => {
  const { siteData } = useSiteData();

  const totalProjects = siteData?.projects?.length ?? 0;
  const liveProjects =
    siteData?.projects?.filter((p) => p.projStatus).length ?? 0;
  const aboutImages = siteData?.about?.images?.length ?? 0;
  const cvSet = Boolean(siteData?.cv?.url);

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: FolderKanban },
    { label: "Live Projects", value: liveProjects, icon: FolderKanban },
    { label: "About Images", value: aboutImages, icon: Images },
    { label: "Resume", value: cvSet ? "Uploaded" : "Not set", icon: FileText },
  ];

  const quickActions = [
    { to: "/dashboard/hero", label: "Update Hero Image", icon: Image },
    { to: "/dashboard/about", label: "Manage About Images", icon: Images },
    { to: "/dashboard/cv", label: "Upload Resume", icon: FileText },
    { to: "/dashboard/projects", label: "Manage Projects", icon: FolderKanban },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <AdminPageHeader
        title="Welcome back, Henry"
        description={`${new Date().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })} — here's what's happening on your portfolio.`}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 gap-3 mobile:gap-2">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${cardClass} !gap-3`}>
            <div className="w-10 h-10 rounded-lg bg-Primary_Accents_md flex items-center justify-center">
              <Icon className="w-5 h-5 text-Primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-Background">{value}</span>
              <span className="text-sm text-GrayCustom">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions + Recent projects */}
      <div className="flex flex-col desktop:flex-row gap-6">
        <section className={`${cardClass} desktop:w-[40%]`}>
          <h2 className="text-lg font-bold text-Primary">Quick Actions</h2>
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-1 gap-3">
            {quickActions.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between p-4 rounded-xl border border-Secondary/20 bg-DarkBg2 hover:border-Primary transition-colors group"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-Background">
                  <Icon className="w-5 h-5 text-Primary" /> {label}
                </span>
                <ArrowRight className="w-4 h-4 text-GrayCustom group-hover:text-Primary" />
              </Link>
            ))}
          </div>
        </section>

        <section className={`${cardClass} desktop:w-[60%]`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-Primary">Recent Projects</h2>
          <Link
            to="/dashboard/projects"
            className="text-sm text-Primary hover:underline"
          >
            View all
          </Link>
        </div>

        {siteData?.projects?.length ? (
          <div className="flex flex-col divide-y divide-Secondary/10">
            {siteData.projects.slice(0, 4).map((p) => (
              <div key={p.title} className="flex items-center gap-4 py-3">
                <div className="w-14 h-14 rounded-lg bg-DarkBg10 flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-GrayCustom/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-Background truncate">
                    {p.title}
                  </p>
                  <p className="text-xs text-GrayCustom truncate">
                    {(p.technologies || []).join(", ")}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    p.projStatus
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {p.projStatus ? "Live" : "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-GrayCustom">
            No projects yet. Add one from the Projects page.
          </p>
        )}
      </section>
      </div>
    </div>
  );
};

export default Overview;
