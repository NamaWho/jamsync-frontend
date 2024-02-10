import React, { useEffect, useState } from 'react';
import { getSuggestedOpportunities, getSuggestedOpportunitiesByNetwork, getSuggestedOpportunitiesByNetworkAndSimilarities  } from '../../services/opportunityService';
import { FaUser } from 'react-icons/fa';

const SuggestedOpportunities = ({user}) => {

    const [suggestionType, setSuggestionType] = useState(1);
    const [suggestedOpportunities, setSuggestedOpportunities] = useState([]);
    const [suggestedOpportunitiesByNetwork, setSuggestedOpportunitiesByNetwork] = useState([]);
    // const [suggestedOpportunitiesByNetworkAndSimilarities, setSuggestedOpportunitiesByNetworkAndSimilarities] = useState([])

    const fetchSuggestedOpportunities = async () => {
        const result = await getSuggestedOpportunities(user.id, user.type);
        setSuggestedOpportunities(result);

        if (user.type === 'musician') {
            const resultByNetwork = await getSuggestedOpportunitiesByNetwork(user.id, user.type);
            setSuggestedOpportunitiesByNetwork(resultByNetwork);

            // const resultByNetworkAndSimilarities = await getSuggestedOpportunitiesByNetworkAndSimilarities(user.id, user.type);
            // setSuggestedOpportunitiesByNetworkAndSimilarities(resultByNetworkAndSimilarities);
        }
    }

    useEffect(() => {
        fetchSuggestedOpportunities();
    }, [user]);

    const handleChange = (value) => {
        setSuggestionType(value);
    };

    const navigateToOpportunity = (id) => {
        window.location.href = `/opportunities/${id}`;
    }

    return (
        <div className='rounded-[8px] flex flex-col justify-between border-t-[4px] border-cyan-500 mx-16 my-8 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
            <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>SUGGESTED OPPORTUNITIES</h2>
            <h3 className='text-[14px] leading-[20px] font-normal text-[#5a5c69] mb-4'>Based on your profile, here are some opportunities you might be interested in. Choose the type of suggestion: </h3>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <input type="radio" name="suggestionType" id="suggestionType1" checked={suggestionType === 1} onChange={() => handleChange(1)} className='mr-2' />
                    <label htmlFor="suggestionType1" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Opportunities in your area, with genres or instruments similarities</label>
                </div>
                {user.type ==="musician" && 
                <>
                    <div className='flex items-center'>
                        <input type="radio" name="suggestionType" id="suggestionType2" checked={suggestionType === 2} onChange={() => handleChange(2)} className='mr-2' />
                        <label htmlFor="suggestionType2" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Opportunities retrieved from your network, published by followed bands or applied by followed musicians</label>
                    </div>
                    {/* <div className='flex items-center'>
                        <input type="radio" name="suggestionType" id="suggestionType3" checked={suggestionType === 3} onChange={() => handleChange(3)} className='mr-2' />
                        <label htmlFor="suggestionType3" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Opportunities retrieved from your network, based on genres/instruments similarities</label>
                    </div> */}
                </>
                }
            </div>
            <div className='grid grid-cols-2 gap-6 px-16 mt-[25px]'>
                    {suggestionType === 1 && suggestedOpportunities?.map((result, index) => (
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
                <div className='grid grid-cols-3 gap-6 px-16 mt-[25px]'>
                    {user.type ==="musician" && suggestionType === 2 && suggestedOpportunitiesByNetwork?.map((result, index) => (
                        <div key={index} className='h-46 rounded-[8px] bg-white border-l-[4px] border-cyan-500 flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4' onClick={() => navigateToOpportunity(result._id)}>
                            <div className="flex justify-between">
                                <h2 className='text-cyan-500 text-[20px] leading-[24px] font-bold'>{result.title.length > 35 ? result.title.substring(0, 35) + '...' : result.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className='grid grid-cols-2 gap-6 px-16 mt-[25px]'>
                    {user.type ==="musician" && suggestionType === 3 && suggestedOpportunitiesByNetworkAndSimilarities?.map((result, index) => (
                        <div key={index} className='h-46 rounded-[8px] bg-white border-l-[4px] border-cyan-500 flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4' onClick={() => navigateToOpportunity(result._id)}>
                            <div className="flex justify-between">
                                <h2 className='text-cyan-500 text-[20px] leading-[24px] font-bold'>{result.title.length > 35 ? result.title.substring(0, 35) + '...' : result.title}</h2>
                            </div>
                        </div>
                    ))}
                </div> */}

        </div>
    );
}

export default SuggestedOpportunities;