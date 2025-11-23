// import useStore from '../store';

function Projects() {
    // const { openedProjects, toggleOpenedProject } = useStore();

    return (
        <div className='text-sm flex flex-col secondary-font relative'>
            <p className='text-xs text-gray-500 italic!'>PROJECTS</p>
            <div className='columns-1 md:columns-2 gap-6 mt-12'>
                {projects.map((project) => (

                    <a key={project.name} href={project.link ?? project.github ?? ""} target="_blank" rel="noopener noreferrer">
                        <div  className={`flex flex-col hover:cursor-pointer break-inside-avoid mb-6`}>
                            <div className="relative overflow-hidden group">
                                <img src={project.image} alt={project.name} className="object-cover w-full h-auto" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className = "mt-2">
                                <div className="flex flex-row justify-between items-center">
                                    <p className='text-base lg:text-lg text-gray-700'>{project.name}</p>
                                    <p className='text-gray-500 text-sm lg:text-base'>{project.context} · ({project.subdescription})</p>
                                </div>
                                {/* <p className='text-sm text-gray-700'>{project.description}</p> */}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

const projects = [
    {
        name: "Minesweeper Online Co-op",
        context: "Personal",
        description: "A free real-time multiplayer Minesweeper Co-op with 1k+ monthly users.",
        subdescription: "React + Socket.IO",
        image: "/assets/minesweeper.gif",
        link: "https://www.minesweepercoop.com/",
        github: "https://github.com/Michaell14/Minesweeper-Co-op"
    },
    {
        name: "PennPins",
        context: "SPARK",
        description: "A social exploration app designed to help students discover campus and connect with each other in real life.",
        subdescription: "React Native + Expo",
        image: "/assets/pennpins2.png",
        link: null,
        github: "https://github.com/Michaell14/explore-penn"
    },
    {
        name: "Spotify PlayDeck",
        context: "Hardware",
        description: "Spotify RFID music box",
        subdescription: "Raspberry Pi 4 + Spotify API",
        image: "/assets/musicbox.webp",
        link: null,
        github: null
    },
    {
        name: "Accelerometer Controller",
        context: "UMD Bitcamp",
        description: "A controller for a 3D printer using an accelerometer and a microcontroller.",
        subdescription: "Arduino Uno + Unity",
        image: "/accelerometer/1.webp",
        link: null,
        github: "https://github.com/Michaell14/Arduino-Controller-for-Hotdog-Unity-Game"
    },

]


export default Projects