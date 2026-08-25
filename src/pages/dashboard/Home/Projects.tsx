import { useState } from "react";
import ProjectPreview from "components/organisms/ProjectPreview";
import { projectsData as fallbackProjects } from "../../../mockData/projectsData";
import { StaggerContainer, StaggerItem, FadeUp } from "components/atoms/MotionWrapper";
import SectionContainer from "components/atoms/SectionContainer";
import { useSiteData } from "../../../context/SiteDataContext";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PER_PAGE_OPTIONS = [1, 2, 3, 5, 10];

const Projects = () => {
  const { siteData } = useSiteData();
  const projects = siteData?.projects?.length ? siteData.projects : fallbackProjects;
  const total = projects?.length || 0;

  const [perPage, setPerPage] = useState(2);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const current = projects?.slice(start, start + perPage) || [];

  const goTo = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <SectionContainer className="flex flex-col gap-10">
      <FadeUp>
        <div className="flex flex-col items-start gap-3">
          <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl tablet:text-Primary uppercase" style={{ color: 'var(--site-text-secondary)' }}>
            Projects
          </span>
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-Primary rounded-full" />
            <span className="text-sm mobile:text-xs tracking-wider uppercase" style={{ color: 'var(--site-text-secondary)' }}>
              {total} Featured Works
            </span>
          </div>
        </div>
      </FadeUp>

      {/* Per Page Selector */}
      <FadeUp delay={0.1}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--site-text-secondary)' }}>Show</span>
          <div className="flex gap-1 flex-wrap">
            {PER_PAGE_OPTIONS.filter(n => n <= total).map((n) => (
              <button
                key={n}
                onClick={() => { setPerPage(n); setPage(1); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                  perPage === n
                    ? "bg-Primary text-white border-Primary"
                    : "bg-transparent border-BackDrop_d_md hover:border-Primary/50 hover:text-Primary"
                }`}
                style={perPage !== n ? { color: 'var(--site-text-secondary)' } : undefined}
              >
                {n}
              </button>
            ))}
          </div>
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--site-text-secondary)' }}>per page</span>
        </div>
      </FadeUp>

      {/* Project Cards */}
      <StaggerContainer
        className="w-full flex flex-col gap-12"
        staggerDelay={0.2}
        key={`${safePage}-${perPage}`}
      >
        {current.map((item) => (
          <StaggerItem key={item.title}>
            <div
              className={`group relative w-full rounded-2xl overflow-hidden border hover:border-Primary/30 transition-all duration-500 ${
                !item.projStatus ? "opacity-60 grayscale" : ""
              }`}
              style={{ borderColor: 'var(--site-card-border)', background: 'var(--site-card-bg)' }}
            >
              <div className="flex flex-col desktop:flex-row">
                {/* Preview Section */}
                <div className="relative w-full desktop:w-[60%] overflow-hidden">
                  {!item.projStatus && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <span className="px-6 py-2 rounded-full text-xs font-medium uppercase tracking-[0.2em] border shadow-lg" style={{ background: 'color-mix(in srgb, var(--site-bg-alt) 90%, transparent)', color: 'var(--site-text-gray)', borderColor: 'color-mix(in srgb, var(--site-text-gray) 50%, transparent)' }}>
                        Unavailable
                      </span>
                    </div>
                  )}
                  <ProjectPreview
                    url={item.projectLink}
                    title={item.title}
                    containerStyle="w-full aspect-[16/10] desktop:aspect-auto desktop:h-full desktop:min-h-[420px] rounded-none"
                  />
                </div>

                {/* Info Section */}
                <div className="w-full desktop:w-[40%] flex flex-col justify-between p-5 mobile:p-4 desktop:p-8 gap-5 mobile:gap-4" style={{ background: 'linear-gradient(to bottom, var(--site-card-bg), var(--site-bg-alt))' }}>
                  <div className="flex flex-col gap-4">
                    {/* Category Badge */}
                    <div className="flex flex-wrap gap-2">
                      {(item.projectCategory || []).map((cat, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold uppercase tracking-[0.15em] text-Primary bg-Primary_Accents_xs px-3 py-1 rounded-full border border-Primary/20"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font_cabinet-bold text-2xl desktop:text-3xl leading-tight" style={{ color: 'var(--site-text-white)' }}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--site-text-secondary)' }}>
                      {item.projectDesc}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(item.technologies || []).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-md border"
                          style={{ color: 'var(--site-text-gray)', background: 'var(--site-bg-alt)', borderColor: 'var(--site-card-border)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  {item.projStatus && item.projectLink && (
                    <a
                      href={item.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-Primary hover:text-white bg-Primary_Accents_xs hover:bg-Primary px-5 py-2.5 rounded-full border border-Primary/30 transition-all duration-300 w-fit"
                    >
                      View Project
                      <FiExternalLink className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <FadeUp delay={0.1}>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => goTo(safePage - 1)}
              disabled={safePage === 1}
              className="p-2 rounded-full border border-BackDrop_d_md hover:border-Primary hover:text-Primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              style={{ color: 'var(--site-text-secondary)' }}
            >
              <FiChevronLeft className="text-sm" />
            </button>

            {pages.map((p) => (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={`w-9 h-9 rounded-full text-xs font-medium border transition-all duration-300 ${
                  p === safePage
                    ? "bg-Primary text-white border-Primary"
                    : "bg-transparent border-BackDrop_d_md hover:border-Primary/50 hover:text-Primary"
                }`}
                style={p !== safePage ? { color: 'var(--site-text-secondary)' } : undefined}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goTo(safePage + 1)}
              disabled={safePage === totalPages}
              className="p-2 rounded-full border border-BackDrop_d_md hover:border-Primary hover:text-Primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              style={{ color: 'var(--site-text-secondary)' }}
            >
              <FiChevronRight className="text-sm" />
            </button>
          </div>
        </FadeUp>
      )}
    </SectionContainer>
  );
};

export default Projects;
