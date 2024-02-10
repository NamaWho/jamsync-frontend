import React from 'react'
import { FaTachometerAlt, FaRegSun, FaWrench, FaStickyNote, FaRegChartBar, FaRegCalendarAlt, FaChevronRight, FaChevronLeft, FaBolt, FaUser } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {
    const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className='bg-[#4E73DF] px-[25px] h-screen'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Admin panel</h1>
            </div>
            <div className='pt-[15px]'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> LOGOUT</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]' onClick={handleLogout}>
                        <FaUser color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar