import useStore from '../store';

// function getRandomIntInclusive(min: number, max: number) {
//     min = Math.ceil(min); // Ensure min is an integer
//     max = Math.floor(max); // Ensure max is an integer
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

function StyledText(props: { text: string, type: string }) {
    const type = props.type;
    const { setImageSrc, setType } = useStore();

    const handleMouseEnter = () => {
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
        setType(type);
    };

    const handleMouseLeave = () => {
        setImageSrc(null);
        setType(null);
    };
    return (
        <span 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='bg-[#2E2E2E] text-white hover:cursor-pointer'>
            {props.text}
        </span>
    )
}

export default StyledText;