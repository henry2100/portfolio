import { Link as ScrollLink } from "react-scroll";
import TopNav from "components/organisms/Navigation";
import bgImg2 from "../../assets/images/stock_img_2.jpg";
import { FaCaretRight } from "react-icons/fa6";
import MobileNav from "components/organisms/Navigation/MobileNav";
import PageHeader from "./PageHeader";
import { motion } from "framer-motion";
import { useSiteData } from "../../context/SiteDataContext";

import { useTheme } from "../../context/ThemeContext";

const Hero = () => {
  const { siteData } = useSiteData();
  const { theme } = useTheme();
  const bgSrc = siteData?.hero?.image || bgImg2;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const bgVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <TopNav wrapperStyle={`!flex mobile:!hidden absolute z-20 py-5 !shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]`} />
      <MobileNav wrapperStyle={`!hidden mobile:!flex absolute z-20 py-5 mobile:px-5 !shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]`} />
      <div className="flex flex-col justify-center items-center gap-10 w-full h-fit min-h-screen relative z-[18] pt-12 desktop:px-32 px-20 mobile:px-5">
        <div id="end"></div>

        {/* Animated Background with subtle parallax */}
        <motion.div
          className="absolute w-full h-screen bottom-0"
          variants={bgVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={bgSrc}
            alt="bg-img"
            className="w-full h-full object-cover object-right"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-Primary/30 to-black/30" />
        </motion.div>

        <motion.div
          className="relative mobile:-top-24 w-full max-w-6xl flex justify-start items-center mobile:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-fit mobile:w-full flex flex-col justify-start items-start gap-8 mobile:gap-12">
            <motion.div variants={itemVariants}> 
              <PageHeader
                pageTitle={"Henry Ebose Adedugba"}
                pageTitleStyle="font-[800] text-6xl mobile:text-3xl text-Primary"
                pageDesc={
                  "MERN Stack Developer | React, Node.js, TypeScript, Tailwind CSS | Passionate About Scalable Architecture and User-Centric Design"
                }
                pageDescStyle="text-sm text-GrayCustom6 mobile:text-xs"
                headerLayout="!pb-0 h-[6vh] w-full"
              />
            </motion.div>

            <motion.span
              variants={itemVariants}
              className="mobile:max-w-full max-w-[500px] w-full flex flex-col justify-center items-left mobile:items-center mobile:justify-center gap-6 mobile:gap-8 p-4 rounded-md backdrop-blur-md bg-Primary_Accents_2xs hover:bg-Primary_Accents_xs transition-colors duration-300"
            >
              <p className="font-light text-xl mobile:text-lg text-Background w-full text-left mobile:text-center">
                <b className="text-Primary font-semibold">Henry</b> is a software
                engineer who builds fast, useful web apps — React, TypeScript &
                the MERN stack. <br /> <br />
                <span className="text-base mobile:text-sm text-GrayCustom6">
                  4+ years across fintech & enterprise: Seerbit, Interswitch,
                  Jaroy.
                </span>
              </p>

              <motion.div
                className="group flex"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ScrollLink
                  to={"About Me"}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={1500}
                  className="cursor-pointer flex justify-center items-center group border bg-Primary text-white border-Primary hover:bg-NoColor hover:text-Primary overflow-hidden px-4 py-1 rounded-full transition ease-in-out duration-500"
                >
                  More About Henry{" "}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FaCaretRight className="w-4 h-4 text-white group-hover:text-Primary transition ease-in-out duration-500" />
                  </motion.span>
                </ScrollLink>
              </motion.div>
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
