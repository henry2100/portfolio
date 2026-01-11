import React from "react";
import Carousel from "components/organisms/Carousel";
import { CarouselData } from "../../../mockData/carouselData";
import { projectsData } from "../../../mockData/projectsData";
import DirComp from "components/atoms/DirComp/DirComp";
import PageHeader from "components/molecules/PageHeader";
import { useNavigate } from "react-router";

const Projects = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl w-full flex flex-col gap-5 mobile:!p-5 tablet:p-8">
      <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
        Projects
      </span>

      <div className="w-full grid grid-cols-2 gap-x-8 gap-y-16 mobile:grid-cols-1 mobile:gap-x-0 mobile:gap-y-32">
        {projectsData?.map((item) => (
          <div key={item.title} className="flex flex-col justify-start items-start gap-3">
            <PageHeader
              pageTitle={item.title}
              pageTitleStyle="text-xl text-Secondary group-hover:text-Primary mobile:text-xl"
              pageDesc={item.projectCategory}
              pageDescStyle="text-sm text-gray-600 mobile:text-xs"
              headerLayout="!pb-0 h-[6vh] w-full"
              hyperLinkBtn={item.projectLink}
              headerBtnText="View Project"
              headerBtnStyle="bg-none border-2 border-Primary text-white px-4 py-2 rounded-full hover:!bg-Primary_Accents_lg hover:!text-white transition ease-in-out duration-300 text-sm mobile:px-3 mobile:py-1 mobile:text-xs"
            />
            <div className="w-fit flex justify-between items-center border-b border-Secondary pb-2">
              <span className="text-sm mobile:text-xs text-Secondary">{item.technologies.join(", ")}</span>
            </div>
            <Carousel
              containerStyle="!h-[40vh] tablet:!h-56 px-5 py-8 !p-0 !m-3 mobile:!m-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] !shadow-[0_35px_60px_-15px_Primary_Accents_lg] !border-[0px] rounded-lg cursor-pointer"
              mainSectionStyle="!h-full rounded-lg overflow-hidden"
              images={item.projectImgs}
              leftBtn="!left-7"
              rightBtn="!right-7"
              carouselBtnStyle="!hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
