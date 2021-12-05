import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import Toolbar from './Toolbar.jsx';

const Tabbar = forwardRef((props, ref) => {
  const {
    labels,

    children,

    ...rest
  } = props;

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const attrs = {
    ...rest,
  };

  return (
    <Toolbar ref={elRef} tabbar tabbarLabels={labels} {...attrs}>
      {children}
    </Toolbar>
  );
});

Tabbar.displayName = 'Tabbar';

export default Tabbar;
