const useNavData = () => {
    const resumeStyle = 'py-1 px-3 border flex justify-center items-center border-Primary !text-Primary hover:bg-Primary hover:text-white rounded-full transition ease-in-out duration-250 cursor-pointer';

    const navItems = [
        { newPage: false, navItem: 'Home', navType: 'dash', action: null, style: '!hidden', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'About Me', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Brand', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Packages', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Process', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Projects', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Skills', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Service', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'Contact', navType: 'dash', action: null, style: '!flex', icon1: '', icon2: '', available: true },
        { newPage: false, navItem: 'My Resume', navType: 'dash', action: null, style: `!flex ${resumeStyle}`, icon1: '', icon2: '', available: true },
    ];

    return { navItems };
};

export default useNavData;