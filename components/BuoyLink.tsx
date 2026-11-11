import { motion } from 'motion/react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

// Buoy's ink island colours.
const ISLAND = "#0B0B0C";
const ACCENT = "#2DD4BF";

const spring = { type: "spring" as const, stiffness: 420, damping: 22 };

/**
 * The "Buoy" link turns into a Buoy island on hover: a black pill grows behind
 * the word, the text goes white and a queue badge pops on the corner.
 * Everything is absolutely positioned, so the sentence never reflows.
 */
const BuoyLink = ({ href, color = "#374151" }: { href: string, color?: string }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative isolate inline-flex items-center gap-1"
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileFocus="hover"
            whileTap="hover"
            variants={{ rest: { color }, hover: { color: "#ffffff" } }}
            transition={{ duration: .25 }}
        >
            {/* The island. */}
            <motion.span
                aria-hidden="true"
                className="absolute -inset-x-[9px] -inset-y-[3px] -z-10 rounded-full"
                style={{ backgroundColor: ISLAND }}
                variants={{
                    rest: { scaleX: .35, scaleY: .6, opacity: 0 },
                    hover: { scaleX: 1, scaleY: 1, opacity: 1 },
                }}
                transition={spring}
            />
            <motion.span
                className="underline"
                variants={{
                    rest: { textDecorationColor: "rgba(55, 65, 81, 1)" },
                    hover: { textDecorationColor: "rgba(55, 65, 81, 0)" },
                }}
                transition={{ duration: .2 }}
            >
                Buoy
            </motion.span>
            <ExternalLinkIcon className="w-3 h-3" />
            {/* Queue badge, as on the real island. */}
            <motion.span
                aria-hidden="true"
                className="absolute -top-3 -right-[18px] px-[5px] py-[3px] rounded-full font-mono text-[10px] leading-none font-medium"
                style={{ backgroundColor: ACCENT, color: ISLAND }}
                variants={{
                    rest: { scale: 0 },
                    hover: { scale: 1, transition: { ...spring, delay: .12 } },
                }}
                transition={spring}
            >
                +2
            </motion.span>
        </motion.a>
    );
};

export default BuoyLink;
