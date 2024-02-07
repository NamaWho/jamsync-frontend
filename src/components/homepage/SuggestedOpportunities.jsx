import React, { useEffect, useState } from 'react';
import { getSuggestedOpportunities } from '../../services/opportunityService';
import { FaUser } from 'react-icons/fa';

const SuggestedOpportunities = ({user}) => {

    const [suggestedOpportunities, setSuggestedOpportunities] = useState([]);

    const fetchSuggestedOpportunities = async () => {
        const result = await getSuggestedOpportunities(user.id, user.type);
        setSuggestedOpportunities(result);
    }

    useEffect(() => {
        fetchSuggestedOpportunities();
    }, [user]);

    const navigateToOpportunity = (id) => {
        window.location.href = `/opportunities/${id}`;
    }

    return (
        <div className='rounded-[8px] flex flex-col justify-between border-t-[4px] border-cyan-500 mx-16 my-8 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
            <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>SUGGESTED OPPORTUNITIES</h2>
            <div className='grid grid-cols-2 gap-6 px-16 mt-[25px]'>
                    {suggestedOpportunities?.map((result, index) => (
                        <div key={index} className='h-46 rounded-[8px] bg-white border-l-[4px] border-cyan-500 flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4' onClick={() => navigateToOpportunity(result._id)}>
                            <div className="flex justify-between">
                                <h2 className='text-cyan-500 text-[20px] leading-[24px] font-bold'>{result.title.length > 35 ? result.title.substring(0, 35) + '...' : result.title}</h2>
                                {result.publisher.profilePictureUrl === "" && 
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                                        <FaUser fontSize={28} color="" />
                                    </div>
                                }
                                {result.publisher.profilePictureUrl !== "" && <img src={result.publisher.profilePictureUrl} alt="" className='h-12 w-12 rounded-full' />}
                            </div>
                            <p className='italic text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{result.description.length > 200 ? result.description.substring(0, 200) + '...' : result.description}</p>
                            <div className='flex items-center justify-between mt-2'>
                                <p className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{result.location.city}, {result.location.state || result.location.country}</p>
                                <p className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{result.createdAt}</p>
                            </div>
                        </div>
                    ))}
                </div>

        </div>
    );
}

export default SuggestedOpportunities;