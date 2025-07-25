import "../src/App.css"


function Header() {
    return (
        <div className='flex flex-row justify-between secondary-font'>
            <div className="text-sm gap-2 flex flex-col mb-5 w-fit">     
                <div className="italic text-xs text-gray-500">
                    <p className="hover:text-gray-700">MICHAEL LI</p>
                    <p className="hover:text-gray-700"><a href="https://www.instagram.com/michaells19/" target="_blank" rel="noopener noreferrer">@limich19</a></p>
                    
                </div>
            </div>
            
            <div className='text-right w-fit'>
                <div className="italic text-xs text-gray-500">
                    <p className="hover:text-gray-700"><a href="https://www.linkedin.com/in/itsmichaelli/" target="_blank" rel="noopener noreferrer">LINKEDIN</a></p>
                    <p className="hover:text-gray-700"><a href="https://github.com/Michaell14" target="_blank" rel="noopener noreferrer">GITHUB</a></p>
                    <p className="hover:text-gray-700"><a href="mailto:limichael319@gmail.com">EMAIL</a></p>
                </div>
            </div>
        </div>
    )
}

export default Header