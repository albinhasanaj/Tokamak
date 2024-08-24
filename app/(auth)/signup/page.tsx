import Sidebar from '@/components/Sidebar'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignUp = () => {
    return (
        <div className='mx-auto h-screen flex items-center'>
            <div className='mix-blend-plus-lighter flex items-center justify-center'>
                <SignIn routing='hash' />
            </div>
        </div>
    )
}

export default SignUp