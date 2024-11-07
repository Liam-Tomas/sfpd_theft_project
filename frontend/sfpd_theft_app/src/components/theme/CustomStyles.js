import flowerIMG from '../../images/flowerIMG.jpg'
import flowerDarkIMG from '../../images/flowerDarkIMG.jpg'

export const lightTheme = {
    mode: 'light',
    primary:'#1976d2',
    primary: '#0957d0',
    primaryText: '#fff',

    secondary: 'rgb(1 99 155)',
    text: 'rgb(31 31 31)',
    textOpp: '#ffffff',
    buttonColor: '#2564d4',
    buttonColorOpp: '#c2e7fe',
    textAlt: 'rgb(69 71 70)',

    textGrey: '#afb8c4',
    backgroundColor: '#f8fafd',
    backgroundColor: '#ffffff',

    homeBackground: '',
    backgroundOpp: '#ffffff',
    card: '#ffffff',
    card: '#f8fafd',
    cardTab: '#e2e8f0',
    cardOpp: '#f8fafd',
    card2: '#e2e8f0',
    cardLight: '#e2e8f0',
    cardLighter: '#f8fafd',
    cardLighter: '#f4f6fc',
    cardFaint: '#e1e3e1',
    cardFaint: '#c4c6c4',
    borderColor: '#e2e8f0',
    borderColor2: '#e2e8f0',
    hoverShadowColor: 'rgba(0, 0, 0, 0.2)',
    buttonHoverBackground: 'rgb(194 231 254)', // light blue for light theme hover
    OppHoverBackground: '#004a77', // darker shade for dark theme hover
    homeBackground: 'rgb(194 231 254 / 40%)',
    backgroundIMG: `url(${flowerIMG})`, // Light mode background image URL
    buttonHover: '#074ebc',
    buttonSubtle: '#eaecf2',
    buttonSubtleHover: '#e5e6eb',
    tabHoverColor: 'rgb(234 236 239)',
    activeText: 'rgb(0 29 53)',
    searchColor: '#c4eed0',
    searchHover: '#b7dec2',

}

export const darkTheme = {
    mode: 'dark',
    backgroundColor: '#1f1f1f',
    backgroundColor: '#141314',
    primary:'#1976d2',
    // purple version:
    primary: '#9f86ff',
    secondary:'#afcbfb',
    secondary:'#c2e7fe',
    secondary: '#ccb7ff',
    text: '#e3e3e4',

    // Main button text color:
    // blue version:
    primaryText: '#fff',
    // purple version:
    primaryText: '#1a0056',
    textOpp: '#072e6f',
    textOpp: '#ffff',
    textOpp:'#1a0056',
    buttonColor: '#aeccfb',
    buttonColorOpp: '#2564d4',
    buttonColorOpp: '#46455a',

    textAlt: 'rgb(197 199 197)',
    // purple versoin: 
    textAlt: '#cbc4cd',
    textGrey: '#afb8c4',
    homeBackground: '',
    backgroundOpp: '#141314',
    card: '#28292a',
    card: '#1c1b1d',
    cardOpp: '#1c1b1d', 
    card2: '#28292a',
    card2: '#383a3e',
    cardTab: '#2d2f31',
    cardLighter: '#211f21',
    cardLight: '#454746',
    cardLight: '#4d4356',
    cardFaint: '#454746',
    borderColor: '#28292a',
    borderColor2: 'rgb(197 199 197)',
    hoverShadowColor: '#afb8c4', 

    // blue version:
    buttonHoverBackground: '#004a77',
    // purple versoin:
    buttonHoverBackground: '#46455a',
    OppHoverBackground: 'rgb(194 231 254)',
    homeBackground: '#262626',
    backgroundIMG: `url(${flowerDarkIMG})`, // Dark mode background image URL
    buttonHover: '#1565c0',
    // purple version:
    buttonHover: '#a893ff',
    buttonSubtle: '#2a292b',
    buttonSubtleHover: '#323133',
    tabHoverColor: 'rgb(52 54 54)',
    tabHoverColor: '#2e2c2e',
    activeText: '#c2e7fe',
    activeText: '#e2e0fb',
    searchColor: '#0d5223',
    searchColor: '#553f5e',
    searchHover: '#0c431d',
    //puirple version
    searchHover: '#4a374f',
}
