import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaRegCalendarMinus } from 'react-icons/fa';
import locations from '../../assets/locations.json';
import { useNavigate } from 'react-router-dom'
import { decodeJWT } from '../../services/utils/jwt';
import baseGenres from '../../assets/genres.js';
import baseInstruments from '../../assets/instruments.js';
import CreateOpportunityForm from './CreateOpportunityForm';
import SuggestedOpportunities from './SuggestedOpportunities';
import Search from "../admin/Search";

const Homepage = () => {
    const [open, setOpen] = useState(false)
    const [loggedUser, setLoggedUser] = useState(null);
    let navigate = useNavigate();

    const [isOpportunityFormOpen, setIsOpportunityFormOpen] = useState(false);
    const [isSuggestedMusiciansOpen, setIsSuggestedMusiciansOpen] = useState(false);
    const [isSuggestedBandsOpen, setIsSuggestedBandsOpen] = useState(false);
    const [isSuggestedOpportunitiesOpen, setIsSuggestedOpportunitiesOpen] = useState(false);

    const getAuthenticatedUser = () => {
        // check if there is a token in the local storage
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeJWT(token);
            setLoggedUser(decoded);
        }
    }
    useEffect(() => {
        getAuthenticatedUser();
    }, []);

    const showProfile = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        // refresh
        window.location = '/';
    }

    const toggleCreateOpportunityForm = () => {
        setIsOpportunityFormOpen(!isOpportunityFormOpen);
        setIsSuggestedMusiciansOpen(false);
        setIsSuggestedBandsOpen(false);
        setIsSuggestedOpportunitiesOpen(false);
    }

    const toggleSuggestedMusicians = () => {
        setIsSuggestedMusiciansOpen(!isSuggestedMusiciansOpen);
        setIsOpportunityFormOpen(false);
        setIsSuggestedBandsOpen(false);
        setIsSuggestedOpportunitiesOpen(false);
    }

    const toggleSuggestedBands = () => {
        setIsSuggestedBandsOpen(!isSuggestedBandsOpen);
        setIsOpportunityFormOpen(false);
        setIsSuggestedMusiciansOpen(false);
        setIsSuggestedOpportunitiesOpen(false);
    }

    const toggleSuggestedOpportunities = () => {
        setIsSuggestedOpportunitiesOpen(!isSuggestedOpportunitiesOpen);
        setIsOpportunityFormOpen(false);
        setIsSuggestedMusiciansOpen(false);
        setIsSuggestedBandsOpen(false);
    }

    return (
        <div className='px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px]'>
            {loggedUser && 
                <div className='rounded-[8px] flex items-center justify-between h-[70px] shadow-md px-[25px] '>
                    <div className='flex items-center rounded-[5px]'>
                        <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69]'>Hi {loggedUser.username}, welcome back! 👋🏼</h2>
                    </div>
                    <div className='flex items-center gap-[20px]'>
                        <div className='flex items-center gap-[15px] relative border-l-[1px] pl-[25px]' onClick={showProfile} >
                            <p>{loggedUser.firstName} {loggedUser.lastName}</p>
                            <div className='h-[50px] w-[50px] rounded-full bg-white cursor-pointer flex items-center justify-center relative z-40' >
                                {loggedUser.profilePictureUrl !== "" && <img src={loggedUser.profilePictureUrl} alt="" className='rounded-full' />}
                                {loggedUser.profilePictureUrl === "" && <FaUser fontSize={28} color="white" />}
                            </div>

                            {
                                open &&
                                <div className='bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]'>
                                    <p className='cursor-pointer hover:text-[blue] font-semibold' onClick={() => navigate(`/${loggedUser.type}s/${loggedUser.id}`)}>Profile</p>
                                    <p className='cursor-pointer hover:text-[blue] font-semibold' onClick={handleLogout}>Log out</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {!loggedUser && 
                <div className='rounded-[8px] border-t-[4px] border-blue-400 flex items-center justify-between h-[70px] shadow-md px-[25px] '>
                    <div className='flex items-center rounded-[5px]'>
                        <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69]'>Hi, welcome to JamSync! 👋🏼</h2>
                    </div>
                    <div className='flex items-center gap-[20px]'>
                       {/* sign in and sign up */}
                        <div className='flex items-center gap-[15px]'>
                            <p className='cursor-pointer hover:text-[blue] font-semibold' onClick={() => navigate("/login")}>Sign in</p>
                            <p className='cursor-pointer hover:text-[blue] font-semibold' onClick={() => navigate("/signup")}>Sign up</p>
                        </div>
                    </div>
                </div>
            }
            {
                loggedUser &&
                <div className='grid grid-cols-4 gap-16 px-16 mt-[25px] pb-[15px] mb-4'>
                    {loggedUser.type === "musician" &&
                        <>
                        <div onClick={toggleSuggestedMusicians} className={`h-24 rounded-[8px] ${isSuggestedMusiciansOpen ? "bg-blue-100 scale-[103%] shadow-lg" : "bg-white"} border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out`}>
                        <div>
                            <h2 className='text-blue-500 text-[11px] leading-[17px] font-bold'>RECOMMENDED FOR YOU...</h2>
                            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>MUSICIANS</h1>
                        </div>
                        <FaRegCalendarMinus fontSize={28} color="" />

                        </div>
                        <div onClick={toggleSuggestedBands} className={`h-24 rounded-[8px] ${isSuggestedBandsOpen ? "bg-green-100 scale-[103%] shadow-lg" : "bg-white"} border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out`}>
                            <div>
                                <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>
                                RECOMMENDED FOR YOU...</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>BANDS</h1>
                            </div>
                            <FaRegCalendarMinus fontSize={28} />
                        </div>
                        </>
                    }
                    <div onClick={toggleSuggestedOpportunities} className={`${loggedUser.type !== "musician" && "col-span-2"} h-24 rounded-[8px] ${isSuggestedOpportunitiesOpen ? "bg-cyan-100 scale-[103%] shadow-lg" : "bg-white"} border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out`}>
                        <div>
                            <h2 className='text-cyan-500 text-[11px] leading-[17px] font-bold'>RECOMMENDED FOR YOU... </h2>
                            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>OPPORTUNITIES</h1>
                        </div>
                        <FaRegCalendarMinus fontSize={28} />
                    </div>
                    <div onClick={toggleCreateOpportunityForm} className={`${loggedUser.type !== "musician" && "col-span-2"} h-24 rounded-[8px] ${isOpportunityFormOpen ? "bg-orange-100 scale-[103%] shadow-lg" : "bg-white"} border-l-[4px] border-orange-500 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out`}>
                        <div>
                            <h2 className='text-[#FF0000] text-[11px] leading-[17px] font-bold'>PUBLISH A NEW </h2>
                            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>OPPORTUNITY</h1>
                        </div>
                        <FaRegCalendarMinus fontSize={28} />
                    </div>
                </div>
            }
            {isSuggestedMusiciansOpen && <></>}
            {isSuggestedBandsOpen && <></>}
            {isSuggestedOpportunitiesOpen && 
                <SuggestedOpportunities user={loggedUser}/>
            }
            {isOpportunityFormOpen && 
                <CreateOpportunityForm user={loggedUser} baseGenres={baseGenres} baseInstruments={baseInstruments} baseLocations={locations}/> 
            }

            <Search />
        </div>
    )
}

export default Homepage;
