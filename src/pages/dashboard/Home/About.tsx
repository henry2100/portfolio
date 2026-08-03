import profileImg from "../../../assets/images/profile-6.jpg";
import DirComp from "components/atoms/DirComp/DirComp";
import { FadeUp, SlideLeft, SlideRight } from "components/atoms/MotionWrapper";

const About = () => {
  const profile = [
    {
      images: profileImg,
      title: "Henry Ebose Adedugba",
      proficiency: "Mid-level Software Engineer",
      description: "Frontend Developer || MERN Stack",
    },
  ];
  const boldText = (text: string) => {
    return (
      <b className="text-Secondary tablet:text-Primary group-hover:text-Primary font-bold">
        {" "}{text}{" "}
      </b>
    );
  };

  return (
    <div className="max-w-6xl w-full min-h-[70vh] h-fit mobile:min-h-screen flex flex-col justify-center items-center gap-10 mobile:!p-5 tablet:p-8">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          About Henry
        </span>
      </FadeUp>

      <div className="w-full flex mobile:flex-col justify-center items-center tablet:items-start gap-10 mb-10">
        {profile.map((item, i) => (
          <SlideLeft key={i} delay={0.2} className="w-full">
            <DirComp
              itemIndex={i}
              {...item}
              imgStyle="!scale-100"
              wrapperStyle="!h-[70vh] flex justify-center items-center rounded-xl overflow-hidden"
              overlayStyle="!bg-BackDrop_d_xl !flex !flex-col !justify-end !items-end"
              overlayContentLayout="!h-fit !w-full"
              overlayDescriptionLayout="!h-fit !w-full !flex !justify-end mobile:!justify-center items-center"
            />
          </SlideLeft>
        ))}
        <SlideRight delay={0.3} className="relative w-full min-h-[70vh]">
          <div className="absolute top-0 left-0 w-full h-0 border-t border-t-Background border-l-[100px] border-l-BackDrop_l_xs border-r-[100px] border-r-BackDrop_l_xs"></div>
          <div className="absolute bottom-0 mobile:-bottom-5 left-0 right-0 mx-auto w-1/2 h-0 border-b border-Primary border-l-[50px] border-l-BackDrop_l_xs border-r-[50px] border-r-BackDrop_l_xs"></div>

          <div className="w-full h-full py-5 flex flex-col items-start gap-4">
            <span className="text-Background font-medium text-[17px] text-justify flex flex-col justify-center items-start gap-5">
              <FadeUp delay={0.4}>
                <p className="leading-[30px]">
                  Henry Ebose Adedugba is a results-driven Software Engineer with
                  over four years of experience building scalable, user-centric
                  web applications using React, TypeScript, and modern JavaScript
                  technologies. He has worked across fintech and enterprise
                  environments, contributing to products at Seerbit, Interswitch,
                  and Jaroy Investments.
                </p>
              </FadeUp>

              <FadeUp delay={0.5}>
                <p className="leading-[30px]">
                  {boldText("At Seerbit")}, Henry helped build and revamp multiple fintech
                  platforms—including merchant dashboards, partner portals, fund
                  management web applications, and transaction systems, focusing
                  on responsive UI development, API integration, performance
                  optimization, and data-driven dashboards. {boldText("At Interswitch")}, he
                  collaborated within structured, cross-functional teams to
                  deliver reliable, high-impact frontend solutions in a
                  large-scale payments ecosystem. Earlier at {boldText("Jaroy Investments")}, he
                  developed and maintained client-facing websites, working closely
                  with stakeholders to translate business needs into clean,
                  functional interfaces.
                </p>
              </FadeUp>

              <FadeUp delay={0.6}>
                <p className="leading-[30px]">
                  My professional experience spans various industries, including
                  fintech, where I have played key roles in developing platforms
                  that facilitate secure fund management, empower business
                  partners, and enhance operational efficiency. At Seerbit,
                  I contributed to multiple projects, including the
                  {boldText("Seerbit Merchant Dashboard, Seerbit Partner Platform,")}
                  and
                  {boldText("Seerbit Fund Management Application")}
                  , leveraging my expertise in
                  {boldText("React, TypeScript,")}
                  and
                  {boldText("Tailwind CSS")}
                  to create scalable and robust solutions.
                </p>
              </FadeUp>
            </span>
          </div>
        </SlideRight>
      </div>
    </div>
  );
};

export default About;

// Henry thrives in agile environments, enjoys turning complex requirements into intuitive digital experiences, and is passionate about writing clean, maintainable code that delivers real business value.
