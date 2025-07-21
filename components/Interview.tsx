import StyledText from "./StyledText";
import "../src/App.css"

function Interview() {
    return (
        <div className='text-sm gap-2 flex flex-col'>
           
            <div>
                <p className='font-bold italic'>Who are you?</p>
                <p>I'm <StyledText text="Michael L." type="me" />, a student at UPenn studying Computer Science and minoring in Design + Math. Rockville, MD -&gt; Philadelphia, PA</p>
            </div>
            <div>
                <p className='font-bold italic'>What do you do?</p>
                <p>Building social learning platforms and community-driven applications. My work focuses on creating digital spaces where people can learn together and build meaningful connections.</p>
            </div>
            <div>
                <p className='font-bold italic'>Passions?</p>
                <p>
                    <StyledText text="Rock climbing" type="climb" />,
                    <StyledText text="music" type="music" />,
                    <StyledText text="traveling" type="travel" />,
                    <StyledText text="movies" type="movie"/>,
                    <StyledText text="learning" type="learn"/>
                </p>
            </div>
            
        </div>
    )
}

export default Interview;