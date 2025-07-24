import StyledText from "./StyledText";
import MediaOverlay from "./MediaOverlay";
import "../src/App.css"
import { motion } from "motion/react";

function Interview() {
    return (
        <div className='gap-2 flex flex-col mt-10 h-[85vh]'>
            <motion.div
                initial={{ opacity: .45 }}
                whileInView={{ opacity: 1, transition: { duration: .3 } }}
                viewport={{ amount: .8 }}
            >
                <p className='font-bold italic'>Who are you?</p>
                <p className='text-gray-950 text-sm'>I'm <StyledText text="Michael L." type="me" />, a student at UPenn studying Computer Science and minoring in Design + Math. Rockville, MD -&gt; Philadelphia, PA</p>
            </motion.div>
            <motion.div
                initial={{ opacity: .45 }}
                whileInView={{ opacity: 1, transition: { duration: .3 } }}
                viewport={{ amount: .8 }}
            >
                <p className='font-bold italic'>What do you do?</p>
                <p className='text-gray-950 text-sm'>Building social learning platforms and community-driven applications. My work focuses on creating digital spaces where people can learn together and build meaningful connections.</p>
            </motion.div>
            <motion.div
                initial={{ opacity: .45 }}
                whileInView={{ opacity: 1, transition: { duration: .3 } }}
                viewport={{ amount: .8 }}
            >
                <p className='font-bold italic'>Passions?</p>
                <p className='text-gray-950 text-sm'>
                    <StyledText text="climbing" type="climb"/>,
                    <StyledText text="music" type="music" />,
                    <StyledText text="traveling" type="travel" />,
                    <StyledText text="movies" type="movie"/>,
                    <StyledText text="learning" type="learn"/>
                </p>
            </motion.div>
            <MediaOverlay />
        </div>
    )
}

export default Interview;