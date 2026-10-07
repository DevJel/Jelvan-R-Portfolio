/*=============================================
    CSS Values and variables used in App
=============================================*/

/**
 *@EXPORTS
 */

export {
  darkPrimaryColors,
  lightPrimaryColors,
  darkGrayColors,
  lightGrayColors,
  darkUtilityColors,
  lightUtilityColors,
  fontSizes,
  allGradients,
  fontWeights,
  responsiveBreakPoints,
  spacing,
  borderRadii,
  boxShadows,
  zIndexes,
  portfolioStyles,
};

/**
 * TABLE OF CONTENTS
 *
 * COLORS
 * Primary colors...................These are the main primary colors. They will be used for backgrounds and text colors
 * Gray colors.................These are gray palette used in the app
 * Utility Colors.................Other colors used in particular components of the app
 *
 * GRADIENTS
 * ..................These are main gradients used in the app
 *
 * TYPOGRAPHY
 * Font weights...................Font weights
 * Sizes..........................Font sizing for body text, paragraphs, inputs
 * Heading sizes..................Font sizing for page headings

 * BREAKPOINTS
 * Media....................Global responsive media breakpoint definitions.
 *
 * SPACING
 * Spacing........................Global fixed set of spacing variables
 *
 * OTHER STYLES
 *
 * Border radius.......................Global fixed set of border radii
 * Box Shadows..........................Global fixed set of box shadows
 * Z-Indexes..........................Global fixed Z-Indexes used in app
 *
 * PORTFOLIO STYLES
 * Portfolio Styles.......................Global design-system used in portfolio slides
 *
 */

/*=============================================
=                  Colors                     =
=============================================*/

const darkPrimaryColors = {
  background: '#ffffff',
  text: '#17181d',
};

const lightPrimaryColors: IPrimaryColors = {
  background: '#ffffff',
  text: '#17181d',
};

export type IPrimaryColors = typeof darkPrimaryColors;

const darkGrayColors = {
  dark: 'rgba(23, 24, 29, 0.72)',
  light: '#f48120',
  lightest: '#fff7f0',
};

const lightGrayColors: IGrayColors = {
  dark: 'rgba(23, 24, 29, 0.72)',
  light: '#f48120',
  lightest: '#fff7f0',
};
export type IGrayColors = typeof darkGrayColors;

const darkUtilityColors = {
  appCenter: {
    bg: 'rgba(255, 255, 255, 0.92)',
    searchBarBg: '#fff7f0',
  },
  systemTray: { bg: 'rgba(255, 255, 255, 0.85)' },
  gray: {
    dark: 'rgba(23, 24, 29, 0.72)',
    light: '#545c6a',
    lightest: '#8c939e',
    invisible: 'rgba(244, 129, 32, 0.08)',
  },
  red: { danger: '#d96514', lightDanger: '#d96514' },
  blue: {
    icon: '#f48120',
    border: '#f48120',
    activeBlue: '#f48120',
    brandColor: '#f48120',
  },
  modals: { widgetModalBg: 'rgba(255, 255, 255, 0.9)' },
  cards: {
    widgetBg: 'rgba(255, 247, 240, 0.9)',
  },
  windows: {
    bg: 'rgba(255, 247, 240, 0.6)',
    navBg: 'rgba(255, 255, 255, 0.95)',
  },

  buttons: {
    simpleButtonBg: '#fff7f0',
    settingsButton: {
      bg: '#fff7f0',
      activeBg: '#f48120',
      activeColor: '#ffffff',
    },
    desktopButton: {
      hover: 'rgba(244, 129, 32, 0.16)',
      systemTrayHover: 'rgba(244, 129, 32, 0.12)',
      pinnedAppHover: 'rgba(244, 129, 32, 0.12)',
    },
  },
};

export type IUtilityColors = typeof darkUtilityColors;

const lightUtilityColors: IUtilityColors = {
  appCenter: {
    bg: 'rgba(255, 255, 255, 0.92)',
    searchBarBg: '#fff7f0',
  },
  systemTray: { bg: 'rgba(255, 255, 255, 0.85)' },
  gray: {
    dark: 'rgba(23, 24, 29, 0.72)',
    light: '#545c6a',
    lightest: '#8c939e',
    invisible: 'rgba(244, 129, 32, 0.08)',
  },
  red: { danger: '#d96514', lightDanger: '#d96514' },
  blue: {
    icon: '#f48120',
    border: '#f48120',
    activeBlue: '#f48120',
    brandColor: '#f48120',
  },
  modals: { widgetModalBg: 'rgba(255, 255, 255, 0.9)' },
  cards: {
    widgetBg: 'rgba(255, 247, 240, 0.9)',
  },
  windows: {
    bg: 'rgba(255, 247, 240, 0.6)',
    navBg: 'rgba(255, 255, 255, 0.95)',
  },
  buttons: {
    simpleButtonBg: '#fff7f0',
    settingsButton: {
      bg: '#fff7f0',
      activeBg: '#f48120',
      activeColor: '#ffffff',
    },
    desktopButton: {
      hover: 'rgba(244, 129, 32, 0.16)',
      systemTrayHover: 'rgba(244, 129, 32, 0.12)',
      pinnedAppHover: 'rgba(244, 129, 32, 0.12)',
    },
  },
};

/*=====  End of Colors  ======*/

/*=============================================
=                  Gradients                  =
=============================================*/
const allGradients = {
  portfolioGreen: `linear-gradient(
      45deg,
      #d96514 0%,
      #f48120 52%,
      #faad3f 90%
    );`,
  rainbow: `linear-gradient(
      45deg,
      #d96514,
      #f48120,
      #faad3f,
      #ffb86c,
      #f48120,
      #d96514
    );`,
  lightGrayGradient: `radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 247, 240, 0.98) 81.3%
  )`,
};

export type IGradients = typeof allGradients;

/*=============================================
=                Typography                   =
=============================================*/

/* Font sizes */

const fontSizes = { large: '16px', medium: '14px', small: '12px' };

export type IFontSizes = typeof fontSizes;

/* Font weights */

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export type IFontWeights = typeof fontWeights;

/*=====  End of Typography  ======*/

/*=============================================
=            Breakpoints                      =
=============================================*/

const responsiveBreakPoints = {
  phone: '(max-width: 500px)',
  tablet: '(max-width: 768px)',
  desktop: '(min-width: 800px)',
};

export type IMediaBreakpoints = typeof responsiveBreakPoints;

/*=====  End of Breakpoints  ======*/

/*=============================================
=            Spacing                          =
=============================================*/

const spacing = {
  none: '0rem',
  xxxs: '0.25rem',
  xxs: '0.5rem',
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '5rem',
};

export type ISpacing = typeof spacing;

/*=====  End of Spacing  ======*/

/*=============================================
=            Other Styles                     =
=============================================*/

/* Border radius */
const borderRadii = { main: '4px' };

/* Box Shadows */
const boxShadows = {
  appBtn: '0 1px 1px rgb(0 0 0 / 25%)',
  window:
    '0 2.8px 2.2px rgba(0, 0, 0, 0.02),\n    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),\n    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),\n    0 100px 80px rgba(0, 0, 0, 0.07)',
};

export type IBoxShadows = typeof boxShadows;

/* Z-indexes */
const zIndexes = {
  highestPriority: 777,
  navigation: 78,
  modal: 77,
  lowPriority: 7,
};

export type IZindexes = typeof zIndexes;

/*=====  End of Other Styles  ======*/

/*=============================================
=            Portfolio Styles                 =
=============================================*/

const portfolioStyles = {
  bgColor: '#ffffff',
  secondaryBg: { purple: '#fff7f0' },
  primaryColor: { dark: '#d96514', light: '#f48120' },
  text: { light: '#17181d', dark: '#17181d' },
  resumeColors: {
    accentColor: '#f48120',
    darkText: '#17181d',
    bgColor: '#fffaf5',
    lightText: '#545c6a',
  },
};

export type IPortfolioStyle = typeof portfolioStyles;
