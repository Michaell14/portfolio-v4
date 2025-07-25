import StyledText from "./StyledText";
import MediaOverlay from "./MediaOverlay";
import "../src/App.css"
import { motion } from "motion/react";
import ImageTooltip from "./ImageTooltip";

function Superscript({ text }: { text: string }) {
    return (
        <span className="align-super text-sm" style={{ verticalAlign: 'super' }}>{text}</span>
    )
}

function Profile() {
    return (
        <div className='gap-2 flex flex-col mt-30 h-[85vh] primary-font text-justify'>
            <motion.div
                initial={{ opacity: .45 }}
                whileInView={{ opacity: 1, transition: { duration: .3 } }}
                viewport={{ amount: .8 }}
            >
                <p className='text-gray-950 text-2xl'>Hey, I'm <ImageTooltip text="Michael L." imageUrl="assets/me.jpg" imageAlt="me" />, a student, engineer, and design enthusiast from Maryland! I'm studying Computer Science <Superscript text="(w/ Design + Math)" /> at UPenn, while building community-driven applications.
                    My work focuses on creating digital spaces where people can learn together and build meaningful connections.
                </p>
                <p className='text-gray-950 text-xl mt-5'>I am currently in NYC, solving problems at Kensho. Outside of work, I can be found <ImageTooltip text="climbing" imageUrl="assets/climbing.gif" imageAlt="climbing" />, <ImageTooltip text="traveling" imageUrl="assets/travel.jpg" imageAlt="traveling" />, exploring the city, and <ImageTooltip text="learning a lot" imageUrl="assets/learn.jpg" imageAlt="learning" />. I also watch <ImageTooltip text="movies" imageUrl="assets/movie.jpg" imageAlt="films" />!
                </p>
                
            </motion.div>
        </div>
    )
}

export default Profile;