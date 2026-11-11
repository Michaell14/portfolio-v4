import { useEffect, useMemo, useState } from 'react';
import type { FocusEvent, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { describe, pipkin } from 'pipkins';
import 'pipkins/motion.css';
import useTooltipPosition from './useTooltipPosition';

// Same spring as the photo chips in ImageToolTip.
const chipVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.25, rotate: -6 },
};

// Who the pipkin belongs to until the visitor types a name.
const DEFAULT_SEED = "you";

/**
 * The "Pipkins" link with a pipkin chip in front of it. Hovering opens a small
 * popover where visitors type a name and see their own pipkin drawn live.
 * The popover stays open while its field has focus.
 */
const PipkinsLink = ({ href, color = "#374151" }: { href: string, color?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [name, setName] = useState("");
    const isOpen = isHovered || hasFocus;
    const { triggerRef, tooltipRef, tooltipPositionStyle } = useTooltipPosition(isOpen);

    const seed = name.trim() || DEFAULT_SEED;
    const chipSvg = useMemo(() => pipkin(seed, { animate: true, mood: isOpen ? "happy" : "neutral" }), [seed, isOpen]);
    const portraitSvg = useMemo(() => pipkin(seed, { animate: true, mood: "happy", title: seed }), [seed]);
    const description = useMemo(() => describe(seed), [seed]);

    // Touch screens have no hover: the first tap opens the popover, the next one follows the link.
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isOpen && window.matchMedia('(hover: none)').matches) {
            e.preventDefault();
            setIsHovered(true);
        }
    };

    // Close a tap-opened popover when tapping elsewhere.
    useEffect(() => {
        if (!isHovered) return;
        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse' && !triggerRef.current?.contains(e.target as Node)) {
                setIsHovered(false);
            }
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [isHovered, triggerRef]);

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasFocus(false);
    };

    return (
        <div
            ref={triggerRef}
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setHasFocus(true)}
            onBlur={handleBlur}
        >
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="inline-flex items-center gap-1"
                initial="rest"
                animate={isOpen ? "hover" : "rest"}
                variants={{ rest: { color }, hover: { color: "#ef4444" } }}
                transition={{ duration: .3 }}
            >
                <span>
                    {/* Decorative: the popover's pipkin carries the accessible name. */}
                    <motion.span
                        aria-hidden="true"
                        className="inline-block w-[1.15em] h-[1.15em] mr-[0.3em] align-[-0.24em] [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                        variants={chipVariants}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        dangerouslySetInnerHTML={{ __html: chipSvg }}
                    />
                    <span className="underline">Pipkins</span>
                </span>
                <ExternalLinkIcon className="w-3 h-3" />
            </motion.a>

            {/* Invisible bridge so the pointer can cross the gap into the popover. */}
            {isOpen && (
                <div
                    className="absolute z-0"
                    style={{ top: '100%', left: 0, right: 0, height: '12px' }}
                />
            )}
            {isOpen && (
                <div
                    ref={tooltipRef}
                    className="absolute z-10 p-2.5 bg-white border border-gray-300 rounded shadow-lg text-left grid grid-cols-[72px_1fr] gap-x-3 gap-y-2 items-center text-gray-700"
                    style={{ ...tooltipPositionStyle, width: 'min(272px, calc(100vw - 24px))' }}
                >
                    <span
                        className="w-[72px] h-[72px] [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                        dangerouslySetInnerHTML={{ __html: portraitSvg }}
                    />
                    <label className="grid gap-1 text-xs text-gray-500">
                        Draw your pipkin
                        <input
                            id="pipkin-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="your name"
                            maxLength={40}
                            autoComplete="off"
                            spellCheck={false}
                            className="w-full text-[15px] text-gray-900 px-2 py-1.5 border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-500"
                        />
                    </label>
                    <p className="col-span-2 text-xs text-gray-500" aria-live="polite">{description}</p>
                </div>
            )}
        </div>
    );
};

export default PipkinsLink;
