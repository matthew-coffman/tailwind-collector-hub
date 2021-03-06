import { useContext } from 'react';
import { TailwindMobileContext } from './TailwindMobileContext.js';

const useTheme = ({ ios, material } = {}) => {
  const context = useContext(TailwindMobileContext);
  let theme = context.theme || 'ios';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return theme;
};

export { useTheme };
