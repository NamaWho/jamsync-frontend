import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { searchOpportunity } from '../../services/opportunityService';
import Map from '../utils/Map';

const Opportunity = () => {
    const { id } = useParams();
    const [opportunity, setOpportunity] = useState(null);
    let navigate = useNavigate();

    const fetchOpportunity = async () => {
        const result = await searchOpportunity(id);
        setOpportunity(result);
    }

    let location = useLocation();
    useEffect(() => {
        if (location.state) {
            setOpportunity(location.state.detail);
        } else {
            fetchOpportunity();
        }
    }, [location, id]);

    const navigateToUser = (type, id) => {
        navigate(`/${type}s/${id}`);
    }

    return (
        <>
        {opportunity &&
            <div className='px-64 pt-20 pb-[40px]'>
                <div className='rounded-[18px] flex flex-col items-center justify-between shadow-md bg-white p-8'>
                    <h1 className='text-2xl font-bold mb-16'>{opportunity.title}</h1>
                    <div className="grid grid-cols-4 gap-x-4">
                        <div className='col-span-4 mb-8' onClick={() => navigateToUser(opportunity.publisher.type.toLowerCase(), opportunity.publisher._id)}>
                            <h2 className='text-red-500 mr-4 text-[20px] leading-[24px] font-bold mb-2 inline align-top'>Publisher</h2>
                            <div className='relative rounded-[8px] cursor-pointer border-t-[4px] border-red-300 inline-flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-2 px-14'>
                                <p className='text-[#5a5c69] text-[18px] leading-[20px] font-normal mt-5'>{opportunity.publisher.type} - {opportunity.publisher.username}</p>
                                {opportunity.publisher.profilePictureUrl === "" && <div className='absolute w-10 h-10 rounded-full bg-white shadow-lg'></div>}
                                {opportunity.publisher.profilePictureUrl !== "" && <img src={opportunity.publisher.profilePictureUrl} alt='profile' className='absolute -top-5 h-10 w-10 rounded-full border border-red-300 border-[1px] shadow-lg'/>}
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
                                    <div key={index} className='rounded-[8px] cursor-default border-t-[4px] border-blue-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/4 '>
                                        <p className='text-[#5a5c69] text-[13px] font-normal'>{genre}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-2 mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2 w-full text-right'>Instruments</h2>
                            <div className="flex flex-row-reverse flex-wrap gap-x-4 gap-y-2">
                                {opportunity?.instruments.map((instrument, index) => (
                                    <div key={index} className='rounded-[8px] cursor-default border-t-[4px] border-green-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out w-1/4'>
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
                        <div className="col-span-1 flex-col mb-8">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Opportunity created</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.createdAt || "-"}</p>
                        </div>
                        <div className="col-span-2 flex-col mb-8 text-center">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Opportunity last modified</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.modifiedAt || "-"}</p>
                        </div>
                        <div className="col-span-1 flex-col mb-8 text-right">
                            <h2 className='text-red-500 text-[20px] leading-[24px] font-bold mb-2'>Opportunity expires</h2>
                            <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.expiresAt || "-"}</p>
                        </div>

                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Opportunity;