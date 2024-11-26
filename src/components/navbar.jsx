import { currentUserState } from '@/states/currentUserState';
import Link from 'next/link';
import React from 'react'
import { PiBellBold, PiBellFill, PiBowlFoodBold, PiBowlFoodFill, PiCameraPlusBold, PiCameraPlusFill, PiGearBold, PiGearFill, PiHouseBold, PiHouseFill, PiMagnifyingGlassBold, PiMagnifyingGlassFill, PiNoteBold, PiNoteFill, PiNotePencilBold, PiNotePencilFill, PiUserBold, PiUserFill } from "react-icons/pi";
import { useRecoilValue } from 'recoil';

function NavBar({ active }) {
    const currentUser = useRecoilValue(currentUserState);

    return (
        <nav className="bg-gray-200 py-4 w-full h-[56px]">
            <div className="container mx-auto flex items-center justify-around">
                {/* <Link href="/home" className="text-black">
                    {active == 'home' ? (
                        <PiHouseFill size={24}/>
                    ) : (
                        <PiHouseBold size={24} />
                    )}
                </Link> */}
                <Link href="/home" className="text-black">
                    {active == 'home' ? (
                        <PiNoteFill size={24} />
                    ) : (
                        <PiNoteBold size={24} />
                    )}
                </Link>
                <Link href="/record" className="text-black">
                    {active == 'record' ? (
                        <PiNotePencilFill size={24} />
                    ) : (
                        <PiNotePencilBold size={24} />
                    )}
                </Link>
                <Link href="https://www.akashi.ac.jp/news/2024/biub2r00000005os-att/menyu.pdf" target="_blank" rel="noopener noreferrer" className="text-black">
                    {active == 'menu' ? (
                        <PiBowlFoodFill size={24} />
                    ) : (
                        <PiBowlFoodBold size={24} />
                    )}
                </Link>
                {currentUser ? (
                    <Link href={`/users/${currentUser.uid}`} className="text-black">
                        {active == currentUser.uid ? (
                            <PiGearFill size={24} />
                        ) : (
                            <PiGearBold size={24} />
                        )}
                    </Link>
                ) : (
                    <Link href='/users' className="text-black">
                        <PiGearBold size={24} />
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar
