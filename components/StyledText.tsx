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
            setImageSrc(`./src/assets/me/1.jpg`);
        } else if (type === "climb") {
            setImageSrc(`./src/assets/rockclimbing/1.gif`);
        } else if (type === "music") {
            setImageSrc(`./src/assets/music/1.jpg`);
        } else if (type === "travel") {
            setImageSrc(`./src/assets/travel/1.jpg`);
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
            className='bg-[#1f2937] text-white'>
            {props.text}
        </span>
    )
}

export default StyledText;