import "../src/App.css"

function ExperienceItem({ title, role, description, date }: { title: string, role: string, description: React.ReactNode, date: string }) {
    return (
        <div className='flex flex-row'>
            <div className='w-2/3'>
                <p><span className='font-bold italic'>{title}</span> - <span className='italic subtext text-xs'>{role}</span></p>
                {description}
            </div>
            <p className="text-right w-1/2 subtext text-xs">{date}</p>
        </div>
    )
}

function Experience() {
    return (
        <div>
            <div className='text-sm gap-2 flex flex-col'>
                <p className='font-bold'>Experience</p>
                {experience.map((item) => (
                    <ExperienceItem key={item.title} title={item.title} role={item.role} description={item.description} date={item.date} />
                ))}
            </div>
            <div className='text-sm gap-2 flex flex-col'>
                <hr className='horizontal-line my-5' />
                <p className='font-bold'>Community</p>
                {community.map((item) => (
                    <ExperienceItem key={item.title} title={item.title} role={item.role} description={item.description} date={item.date} />
                ))}
            </div>
        </div>
    )
}

const experience = [
    {
        title: "Kensho Technologies",
        role: "Software Engineer",
        description: <p className="text-xs">Documents -&gt; Extract, NERD, Annotations -&gt; S&P Global</p>,
        date: "May 2025 - Aug. 2025"
    },
    {
        title: "Wealth.com",
        role: "Software Engineer Intern",
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
        title: "CodeDay DC",
        role: "Director",
        description: <p className="text-xs">Directed logistics for CodeDay DC, a hackathon for high school students in the DC area.</p>,
        date: "Jan. 2024 - Present"
    },

]


export default Experience;  