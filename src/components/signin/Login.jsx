import React, { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle login logic here
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='rounded-[8px] bg-white border-t-[4px] border-[#4E73DF] flex items-center justify-between cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <form onSubmit={handleLogin} className='bg-[#F8F9FC] p-[20px] rounded-[5px] shadow-lg'>
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-[10px]'>Login</h2>
                    <input 
                        type="text" 
                        className=' bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]' 
                        placeholder='User' 
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className=' bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]' 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className='bg-[#4E73DF] h-[40px] w-full rounded-[5px] text-white font-bold'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
