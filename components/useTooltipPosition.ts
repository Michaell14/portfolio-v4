import { useCallback, useLayoutEffect, useRef, useState } from 'react';

// Minimum gap (px) we keep between the tooltip and the viewport edges.
const VIEWPORT_PADDING = 12;

/**
 * Positions a tooltip below its trigger, centered on it but clamped so it never
 * spills off the left/right of the viewport (important on mobile).
 */
export default function useTooltipPosition(isOpen: boolean) {
    const [leftOffset, setLeftOffset] = useState<number | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

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
        if (!isOpen) {
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
    }, [isOpen, positionTooltip]);

    // While we haven't measured yet, fall back to centering and hide to avoid a flash.
    const tooltipPositionStyle = leftOffset === null
        ? { top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', visibility: 'hidden' as const }
        : { top: 'calc(100% + 10px)', left: `${leftOffset}px` };

    return { triggerRef, tooltipRef, tooltipPositionStyle };
}
