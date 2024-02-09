import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { checkFollow, getFollowersCount, getFollowingCount, getMembers, searchUser } from '../../services/registeredUserService';
import Map from '../utils/Map';
import { decodeJWT } from '../../services/utils/jwt';
import { follow, unfollow } from '../../services/registeredUserService';
import toast from 'react-hot-toast';
import { deleteUserById } from '../../services/registeredUserService';
import { banUserById } from '../../services/authService';

const RegisteredUser = ({type}) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [following, setFollowing] = useState(false);
    const [members, setMembers] = useState([]);
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

    const fetchMembers = async () => {
        const members = await getMembers(id);
        setMembers(members);
    }

    const getAuthenticatedUser = () => {
        // check if there is a token in the local storage
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeJWT(token);
            setLoggedUser(decoded);
        }
    }

    const checkFollowing = async () => {
        const res = await checkFollow(loggedUser.id, user._id, type);
        if (res)
            setFollowing(true);
        else 
            setFollowing(false);
    }

    let location = useLocation();
    useEffect(() => {
        fetchFollowersCount();
        if (type === "musician")
            fetchFollowingCount();
        if (type === "band")
            fetchMembers();
        if (location.state) {
            setUser(location.state.detail);
        } else {
            fetchUser();
        }
        getAuthenticatedUser();
    }, [location, id]);

    useEffect(() => {
        if (loggedUser && user)
            checkFollowing();
    }, [loggedUser, user]);

    const handleOpportunityClick = (_id) => {
        navigate(`/opportunities/${_id}`);
    }

    const handleApplicationClick = (_id) => {
        navigate(`/applications/${_id}`);
    }

    const handleFollowClick = async () => {
        const res = await follow(loggedUser.id, user._id, type);
        if (!res) 
            setFollowing(true);
        else 
            toast.error('An error occurred while trying to follow the user');
    }

    const handleUnFollowClick = async () => {
        const res = await unfollow(loggedUser.id, user._id, type);
        if (!res) 
            setFollowing(false);
        else 
            toast.error('An error occurred while trying to unfollow the user');
    }

    const handleEditProfile = () => {
        navigate(`/edit/${type}`, {state: { detail: user }});
    }

    const handleDeleteProfile = async () => {
        const result = await deleteUserById(loggedUser.type.toLowerCase(), loggedUser.id);
        if (!result) {
            toast.success("Profile deleted successfully");
            localStorage.removeItem('token');
            navigate("/");
        } else {
            toast.error("Error deleting profile");
        }
    }

    const handleBanProfile = async () => {
        const error = await banUserById(type.toLowerCase(), user._id);
        if (!error) {
            toast.success("User banned successfully");
            navigate("/admin");
        } else {
            toast.error("Error banning user");
        }
    }

    return (
        <>
        {user &&
            <div className='px-[25px] pt-20 pb-[40px]'>
                <div className={`rounded-[18px] flex flex-col items-center justify-between shadow-md bg-white px-80 border-t-[4px] ${type==="musician" ? "border-red-500" : "border-blue-500"}`}>
                    <div className="relative -top-12">
                        {user.profilePictureUrl === "" && <div className='w-40 h-40 rounded-full bg-white shadow-lg'></div>}
                        {user.profilePictureUrl !== "" && <img src={user.profilePictureUrl} alt='profile' className={`h-40 w-40 rounded-full border ${type === "musician" ? "border-red-500" : "border-blue-500"} border-[4px] shadow-lg bg-white`}/>}
                    </div>
                    <h1 className='text-2xl font-bold'>{user.username}</h1>
                    <h2 className='text-lg font-bold text-red-500'>{user?.firstName} {user?.lastName}</h2>
                    <h3 className='text-lg font-bold text-[#5a5c69]'>{type==="musician" ? "Musician":"Band"}</h3>
                    {loggedUser?.type === "admin" && !user.isBanned && <button className='bg-orange-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-red-600 transition duration-300 ease-out' onClick={() => handleBanProfile()}>Ban user</button>}
                    {user.isBanned && <p className='text-red-500 text-lg font-bold mt-2'>Banned</p>}
                    {(loggedUser && loggedUser.id === user._id) && 
                        <div className='flex gap-x-4 mt-2'>
                            <button className='bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-out' onClick={() => handleEditProfile()}>Edit profile</button>
                            <button className='bg-gray-300 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-300 ease-out' onClick={() => handleDeleteProfile()}>Delete profile</button>
                        </div>
                    }
                    {(loggedUser && loggedUser.type === "musician" && loggedUser.id !== user._id) && 
                        <div className='flex gap-x-4 mt-2'>
                            {!following && <button className='bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300 ease-out' onClick={handleFollowClick}>Follow</button>}
                            {following && <button className='bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-300 ease-out' onClick={handleUnFollowClick}>Unfollow</button>}
                        </div>
                    }
                    <div className="grid grid-cols-4 gap-x-4">
                        <div className='col-span-4 mb-8'>
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 '>About</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{user.about || "-"}</p>
                        </div>
                        <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full'>Genres</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {user.genres.map((genre, index) => (
                                    <div key={index} className='rounded-[8px] cursor-default border-t-[4px] border-blue-400 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/4 '>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{genre}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {type === "musician" && <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full text-right'>Instruments</h2>
                            <div className="flex flex-row-reverse flex-wrap gap-x-4 gap-y-2">
                                {user?.instruments?.map((instrument, index) => (
                                    <div  key={index} className='rounded-[8px] cursor-default border-t-[4px] border-green-400 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/4'>
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
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        {members.map((member, index) => (
                                            <div key={index} onClick={() => navigate(`/musicians/${member._id}`)} className='rounded-[8px] cursor-pointer border-t-[4px] border-yellow-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/6'>
                                                <p className='text-[#5a5c69] text-[13px] font-normal'>{member.username}</p>
                                            </div>
                                        ))}
                                    </div>
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
                                    <div key={index} className={`rounded-[8px] px-8 py-2 cursor-pointer border-l-[4px] ${type === "musician" ? "border-red-500" : "border-blue-500"} flex items-center justify-between shadow-md hover:shadow-lg hover:bg-purple-100 transform hover:scale-[103%] transition duration-300 ease-out`} onClick={() => handleOpportunityClick(opportunity._id)}>
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
                                    <div key={index} className={`rounded-[8px] px-8 py-2 cursor-pointer border-l-[4px] ${type === "musician" ? "border-red-500" : "border-blue-500"} flex items-center justify-between shadow-md hover:shadow-lg hover:bg-purple-100 transform hover:scale-[103%] transition duration-300 ease-out`} onClick={() => handleApplicationClick(application._id)}>
                                        {/* must provide title and date of creation */}
                                        <p className='text-[#5a5c69] text-[16px] font-normal'>{application.title}</p>
                                        <p className='text-[#5a5c69] text-[16px] font-normal'>{application.createdAt > 10 ? application.createdAt.substring(0, 10) : application.createdAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {loggedUser.type !== "admin" &&  <button 
                        onClick={() => navigate('/')} 
                        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                        Home
                </button>}
                {loggedUser.type === "admin" &&  <button 
                    onClick={() => navigate('/admin')} 
                    className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                    Admin board
                </button>}
            </div>
        }
        </>
    );
}

export default RegisteredUser;