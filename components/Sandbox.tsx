// import useStore from '../store';
import { motion } from 'motion/react';

function Sandbox() {
    // const { openedProjects, toggleOpenedProject } = useStore();

    return (
        <div className='text-sm flex flex-col secondary-font relative'>
            <p className='text-xs text-gray-500 italic!'>Sandbox</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-12'>
                {projects.map((project) => (
                    <div key={project.name} className={`flex flex-col hover:cursor-pointer border border-gray-200 h-fit mb-6`}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: .6 } }}
                            viewport={{ amount: .95 }}
                        >
                            
                        </motion.div>
                        <img src={project.image} alt={project.name} className="object-cover w-full h-[320px]" />
                        
                        <div className = "p-2">
                            <div className="flex flex-row justify-between items-center">
                                <p className='text-md lg:text-lg text-gray-700'>{project.name}</p>
                                <p className='text-gray-700'>{project.subdescription}</p>
                            </div>
                            {/* <p className='text-sm text-gray-700'>{project.description}</p> */}
                        </div>
                    </div>
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

]


export default Sandbox