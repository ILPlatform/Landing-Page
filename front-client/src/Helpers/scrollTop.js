const { useEffect } = require('react');

const useScrollTop = () => {
  document.documentElement.classList.remove('nav-open');
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
};

export default useScrollTop;
