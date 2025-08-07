function ExperienceItem({ title, role, description, date }: { title: string, role: string, description: React.ReactNode, date: string }) {
    return (
        <div className='flex flex-row'>
            <div className='w-2/3'>
                <span className='font-bold italic'>{title}</span> <span className='italic minitext-color text-xs'>- {role}</span>
                {description}
            </div>
            <p className="text-right w-1/2 text-xs">{date}</p>
        </div>
    )
}

export default ExperienceItem;