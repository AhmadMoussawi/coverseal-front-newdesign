import React, { useEffect } from 'react';

const DeferredScript = ({ src }) => {
  useEffect(() => {
    const handleDOMContentLoaded = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      document.head.appendChild(link);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [src]);

  return (
    <noscript>
      <link rel="stylesheet" href={src} />
    </noscript>
  );
};

export default DeferredScript;
