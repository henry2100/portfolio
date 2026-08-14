import { useState } from "react";
import profileImg from "../../../assets/images/profile-6.jpg";
import DirComp from "components/atoms/DirComp/DirComp";
import { FadeUp, SlideLeft, SlideRight } from "components/atoms/MotionWrapper";
import { LayoutDashboard, Server, Plug, Gauge } from "lucide-react";

const About = () => {
  const profile = [
    {
      images: profileImg,
      title: "Henry Ebose Adedugba",
      proficiency: "Mid-level Software Engineer",
      description: "Frontend Developer || MERN Stack",
    },
  ];

  const tabs = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "tools", label: "Tools" },
  ];
  const [activeTab, setActiveTab] = useState("about");

  const focusAreas = [
    {
      icon: LayoutDashboard,
      title: "Responsive UIs",
      line: "Clean, fast interfaces with React & TypeScript",
    },
    {
      icon: Server,
      title: "Full-Stack Apps",
      line: "MERN stack projects from idea to launch",
    },
    {
      icon: Plug,
      title: "Integrations",
      line: "APIs, payments & authentication flows",
    },
    {
      icon: Gauge,
      title: "Performance",
      line: "Optimized dashboards that load fast",
    },
  ];

  const experience = [
    {
      company: "Seerbit",
      role: "Software Engineer",
      desc: "Built and revamped fintech platforms — merchant dashboards, partner portals, and fund management tools.",
    },
    {
      company: "Interswitch",
      role: "Frontend Developer",
      desc: "Delivered reliable, high-impact frontend solutions in a large-scale payments ecosystem.",
    },
    {
      company: "Jaroy Investments",
      role: "Web Developer",
      desc: "Developed client-facing websites, turning business needs into clean, functional interfaces.",
    },
  ];

  const tools = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "Redux",
    "JavaScript",
    "REST APIs",
    "Git",
  ];

  return (
    <div className="max-w-6xl w-full min-h-[70vh] h-fit mobile:min-h-screen flex flex-col justify-center items-center gap-10 mobile:!p-5 tablet:p-8">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          About Henry
        </span>
      </FadeUp>

      <div className="w-full flex mobile:flex-col justify-center items-center tablet:items-start gap-10 mb-10">
        {profile.map((item, i) => (
          <SlideLeft key={i} delay={0.2} className="w-full">
            <DirComp
              itemIndex={i}
              {...item}
              imgStyle="!scale-100"
              wrapperStyle="!h-[70vh] flex justify-center items-center rounded-xl overflow-hidden"
              overlayStyle="!bg-BackDrop_d_xl !flex !flex-col !justify-end !items-end"
              overlayContentLayout="!h-fit !w-full"
              overlayDescriptionLayout="!h-fit !w-full !flex !justify-end mobile:!justify-center items-center"
            />
          </SlideLeft>
        ))}
        <SlideRight delay={0.3} className="relative w-full min-h-[70vh]">
          <div className="absolute top-0 left-0 w-full h-0 border-t border-t-Background border-l-[100px] border-l-BackDrop_l_xs border-r-[100px] border-r-BackDrop_l_xs"></div>
          <div className="absolute bottom-0 mobile:-bottom-5 left-0 right-0 mx-auto w-1/2 h-0 border-b border-Primary border-l-[50px] border-l-BackDrop_l_xs border-r-[50px] border-r-BackDrop_l_xs"></div>

          <div className="w-full h-full py-5 flex flex-col items-start gap-6">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "bg-Primary text-white"
                      : "text-GrayCustom border border-Secondary/30 hover:text-Primary hover:border-Primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <FadeUp key={activeTab} className="w-full">
              {activeTab === "about" && (
                <div className="flex flex-col gap-3">
                  <p className="text-Background text-[17px] mobile:text-base text-left leading-[28px]">
                    I'm <b className="text-Primary font-bold">Henry</b> — a
                    software engineer who enjoys turning complex problems into
                    simple, fast, and genuinely useful products.
                  </p>
                  <p className="text-Background text-[17px] mobile:text-base text-left leading-[28px]">
                    For the past 4+ years, I've built web apps across fintech
                    and enterprise — always focused on what actually helps the
                    people using them.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {focusAreas.map(({ icon: Icon, title, line }) => (
                      <div
                        key={title}
                        className="flex flex-col gap-2 p-4 rounded-lg border border-Secondary/30 bg-DarkBg2"
                      >
                        <Icon className="w-5 h-5 text-Primary" />
                        <span className="font-semibold text-Background text-sm">
                          {title}
                        </span>
                        <span className="text-xs text-GrayCustom text-left leading-relaxed">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="relative flex flex-col gap-6 pl-6">
                  <span className="absolute left-[5px] top-1 bottom-1 w-px bg-Primary/30" />
                  {experience.map((item) => (
                    <div key={item.company} className="relative">
                      <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-Primary border-2 border-Background" />
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-Primary">
                          {item.company}
                        </span>
                        <span className="text-sm text-GrayCustom">
                          {item.role}
                        </span>
                      </div>
                      <p className="text-sm text-Background/80 text-left leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "tools" && (
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full border border-Primary/40 text-xs text-GrayCustom bg-Primary_Accents_2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </FadeUp>
          </div>
        </SlideRight>
      </div>
    </div>
  );
};

export default About;
