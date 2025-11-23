// import useStore from '../store';

function Sandbox() {
    // const { openedProjects, toggleOpenedProject } = useStore();

    return (
        <div className='text-sm flex flex-col secondary-font relative'>
            <p className='text-xs text-gray-500 italic!'>SANDBOX</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
                {projects.map((project) => (

                    <a key={project.name} href={project.link ?? project.github ?? ""} target="_blank" rel="noopener noreferrer">
                        <div className={`flex flex-col hover:cursor-pointer h-fit mb-6`}>
                            <img src={project.image} alt={project.name} className="object-cover w-full h-auto aspect-video" />
                            
                            <div className = "mt-2">
                                <div className="flex flex-row justify-between items-center">
                                    <p className='text-base text-gray-700'>{project.name}</p>
                                    <p className='text-gray-500 text-sm'>{project.subdescription}</p>
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


export default Sandbox