import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import ExternalLink from './ExternalLink';
import useTooltipPosition from './useTooltipPosition';

// Photos that get a small chip ahead of their text. The chips are their own
// pre-cropped thumbnails in /assets/chips (a few KB each), so they can paint
// with the page without pulling in the full-size tooltip photos.
// "me" is left out on purpose: the name in the heading stays plain text.
const CHIP_TYPES = new Set(["climbing", "travel", "robinhood", "kensho", "saigon"]);

const chipVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.25, rotate: -6 },
};

const ImageToolTip = ({ text, imageUrl, imageAlt, color }: { text: string, imageUrl: string, imageAlt: string, color: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const type = useMemo(() => imageUrl.split('/').pop()?.split('.').shift(), [imageUrl]);

    const isTextTooltip = type === "movie" || type === "learn";
    const isImageTooltip = type === "me" || type === "climbing" || type === "music" || type === "travel" || type === "saigon" || type === "kensho" || type === "robinhood";
    const hasChip = type !== undefined && CHIP_TYPES.has(type);

    const { triggerRef, tooltipRef, tooltipPositionStyle } = useTooltipPosition(isHovered);

    return (
        <div
            ref={triggerRef}
            className="relative inline-block"
            onMouseEnter={isTextTooltip ? () => setIsHovered(true) : undefined}
            onMouseLeave={isTextTooltip ? () => setIsHovered(false) : undefined}
        >
            {/* Named variants rather than inline values so the chip can follow the same hover. */}
            <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={{ rest: { color: color }, hover: { color: "#ef4444" } }}
                transition={{ duration: .3 }}
            >
                <span
                    className="cursor-pointer"
                    onMouseEnter={isImageTooltip ? () => setIsHovered(true) : undefined}
                    onMouseLeave={isImageTooltip ? () => setIsHovered(false) : undefined}
                >
                    {hasChip && (
                        // Decorative: the tooltip photo carries the description.
                        <motion.img
                            src={`/assets/chips/${type}.webp`}
                            alt=""
                            aria-hidden="true"
                            draggable={false}
                            className="inline-block object-cover bg-gray-200 ring-1 ring-gray-900/15 w-[1.15em] h-[1.15em] mr-[0.3em] align-[-0.24em] rounded"
                            variants={chipVariants}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    )}
                    {/* The underline sits on the text alone so it doesn't run under the chip. */}
                    <span className="underline">{text}</span>
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
                    ref={tooltipRef}
                    className="absolute z-10 p-2 bg-white border border-gray-300 rounded shadow-lg"
                    style={tooltipPositionStyle}
                >
                    <img src={imageUrl} alt={imageAlt} className="max-w-[min(32rem,calc(100vw-24px))] h-auto rounded max-h-[380px]" />
                </div>
            )}
            {isHovered && isTextTooltip && (
                <div
                    ref={tooltipRef}
                    className="absolute z-10 p-2 bg-white border border-gray-300 rounded shadow-lg text-left"
                    style={{ ...tooltipPositionStyle, width: 'min(500px, calc(100vw - 24px))' }}
                >
                    {type === "movie" ? (
                        <>
                            <p className="text-sm font-bold italic mt-2">Some notable movies that I've watched are:</p>
                            <ul className='text-sm columns-2'>
                                <li>Oldboy</li>
                                <li>Saw (2004)</li>
                                <li>Fantastic Mr. Fox</li>
                                <li>The Shawshank Redemption</li>
                                <li>The Hangover</li>
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
                                <li>Fullmetal Alchemist</li>
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
