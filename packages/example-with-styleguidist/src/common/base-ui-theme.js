import { darken } from 'polished'

const colorOffsetLight = 0.15
const colorOffsetDark = 0.07

export default {
  fonts: {
    Roboto: [
      {
        files: [
          'https://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfbO3LdcAZYWl9Si6vvxL-qU.woff',
        ],
        options: {
          'font-style': 'normal',
          'font-weight': '300',
          localAlias: ['Roboto Light', 'Roboto-Light'],
        },
      },
      {
        files: [
          'https://fonts.gstatic.com/s/roboto/v15/CrYjSnGjrRCn0pd9VQsnFOvvDin1pK8aKteLpeZ5c0A.woff',
        ],
        options: {
          'font-style': 'normal',
          'font-weight': '400',
          localAlias: ['Roboto', 'Roboto-Regular'],
        },
      },
      {
        files: [
          'https://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfbO3LdcAZYWl9Si6vvxL-qU.woff',
        ],
        options: {
          'font-style': 'normal',
          'font-weight': '500',
          localAlias: ['Roboto Medium', 'Roboto-Medium'],
        },
      },
      {
        files: [
          'https://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfbO3LdcAZYWl9Si6vvxL-qU.woff',
        ],
        options: {
          'font-style': 'normal',
          'font-weight': '700',
          localAlias: ['Roboto Bold', 'Roboto-Bold'],
        },
      },
    ],
    Handlee: {
      files: [
        'https://fonts.gstatic.com/s/handlee/v5/lXdgF9zSHTlhzKRElEhHowLUuEpTyoUstqEm5AMlJo4.woff',
      ],
      options: {
        'font-style': 'normal',
        'font-weight': '400',
        localAlias: ['Handlee Regular', 'Handlee-Regular'],
      },
    },
  },
  breakpoints: {
    mobile: '13.6em',
    mobileWide: '30.4em',
    tablet: '47.2em',
    desktop: '64em',
    desktopLarge: '97.6em',
  },
  gradient: {
    primary: 'linear-gradient(left, #76C4E2, #85CBA8)',
    two: 'linear-gradient(left, #8176B5, #85CBA8)',
    three: 'linear-gradient(left, #8176B5, #76C4E2)',
    four: 'linear-gradient(left, #8176B5, #BA77B1)',
    five: 'linear-gradient(left, #8176B5, #F16975)',
    six: 'linear-gradient(left, #F16975, #F69259)',
    seven: 'linear-gradient(left, #F69259, #FFDB6F)',
    eight: 'linear-gradient(left, #85CBA8, #FFDB6F)',
  },
  buttonSizes: {
    small: '10px',
    normal: '14px',
    large: '18px',
  },
  fontSize: '12px',
  fontFamily: '"Roboto", "Handlee", sans-serif',
  weightLight: 300,
  weightNormal: 400,
  weightSemiBold: 600,
  weightBold: 700,
  fontWeight: 400,
  fontWeightLight: 300,
  fontColorHeadingCaption: '#888',
  borderRadius: '0.3em',
  arrowSize: '5px',
  disabledBackground: '#ededed',
  bodyBackground: '#ebebeb',
  bodyAccentColor: darken(0.8, '#fff'),
  bodyOffsetColor: darken(0.53, '#fff'),
  fontColor: darken(0.8, '#fff'),
  colorWhite: '#fff',
  colorGrey: '#666',
  colorBlack: '#000',
  colorOffsetLight,
  colorOffsetDark,
  zIndex: {
    deep: -1,
    level1: 0,
    level2: 100,
    level3: 200,
    level4: 500,
    level5: 999,
  },
}
