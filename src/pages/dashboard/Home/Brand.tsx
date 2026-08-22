import PageHeader from "components/molecules/PageHeader";
import CheckList from "components/atoms/CheckList";
import { FadeUp } from "components/atoms/MotionWrapper";
import SectionContainer from "components/atoms/SectionContainer";
import SectionTitle from "components/atoms/SectionTitle";
import {
  brandIntro,
  whatsIncluded,
  whyChooseUs,
} from "../../../mockData/brandData";

const Brand = () => {
  return (
    <SectionContainer className="flex flex-col gap-12 justify-start items-center">
      <SectionTitle>The Brand</SectionTitle>

      <FadeUp delay={0.1} className="w-full">
        <div className="w-full flex flex-col gap-5">
          {brandIntro.map((paragraph, index) => (
            <p
              key={index}
              className="leading-[30px] text-justify text-[17px] mobile:text-base"
              style={{ color: 'var(--site-text-secondary)' }}
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
          pageTitleStyle="!text-3xl mobile:!text-2xl"
          pageDescStyle="text-sm"
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
          pageTitleStyle="!text-3xl mobile:!text-2xl"
          headerLayout="!pb-0 w-full"
        />
        <FadeUp delay={0.2}>
          <CheckList
            items={whyChooseUs}
            className="grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-x-8 gap-y-3"
          />
        </FadeUp>
      </div>
    </SectionContainer>
  );
};

export default Brand;
