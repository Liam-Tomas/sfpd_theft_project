import flowerIMG from '../../images/flowerIMG.jpg'
import flowerDarkIMG from '../../images/flowerDarkIMG.jpg'

export const lightTheme = {
    mode: 'light',
    primary:'#1976d2',
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
    buttonHover: '#1565c0',
    buttonSubtle: '#eaecf2',
    buttonSubtleHover: '#e5e6eb',
}

export const darkTheme = {
    mode: 'dark',
    primary:'#1976d2',
    secondary:'#afcbfb',
    secondary:'#c2e7fe',
    text: '#e3e3e3',
    textOpp: '#072e6f',
    textOpp: '#ffff',
    buttonColor: '#aeccfb',
    buttonColorOpp: '#2564d4',
    textAlt: 'rgb(197 199 197)',
    textGrey: '#afb8c4',
    backgroundColor: '#1f1f1f',
    homeBackground: '',
    backgroundOpp: '#1f1f1f',
    card: '#28292a',
    cardOpp: '#28292a',
    card2: '#28292a',
    cardTab: '#2d2f31',
    cardLighter: '#2d2f31',
    cardLight: '#454746',
    cardFaint: '#454746',
    borderColor: '#28292a',
    borderColor2: 'rgb(197 199 197)',
    hoverShadowColor: '#afb8c4', 
    buttonHoverBackground: '#004a77',
    OppHoverBackground: 'rgb(194 231 254)',
    homeBackground: '#262626',
    backgroundIMG: `url(${flowerDarkIMG})`, // Dark mode background image URL
    buttonHover: '#1565c0',
    buttonSubtle: '#36393b',
    buttonSubtleHover: '#3d3f42',


}
