import { useState, useMemo, useRef, useLayoutEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import ExternalLink from './ExternalLink';

// Minimum gap (px) we keep between the tooltip and the viewport edges.
const VIEWPORT_PADDING = 12;

// Photos that get a small chip ahead of their text. The chips are their own
// pre-cropped thumbnails in /assets/chips (a few KB each), so they can paint
// with the page without pulling in the full-size tooltip photos.
const CHIP_TYPES = new Set(["me", "climbing", "travel", "robinhood", "kensho", "saigon"]);

const chipVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.25, rotate: -6 },
};

// The portrait sits in the heading at twice the size, so it grows less to stay clear of the words either side.
const portraitVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.12, rotate: -8 },
};

const ImageToolTip = ({ text, imageUrl, imageAlt, color }: { text: string, imageUrl: string, imageAlt: string, color: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [leftOffset, setLeftOffset] = useState<number | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const type = useMemo(() => imageUrl.split('/').pop()?.split('.').shift(), [imageUrl]);

    const isTextTooltip = type === "movie" || type === "learn";
    const isImageTooltip = type === "me" || type === "climbing" || type === "music" || type === "travel" || type === "saigon" || type === "kensho" || type === "robinhood";
    const hasChip = type !== undefined && CHIP_TYPES.has(type);
    // The portrait gets a round chip sized to the heading; the rest are small rounded squares.
    const isPortrait = type === "me";
    const chipShape = isPortrait
        ? "w-[1em] h-[1em] mr-[0.24em] align-[-0.14em] rounded-full"
        : "w-[1.15em] h-[1.15em] mr-[0.3em] align-[-0.24em] rounded";

    // Position the tooltip centered on the trigger, but clamp it so it never
    // spills off the left/right of the viewport (important on mobile).
    const positionTooltip = useCallback(() => {
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        if (!trigger || !tooltip) return;

        const triggerRect = trigger.getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        const triggerCenter = triggerRect.left + triggerRect.width / 2;

        // Desired left edge (in viewport coordinates) to center on the trigger.
        let desiredLeft = triggerCenter - tooltipWidth / 2;

        // Clamp within the viewport, leaving a small padding on each side.
        const maxLeft = window.innerWidth - tooltipWidth - VIEWPORT_PADDING;
        const minLeft = VIEWPORT_PADDING;
        desiredLeft = Math.max(minLeft, Math.min(desiredLeft, maxLeft));

        // Convert back to an offset relative to the trigger's left edge.
        setLeftOffset(desiredLeft - triggerRect.left);
    }, []);

    useLayoutEffect(() => {
        if (!isHovered) {
            setLeftOffset(null);
            return;
        }
        positionTooltip();
        window.addEventListener('resize', positionTooltip);
        window.addEventListener('scroll', positionTooltip, true);
        return () => {
            window.removeEventListener('resize', positionTooltip);
            window.removeEventListener('scroll', positionTooltip, true);
        };
    }, [isHovered, positionTooltip]);

    // While we haven't measured yet, fall back to centering and hide to avoid a flash.
    const tooltipPositionStyle = leftOffset === null
        ? { top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', visibility: 'hidden' as const }
        : { top: 'calc(100% + 10px)', left: `${leftOffset}px` };

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
                            className={`inline-block object-cover bg-gray-200 ring-1 ring-gray-900/15 ${chipShape}`}
                            variants={isPortrait ? portraitVariants : chipVariants}
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
