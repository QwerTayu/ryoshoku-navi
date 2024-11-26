import { currentUserState } from '@/states/currentUserState';
import Link from 'next/link';
import React from 'react'
import { PiBellBold, PiBellFill, PiCameraPlusBold, PiCameraPlusFill, PiHouseBold, PiHouseFill, PiMagnifyingGlassBold, PiMagnifyingGlassFill, PiUserBold, PiUserFill } from "react-icons/pi";
import { useRecoilValue } from 'recoil';

function NavBar({ active }) {
    const currentUser = useRecoilValue(currentUserState);

    return (
        <nav className="bg-gray-200 py-4 w-full h-[56px]">
            <div className="container mx-auto flex items-center justify-around">
                <Link href="/home" className="text-black">
                    {active == 'home' ? (
                        <PiHouseFill size={24}/>
                    ) : (
                        <PiHouseBold size={24} />
                    )}
                </Link>
                <Link href="/record" className="text-black">
                    {active == 'record' ? (
                        <PiMagnifyingGlassFill size={24} />
                    ) : (
                        <PiMagnifyingGlassBold size={24} />
                    )}
                </Link>
                <Link href="https://www.akashi.ac.jp/news/2024/biub2r00000005os-att/menyu.pdf" className="text-black" target="_blank" rel="noopener noreferrer" className="text-black">
                    {active == 'menu' ? (
                        <PiBellFill size={24} />
                    ) : (
                        <PiBellBold size={24} />
                    )}
                </Link>
                <Link href="/check" className="text-black">
                    {active == 'check' ? (
                        <PiCameraPlusFill size={24} />
                    ) : (
                        <PiCameraPlusBold size={24} />
                    )}
                </Link>
                <Link href="#" className="text-black">
                    {active == 'setting' ? (
                        <PiCameraPlusFill size={24} />
                    ) : (
                        <PiCameraPlusBold size={24} />
                    )}
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
