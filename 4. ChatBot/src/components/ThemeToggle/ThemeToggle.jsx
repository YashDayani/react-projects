import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('night', isNight);
  }, [isNight]);

  const toggleTheme = () => {
    setIsNight(!isNight);
  };

  return (
    <button onClick={toggleTheme}>
      {isNight ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
