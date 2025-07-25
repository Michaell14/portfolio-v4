import useStore from '../store';

function MovieArticle() {

    return (
        <div>
            <div className="bg-white p-2 border border-black mt-2">
                <p className="text-lg font-bold">MOVIES</p>
                <p className="quote text-xs">
                    I love watching movies. I watch a lot of movies. I watch movies for fun. I watch movies to relax. I watch movies to learn. I watch movies to be inspired. I watch movies to be entertained. I watch movies to be moved. I want movies to make me cry. I want movies to make me laugh. I want movies to make me think. I want movies to make me feel.
                </p>
                <p className="text-sm font-bold italic mt-2">Some notable movies that I've watched are:</p>
                <ul className='text-xs'>
                    <li>How to make millions before grandma dies (2010)</li>
                    <li>Oldboy (2003)</li>
                    <li>Saw (2004)</li>
                    <li>The Shawshank Redemption (1994)</li>
                    <li>The Devil Wears Prada (2006)</li>
                    <li>3 Idiots (2009)</li>
                </ul>
                <p className="text-sm font-bold italic mt-2">I also love anime & manga. Some notable works that I enjoy are:</p>
                <ul className='text-xs'>
                    <li>One Piece</li>
                    <li>Death Note</li>
                    <li>The Disastrous Life of Saiki K.</li>
                    <li>High School Ouran Host Club</li>
                    <li>Hunter x Hunter</li>
                    <li>My Hero Academia</li>
                    <li>Great Teacher Onizuka</li>
                    <li>Vinland Saga</li>
                    <li>Baki the Grappler</li>
                    <li>Jagaaan</li>
                    <li>I Want to Eat Your Pancreas</li>
                </ul>
            </div>
        </div>
    )
}

function LearnArticle() {

    return (
        <div>
            <div className="bg-white border border-black mt-2 p-2">
                <p className="font-bold text-lg">LEARNING</p>
                <p className="quote text-xs">Learning is the process of acquiring new knowledge, skills, values, beliefs, and habits. It is a dynamic and ongoing process that involves the development of cognitive, emotional, and social capabilities.</p>
                <p className="font-bold italic mt-2">I want to learn more about:</p>
                <ul className='text-xs'>
                    <li>Everything!</li>
                </ul>
            </div>
        </div>
    )
}

function MediaOverlay() {
    const { imageSrc, type } = useStore();

    return (
        <div>

            {type === "movie" && <MovieArticle />}
            {type === "learn" && <LearnArticle />}

            {imageSrc && type !== "movie" && type !== "learn" &&
                <img alt="Image!" src={imageSrc} className="border border-black z-50 h-[40vh]" />
            }
        </div>
    )
}

export default MediaOverlay;