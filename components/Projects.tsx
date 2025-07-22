import MediaOverlay from './MediaOverlay';
import useStore from '../store';
import { motion } from 'motion/react';

function Projects() {
    const { openedProjects, toggleOpenedProject } = useStore();

    return (
        <div className='text-sm gap-5 flex flex-col relative'>
            <p className='font-bold text-center text-gray-700 text-lg'>[PROJECTS]</p>
            <MediaOverlay />
            {projects.map((project, index) => (
                <div key={project.name} className='flex flex-col gap-2 hover:cursor-pointer' onClick={() => toggleOpenedProject(index)}>
                    <p className='font-bold text-3xl select-none'>{project.name.toUpperCase()}</p>

                    <motion.div
                        style={{
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "row",
                            gap: "5em"
                        }}
                        variants={{
                            open: {
                                opacity: 1,
                                height: "auto",
                                scale: 1,
                                transition: {
                                    type: "tween",
                                    duration: .2
                                }
                            },
                            closed: {
                                height: "0px",
                                scale: 0.98,
                                transition: {
                                    type: "tween",
                                    duration: .2
                                }
                            }
                        }}
                        initial="closed"
                        animate={openedProjects[index] ? "open" : "closed"}
                    >
                        <div className='w-1/3'>
                            <p className='subtext text-xs text-justify'>{project.description}</p>
                            <p><a href={project.link} target='_blank' className='text-blue-500'>link</a></p>
                            {project.github && <p><a href={project.github} target='_blank' className='text-blue-500'>github</a></p>}
                        </div>
                        <div className='w-1/2'>
                            <img src={project.image} alt={project.name} />
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    )
}

const projects = [
    {
        name: "Minesweeper Co-op",
        description: "A free real-time multiplayer adaptation of Minesweeper with 1000+ monthly users using Vite, Socket.IO, and Redis.",
        image: "/assets/minesweeper.gif",
        link: "https://www.minesweepercoop.com/",
        github: "https://github.com/Michaell14/Minesweeper-Co-op"
    },
    {
        name: "PennPins",
        description: "A social exploration app designed to help students discover campus and connect with each other in real life.",
        image: "/assets/pennpins.gif",
        link: "https://www.google.com",
        github: "https://github.com/Michaell14/explore-penn"
    },
    {
        name: "PlayDeck w/ Spotify Integration",
        description: "This project transforms physical album covers into smart music triggers using a Raspberry Pi 4, RFID technology, and the Spotify API. Simply place an album cover with an embedded RFID tag onto the scanner to instantly play the corresponding Spotify playlist or album through connected speakers.",
        image: "/assets/musicbox.webp",
        link: "https://www.google.com",
        github: null
    },
    {
        name: "Accelerometer Controller",
        description: "A controller for a 3D printer using an accelerometer and a microcontroller.",
        image: "/accelerometer/1.webp",
        link: "https://www.google.com",
        github: "https://github.com/Michaell14/Arduino-Controller-for-Hotdog-Unity-Game"
    },

]


export default Projects