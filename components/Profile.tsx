import "../src/App.css"
import { motion, useInView } from "motion/react";
import ImageToolTip from "./ImageToolTip";
import ExternalLink from "./ExternalLink";
import { Children, isValidElement, useMemo, useRef } from "react";

function Superscript({ text, size }: { text: string, size: string }) {
    return (
        <span className={`align-super ${size}`} style={{ verticalAlign: 'super' }}>{text}</span>
    )
}

// Define animation variants outside the component to prevent recreation on every render
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const elementVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            damping: 12,
            stiffness: 100,
        },
    },
};

const TypewriterEffect = ({ children, className }: { children: React.ReactNode, className: string }) => {
    // We use React.useMemo to process the children only when they change.
    const elementsToAnimate = useMemo(() => {
        const elements: React.ReactNode[] = [];
        // React.Children.forEach is used to iterate over children safely.
        Children.forEach(children, child => {
            if (typeof child === 'string') {
                // If the child is a string, we split it into words.
                // Each word will be an individual animation item.
                child.split(' ').forEach(word => {
                    if (word) { // Ensure not to push empty strings from multiple spaces
                        elements.push(word);
                    }
                });
            } else if (isValidElement(child)) {
                // If the child is a React element (e.g., <ImageToolTip />),
                // we push it as a single unit to be animated.
                elements.push(child);
            }
        });
        return elements;
    }, [children]);

    // Ref for the container element to track when it's in view.
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        // The main container for the animated text.
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            // Animate to "visible" only when the component is in view
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Map over the processed elements to create a motion.span for each one. */}
            {elementsToAnimate.map((element, index) => (
                <motion.span
                    key={index}
                    variants={elementVariants}
                    // Add a space after each element for proper spacing.
                    // Using 'inline-block' is crucial for the transform (y) to work.
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                >
                    {element}
                </motion.span>
            ))}
        </motion.div>
    );
};

// Reusable animation variants for text reveal
const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            damping: 12,
            stiffness: 100,
            duration: 0.4,
            delay,
        },
    }),
};

function Profile() {
    return (
            <div className='gap-2 flex flex-col mt-32 primary-font'>
                
            <div className="max-w-full">
                <TypewriterEffect className="text-4xl text-gray-900">
                    Hey, I'm <ImageToolTip text="Michael." imageUrl="assets/me.webp" imageAlt="me" color="#0F172A" />
                </TypewriterEffect>

                <div className="mt-3">
                    
                <motion.div
                    custom={0.5}
                    initial="hidden"
                    whileInView="visible"
                    variants={textRevealVariants}
                    viewport={{ once: true }}
                    >
                    <motion.span 
                        className="text-lg text-gray-700 inline-flex gap-2"
                        initial="rest"
                        whileHover="hover"
                    >
                        <motion.span
                        style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                            marginTop: '7px'
                        }}
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.2 }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                        <span>
                        I'm studying CS <Superscript text="(w/ Design + Math)" size="text-sm" /> at UPenn
                        </span>
                    </motion.span>
                </motion.div>

                <motion.div
                    custom={0.9}
                    initial="hidden"
                    whileInView="visible"
                    variants={textRevealVariants}
                    viewport={{ once: true }}
                    >
                    <motion.span 
                        className="text-lg text-gray-700 inline-flex gap-2"
                        initial="rest"
                        whileHover="hover"
                    >
                        <motion.span
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#2563EB',
                            flexShrink: 0,
                            marginLeft: '1px',
                            marginRight: '8px',
                            marginTop: '7px'
                        }}
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.2 }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                        <span>
                            You can find me{' '}
                            <ImageToolTip text="falling off walls" imageUrl="assets/climbing.webp" imageAlt="climbing" color="#374151" />,{' '}
                            <ImageToolTip text="exploring new places" imageUrl="assets/travel.webp" imageAlt="traveling" color="#374151" />,{' '}
                            <ImageToolTip text="watching movies" imageUrl="assets/movie.jpg" imageAlt="films" color="#374151" />, and{' '}
                            <ImageToolTip text="learning a lot" imageUrl="assets/learn.jpg" imageAlt="learning" color="#374151" />!
                        </span>
                    </motion.span>
                </motion.div>

                <motion.div
                    custom={1.3}
                    initial="hidden"
                    whileInView="visible"
                    variants={textRevealVariants}
                    viewport={{ once: true }}
                    >
                    <motion.span 
                        className="text-lg text-gray-700 inline-flex gap-2"
                        initial="rest"
                        whileHover="hover"
                    >
                        <motion.span
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderBottom: '14px solid #16A34A',
                            marginRight: '8px',
                            marginTop: '7px'
                        }}
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.2 }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                        <span>
                        Currently building an online co-op <ExternalLink href="https://www.minesweepercoop.com/">minesweeper</ExternalLink> game.
                        </span>
                    </motion.span>
                    </motion.div>

                </div>  

                <div className="mt-14">
                    <motion.div
                        custom={1.7}
                        initial="hidden"
                        whileInView="visible"
                        variants={textRevealVariants}
                        viewport={{ once: true }}
                        >
                        <span className="text-lg text-gray-900 inline-flex gap-2">
                            Previously, I...
                        </span>

                        <ul className="text-gray-700 list-disc ml-6">
                            <li>Developed software at <ImageToolTip text="Kensho Technologies," imageUrl="assets/kensho.webp" imageAlt="kensho" color="#374151" /> Wealth.com, and Verizon.</li>
                            <li>Interned abroad in <ImageToolTip text="Ho Chi Minh City, Vietnam." imageUrl="assets/saigon.webp" imageAlt="vietnam" color="#374151" /></li>
                            <li>Managed logistics for <ExternalLink href="https://pennapps.com/">PennApps</ExternalLink>, the nation's first student-run college hackathon</li>
                            <li>Practiced <ExternalLink href="https://www.google.com/search?q=Sanda+martial+arts">Sanda</ExternalLink> for 7-8 years; now I love watching UFC and MMA.</li>
                            <li>Directed <ExternalLink href="https://www.instagram.com/codedaydc/">Codeday DC</ExternalLink> (3x), a hackathon for highschoolers in the DC area.</li>
                         
                        </ul>
                    </motion.div>
                </div>
            </div>
            </div>
    )
}

export default Profile;