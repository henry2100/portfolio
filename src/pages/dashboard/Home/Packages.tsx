import { packagesData, addOnsData } from "../../../mockData/packagesData";
import PackageCard from "../../../components/molecules/PackageCard";
import PageHeader from "components/molecules/PageHeader";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "components/atoms/MotionWrapper";
import SectionContainer from "components/atoms/SectionContainer";
import SectionTitle from "components/atoms/SectionTitle";
import KeyValuePairRow from "components/atoms/KeyValuePairRow";

const Packages = () => {
  return (
    <SectionContainer className="flex flex-col gap-10 justify-start items-center">
      <SectionTitle>Website Packages</SectionTitle>

      <StaggerContainer
        className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 items-stretch"
        staggerDelay={0.1}
      >
        {packagesData.map((pkg) => (
          <StaggerItem key={pkg.name} className="h-full">
            <PackageCard {...pkg} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <p className="text-xs text-center" style={{ color: 'var(--site-text-gray)' }}>
        Note: Pricing starts from the lower range and can't exceed the higher.
      </p>

      <div className="w-full flex flex-col gap-6 mt-6">
        <FadeUp>
          <PageHeader
            pageTitle="Optional Add-On Services"
            pageDesc="Enhance your project with these optional extras."
            pageTitleStyle="!text-3xl mobile:!text-2xl"
            pageDescStyle="text-sm"
            headerLayout="!pb-0 w-full"
          />
        </FadeUp>

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 gap-3"
          staggerDelay={0.05}
        >
          {addOnsData.map((item) => (
            <StaggerItem key={item.service}>
              <KeyValuePairRow
                label={item.service}
                value={item.price}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionContainer>
  );
};

export default Packages;
