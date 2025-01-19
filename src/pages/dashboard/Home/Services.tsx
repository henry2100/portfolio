import React from 'react'

const Services = () => {
    return (
        <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-10">
            <span className="font-bold text-5xl mobile:text-2xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
                These are my Services
            </span>

            <div className='border-2 border-Secondary tablet:border-Primary group-hover:border-Primary p-5 w-full'></div>
        </div>
    )
}

export default Services