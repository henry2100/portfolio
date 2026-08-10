import { packagesData, addOnsData } from "../../../mockData/packagesData";
import PackageCard from "../../../components/molecules/PackageCard";
import PageHeader from "components/molecules/PageHeader";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "components/atoms/MotionWrapper";

const Packages = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-10 justify-start items-center">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          Website Packages
        </span>
      </FadeUp>

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

      <p className="text-xs text-GrayCustom text-center">
        Note: Pricing starts from the lower range and can't exceed the higher.
      </p>

      <div className="w-full flex flex-col gap-6 mt-6">
        <FadeUp>
          <PageHeader
            pageTitle="Optional Add-On Services"
            pageDesc="Enhance your project with these optional extras."
            pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
            pageDescStyle="text-sm text-GrayCustom"
            headerLayout="!pb-0 w-full"
          />
        </FadeUp>

        <StaggerContainer
          className="w-full grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 gap-3"
          staggerDelay={0.05}
        >
          {addOnsData.map((item) => (
            <StaggerItem key={item.service}>
              <div className="flex justify-between items-center gap-4 px-5 py-3 rounded-lg border border-Secondary/30 bg-DarkBg2 hover:border-Primary transition-colors duration-300">
                <span className="text-sm mobile:text-xs text-Secondary text-left">
                  {item.service}
                </span>
                <span className="text-sm mobile:text-xs font-semibold text-Primary whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};

export default Packages;
