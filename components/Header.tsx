import "../src/App.css"

function Header() {
    return (
        <div className='flex flex-row justify-between'>
            <div className="text-sm gap-2 flex flex-col mb-5 w-fit">     
                <div className="italic text-xs text-gray-500">
                    <p>MICHAEL LI</p>
                    <p><a href="mailto:limichael319@gmail.com">EMAIL</a></p>
                </div>
            </div>
            <div className='text-right w-fit'>
                <div className="italic text-xs text-gray-500">
                    <p>LINKEDIN</p>
                    <p>GITHUB</p>
                    <p><a href="https://www.instagram.com/michaells19/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></p>
                </div>
            </div>
        </div>
    )
}

export default Header