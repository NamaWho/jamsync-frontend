import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { searchOpportunity } from '../../services/opportunityService';
import Map from '../utils/Map';
import { decodeJWT } from '../../services/utils/jwt';
import { sendApplication } from '../../services/applicationService';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const Opportunity = () => {
    const { id } = useParams();
    const [opportunity, setOpportunity] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
    const [applicationText, setApplicationText] = useState('');
    let navigate = useNavigate();

    const fetchOpportunity = async () => {
        const result = await searchOpportunity(id);
        setOpportunity(result);
    }

    const getAuthenticatedUser = () => {
        // check if there is a token in the local storage
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeJWT(token);
            setLoggedUser(decoded);
        }
    }

    let location = useLocation();
    useEffect(() => {
        if (location.state) {
            setOpportunity(location.state.detail);
        } else {
            fetchOpportunity();
        }
        getAuthenticatedUser();
    }, [location, id]);

    const navigateToUser = (type, id) => {
        navigate(`/${type}s/${id}`);
    }

    const toggleApplicationForm = () => {
        setIsApplicationFormOpen(!isApplicationFormOpen);
    }

    const handleSendApplicationClick = async () => {
        const data = {
            _id: uuidv4(),
            createdAt: new Date().toISOString().split('T')[0],
            applicant: {
                _id: loggedUser.id,
                username: loggedUser.username,
                profilePictureUrl: loggedUser.profilePictureUrl,
                contactEmail: loggedUser.contactEmail
            },
            text: applicationText,
            status: 0
        }

        const result = await sendApplication(opportunity._id, data);
        if (result) {
            setIsApplicationFormOpen(false);
            setApplicationText('');
            toast.success('Application sent successfully');
            fetchOpportunity();
        } else {
            toast.error('Error sending application');
        }
    }

    const handleApplicationClick = (applicantId, id) => {
        if (loggedUser && (loggedUser.id === opportunity.publisher._id || loggedUser.id === applicantId)) {
            navigate(`/applications/${id}`);
        } 
    }

    return (
        <>
        {opportunity &&
            <div className='px-64 pt-20 pb-[40px]'>
                <div className='rounded-[18px] flex flex-col items-center justify-between shadow-md bg-white p-8 border-t-[4px] border-red-500'>
                    <h1 className='text-2xl font-bold mb-16'>{opportunity.title}</h1>
                    {loggedUser && loggedUser.type !== opportunity.publisher.type.toLowerCase() && !opportunity.applications.some(app => app.applicant._id === loggedUser.id) &&
                        <div className='flex justify-center mb-8'>
                            <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-[8px]' onClick={toggleApplicationForm}>Apply</button>
                        </div>
                    }
                    {isApplicationFormOpen && 
                        <div className='flex flex-col gap-y-4 p-8 shadow-lg rounded-[8px] mb-8 w-1/2'>
                            <textarea 
                                name='application'
                                className='bg-white outline-none pl-4 pt-5 w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px] shadow-md' 
                                placeholder='Personalize your application...'
                                maxLength={1500} 
                                value={applicationText}
                                onChange={(e) => setApplicationText(e.target.value)}
                            />
                            <button onClick={handleSendApplicationClick} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-[8px]'>Send</button>
                            <button onClick={toggleApplicationForm} className='bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-[8px]'>Close</button>
                        </div>
                    }
                    <div className="grid grid-cols-4 gap-x-4">
                        <div className='col-span-4 mb-8'>
                            <h2 className='text-red-500 mr-4 text-[20px] leading-[24px] font-bold mb-2 inline align-top'>Publisher</h2>
                            <div onClick={() => navigateToUser(opportunity.publisher.type.toLowerCase(), opportunity.publisher._id)} className='relative rounded-[8px] cursor-pointer border-t-[4px] border-red-400 inline-flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-2 px-14'>
                                <p className='text-[#5a5c69] text-[18px] leading-[20px] font-normal mt-5'>{opportunity.publisher.type} - {opportunity.publisher.username}</p>
                                {opportunity.publisher.profilePictureUrl === "" && <div className='absolute -top-5 w-10 h-10 rounded-full bg-white shadow-lg'></div>}
                                {opportunity.publisher.profilePictureUrl !== "" && <img src={opportunity.publisher.profilePictureUrl} alt='profile' className='absolute -top-5 h-10 w-10 rounded-full border border-red-300 border-[1px] shadow-lg bg-white'/>}
                            </div>
                        </div>
                        <div className='col-span-4 mb-8'>
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 '>Description</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.description || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Role</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.role || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 text-right'>Visits</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal text-right'>{opportunity.visits || "-"}</p>
                        </div>
                        <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full'>Genres</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {opportunity.genres.map((genre, index) => (
                                    <div key={index} className='rounded-[8px] cursor-default border-t-[4px] border-blue-200 flex items-center justify-center shadow-md transform transition duration-300 ease-out w-1/4 '>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{genre}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full text-right'>Instruments</h2>
                            <div className="flex flex-row-reverse flex-wrap gap-x-4 gap-y-2">
                                {opportunity?.instruments?.map((instrument, index) => (
                                    <div key={index} className='rounded-[8px] cursor-default border-t-[4px] border-green-200 flex items-center justify-center shadow-md transform transition duration-300 ease-out w-1/4'>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{instrument}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-x-12 col-span-2 mb-8'>
                            <div className='flex flex-col self-start'>
                                <p className='text-red-500 text-[20px] leading-[24px] font-bold'>Location</p>
                                <p className=''>{opportunity.location.city}, {opportunity.location.country || opportunity.location.state}</p>
                            </div>
                            <Map entity={opportunity} className=""/>
                        </div> 
                        <div className="col-span-2 flex-col mb-8 text-right">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Gender</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.gender || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Maximum age</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.maximumAge || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8 text-right">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Minimum age</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.minimumAge || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Opportunity created</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.createdAt || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8 text-right">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Opportunity expires</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.expiresAt || "-"}</p>
                        </div>

                        <div className="col-span-4 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-4'>Applications</h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {opportunity?.applications.map((application, index) => (
                                    <div key={index} className={`rounded-[8px] border-t-[4px] ${application.status ? "border-green-300" : "border-orange-300"} flex flex-col items-center justify-center shadow-md transform transition duration-300 ease-out px-8 py-4 ${loggedUser && ((opportunity.publisher._id === loggedUser.id) || (application.applicant._id === loggedUser.id)) ? "cursor-pointer hover:scale-[103%] hover:shadow-lg" : "cursor-default"}`} onClick={() => handleApplicationClick(application.applicant._id, application._id)}>
                                        <p className='text-[#5a5c69] text-[13px] font-normal mt-2'>{application.applicant.username}</p>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{application.createdAt}</p>
                                        {application.applicant.profilePictureUrl === "" && <div className='absolute -top-5 w-10 h-10 rounded-full bg-white border border-red-300 border-[1px] shadow-lg'></div>}
                                        {application.applicant.profilePictureUrl !== "" && <img src={application.applicant.profilePictureUrl} alt='profile' className='absolute -top-5 h-10 w-10 bg-white rounded-full border border-red-300 border-[1px] shadow-lg'/>}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Opportunity;