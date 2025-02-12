import { useEffect, useState } from 'react';

export const useKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const viewport = window.visualViewport;
            if (viewport) {
                const keyboardSize = window.innerHeight - viewport.height;
                setKeyboardHeight(keyboardSize > 0 ? keyboardSize : 0);
            }
        };

        window.visualViewport?.addEventListener('resize', handleResize);
        return () =>
            window.visualViewport?.removeEventListener('resize', handleResize);
    }, []);

    return keyboardHeight;
};
