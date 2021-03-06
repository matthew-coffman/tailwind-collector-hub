import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { cls } from '../shared/cls.js';
import { useTheme } from '../shared/use-theme.js';
import { useTouchRipple } from '../shared/use-touch-ripple.js';
import { useThemeClasses } from '../shared/use-theme-classes.js';
import { positionClass } from '../shared/position-class.js';
import { useDarkClasses } from '../shared/use-dark-classes.js';

const Button = forwardRef((props, ref) => {
  const {
    component = 'button',
    className,
    colors: colorsProp,

    ios,
    material,

    // Anchor props
    href,

    // Style props
    outline,
    clear,
    rounded,
    small,
    large,
    raised,
    inline,

    // Segmented
    segmented,
    segmentedStrong,
    segmentedActive,

    touchRipple = true,

    // Children
    children,

    // Rest
    ...rest
  } = props;

  const rippleElRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: rippleElRef.current,
  }));

  let Component = component;
  if (typeof props.component === 'undefined' && (href || href === ''))
    Component = 'a';

  const attrs = {
    href,
    ...rest,
  };

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });
  const dark = useDarkClasses();

  useTouchRipple(rippleElRef, theme === 'material' && touchRipple);

  const size = large ? 'large' : small ? 'small' : 'medium';
  let style = outline
    ? 'outline'
    : clear || (segmented && !segmentedActive)
    ? 'clear'
    : 'fill';
  if (segmentedStrong) style = 'segmentedStrong';
  if (segmentedStrong && segmentedActive) style = 'segmentedStrongActive';

  const colors = {
    text: 'text-primary',
    border: 'border-primary',
    bg: 'bg-primary',
    activeBg: 'active:bg-primary',
    activeBgDark: 'active:bg-primary-dark',
    touchRipple: 'touch-ripple-primary',
    ...colorsProp,
  };

  const c = themeClasses({
    base: {
      common: cls(
        'uppercase flex text-center justify-center items-center appearance-none px-2 py-1 transition-colors focus:outline-none cursor-pointer select-none overflow-hidden z-10',
        inline ? 'inline-flex' : 'w-full flex',
        positionClass('relative', className)
      ),
      ios: `duration-100 font-semibold`,
      material: `duration-300 font-medium tracking-wider`,

      square:
        segmented && !segmentedStrong
          ? 'first:rounded-l last:rounded-r'
          : 'rounded',
      rounded: segmented && !segmentedStrong ? '' : 'rounded-full',
    },
    style: {
      fill: `text-white ${colors.bg} ${colors.activeBgDark} touch-ripple-white`,
      outline: cls(
        !segmented && `border-2 ${colors.border}`,
        colors.text,
        colors.activeBg,
        'active:bg-opacity-15',
        colors.touchRipple
      ),
      clear: `${colors.text} ${colors.activeBg} active:bg-opacity-15 ${colors.touchRipple}`,
      segmentedStrong: cls(
        `active:bg-black active:bg-opacity-10`,
        dark(
          'dark:active:bg-white dark:active:bg-opacity-5 dark:touch-ripple-white'
        )
      ),
      segmentedStrongActive: 'duration-0',
    },
    size: {
      small: {
        ios: `text-xs h-7`,
        material: `text-sm h-7`,
      },
      medium: {
        common: 'text-sm',
        ios: `h-7`,
        material: `h-9`,
      },
      large: {
        ios: `h-11`,
        material: `h-12`,
      },
    },
    raised: `shadow active:shadow-lg`,
  });

  const classes = cls(
    c.base[rounded ? 'rounded' : 'square'],

    // style
    c.style[style],

    // size
    c.size[size],

    raised && c.raised,

    className
  );

  return (
    <Component ref={rippleElRef} className={classes} {...attrs}>
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
