// import useStore from '../store';

function Projects() {
    // const { openedProjects, toggleOpenedProject } = useStore();

    return (
        <div className='text-sm flex flex-col secondary-font relative'>
            <p className='text-xs text-gray-500 italic!'>PROJECTS</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
                {projects.map((project) => (
                    <a href={project.link ?? project.github ?? ""} target="_blank" rel="noopener noreferrer">
                    <div key={project.name} className={`flex flex-col hover:cursor-pointer h-fit mb-6`}>
                        <img src={project.image} alt={project.name} className="object-cover w-full h-auto aspect-video" />
                        
                        <div className = "mt-2">
                            <div className="flex flex-row justify-between items-center">
                                <p className='text-md lg:text-md text-gray-700'>{project.name}</p>
                                <p className='text-gray-500'>{project.subdescription}</p>
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
        name: "Minesweeper Co-op",
        description: "A free real-time multiplayer Minesweeper Co-op with 1k+ monthly users.",
        subdescription: "React · Redis · Socket.IO",
        image: "/assets/minesweeper.gif",
        link: "https://www.minesweepercoop.com/",
        github: "https://github.com/Michaell14/Minesweeper-Co-op"
    },
    {
        name: "PennPins",
        description: "A social exploration app designed to help students discover campus and connect with each other in real life.",
        subdescription: "React Native · Expo",
        image: "/assets/pennpins.gif",
        link: null,
        github: "https://github.com/Michaell14/explore-penn"
    },
    {
        name: "PlayDeck",
        description: "Spotify RFID music box",
        subdescription: "Raspberry Pi 4 · Spotify API",
        image: "/assets/musicbox.webp",
        link: null,
        github: null
    },
    {
        name: "Accelerometer Controller",
        description: "A controller for a 3D printer using an accelerometer and a microcontroller.",
        subdescription: "Arduino Uno · Unity",
        image: "/accelerometer/1.webp",
        link: null,
        github: "https://github.com/Michaell14/Arduino-Controller-for-Hotdog-Unity-Game"
    },

]


export default Projects