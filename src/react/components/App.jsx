import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { cls } from '../shared/cls.js';
import { positionClass } from '../shared/position-class.js';
import { TailwindMobileProvider } from '../shared/TailwindMobileProvider.jsx';
import { useAutoTheme } from '../shared/use-auto-theme.js';

const App = forwardRef((props, ref) => {
  const {
    component = 'div',
    className,

    theme = 'material',
    dark = true,
    touchRipple = true,
    safeAreas = true,

    // Children
    children,

    // Rest
    ...rest
  } = props;

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const Component = component;

  const attrs = {
    ...rest,
  };

  const currentTheme = useAutoTheme(theme);

  const classes = cls(
    currentTheme === 'ios' && `twm-ios`,
    currentTheme === 'material' && 'twm-material',
    'twm-app w-full h-full min-h-screen',
    safeAreas && 'safe-areas',
    positionClass('relative', className),
    className
  );

  return (
    <TailwindMobileProvider
      theme={currentTheme}
      dark={dark}
      touchRipple={touchRipple}
      autoThemeDetection={false}
    >
      <Component ref={elRef} className={classes} {...attrs}>
        {children}
      </Component>
    </TailwindMobileProvider>
  );
});

App.displayName = 'App';

export default App;
