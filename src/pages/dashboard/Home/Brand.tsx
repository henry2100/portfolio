import PageHeader from "components/molecules/PageHeader";
import CheckList from "components/atoms/CheckList";
import { FadeUp } from "components/atoms/MotionWrapper";
import {
  brandIntro,
  whatsIncluded,
  whyChooseUs,
} from "../../../mockData/brandData";

const Brand = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-12 justify-start items-center">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          The Brand
        </span>
      </FadeUp>

      <FadeUp delay={0.1} className="w-full">
        <div className="w-full flex flex-col gap-5">
          {brandIntro.map((paragraph, index) => (
            <p
              key={index}
              className="leading-[30px] text-justify text-Secondary text-[17px] mobile:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeUp>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="What's Included in Every Project"
          pageDesc="Every website we deliver ships with these essentials included."
          pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
          pageDescStyle="text-sm text-GrayCustom"
          headerLayout="!pb-0 w-full"
        />
        <FadeUp delay={0.2}>
          <CheckList
            items={whatsIncluded}
            className="grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-x-8 gap-y-3"
          />
        </FadeUp>
      </div>

      <div className="w-full flex flex-col gap-6">
        <PageHeader
          pageTitle="Why Choose Us"
          pageTitleStyle="!text-3xl mobile:!text-2xl !text-Secondary"
          headerLayout="!pb-0 w-full"
        />
        <FadeUp delay={0.2}>
          <CheckList
            items={whyChooseUs}
            className="grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-x-8 gap-y-3"
          />
        </FadeUp>
      </div>
    </div>
  );
};

export default Brand;
