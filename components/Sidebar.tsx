"use client"
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (index: any) => {
        setSelectedIndex(index)
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/') {
            setSelectedIndex(0)
        }
        else if (pathname === '/explore') {
            setSelectedIndex(1)
        }
        else if (pathname === '/profile') {
            setSelectedIndex(2)
        }
        else {
            setSelectedIndex(null)
        }
    }, [pathname])

    return (
        <div className='w-[300px] h-screen bg-secondary flex flex-col pt-5 justify-between self-center rounded-md'>
            <div>
                {/* <header className='text-[48px] text-white font-cursive text-center'>Tokamak</header> */}
                <Image src="/images/logo.png" width={250} height={200} alt="Logo" className='mx-auto' draggable="false" />
                <nav className='py-5'>
                    <p className="text-white text-xl font-bold font-istok pl-5 pb-4 pt-7 select-none">Menu</p>
                    <ul className='select-none'>
                        <Link href=''>
                            <li onClick={() => handleSelect(0)} className={`flex cursor-pointer items-center pl-5 h-[60px] gap-4 rounded-md ${selectedIndex === 0 ? "bg-[#ff4e2c] hover:bg-[#e94627]" : "bg-transparent hover:bg-white hover:bg-opacity-5"}`}>
                                <Image src="/images/home.svg" width={24} height={24} alt="Home" draggable="false" />
                                <span className='text-white text-xl font-bold'>Home</span>
                            </li>
                        </Link>
                        <Link href=''>
                            <li onClick={() => handleSelect(1)} className={`flex cursor-pointer items-center pl-5 h-[60px] gap-4 rounded-md ${selectedIndex === 1 ? "bg-[#ff4e2c] hover:bg-[#e94627]" : "bg-transparent hover:bg-white hover:bg-opacity-5"}`}>
                                <Image src="/images/explore.svg" width={24} height={24} alt="Explore" draggable="false" />
                                <span className='text-white text-xl font-bold'>Explore</span>
                            </li>
                        </Link>


                        <SignedIn >
                            <Link href=''>
                                <li onClick={() => handleSelect(2)} className={`flex cursor-pointer items-center pl-5 h-[60px] gap-4 rounded-md ${selectedIndex === 2 ? "bg-[#ff4e2c] hover:bg-[#e94627]" : "bg-transparent hover:bg-white hover:bg-opacity-5"}`}>
                                    <Image src="/images/profilepic.svg" width={24} height={24} alt="Profile" draggable="false" />
                                    <span className='text-white text-xl font-bold'>Profile</span>
                                </li>
                            </Link>
                        </SignedIn>

                        <SignedOut >
                            <div className='flex flex-col items-center gap-7 mt-[80px]'>
                                <h1 className='text-center text-white text-2xl font-bold font-istok'>You are currently not logged in</h1>
                                <div className='flex flex-col gap-4'>
                                    <a href="/signup">
                                        <button className='w-[180px] h-[35px] rounded-full bg-[#465765] border-[#f1efff] border-[1px] text-white'>Log In</button>
                                    </a>
                                    <a href="/signup">
                                        <button className='w-[180px] h-[35px] rounded-full bg-[#081f31] text-white'>Create Account</button>
                                    </a>
                                </div>
                            </div>
                        </SignedOut>

                    </ul>
                </nav>

            </div>

            <SignedIn>
                <div>
                    {isOpen ? (
                        <ul>
                            <li>
                                <button className='bg-[#717984] text-white w-full h-[50px] text-xl font-bold font-istok hover:bg-[#676f79] select-none'>Settings</button>
                            </li>
                            <div className='w-full h-[1px] bg-[#d9d9d9] bg-opacity-50' />
                            <li>
                                <SignOutButton>
                                    <button className='bg-[#717984] text-white w-full h-[50px] text-xl font-bold font-istok hover:bg-[#676f79] select-none'>Logout</button>
                                </SignOutButton>
                            </li>
                        </ul>
                    ) : (
                        <div className='w-full h-[1px] bg-[#717984]' />
                    )}
                    <div onClick={handleOpen} className='cursor-pointer flex items-center gap-8 justify-between px-7 py-4 select-none hover:bg-white hover:bg-opacity-5'>
                        <div className='flex items-center gap-3'>
                            <Image src="/images/ProfilePic.svg" width={55} height={55} alt="ProfilePic" className='rounded-full' draggable="false" />
                            <p className='text-white text-xl font-bold text-center '>Username</p>
                        </div>
                        <Image src="/images/arrow.svg" width={24} height={24} alt="Arrow" className={`transition-all ${isOpen ? "rotate-180" : ""}`} draggable="false" />
                    </div>
                </div>
            </SignedIn>

        </div>
    )
}

export default Sidebar
