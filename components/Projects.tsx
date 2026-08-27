import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import ExternalLink from './ExternalLink';

function Projects() {
    const [selected, setSelected] = useState(0);
    const active = projects[selected];
    const sectionRef = useRef<HTMLDivElement>(null);
    // This section is below the fold, so none of its screenshots belong in the
    // initial page load. Once it comes into view we warm the ones that aren't
    // on screen yet, so hovering down the list doesn't flash an empty pane.
    const isNear = useInView(sectionRef, { once: true, margin: '400px' });

    useEffect(() => {
        if (!isNear) return;
        projects.forEach(({ image }) => {
            const img = new Image();
            img.src = image;
        });
    }, [isNear]);

    return (
        <div ref={sectionRef} className='text-sm flex flex-col secondary-font relative'>
            <p className='text-xs text-gray-500 italic!'>PROJECTS</p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className='mt-12'
            >
                {/* The list stays put; only the pane beside it changes. */}
                <div className='hidden lg:grid lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-14 lg:items-start'>
                    <div>
                        {projects.map((project, i) => (
                            <button
                                key={project.name}
                                type='button'
                                onMouseEnter={() => setSelected(i)}
                                onFocus={() => setSelected(i)}
                                onClick={() => setSelected(i)}
                                className='group w-full grid grid-cols-[14px_minmax(0,1fr)_auto] items-center gap-3.5 py-4 text-left border-t border-gray-200 last:border-b hover:cursor-pointer'
                            >
                                <motion.span
                                    animate={{ scale: selected === i ? 1.35 : 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${selected === i ? 'bg-green-600' : 'bg-gray-300'}`}
                                />
                                <motion.span
                                    animate={{ x: selected === i ? 6 : 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                    className={`text-base transition-colors duration-200 ${selected === i ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}
                                >
                                    {project.name}
                                </motion.span>
                                <span className={`text-xs italic transition-colors duration-200 ${selected === i ? 'text-gray-500' : 'text-gray-300'}`}>
                                    {project.context}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Keyed on the project, so switching remounts and fades the new one in. */}
                    <motion.div
                        key={active.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        {/* Fixed 16:9 stage, contained rather than cropped: every screenshot
                            keeps its own aspect and lands at the same height, left-aligned with
                            the text below, so switching projects never moves anything. */}
                        <img
                            src={active.image}
                            alt={active.name}
                            className='w-full aspect-video object-contain object-left'
                            loading='lazy'
                        />
                        {/* Fixed floor so the section never changes height between projects. */}
                        <div className='min-h-32'>
                            <p className='text-xl text-gray-900 mt-5'>{active.name}</p>
                            <p className='text-base text-gray-700 leading-relaxed max-w-[52ch] mt-2'>{active.description}</p>
                            <div className='flex gap-5 mt-4'>
                                {active.link && <ExternalLink href={active.link} className='text-sm'>Visit</ExternalLink>}
                                {active.github && <ExternalLink href={active.github} className='text-sm'>Source</ExternalLink>}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* There's no hover on touch, so below lg every project shows itself. */}
                <div className='flex flex-col gap-10 lg:hidden'>
                    {projects.map((project) => (
                        <div key={project.name}>
                            {/* Stacked cards are independent, so each just takes its natural height. */}
                            <img
                                src={project.image}
                                alt={project.name}
                                className='w-full h-auto'
                                loading='lazy'
                            />
                            <div className='flex justify-between items-baseline gap-3 mt-3'>
                                <p className='text-base text-gray-900'>{project.name}</p>
                                <p className='text-xs italic text-gray-500'>{project.context}</p>
                            </div>
                            <p className='text-sm text-gray-700 leading-relaxed mt-1.5'>{project.description}</p>
                            <div className='flex gap-5 mt-3'>
                                {project.link && <ExternalLink href={project.link} className='text-sm'>Visit</ExternalLink>}
                                {project.github && <ExternalLink href={project.github} className='text-sm'>Source</ExternalLink>}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

const projects = [
    {
        name: "Minesweeper Online Co-op",
        context: "Personal",
        description: "A free real-time multiplayer Minesweeper Co-op with 1k+ monthly users.",
        image: "/assets/minesweeper.webp",
        link: "https://www.minesweepercoop.com/",
        github: "https://github.com/Michaell14/Minesweeper-Co-op"
    },
    {
        name: "PennPins",
        context: "SPARK",
        description: "A social exploration app designed to help students discover campus and connect with each other in real life.",
        image: "/assets/pennpins2.webp",
        link: null,
        github: "https://github.com/Michaell14/explore-penn"
    },
    {
        name: "Spotify PlayDeck",
        context: "Hardware",
        description: "A Spotify RFID music box — tap a card on the deck and the record plays.",
        image: "/assets/musicbox.webp",
        link: null,
        github: null
    },
    {
        name: "Accelerometer Controller",
        context: "UMD Bitcamp",
        description: "A controller for a 3D printer using an accelerometer and a microcontroller.",
        image: "/accelerometer/1.webp",
        link: null,
        github: "https://github.com/Michaell14/Arduino-Controller-for-Hotdog-Unity-Game"
    },
    {
        name: "Design 1020: Art of the Web",
        context: "Portfolio",
        description: "A portfolio of the projects I worked on during Design 1020.",
        image: "/assets/d4.webp",
        link: "https://www.itsmichael.dev/design1020",
        github: null
    },
]

export default Projects
