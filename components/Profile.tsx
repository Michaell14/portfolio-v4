import "../src/App.css"
import { motion, useInView } from "motion/react";
import ImageToolTip from "./ImageToolTip";
import { Children, isValidElement, useMemo, useRef } from "react";

function Superscript({ text, size }: { text: string, size: string }) {
    return (
        <span className={`align-super ${size}`} style={{ verticalAlign: 'super' }}>{text}</span>
    )
}

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

    // Variants for the container element.
    // This will handle the staggered animation of the children.
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06, // Time delay between each element's animation
            },
        },
    };

    // Variants for each individual element (word or component).
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



function Profile() {
    return (
            <div className='gap-2 flex flex-col mt-20 primary-font'>
                {/* <TypewriterEffect className="text-[32px] leading-10 lg:text-[48px] lg:leading-14 hidden lg:block">
                    I'm <ImageToolTip text="Michael" imageUrl="home_ex/bridge.JPG" imageAlt="me" color="black" /> — and I like to build things with tools that I don't know.
                </TypewriterEffect> */}
                
                
                        
                <TypewriterEffect className="text-[32px] leading-10 lg:text-[48px] lg:leading-14 hidden lg:block">
                Hey, I'm <ImageToolTip text="Michael" imageUrl="home_ex/bridge.JPG" imageAlt="me" color="black" />, a student<Superscript text="1" size="text-2xl" />, engineer<Superscript text="2" size="text-2xl" />, and design enthusiast<Superscript text="3" size="text-2xl" /> from MD.
            </TypewriterEffect>
            <TypewriterEffect className="text-[32px] leading-10 lg:text-[48px] lg:leading-14 block lg:hidden">
                Hey, I'm <ImageToolTip text="Michael" imageUrl="home_ex/bridge.JPG" imageAlt="me" color="black" />, a student, engineer, and design enthusiast from MD.
            </TypewriterEffect>
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100, duration: .4, delay: .4 } }}
                            viewport={{ once: true }}>
                            <span className='text-lg lg:text-xl text-gray-700'>
                            I'm studying CS <Superscript text="(w/ Design + Math)" size="text-sm" /> at UPenn, exploring design systems and building applications that people enjoy using.
                            </span>

                        </motion.div> */}
                        
                        <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100, duration: .4, delay: 1.3 } }}
                viewport={{ once: true }}>
                <span className='text-xl lg:text-2xl text-gray-700'>
                    I'm studying CS <Superscript text="(w/ Design + Math)" size="text-xl" /> at UPenn, exploring atomic design patterns and building intuitive, user-centric applications.
                </span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100, duration: .4, delay: 1.7 } }}
                viewport={{ once: true }}>
                <span className='text-xl lg:text-2xl text-gray-700'>
                    You can find me <ImageToolTip text="falling off walls" imageUrl="assets/climbing.gif" imageAlt="climbing" color="#374151" />, <ImageToolTip text="exploring earth" imageUrl="assets/travel.webp" imageAlt="traveling" color="#374151" />, <ImageToolTip text="watching movies" imageUrl="assets/movie.jpg" imageAlt="films" color="#374151" />, and <ImageToolTip text="learning a lot" imageUrl="assets/learn.jpg" imageAlt="learning" color="#374151" />!
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100, duration: .4, delay: 2.1 } }}
                viewport={{ once: true }}>
                <div className="flex h-[150px] lg:h-[200px] gap-4 mt-8 mb-20 overflow-x-scroll md:overflow-x-hidden">
                    <img src="home_ex/china.jpg" alt="me" className="rounded-md" />
                    <img src="home_ex/nice.webp" alt="me" className="rounded-md" />
                    <img src="home_ex/meme.jpg" alt="me" className="rounded-md" />
                </div>
            </motion.div>
                    

                

                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100, duration: .4, delay: 1.2 } }}
                    viewport={{ once: true }}>
                    <span className='text-lg lg:text-xl text-gray-700'>
                        Prev. at Kensho Technologies, Wealth.com, and Verizon.
                    </span>
                </motion.div> */}

            </div>
    )
}

export default Profile;