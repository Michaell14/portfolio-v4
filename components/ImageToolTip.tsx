import { useState } from 'react';
import { motion } from 'motion/react';

const ImageToolTip = ({ text, imageUrl, imageAlt, color }: { text: string, imageUrl: string, imageAlt: string, color: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const type = imageUrl.split('/').pop()?.split('.').shift();

    return (
        <div className="relative inline-block"> {/* Essential for positioning the tooltip */}
            <motion.div
                initial={{ color: color }}
                whileHover={{ color: "red" }}
                transition={{ duration: .3 }}
            >
                <span
                    className={`cursor-pointer underline`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {text}
                </span>
            </motion.div>
            {isHovered && (type === "bridge" || type === "climbing" || type === "music" || type === "travel") && (
                <div
                    className="absolute z-10 p-2 bg-white border border-gray-300 rounded shadow-lg"
                    style={{ top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-30%)' }} // Position below and center
                >
                    <img src={imageUrl} alt={imageAlt} className="max-w-lg h-auto rounded max-h-[380px]" />
                </div>
            )}
            {isHovered && (type === "movie" || type === "learn") && (
                <div
                    className="absolute z-10 p-2 bg-white border border-gray-300 rounded shadow-lg w-[500px] text-left"
                    style={{ top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }} // Position below and center
                >
                    {type === "movie" ? (
                        <>
                            <p className="text-sm font-bold italic mt-2">Some notable movies that I've watched are:</p>
                            <ul className='text-sm columns-2'>
                                <li>Oldboy</li>
                                <li>Saw</li>
                                <li>How to make millions before grandma dies</li>
                                <li>The Shawshank Redemption</li>
                                <li>The Devil Wears Prada</li>
                                <li>3 Idiots</li>
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