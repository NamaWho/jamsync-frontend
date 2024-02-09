import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

    const navigate = useNavigate();
    
    return (
        <div className='rounded-[8px] flex flex-col justify-between border-t-[4px] border-blue-500 mx-16 my-8 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
                <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>NOT FOUND</h2>
                <p className='text-[#5a5c69] text-[18px] leading-[20px] font-normal'>The page you are looking for does not exist</p>
                <button 
                    onClick={() => navigate('/')} 
                    className='bg-blue-400 h-14 w-full rounded-[16px] text-white font-bold hover:scale-[103%] hover:bg-blue-500 mt-8'
                    >
                    <FaHome className='inline-block mr-2' />
                    Go back to home page
                </button>
        </div>
    );
};

export default NotFoundPage;