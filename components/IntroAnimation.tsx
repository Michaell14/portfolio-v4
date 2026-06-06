import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FRAME_DURATION_MS = 200;
const FIRST_FRAME_HOLD_MS = 700;
const LAST_FRAME_HOLD_MS = 700;
const FADE_DURATION_MS = 400;
const MAX_FRAMES = 200;

function loadImage(src: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

interface IntroAnimationProps {
    onComplete: () => void;
}

function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const [searchParams] = useSearchParams();
    const scrollMode = searchParams.get('mode') === 'scroll';
    // Choose the image set: ?version=v2 -> animation_images_1, default v1 -> animation_images_2.
    const folderIndex = searchParams.get('version') === 'v2' ? 1 : 2;
    const fileExt = folderIndex === 2 ? 'png' : 'JPG';

    const [frames, setFrames] = useState<string[]>([]);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [fadingOut, setFadingOut] = useState(false);
    const completedRef = useRef(false);

    const finish = () => {
        if (completedRef.current) return;
        completedRef.current = true;
        onComplete();
    };

    // Detect and preload frames sequentially until one is missing.
    useEffect(() => {
        let cancelled = false;

        (async () => {
            const loaded: string[] = [];
            for (let i = 1; i <= MAX_FRAMES; i++) {
                const src = `/animation_images_${folderIndex}/${i}.${fileExt}`;
                const img = await loadImage(src);
                if (cancelled) return;
                if (!img) break;
                loaded.push(src);
            }

            if (cancelled) return;

            if (loaded.length === 0) {
                finish();
                return;
            }

            setFrames(loaded);
        })();

        return () => {
            cancelled = true;
        };
    }, [folderIndex, fileExt]);

    // Auto-advance through frames once they are loaded. The first frame holds a
    // little longer before the sequence starts playing. Disabled in scroll mode.
    useEffect(() => {
        if (scrollMode) return;
        if (frames.length === 0) return;

        if (currentFrame >= frames.length - 1) {
            // Hold on the last frame before fading out.
            const holdTimer = setTimeout(() => setFadingOut(true), LAST_FRAME_HOLD_MS);
            return () => clearTimeout(holdTimer);
        }

        const delay = currentFrame === 0 ? FIRST_FRAME_HOLD_MS : FRAME_DURATION_MS;
        const timer = setTimeout(() => {
            setCurrentFrame((prev) => prev + 1);
        }, delay);

        return () => clearTimeout(timer);
    }, [scrollMode, frames, currentFrame]);

    // In scroll mode, step through frames manually with the arrow keys.
    // Advancing past the last frame fades out into the page.
    useEffect(() => {
        if (!scrollMode) return;
        if (frames.length === 0) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (fadingOut) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                setCurrentFrame((prev) => {
                    if (prev >= frames.length - 1) {
                        setFadingOut(true);
                        return prev;
                    }
                    return prev + 1;
                });
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                setCurrentFrame((prev) => Math.max(0, prev - 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scrollMode, frames, fadingOut]);

    // Unmount after the fade-out finishes.
    useEffect(() => {
        if (!fadingOut) return;
        const timer = setTimeout(finish, FADE_DURATION_MS);
        return () => clearTimeout(timer);
    }, [fadingOut]);

    return (
        <div
            className="fixed inset-0 z-50 bg-white"
            style={{
                opacity: fadingOut ? 0 : 1,
                transition: `opacity ${FADE_DURATION_MS}ms ease-out`,
                pointerEvents: fadingOut ? 'none' : 'auto',
            }}
        >
            {frames.length > 0 && (
                <img
                    src={frames[currentFrame]}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                />
            )}
            {scrollMode && frames.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-white/70 px-3 py-1 rounded-full">
                    {currentFrame + 1} / {frames.length} &middot; use arrow keys
                </div>
            )}
        </div>
    );
}

export default IntroAnimation;
