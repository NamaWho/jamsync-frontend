import React, { useState } from 'react';
import { login } from '../../services/authService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [type, setType] = useState('Musician');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await login(type, user, password);
        
        // set the token in the local storage
        if (!response.error){
            localStorage.setItem('token', response.payload);
            if (type === 'Admin') 
                navigate('/admin');
            else
                navigate('/');
        } else {
            toast.error(response.error);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='rounded-[8px] bg-white border-t-[4px] border-[#4E73DF] flex items-center justify-between cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <form onSubmit={handleLogin} className='bg-[#F8F9FC] p-[20px] rounded-[5px] shadow-lg'>
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-[10px]'>Login</h2>
                    <select 
                        className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]' 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Musician">Musician</option>
                        <option value="Band">Band</option>
                        <option value="Admin">Administrator</option>
                    </select>
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
            <button 
                onClick={() => navigate('/')} 
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                Home
            </button>
        </div>
    )
}

export default Login;
