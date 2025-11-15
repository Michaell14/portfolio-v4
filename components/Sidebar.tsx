import "../src/App.css"

function Sidebar() {
    return (
        <div className='w-[220px] fixed secondary-font'>
            <div className='flex flex-col bg-gray-100 h-screen p-4'>
                <div className='flex flex-row justify-between'>
                    <img src="home_ex/bridge.JPG" alt="me" className="rounded-full w-10 h-10" />
                    <div className='flex flex-col'>
                        <p>Michael Li</p>
                        <p className='text-xs text-gray-500'>Software Engineer</p>
                    </div>
                </div>

                <div className='flex flex-col gap-1 text-sm mt-2'>
                    <a href="/"><p className='hover:text-gray-700 hover:cursor-pointer hover:bg-gray-200 p-1.5 rounded-md'>Home</p></a>
                    <a href="/about"><p className='hover:text-gray-700 hover:cursor-pointer hover:bg-gray-200 p-1.5 rounded-md'>About</p></a>
                </div>                    

                <p className='text-xs text-gray-500 mt-8 ml-1'>Reach out!</p>
                <div className='flex flex-col gap-1 text-sm mt-2'>
                    <p className='hover:text-gray-700 hover:cursor-pointer hover:bg-gray-200 p-1.5 rounded-md'><a href="https://www.linkedin.com/in/itsmichaelli/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                    <p className='hover:text-gray-700 hover:cursor-pointer hover:bg-gray-200 p-1.5 rounded-md'><a href="https://github.com/Michaell14" target="_blank" rel="noopener noreferrer">GitHub</a></p>
                    <p className='hover:text-gray-700 hover:cursor-pointer hover:bg-gray-200 p-1.5 rounded-md'><a href="https://www.instagram.com/michaells19/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                    <p className='hover:text-gray-700 hover:cursor-pointer hover:bg-gray-200 p-1.5 rounded-md'><a href="mailto:limichael319@gmail.com">Email</a></p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;