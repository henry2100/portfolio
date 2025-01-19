import React from 'react';
import profileImg from '../../../assets/images/profile-6.jpg';
import DirComp from 'components/atoms/DirComp/DirComp';

const About = () => {
    const profile = [
        {
            images: profileImg,
            title: 'Henry Ebose Adedugba',
            proficiency: 'Mid-level Software Engineer',
            description: 'Frontend Developer || MERN Stack'
        }
    ]
    return (
        <div className='max-w-6xl w-full min-h-[70vh] h-fit mobile:min-h-screen flex flex-col justify-center items-center gap-10 mobile:!p-5 tablet:p-8'>
            <span className='p-5 mobile:p-0 font-bold text-5xl mobile:text-2xl text-Secondary tablet:text-Primary uppercase group-hover:text-Primary'>
                About Henry
            </span>

            <div className='w-full flex mobile:flex-col justify-center items-center tablet:items-start gap-10 mb-10'>
                {profile.map((item, i) => (
                    <DirComp
                        key={i}
                        itemIndex={i}
                        {...item}
                        imgStyle='!scale-100'
                        style="!h-[70vh] flex justify-center items-center rounded-xl overflow-hidden"
                        overlayStyle="!bg-BackDrop_d_xl !flex !flex-col !justify-end !items-end"
                        overlayContentLayout="!h-fit !w-full"
                        overlayDescriptionLayout="!h-fit !w-full !flex !justify-end mobile:!justify-center items-center"
                    />
                ))}
                <div className="relative w-full min-h-[70vh]">
                    <div className="absolute top-0 left-0 w-full h-0 border-t border-t-Background border-l-[100px] border-l-BackDrop_l_xs border-r-[100px] border-r-BackDrop_l_xs"></div>
                    <div className="absolute bottom-0 mobile:-bottom-5 left-0 right-0 mx-auto w-1/2 h-0 border-b border-Primary border-l-[50px] border-l-BackDrop_l_xs border-r-[50px] border-r-BackDrop_l_xs"></div>

                    <div className='w-full h-full py-5 flex flex-col items-start gap-4'>
                        <span className='font-semibold text-lg mobile:text-base text-Secondary uppercase text-center'>
                            Section One
                        </span>
                        <span className='text-Background font-medium text-[17px] text-justify flex flex-col justify-center items-start gap-5'>
                            <p className='leading-[30px]'>
                                As a seasoned <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>Frontend Developer</b> with over three years of professional experience, I specialize in creating intuitive, dynamic, and user-friendly digital experiences. My journey in software development began with a passion for problem-solving and a keen interest in technology’s ability to transform lives. This has driven me to hone my skills in <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>HTML, CSS, JavaScript, React,</b> and <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>Next.js,</b> among other technologies, enabling me to deliver seamless, visually appealing, and responsive user interfaces.
                            </p>

                            <p className='leading-[30px]'>
                                Throughout my career, I have collaborated with cross-functional teams to bring ideas to life, contributing to projects that solve real-world challenges and deliver measurable results. From designing responsive UIs for enterprise dashboards to integrating APIs for efficient data flows, I thrive on creating solutions that balance aesthetics, functionality, and performance.
                            </p>

                            <p className='leading-[30px]'>
                                My professional experience spans various industries, including fintech, where I have played key roles in developing platforms that facilitate secure fund management, empower business partners, and enhance operational efficiency. At Centric Gateway, I contributed to multiple projects, including the <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>Seerbit Merchant Dashboard, Seerbit Partner Platform,</b> and <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>Seerbit Fund Management Application</b>, leveraging my expertise in <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>React, TypeScript,</b> and <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>Tailwind CSS</b> to create scalable and robust solutions.
                            </p>
                        </span>
                    </div>
                </div>
            </div>

            <div className='relative w-full h-fit flex mobile:flex-col justify-center items-start gap-10 border-t pt-5'>
                <div className="absolute -bottom-5 mobile:bottom-0 left-0 right-0 mx-auto w-1/2 h-0 border-b border-Primary border-l-[50px] border-l-BackDrop_l_xs border-r-[50px] border-r-BackDrop_l_xs"></div>

                <div className='w-full h-full py-5 flex flex-col items-start gap-4'>
                    <span className='font-semibold text-lg text-Secondary uppercase'>
                        Section Two
                    </span>
                    <span className='text-Background font-medium text-[17px] text-justify flex flex-col justify-center items-start gap-5'>
                        <p className='leading-[30px]'>
                            Beyond coding, I am a strong advocate for accessibility and user-centered design, always aiming to build applications that cater to diverse users, including those with special needs. I am equally passionate about mentorship and knowledge sharing, often engaging in collaborative problem-solving sessions to help peers and junior developers grow.
                        </p>
                        <p className='leading-[30px]'>
                            I’m a lifelong learner, constantly exploring emerging technologies and best practices to stay ahead in the fast-evolving tech landscape. Whether it's delving into <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>GraphQL,</b> optimizing for <b className='text-Secondary tablet:text-Primary group-hover:text-Primary font-bold'>SEO,</b> or experimenting with modern CSS frameworks, I relish the opportunity to deepen my skill set and apply it to challenging projects.
                        </p>
                    </span>
                </div>

                <div className="mobile:hidden border-t-[200px] border-t-white border-b-[200px] border-Primary w-[2px] border"></div>

                <div className='w-full h-full py-5 flex flex-col items-start gap-4 mobile:border-t mobile:!pt-10'>
                    <span className='font-semibold text-lg text-Secondary uppercase'>
                        Section Three
                    </span>
                    <span className='text-Background font-medium text-[17px] flex flex-col justify-center items-start gap-5'>
                        <p className='leading-[30px] text-justify'>
                            In addition to my technical acumen, I bring a positive attitude, strong communication skills, and an unwavering commitment to delivering high-quality solutions that align with business goals. My ultimate goal is to create meaningful digital experiences that leave a lasting impact on users and stakeholders alike.
                        </p>
                        <div className='w-full h-[14vh] flex justify-center items-center'>
                            <p className='text-Secondary tablet:text-Primary group-hover:!text-Primary !leading-[30px] !text-3xl !font-semibold'>
                                Let’s create something amazing together!
                            </p>
                        </div>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default About;