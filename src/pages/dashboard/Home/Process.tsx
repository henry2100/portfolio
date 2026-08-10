import PageHeader from "components/molecules/PageHeader";
import CheckList from "components/atoms/CheckList";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "components/atoms/MotionWrapper";
import {
  developmentProcess,
  projectTimeline,
  paymentTerms,
  supportPackage,
  techStack,
  devopsServices,
} from "../../../mockData/brandData";

const Process = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-12 justify-start items-center">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          How We Work
        </span>
      </FadeUp>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="Our Development Process"
          pageDesc="A proven 7-step process from first conversation to post-launch support."
          pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
          pageDescStyle="text-sm text-GrayCustom"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5"
          staggerDelay={0.08}
        >
          {developmentProcess.map((item, index) => (
            <StaggerItem key={item.step} className="h-full">
              <div className="w-full h-full flex flex-col gap-2 p-5 rounded-lg border border-Secondary/30 bg-DarkBg2 hover:border-Primary transition-colors duration-300">
                <span className="text-4xl mobile:text-3xl font-[800] text-Primary/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold text-Secondary group-hover:text-Primary">
                  {item.step}
                </span>
                <p className="text-sm text-GrayCustom text-left leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 gap-8">
        <div className="w-full flex flex-col gap-6">
          <PageHeader
            pageTitle="Estimated Project Timeline"
            pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
            headerLayout="!pb-0 w-full"
          />
          <div className="flex flex-col gap-3">
            {projectTimeline.map((row) => (
              <div
                key={row.type}
                className="flex justify-between items-center gap-4 px-5 py-3 rounded-lg border border-Secondary/30 bg-DarkBg2 hover:border-Primary transition-colors duration-300"
              >
                <span className="text-sm text-Secondary text-left">{row.type}</span>
                <span className="text-sm font-semibold text-Primary whitespace-nowrap">
                  {row.delivery}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <PageHeader
            pageTitle="Payment Terms"
            pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
            headerLayout="!pb-0 w-full"
          />
          <div className="p-5 rounded-lg border border-Secondary/30 bg-DarkBg2">
            <CheckList items={paymentTerms} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle={supportPackage.title}
          pageDesc={supportPackage.subtitle}
          pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
          pageDescStyle="text-sm text-GrayCustom"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-5"
          staggerDelay={0.06}
        >
          {supportPackage.benefits.map((benefit) => (
            <StaggerItem key={benefit.title} className="h-full">
              <div className="w-full h-full flex flex-col gap-2 p-5 rounded-lg border border-Primary/30 bg-Primary_Accents_2xs hover:border-Primary transition-colors duration-300">
                <span className="font-semibold text-Primary">{benefit.title}</span>
                <p className="text-sm text-GrayCustom text-left leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="w-full flex flex-col gap-3 p-5 rounded-lg border border-Secondary/30 bg-DarkBg2">
          <span className="text-xs uppercase tracking-widest text-GrayCustom font-medium">
            Important Information
          </span>
          <CheckList items={supportPackage.notes} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="Technology Stack"
          pageDesc="Modern, secure, and scalable technologies used to deliver every project."
          pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
          pageDescStyle="text-sm text-GrayCustom"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-5"
          staggerDelay={0.05}
        >
          {techStack.map((group) => (
            <StaggerItem key={group.label} className="h-full">
              <div className="w-full h-full flex flex-col gap-3 p-5 rounded-lg border border-Secondary/30 bg-DarkBg2 hover:border-Primary transition-colors duration-300">
                <span className="uppercase tracking-widest text-xs text-Primary font-medium">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full border border-Primary/40 text-xs text-GrayCustom bg-Primary_Accents_2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="DevOps & Third-Party Services"
          pageDesc="Billed separately by their respective providers when applicable."
          pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
          pageDescStyle="text-sm text-GrayCustom"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 gap-3"
          staggerDelay={0.04}
        >
          {devopsServices.map((item) => (
            <StaggerItem key={item.service}>
              <div className="flex justify-between items-center gap-4 px-5 py-3 rounded-lg border border-Secondary/30 bg-DarkBg2 hover:border-Primary transition-colors duration-300">
                <span className="text-sm text-Secondary text-left">{item.service}</span>
                <span className="text-xs text-GrayCustom text-right">{item.purpose}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-xs text-GrayCustom text-left leading-relaxed">
          Note: Most of these services offer free plans suitable for small
          businesses. If your project grows, paid plans may become necessary
          based on usage. We are happy to assist with the setup and
          configuration of all required services.
        </p>
      </div>
    </div>
  );
};

export default Process;
