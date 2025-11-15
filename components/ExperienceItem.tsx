function ExperienceItem({ title, role, description, date }: { title: string, role: string, description: React.ReactNode, date: string }) {
    return (
        <div className='flex flex-row'>
            <div className='w-2/3'>
                <span className='font-bold text-gray-700'>{title}</span> <span className='text-gray-500 text-xs'>- {role}</span>
                {description}
            </div>
            <p className="text-right w-1/2 text-xs text-gray-500">{date}</p>
        </div>
    )
}

export default ExperienceItem;