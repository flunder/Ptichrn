import { View, UIManager, Platform } from 'react-native';

export const Colors = {

  // Base --------------------

  primary: '#F5DADF',
  primaryLighter: false,

  text: '#385264',
  textDarker: '#161718',
  textPlaceholder: '#99ADBB',

  button: '#',
  buttonInactive: '#F2F6F9',

  success: '#C9FFDC',
  error: 'red',
  warning: 'blue',

  // Grays --------------------

  gray100: '#F7FAFC', // bright
  gray200: '#EDF2F7',
  gray300: '#E2E8F0',
  gray400: '#CBD5E0',
  gray500: '#A0AEC0',
  gray600: '#718096',
  gray700: '#4A5568',
  gray800: '#2D3748',
  gray900: '#1A202C', // dark

  // Misc --------------------
  // For extras colors use their name:
  // http://chir.ag/projects/name-that-color

  // Blues

  facebookBlue: '#3B5998',
  instagram: '#833AB4',

  // Greens

  pastelGreen: '#7FE87C',
}

export const Grid = {
  gutter_width: 20,
  gutter_width_mid: 25,
  gutter_width_wide: 35,
  gutter_width_wider: 45
}

export const Corners = {
  tight: 3,
  regular: 8,
  loose: 20
}

export const Shadow = {
  light: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15
  },
}

/* Fonts */

const Fonts = []
