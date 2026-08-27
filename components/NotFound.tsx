import "../src/App.css"
import { Link } from "react-router-dom";

// Vercel rewrites every path to index.html, so any unmatched URL lands here
// rather than on a blank page.
function NotFound() {
    return (
        <div className='relative overflow-hidden px-6 md:px-10 lg:px-0 min-h-screen'>
            <div className='max-w-7xl mx-auto px-0 sm:px-8 mt-10'>
                <div className='secondary-font italic text-xs text-gray-500'>
                    <Link to="/" className='hover:text-gray-700'>MICHAEL LI</Link>
                </div>

                <div className='primary-font mt-32'>
                    <p className='text-xs text-gray-500 italic!'>404</p>
                    <p className='text-4xl text-gray-900 mt-4'>Nothing lives here.</p>
                    <p className='text-lg text-gray-700 mt-3'>
                        This page either moved or never existed.{' '}
                        <Link to="/" className='underline text-gray-700 hover:text-gray-900'>Head back home</Link>.
                    </p>
                </div>

                <img
                    src="/home_ex/flower.webp"
                    alt="ascii-animation"
                    className='absolute max-h-[20%] sm:h-1/6 bottom-0 right-0 z-[-1]'
                />
            </div>
        </div>
    )
}

export default NotFound;
