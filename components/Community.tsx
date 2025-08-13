import { motion } from "motion/react";
import ExperienceItem from "./ExperienceItem";

function Community() {
    return (
        <div className="secondary-font">
            <p className='italic text-xs text-gray-500 mb-5'>COMMUNITY</p>
            <div className='gap-2 flex flex-col my-14'>
                {community.map((item, index) => (
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

const community = [
    {
        title: "PennApps",
        role: "Logistics Organizer",
        description: <p className="text-sm">Event logistics (Day-of events + Workshops) for UPenn's premier student-led hackathon.</p>,
        date: "02/2024 - Present"
    },
    {
        title: "Penn SPARK",
        role: "Product Manager + Tech Lead",
        description: <p className="text-sm">Building creative social applications for UPenn Students.</p>,
        date: "01/2024 - Present"
    },
    {
        title: "PClassic",
        role: "Organizer",
        description: <p className="text-sm">Organized Philadelphia's largest high school competitive programming competition by designing programming problems and maintaining the pclassic.org website.</p>,
        date: "02/2024 - 10/2024"
    },
    {
        title: "CodeDay DC",
        role: "Director",
        description: <p className="text-sm">Directed logistics for CodeDay DC, a hackathon for high school students in the DC area.</p>,
        date: "09/2021 - 05/2023"
    },
]


export default Community;