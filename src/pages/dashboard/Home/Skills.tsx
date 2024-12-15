import React from 'react';
import SkillCard from '../../../components/molecules/SkillCard';
import { skillData } from '../../../mockData/skillData';

const Skills = () => {
    return (
        <div id='Skills' className='w-full mobile:w-4/5 min-h-screen text-center flex flex-col gap-6 justify-center items-center py-32 mobile:p-0 bg-Background'>
            <div className='max-w-6xl w-full'>
                <span className='p-5 font-bold text-5xl mobile:text-2xl text-Secondary uppercase'>
                    These are my skills
                </span>
                <div className='py-10 w-full grid grid-cols-2 justify-between items-start gap-8'>
                    {skillData.map((item, i) => (
                        <SkillCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skills;