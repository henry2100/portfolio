import React, { useEffect, useState } from "react";
import { BASE_URL, getRequest } from "services/http";
import Alert from "components/atoms/Alert";
import DirComp from "components/atoms/DirComp/DirComp";
import Spinner from "components/atoms/Spinner";
import { skillData } from "../../../mockData/skillData";

const Skills = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-8 justify-start items-center">
      <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
        These are my skills
      </span>

      <div
        className={`py-10 w-full min-h-[50vh] grid grid-cols-4 tablet:grid-cols-2 justify-between items-start gap-12 mobile:gap-5`}
      >
        {skillData.map((item) => (
          <DirComp
            key={item.id}
            {...item}
            titleStyle="mobile:!text-lg"
            style="tablet:!h-auto max-h-[7rem]"
            overlayDescriptionLayout="hidden"
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
