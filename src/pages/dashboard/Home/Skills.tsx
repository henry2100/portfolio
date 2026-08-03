import DirComp from "components/atoms/DirComp/DirComp";
import { skillData } from "../../../mockData/skillData";
import { FadeUp, StaggerContainer, StaggerItem } from "components/atoms/MotionWrapper";

const Skills = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-8 justify-start items-center">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          These are my skills
        </span>
      </FadeUp>

      <StaggerContainer
        className="py-10 w-full min-h-[50vh] grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-2 justify-between items-start gap-12 mobile:gap-5"
        staggerDelay={0.08}
      >
        {skillData.map((item) => (
          <StaggerItem key={item.id}>
            <DirComp
              {...item}
              titleStyle="mobile:!text-lg"
              overlayDescriptionLayout=""
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default Skills;
