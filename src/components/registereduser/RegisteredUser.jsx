import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getFollowersCount, getFollowingCount, searchUser } from '../../services/registeredUserService';
import Map from '../utils/Map';

const RegisteredUser = ({type}) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    let navigate = useNavigate();
    
    const fetchUser = async () => {
        const result = await searchUser(type, id);
        setUser(result);
    }

    const fetchFollowersCount = async () => {
        const followers = await getFollowersCount(type, id);
        setFollowersCount(followers);
    }

    const fetchFollowingCount = async () => {
        const following = await getFollowingCount(type, id);
        setFollowingCount(following);
    }

    let location = useLocation();
    useEffect(() => {
        if (location.state) {
            setUser(location.state.detail);
        } else {
            fetchUser();
        }
        fetchFollowersCount();
        if (type === "musician")
           fetchFollowingCount();
    }, [location, id]);

    const handleOpportunityClick = (_id) => {
        navigate(`/opportunities/${_id}`);
    }

    const handleApplicationClick = (_id) => {
        navigate(`/applications/${_id}`);
    }

    return (
        <>
        {user &&
            <div className='px-[25px] pt-20 pb-[40px]'>
                <div className='rounded-[18px] flex flex-col items-center justify-between shadow-md bg-white px-80'>
                    <div className="relative -top-12">
                        {user.profilePictureUrl === "" && <div className='w-40 h-40 rounded-full bg-white shadow-lg'></div>}
                        {user.profilePictureUrl !== "" && <img src={user.profilePictureUrl} alt='profile' className='h-40 w-40 rounded-full border border-red-500 border-[4px] shadow-lg'/>}
                    </div>
                    <h1 className='text-2xl font-bold'>{user.username}</h1>
                    <h2 className='text-lg font-bold text-red-500'>{user?.firstName} {user?.lastName}</h2>
                    <div className="grid grid-cols-4 gap-x-4">
                        <div className='col-span-4 mb-8'>
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 '>About</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.about || "-"}</p>
                        </div>
                        <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full'>Genres</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {user.genres.map((genre, index) => (
                                    <div key={index} className='rounded-[8px] cursor-default border-t-[4px] border-blue-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/4 '>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{genre}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {type === "musician" && <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full text-right'>Instruments</h2>
                            <div className="flex flex-row-reverse flex-wrap gap-x-4 gap-y-2">
                                {user.instruments.map((instrument, index) => (
                                    <div  key={index} className='rounded-[8px] cursor-default border-t-[4px] border-green-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/4'>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{instrument}</p>
                                    </div>
                                ))}
                            </div>
                        </div>}
                        {type==="musician" && <div className="col-span-4 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Age</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.age || "-"}</p>
                        </div>}
                        <div className="col-span-4 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Followers</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{followersCount || "-"}</p>
                        </div>
                        {type === "musician" && 
                            <div className="col-span-4 flex-col mb-8">
                                <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Following</h2>
                                <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{followingCount || "-"}</p>
                            </div>
                        }
                        {type === "band" && 
                            <>
                                <div className="col-span-4 flex-col mb-8">
                                    <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Members</h2>
                                </div>

                                <div className="col-span-2 flex-col mb-8">
                                    <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Years Together</h2>
                                    <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.yearsTogether || "-"}</p>
                                </div>
                                
                                <div className="col-span-2 flex-col mb-8 text-right">
                                    <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Gigs Played</h2>
                                    <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.gigsPlayed || "-"}</p>
                                </div>
                            </>
                        }
                        <div className="col-span-1 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Account created</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.creationDateTime || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8 text-center">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Account last modified</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.lastUpdateDateTime || "-"}</p>
                        </div>
                        <div className="col-span-1 flex-col mb-8 text-right">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Account last login</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.lastLoginDateTime || "-"}</p>
                        </div>

                        <div className='flex gap-x-12 col-span-4 mb-8'>
                            <div className='flex flex-col self-start'>
                                <p className='text-red-500 text-[20px] leading-[24px] font-bold'>Location</p>
                                <p className=''>{user.location.city}, {user.location.country}</p>
                            </div>
                            <Map entity={user} className=""/>
                        </div> 

                        <div className='col-span-4 mb-8'>
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full'>Oppportunities published</h2>
                            <div className="flex flex-col gap-y-2">
                                {user.opportunities.map((opportunity, index) => (
                                    <div key={index} className='rounded-[8px] px-8 py-2 cursor-pointer border-t-[4px] border-purple-300 flex items-center justify-between shadow-md hover:shadow-lg hover:bg-purple-100 transform hover:scale-[103%] transition duration-300 ease-out' onClick={() => handleOpportunityClick(opportunity._id)}>
                                        {/* must provide title and date of creation */}
                                        <p className='text-[#5a5c69] text-[16px] font-normal'>{opportunity.title}</p>
                                        <p className='text-[#5a5c69] text-[16px] font-normal'>{opportunity.createdAt.length > 10 ? opportunity.createdAt.substring(0, 10) : opportunity.createdAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='col-span-4 mb-8'>
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full'>Applications made</h2>
                            <div className="flex flex-col gap-y-2">
                                {user.applications.map((application, index) => (
                                    <div key={index} className='rounded-[8px] px-8 py-2 cursor-pointer border-t-[4px] border-purple-300 flex items-center justify-between shadow-md hover:shadow-lg hover:bg-purple-100 transform hover:scale-[103%] transition duration-300 ease-out' onClick={() => handleApplicationClick(application._id)}>
                                        {/* must provide title and date of creation */}
                                        <p className='text-[#5a5c69] text-[16px] font-normal'>{application.title}</p>
                                        <p className='text-[#5a5c69] text-[16px] font-normal'>{application.createdAt > 10 ? application.createdAt.substring(0, 10) : application.createdAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default RegisteredUser;