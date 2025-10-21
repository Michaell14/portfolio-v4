import { useState } from 'react';

const phones = [
    {
        src: "2g.png",
        name: "2G",
        description: "an image of an iphone 2G. It was released in 2005."  
    },
    {
        src: "3g.png",
        name: "3G",
        description: "an image of an iphone 3G. It was released in 2008."
    },
    {
        src: "3gs.png",
        name: "3GS",
        description: "an image of an iphone 3GS. It was released in 2009."
    },
    {
        src: "5.png",
        name: "5",
        description: "an image of an iphone 5. It was released in 2010."
    },
    {
        src: "6.png",
        name: "6",
        description: "an image of an iphone 6. It was released in 2011."
    },
    {
        src: "7.png",
        name: "7",
        description: "an image of an iphone 7. It was released in 2012."
    },
    {
        src: "8.png",
        name: "8",
        description: "an image of an iphone 8. It was released in 2013."
    },
    {
        src: "x.png",
        name: "X",
        description: "an image of an iphone X. It was released in 2017."
    },
    {
        src: "xr.png",
        name: "XR",
        description: "an image of an iphone X. It was released in 2017."
    },
    {
        src: "11.png",
        name: "11",
        description: "an image of an iphone 11. It was released in 2018."
    },
    {
        src: "13.png",
        name: "13",
        description: "an image of an iphone 13. It was released in 2019."
    },
    {
        src: "14.png",
        name: "14",
        description: "an image of an iphone 14. It was released in 2020."
    },
    {
        src: "15.png",
        name: "15",
        description: "an image of an iphone 15. It was released in 2021."
    },  
    {
        src: "16.png",
        name: "16",
        description: "an image of an iphone 16. It was released in 2022."
    },
    {
        src: "17.png",
        name: "17",
        description: "an image of an iphone 17. It was released in 2023."
    },
]

function IphoneCafe() {
    const [spinningPhones, setSpinningPhones] = useState<Set<number>>(new Set());

    const handlePhoneClick = (index: number) => {
        setSpinningPhones(prev => new Set(prev).add(index));
        // Remove the spinning class after animation completes
        setTimeout(() => {
            setSpinningPhones(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        }, 1000); // Animation duration
    };


    return (
        <div className="bg-[url(/iphonecafe/windows.webp)] bg-cover bg-center h-screen flex justify-center items-center">
            <div className="w-[330px] h-[600px] bg-[#BFBFBF] border-3 [border-style:ridge] border-[#808080] p-1">

                {/* BLUE HEADER*/}
                <div className="bg-[#01007F] flex justify-between px-1">
                    <div className="flex gap-2 items-center">
                        <img src="/iphonecafe/pixel.png" alt="logo" className="w-[14px] h-[14px]" />
                        <p className="text-white font-silkscreen text-xs">Facebook.exe</p>
                    </div>
                    <div className="flex gap-2 items-center font-silkscreen text-xs">
                        <p className="text-white">min</p>
                        <p className="text-white">max</p>
                        <p className="text-white">open</p>
                    </div>
                </div>

                <div className="flex gap-2 text-xs mt-1">
                    <p><span className="underline">F</span>ile</p>
                    <p><span className="underline">E</span>dit</p>
                    <p><span className="underline">V</span>iew</p>
                    <p><span className="underline">O</span>ptions</p>
                    <p><span className="underline">H</span>elp</p>
                </div>

                <p className="text-center my-3 font-silkscreen">bobbywobbyjobby</p>

                <hr className="border-none h-1 bg-black w-full" />
                <hr className="border-none h-1 bg-white w-full" />

                <div className="flex gap-10 my-3">
                    <img
                        src={spinningPhones.size > 0 ? "/iphonecafe/angryjobs.jpg" : "/iphonecafe/stevey.webp"}
                        alt="windows"
                        className="w-[90px] h-[90px] rounded-full object-cover"
                    />
                    <div className="">

                        <div className="flex gap-2">
                            <div>
                                <p>60</p>
                                <p className="text-xs">posts</p>
                            </div>
                            <div>
                                <p>13,3k</p>
                                <p className="text-xs">followers</p>
                            </div>
                            <div>
                                <p>10.8k</p>
                                <p className="text-xs">following</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button className="border-2 w-full border-t-gray-200 border-l-gray-200 border-r-gray-500 border-b-gray-500 text-sm active:border-blue-500">
                                + Follow
                            </button>
                            <button className="border-2 px-1 border-t-gray-200 border-l-gray-200 border-r-gray-500 border-b-gray-500 text-sm active:border-blue-500">
                                ⌄
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ml-3">
                <p className="font-bold text-sm">Steve J.</p>
                <p className="text-xs">r/onlyfans/stevejobs1990/</p>
                <p className="text-xs">buy my phones plz</p>
                </div>

                <hr className="border-none h-1 bg-black w-full mt-2" />
                <hr className="border-none h-1 bg-white w-full" />

                <div className="grid grid-cols-3 bg-gray-100 gap-1 h-[280px] overflow-y-scroll overflow-x-hidden old-windows-scrollbar mt-2 border-2 [border-style:ridge] border-[#808080]">
                    {phones.map((phone, index) => (
                        <div
                            key={index}
                            className={`h-[100px] w-[100px] hover:cursor-pointer bg-white hover:scale-110 transition-all duration-200 select-none ${spinningPhones.has(index) ? 'animate-spin' : ''}`}
                            onClick={() => handlePhoneClick(index)}
                        >
                            <img
                                src={`/iphonecafe/${phone.src}`}
                                alt={phone.description}
                                className="w-[100px] h-[100px]"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-4 w-full text-center">
                    <button className="border-2 border-t-gray-200 border-l-gray-200 border-r-gray-500 border-b-gray-500 text-xs active:border-blue-500">
                        home
                    </button>
                    <button className="border-2 border-t-gray-200 border-l-gray-200 border-r-gray-500 border-b-gray-500 text-xs active:border-blue-500">
                        videos
                    </button>
                    <button className="border-2 border-t-gray-200 border-l-gray-200 border-r-gray-500 border-b-gray-500 text-xs active:border-blue-500">
                        reels
                    </button>
                    <button className="border-2 border-t-gray-200 border-l-gray-200 border-r-gray-500 border-b-gray-500 text-xs active:border-blue-500">
                        profile
                    </button>
                </div>
            </div>

        </div>
    )
}

export default IphoneCafe;