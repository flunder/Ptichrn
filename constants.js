import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');

export const itemHeight = height * 0.5;
export const itemWidth = width - 20;
