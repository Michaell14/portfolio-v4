import { motion } from "motion/react";
import "../src/App.css";
import ExperienceItem from "./ExperienceItem";

function Experience() {
    return (
        <div className="secondary-font">
            <p className='italic text-xs text-gray-500 mb-5'>EXPERIENCE</p>
            <div className='gap-2 flex flex-col my-14'>

                {experience.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: .45 }}
                        whileInView={{ opacity: 1, transition: { duration: .3 } }}
                        viewport={{ amount: .8 }}
                    >
                        <ExperienceItem key={item.title} title={item.title} role={item.role} description={item.description} date={item.date} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

const experience = [
    {
        title: "Kensho Technologies",
        role: "Software Engineer Intern",
        description: <p className="text-sm">Documents -&gt; Extract, NERD, Annotations -&gt; S&P Global</p>,
        date: "05/2025 - 08/2025"
    },
    {
        title: "Wealth.com",
        role: "Full-Stack Intern",
        description: <p className="text-sm">Scaling Full-Stack @ $30M Series A startup.</p>,
        date: "01/2025 - 05/2025"
    },
    {
        title: "iLotusLand",
        role: "Software Engineer Intern",
        description: <p className="text-sm">Predictive classification models for environmental data in South East Asia.</p>,
        date: "06/2024 - 08/2024"
    },
]



export default Experience;  