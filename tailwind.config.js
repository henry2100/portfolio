/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      //Custom Queries//
      'mobile': { 'min': '200px', 'max': '600px' },

      'tablet': { 'mim': '601px', 'max': '1199px' },

      'desktop': { 'min': '1200px' }
    },
    extend: {
      // borderWidth: {
      //   '600': '600px',
      //   '400': '400px',
      // },
      boxShadow: {
        custom_border: '3px 0px 20px 0px #0000000A',
        custom: 'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
      },
      transitionDuration: {
        '250': '250ms',
        '500': '500ms',
        '750': '750ms',
        '1000': '1000ms',
      },
      colors: {
        // Primary: '#008080', //Teal
        // Primary: '#6366f1', //Indigo
        // Primary: '#FF6961', //Pastel red:
        // Primary: '#FF2400', //Scarlet
        // Primary: '#FF4B33', //Red-orange
        // Primary: '#FA003F', //Rose red
        // Primary: '#8B0000', //Dark red
        // Primary: '#A52A2A', //Red brown
        // Primary: '#913831', //Red ochre:
        // Primary: '#BE0C0A', //Red Phillip:
        
        Primary: '#6366f1', //Red Phillip
        Primary_pale: '#6366f11A', // 10%
        Secondary: '#6E6E6E', //Dim-grey 

        Success: "#04A778",
        Success2: "#027A48",

        Green_Accent: "#ACFDE6",
        Green_Accent2: "#02543C",
        Green_Accent3: "#D6FEF2",
        Green_Accent4: "#F5FFFC",
        Green_Accent5: "#037D5A",
        Green_Accent6: "#04A77829",
        Green_Accent7: "#039855",
        Green_Accent8: "#ECFDF3",

        Danger: "#FF3C38",
        Danger2: "#C20400",
        Danger3: "#E61B17",
        Danger4: "#B42318",

        DangerAccent: "#FFF3F5",
        DangerAccent2: "#7C0012",
        DangerAccent3: "#FFE7E6",
        DangerAccent4: "#FFF1F3",
        DangerAccent5: "#FEF3F2",

        Warning: "#DC6803",
        WarningAccent: "#DC68031A",

        Yellow: "#FFBF00",
        Yellow_Accent: "#FFF7DF",
        Yellow_Accent2: "#E5AC01",

        SecondaryAccent: '#747C91',
        SecondaryAccent2: '#DADCE8',
        SecondaryAccent3: '#F3F5FC',
        SecondaryAccent4: '#FDFDFD',
        SecondaryAccent5: '#E7E9F1',
        SecondaryAccent6: '#626F86',
        SecondaryAccent7: '#E5F0FF',
        SecondaryAccent8: '#F7F8F9',
        SecondaryAccent9: '#F0F1F3',
        SecondaryAccent10: '#4C5467',
        SecondaryAccent11: '#F8F9FC',

        Accent_blue: '#3186FD',
        Accent_blue2: '#98C3FE',
        Accent_blue3: '#025FE0',
        Accent_blue4: '#012F70',
        Accent_blue5: '#E2EEFF',
        Accent_blue6: '#363F72',

        Background: '#F8F9FA',
        Background1: '#FAFAFA',
        Background2: '#F8F8FC',
        Background3: '#F2F4F7',
        Background4: '#F9F9FB',
        Background5: '#F9FAFB',
        Background6: '#F4F5F9',

        transparent: '#e6e6e6',

        GrayCustom: '#898989',
        GrayCustom1: '#cacaca',
        GrayCustom2: '#959595',
        GrayCustom3: '#D9DBE85E',
        GrayCustom4: '#2C2C2E',
        GrayCustom5: '#DADCE833',
        GrayCustom6: '#F7F8FA',
        GrayCustom7: '#7B7B7B',
        GrayCustom8: '#E7E9F1',
        GrayCustom9: '#656c75',
        GrayCustom10: '#52525B',
        GrayCustom11: '#DFE1E7',
        GrayCustom12: '#0000001a',
        GrayCustom13: '#D0D5DD',

        Black2: '#656C75',
        Black3: '#667085',
        Black4: '#17191D',
        Black5: '#959595',
        Black6: '#2E2F33',

        DarkBg: '#121212',
        DarkBg2: '#1C1C1C',
        DarkBg3: '#020607',
        DarkBg4: '#00000033',
        DarkBg5: '#00000080',
        DarkBg6: '#344054',
        DarkBg7: '#101828',
        DarkBg8: '#424242',
        DarkBg9: '#0000000d',
        DarkBg10: '#202020',

        Primary_Accents_3xs: "#6366f105",
        Primary_Accents_2xs: "#6366f10d",
        Primary_Accents_xs: "#6366f11a",
        Primary_Accents_sm: "#6366f133",
        Primary_Accents_md: "#6366f14d",
        Primary_Accents_lg: "#6366f166",
        Primary_Accents_xl: "#6366f180",
        Primary_Accents_2xl: "#6366f199",
        Primary_Accents_3xl: "#6366f1b3",
        Primary_Accents_4xl: "#6366f1cc",
        Primary_Accents_5xl: "#6366f1e6",

        BackDrop_l_xs: "#ffffff1a",
        BackDrop_l_sm: "#ffffff33",
        BackDrop_l_md: "#ffffff4d",
        BackDrop_l_lg: "#ffffff66",
        BackDrop_l_xl: "#ffffff80",
        BackDrop_l_2xl: "#ffffff99",
        BackDrop_l_3xl: "#ffffffb3",
        BackDrop_l_4xl: "#ffffffcc",
        BackDrop_l_5xl: "#ffffffe6",

        BackDrop_d_xs: "#0000001a",
        BackDrop_d_sm: "#00000033",
        BackDrop_d_md: "#0000004d",
        BackDrop_d_lg: "#00000066",
        BackDrop_d_xl: "#00000080",
        BackDrop_d_2xl: "#00000099",
        BackDrop_d_3xl: "#000000b3",
        BackDrop_d_4xl: "#000000cc",
        BackDrop_d_5xl: "#000000e6",

        NoColor: '#00000000',

        gradientNav: 'linear-gradient(186deg, #4B4D52 -14.8%, rgba(75, 77, 82, 0.00) 132.74%)',
      },
      keyframes: {
        slideUp: {
          from: {
            opacity: 0.75,
            transform: 'translateY(5rem)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideDown: {
          from: {
            opacity: 0.75,
            transform: 'translateY(-5rem)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideDown2: {
          from: {
            transform: 'translateY(-40px)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        slideRight: {
          from: {
            opacity: 0.5,
            transform: 'translateX(-50%)'
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)'
          }
        },
        slideRight2: {
          from: {
            transform: 'translateX(-80%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        slideRight3: {
          from: {
            opacity: 0,
            transform: 'translateX(0%)'
          },
          to: {
            opacity: 1, 
            transform: 'translateX(100%)'
          }
        },
        slideRight4: {
          from: {
            opacity: 0,
            transform: 'translateX(-50%)'
          },
          to: {
            opacity: 1, 
            transform: 'translateX(0%)'
          }
        },
        slideLeft: {
          from: {
            opacity: 0.5,
            transform: 'translateX(50%)'
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)'
          }
        },
        slideLeft2: {
          from: {
            opacity: 0,
            transform: 'translateX(50%)'
          },
          to: {
            opacity: 1, 
            transform: 'translateX(0%)'
          }
        },
        fullRoll: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(-360deg)'
          }
        },
        fadeIn: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        },
        leftSlider: {
          from: {
            opacity: 1,
            transform: 'translateX(100%)'
          },
          to: {
            opacity: 0,
            transform: 'translateX(0)'
          }
        },
        rightSlider: {
          from: {
            opacity: 1,
            transform: 'translateX(-100%)'
          },
          to: {
            opacity: 0,
            transform: 'translateX(0)'
          }
        },
        // pulseBorder: {
        //   '0%, 100%': { borderColor: 'rgba(59, 130, 246, 1)', borderWidth: '2px' }, // blue-500
        //   '50%': { borderColor: 'rgba(147, 197, 253, 1)', borderWidth: '4px' }, // blue-300
        // },
        // slideGradient: {
        //   '0%': { backgroundPosition: '0% 50%' },
        //   '50%': { backgroundPosition: '100% 50%' },
        //   '100%': { backgroundPosition: '0% 50%' },
        // },
        leftRight: {
          '0%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(10%)' },
          '20%': { transform: 'translateX(20%)' },
          '30%': { transform: 'translateX(5%)' },
          '40%': { transform: 'translateX(12%)' },
          '50%': { transform: 'translateX(18%)' },
          '60%': { transform: 'translateX(22%)' },
          '70%': { transform: 'translateX(16%)' },
          '80%': { transform: 'translateX(10%)' },
          '90%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        }
      },
      animation: {
        'slide_up': 'slideUp .25s linear',
        'slide_down': 'slideDown .25s linear',
        'slide_down2': 'slideDown2 .25s linear',
        'slide_right': 'slideRight .25s linear',
        'slide_right2': 'slideRight2 .25s linear',
        'slide_right3': 'slideRight3 1s linear',
        'slide_right4': 'slideRight4 .75s linear',
        'slide_left': 'slideLeft .25s linear',
        'slide_left2': 'slideLeft2 .75s linear',
        'fullRoll': 'fullRoll .8s linear infinite',
        'fade_in': 'fadeIn .25s linear',
        'carousel_slide_left': 'leftSlider 1.5s linear',
        'carousel_slide_right': 'rightSlider 1.5s linear',
        'waving-hand': 'wave 2s linear infinite',
        'left_right_slider': 'leftRight 3s linear infinite',
        'pulseBorder': 'pulseBorder 1.5s ease-in-out infinite',
        'slideGradient': 'slideGradient 3s linear infinite',
      },
    },
  },
  plugins: [],
}