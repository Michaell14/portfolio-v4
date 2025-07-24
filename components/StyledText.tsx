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

function StyledText(props: { text: string, type: string }) {
    const type = props.type;
    const { setImageSrc, setType, locked, setLocked, clearAllLocked, isAnyLocked } = useStore();

    const setImage = () => {
        if (type === "me") {
            setImageSrc(`/assets/me.jpg`);
        } else if (type === "climb") {  
            setImageSrc(`/assets/climbing.gif`);
        } else if (type === "music") {
            setImageSrc(`/assets/music.jpg`);
        } else if (type === "travel") {
            setImageSrc(`/assets/travel.jpg`);
        } else if (type === "movie" || type === "learn") {
            setImageSrc(null);
        }
    }
    const handleMouseEnter = () => {
        if (isAnyLocked()) return;
        setImage();
        setType(type);
    };

    const handleMouseLeave = () => {
        if (isAnyLocked()) return;
        setImageSrc(null);
        setType(null);
    };

    const handleClick = () => {
        if (locked[type]) {
            setLocked({ [type]: false });
            setType(null);
        } else {
            clearAllLocked();
            setType(type);
            setImage();
            setLocked({ [type]: true });
        }
    };

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