import { motion } from "motion/react";
import "../src/App.css";
import React from 'react';

function ExperienceItem({ title, role, description, date }: { title: string, role: string, description: React.ReactNode, date: string }) {
    return (
        <div className='flex flex-row'>
            <div className='w-2/3'>
                <span className='font-bold italic'>{title}</span> - <span className='italic subtext text-xs'>{role}</span>
                {description}
            </div>
            <p className="text-right w-1/2 subtext text-xs">{date}</p>
        </div>
    )
}

function Experience() {
    return (
        <div>
            <p className='font-bold text-center mb-2 text-gray-700'>[EXPERIENCE]</p>
            <div className='text-sm gap-2 flex flex-col'>
                
                {experience.map((item, index) => (
                    <motion.div
                    whileHover={{ backgroundColor: "#d4d4d4", cursor: "pointer" }}
                    style={{ padding: 6, borderRadius: 6}}
                    key={index}
                    initial={{ opacity: .45 }}
                    whileInView={{ opacity: 1, transition: { duration: .3 } }}
                    viewport={{ amount: .9 }}
                >
                    <ExperienceItem key={item.title} title={item.title} role={item.role} description={item.description} date={item.date} />
                </motion.div>
                ))}
            </div>
            <hr className='horizontal-line my-5' />
            <p className='font-bold text-center mb-2 text-gray-700'>[COMMUNITY]</p>
            <div className='text-sm gap-2 flex flex-col'>
                {community.map((item, index) => (
                    <motion.div
                    whileHover={{ backgroundColor: "#d1d5db", color: "#71717a", cursor: "pointer" }}
                    style={{ padding: 6, borderRadius: 6}}
                    key={index}
                    initial={{ opacity: .45 }}
                    whileInView={{ opacity: 1, transition: { duration: .3 } }}
                    viewport={{ amount: .9 }}
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
        description: <p className="text-xs">Documents -&gt; Extract, NERD, Annotations -&gt; S&P Global</p>,
        date: "May 2025 - Aug. 2025"
    },
    {
        title: "Wealth.com",
        role: "Full-Stack Intern",
        description: <p className="text-xs">Scaling Full-Stack @ $30M Series A startup.</p>,
        date: "Jan. 2025 - May 2025"
    },
    {
        title: "iLotusLand",
        role: "Software Engineer Intern",
        description: <p className="text-xs">Predictive classification models for environmental data in South East Asia.</p>,
        date: "June 2024 - Aug. 2024"
    },
]

const community = [
    {
        title: "PennApps",
        role: "Logistics Organizer",
        description: <p className="text-xs">Event logistics (Day-of events + Workshops) for UPenn's premier student-led hackathon.</p>,
        date: "Feb. 2024 - Present"
    },
    {
        title: "Penn SPARK",
        role: "Product Manager + Tech Lead",
        description: <p className="text-xs">Building creative social applications for UPenn Students.</p>,
        date: "Jan. 2024 - Present"
    },
    {
        title: "PClassic",
        role: "Organizer",
        description: <p className="text-xs">Organized Philadelphia's largest high school competitive programming competition by designing programming problems and maintaining the pclassic.org website.</p>,
        date: "Feb. 2024 - Oct. 2024"
    },
    {
        title: "CodeDay DC",
        role: "Director",
        description: <p className="text-xs">Directed logistics for CodeDay DC, a hackathon for high school students in the DC area.</p>,
        date: "Jan. 2024 - Present"
    },

]


export default Experience;  