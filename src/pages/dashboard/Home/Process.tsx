import PageHeader from "components/molecules/PageHeader";
import CheckList from "components/atoms/CheckList";
import {
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
import SectionContainer from "components/atoms/SectionContainer";
import SectionTitle from "components/atoms/SectionTitle";
import Card from "components/atoms/Card";
import KeyValuePairRow from "components/atoms/KeyValuePairRow";
import Tag from "components/atoms/Tag";

const Process = () => {
  return (
    <SectionContainer className="flex flex-col gap-12 justify-start items-center">
      <SectionTitle>How We Work</SectionTitle>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="Our Development Process"
          pageDesc="A proven 7-step process from first conversation to post-launch support."
          pageTitleStyle="!text-3xl mobile:!text-2xl"
          pageDescStyle="text-sm"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5"
          staggerDelay={0.08}
        >
          {developmentProcess.map((item, index) => (
            <StaggerItem key={item.step} className="h-full">
              <Card className="!p-5 !flex !flex-col !gap-2">
                <span className="text-4xl mobile:text-3xl font-[800] text-Primary/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold group-hover:text-Primary" style={{ color: 'var(--site-text-secondary)' }}>
                  {item.step}
                </span>
                <p className="text-sm text-left leading-relaxed" style={{ color: 'var(--site-text-gray)' }}>
                  {item.desc}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 gap-8">
        <div className="w-full flex flex-col gap-6">
          <PageHeader
            pageTitle="Estimated Project Timeline"
            pageTitleStyle="!text-3xl mobile:!text-2xl"
            headerLayout="!pb-0 w-full"
          />
          <div className="flex flex-col gap-3">
            {projectTimeline.map((row) => (
              <KeyValuePairRow
                key={row.type}
                label={row.type}
                value={row.delivery}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <PageHeader
            pageTitle="Payment Terms"
            pageTitleStyle="!text-3xl mobile:!text-2xl"
            headerLayout="!pb-0 w-full"
          />
          <Card className="!p-5">
            <CheckList items={paymentTerms} />
          </Card>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle={supportPackage.title}
          pageDesc={supportPackage.subtitle}
          pageTitleStyle="!text-3xl mobile:!text-2xl"
          pageDescStyle="text-sm"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-5"
          staggerDelay={0.06}
        >
          {supportPackage.benefits.map((benefit) => (
            <StaggerItem key={benefit.title} className="h-full">
              <Card className="!p-5 !flex !flex-col !gap-2 !border-Primary/30 !bg-Primary_Accents_2xs">
                <span className="font-semibold text-Primary">{benefit.title}</span>
                <p className="text-sm text-left leading-relaxed" style={{ color: 'var(--site-text-gray)' }}>
                  {benefit.desc}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Card className="!p-5 !flex !flex-col !gap-3">
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--site-text-gray)' }}>
            Important Information
          </span>
          <CheckList items={supportPackage.notes} />
        </Card>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="Technology Stack"
          pageDesc="Modern, secure, and scalable technologies used to deliver every project."
          pageTitleStyle="!text-3xl mobile:!text-2xl"
          pageDescStyle="text-sm"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-5"
          staggerDelay={0.05}
        >
          {techStack.map((group) => (
            <StaggerItem key={group.label} className="h-full">
              <Card className="!p-5 !flex !flex-col !gap-3">
                <span className="uppercase tracking-widest text-xs text-Primary font-medium">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="DevOps & Third-Party Services"
          pageDesc="Billed separately by their respective providers when applicable."
          pageTitleStyle="!text-3xl mobile:!text-2xl"
          pageDescStyle="text-sm"
          headerLayout="!pb-0 w-full"
        />

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 gap-3"
          staggerDelay={0.04}
        >
          {devopsServices.map((item) => (
            <StaggerItem key={item.service}>
              <KeyValuePairRow
                label={item.service}
                value={item.purpose}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-xs text-left leading-relaxed" style={{ color: 'var(--site-text-gray)' }}>
          Note: Most of these services offer free plans suitable for small
          businesses. If your project grows, paid plans may become necessary
          based on usage. We are happy to assist with the setup and
          configuration of all required services.
        </p>
      </div>
    </SectionContainer>
  );
};

export default Process;
