import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import ExternalLink from './ExternalLink';

const ImageToolTip = ({ text, imageUrl, imageAlt, color }: { text: string, imageUrl: string, imageAlt: string, color: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const type = useMemo(() => imageUrl.split('/').pop()?.split('.').shift(), [imageUrl]);

    const isTextTooltip = type === "movie" || type === "learn";
    const isImageTooltip = type === "me" || type === "climbing" || type === "music" || type === "travel" || type === "saigon" || type === "kensho";

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={isTextTooltip ? () => setIsHovered(true) : undefined}
            onMouseLeave={isTextTooltip ? () => setIsHovered(false) : undefined}
        >
            <motion.div
                initial={{ color: color }}
                whileHover={{ color: "#ef4444" }}
                transition={{ duration: .3 }}
            >
                <span 
                    className={`cursor-pointer underline`}
                    onMouseEnter={isImageTooltip ? () => setIsHovered(true) : undefined}
                    onMouseLeave={isImageTooltip ? () => setIsHovered(false) : undefined}
                >
                    {text}
                </span>
            </motion.div>
            {/* Invisible bridge to maintain hover state across the gap - only for text tooltips */}
            {isHovered && isTextTooltip && (
                <div
                    className="absolute z-0"
                    style={{ 
                        top: '100%', 
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '600px',
                        height: '10px',
                        pointerEvents: 'auto'
                    }}
                />
            )}
            {isHovered && isImageTooltip && (
                <div
                    className="absolute z-10 p-2 bg-white border border-gray-300 rounded shadow-lg"
                    style={{ top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-30%)' }} // Position below and center
                >
                    <img src={imageUrl} alt={imageAlt} className="max-w-lg h-auto rounded max-h-[380px]" />
                </div>
            )}
            {isHovered && isTextTooltip && (
                <div
                    className="absolute z-10 p-2 bg-white border border-gray-300 rounded shadow-lg w-[500px] text-left"
                    style={{ top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }} // Position below and center
                >
                    {type === "movie" ? (
                        <>
                            <p className="text-sm font-bold italic mt-2">Some notable movies that I've watched are:</p>
                            <ul className='text-sm columns-2'>
                                <li>Oldboy</li>
                                <li>Saw (2004)</li>
                                <li>Fantastic Mr. Fox</li>
                                <li>The Shawshank Redemption</li>
                                <li>The Devil Wears Prada</li>
                                <li>3 Idiots</li>
                                <li>Interstellar</li>
                                <li>12 Angry Men</li>
                            </ul>
                            <p className="text-sm font-bold italic mt-2">I also love anime & manga:</p>
                            <ul className='text-sm columns-2'>
                                <li>One Piece</li>
                                <li>Death Note</li>
                                <li>The Disastrous Life of Saiki K.</li>
                                <li>High School Ouran Host Club</li>
                                <li>Hunter x Hunter</li>
                                <li>My Hero Academia</li>
                                <li>Great Teacher Onizuka</li>
                                <li>Vinland Saga</li>
                                <li>Baki the Grappler</li>
                                <li>Jagaaan</li>
                                <li>I Want to Eat Your Pancreas</li>
                            </ul>

                            <p className="text-sm font-bold italic mt-2">My updated movie <ExternalLink href="https://www.notion.so/Movies-27d975c3c3298073adc4c06414a567ae?source=copy_link" color="#374151">list</ExternalLink></p>
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-bold">LEARNING</p>
                            <p className="text-sm">Learning is the process of acquiring new knowledge, skills, values, beliefs, and habits. It is a <span className="italic">lifelong</span> process that involves the development of cognitive, emotional, and social capabilities.</p>
                            <p className="font-bold italic mt-2 text-sm">I want to learn more about:</p>
                            <ul className='text-sm'>
                                <li>Everything!</li>
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageToolTip;