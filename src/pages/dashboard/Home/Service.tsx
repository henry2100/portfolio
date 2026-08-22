import {servicesData} from "../../../mockData/servicesData";
import ServiceCard from "../../../components/molecules/ServiceCard";
import { StaggerContainer, StaggerItem } from "components/atoms/MotionWrapper";
import SectionContainer from "components/atoms/SectionContainer";
import SectionTitle from "components/atoms/SectionTitle";

const Service = () => {
  return (
    <SectionContainer className="flex flex-col gap-8 justify-start items-center">
      <SectionTitle>Services I Offer</SectionTitle>

      <StaggerContainer
        className="grid grid-cols-2 mobile:grid-cols-1 auto-rows-auto items-start gap-10 w-full"
        staggerDelay={0.12}
      >
        {servicesData.map((item, index) => (
          <StaggerItem key={index}>
            <ServiceCard {...item} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionContainer>
  );
};

export default Service;
