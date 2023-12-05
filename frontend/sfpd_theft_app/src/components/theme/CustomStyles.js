import flowerIMG from '../../images/flowerIMG.jpg'
import flowerDarkIMG from '../../images/flowerDarkIMG.jpg'

export const lightTheme = {
    mode: 'light',
    primary:'#1976d2',
    secondary: 'rgb(1 99 155)',
    text: 'rgb(31 31 31)',
    textAlt: 'rgb(69 71 70)',
    textGrey: '#afb8c4',
    backgroundColor: '#f8fafd',
    card: '#ffffff',
    cardLight: '#e2e8f0',
    cardLighter: '#f4f6fc',
    cardLighter: '#ffffff',
    borderColor: '#e2e8f0',
    borderColor2: '#e2e8f0',
    hoverShadowColor: 'rgba(0, 0, 0, 0.2)',
    buttonHoverBackground: 'rgb(194 231 254)', // light blue for light theme hover
    OppHoverBackground: '#004a77', // darker shade for dark theme hover
    homeBackground: 'rgb(194 231 254 / 40%)',
    backgroundIMG: `url(${flowerIMG})`, // Light mode background image URL

}

export const darkTheme = {
    mode: 'dark',
    primary:'#1976d2',
    secondary:'#afcbfb',
    secondary:'#c2e7fe',
    text: '#e3e3e3',
    textAlt: 'rgb(197 199 197)',
    textGrey: '#afb8c4',
    backgroundColor: '#1f1f1f',
    card: '#28292a',
    cardLighter: '#2d2f31',
    cardLight: '#454746',
    borderColor: '#28292a',
    borderColor2: 'rgb(197 199 197)',
    hoverShadowColor: '#afb8c4', 
    buttonHoverBackground: '#004a77', // darker shade for dark theme hover
    OppHoverBackground: 'rgb(194 231 254)',
    homeBackground: '#262626',
    backgroundIMG: `url(${flowerDarkIMG})`, // Dark mode background image URL


}
