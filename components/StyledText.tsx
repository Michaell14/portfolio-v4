import { useCallback } from 'react';
import useStore from '../store';

type ColorType = 'me' | 'climb' | 'music' | 'travel' | 'movie' | 'learn';

const colors: Record<ColorType, string> = {
    'me': "bg-[#ff6358]",
    'climb': "bg-[#ffd246]",
    'music': "bg-[#78d237]",
    'travel': "bg-[#28b4c8]",
    'movie': "bg-[#2d73f5]",
    'learn': "bg-[#aa46be]"
}

const IMAGE_MAP: Record<string, string | null> = {
    'me': '/assets/me.jpg',
    'climb': '/assets/climbing.gif',
    'music': '/assets/music.jpg',
    'travel': '/assets/travel.jpg',
    'movie': null,
    'learn': null
}

function StyledText(props: { text: string, type: string }) {
    const type = props.type;
    const { setImageSrc, setType, locked, setLocked, clearAllLocked, isAnyLocked } = useStore();

    const setImage = useCallback(() => {
        setImageSrc(IMAGE_MAP[type] ?? null);
    }, [type, setImageSrc]);

    const handleMouseEnter = useCallback(() => {
        if (isAnyLocked()) return;
        setImage();
        setType(type);
    }, [isAnyLocked, setImage, setType, type]);

    const handleMouseLeave = useCallback(() => {
        if (isAnyLocked()) return;
        setImageSrc(null);
        setType(null);
    }, [isAnyLocked, setImageSrc, setType]);

    const handleClick = useCallback(() => {
        if (locked[type]) {
            setLocked({ [type]: false });
            setType(null);
        } else {
            clearAllLocked();
            setType(type);
            setImage();
            setLocked({ [type]: true });
        }
    }, [locked, type, setLocked, setType, clearAllLocked, setImage]);

    return (
        <span 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`${locked[type] ? colors[type as ColorType] : "bg-[#2E2E2E]"} text-white hover:cursor-pointer select-none`}>
            {props.text}
        </span>
    )
}

export default StyledText;