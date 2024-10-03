import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
console.log("Current location:", location);
const useDisableBackNavigation = () => {
    const location = useLocation();

    useEffect(() => {
        const handlePopState = (e) => {
            e.preventDefault();
            window.history.pushState(null, document.title, window.location.href);
        };

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [location]);
};

export default useDisableBackNavigation;
