import React from 'react';
import { useState, useEffect } from 'react';
import { getSuggestedMusiciansByNetwork, getSuggestedMusiciansBySimilarities } from '../../services/registeredUserService';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { IoIosFemale, IoIosMale } from 'react-icons/io';

const SuggestedMusicians = ({user}) => {

    const [suggestionType, setSuggestionType] = useState(1);
    const [suggestedMusiciansBySimilarities, setSuggestedMusiciansBySimilarities] = useState([]);
    const [suggestedMusiciansByNetwork, setSuggestedMusiciansByNetwork] = useState([]);

    const navigate = useNavigate()

    const fetchSuggestedMusicians = async () => {
        const result = await getSuggestedMusiciansBySimilarities(user.id, user.type);
        setSuggestedMusiciansBySimilarities(result);

        const resultByNetwork = await getSuggestedMusiciansByNetwork(user.id);
        setSuggestedMusiciansByNetwork(resultByNetwork);
    }
    
    useEffect(() => {
        fetchSuggestedMusicians();
    }, [user]);

    const handleChange = (value) => {
        setSuggestionType(value);
    };

    return (
        <div className='rounded-[8px] flex flex-col justify-between border-t-[4px] border-cyan-500 mx-16 my-8 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
            <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>SUGGESTED MUSICIANS</h2>
            <h3 className='text-[14px] leading-[20px] font-normal text-[#5a5c69] mb-4'>Based on your profile, here are some musicians you might be interested in. Choose the type of suggestion: </h3>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <input type="radio" name="suggestionType" id="suggestionType1" checked={suggestionType === 1} onChange={() => handleChange(1)} className='mr-2' />
                    <label htmlFor="suggestionType1" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Musicians in your area, with genres or instruments similarities</label>
                </div>
                {user.type ==="musician" && 
                <>
                    <div className='flex items-center'>
                        <input type="radio" name="suggestionType" id="suggestionType2" checked={suggestionType === 2} onChange={() => handleChange(2)} className='mr-2' />
                        <label htmlFor="suggestionType2" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Musicians retrieved from your network, followed by your followed users</label>
                    </div>
                </>
                }
            </div>
            <div className='grid grid-cols-2 gap-6 px-16 mt-[25px]'>
                    {suggestionType === 1 && suggestedMusiciansBySimilarities?.map((result, index) => (
                        <div key={index} className={`h-40 rounded-[8px] bg-white border-l-[4px] border-red-500 flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4`} onClick={() => navigate("/musicians/"+result._id)}>
                            <div className="flex justify-between">
                                <h2 className={`text-red-500 text-[20px] leading-[24px] font-bold`}>{result.username}</h2>
                                {result.profilePictureUrl === "" && 
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                                        <FaUser fontSize={28} color="" />
                                    </div>
                                }
                                {result.profilePictureUrl !== "" && <img src={result.profilePictureUrl} alt="" className='h-12 w-12 rounded-full' />}
                            </div>
                            <p className='italic text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{(!result.about || result.about.length === 0) ? "No description provided..." : result.about.length > 100 ? result.about.substring(0, 100) + '...' : result.about}</p>
                            <div className='flex items-center justify-between'>
                                {result.age && <p className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{result.age} yrs</p>}
                                <p className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{result.location.city}, {result.location.country}</p>
                                {result.gender === "-" && <FaUser fontSize={28} color="" />}
                                {result.gender === "M" && <IoIosMale fontSize={28} color="" />}
                                {result.gender === "F" && <IoIosFemale fontSize={28} color="" />}
                            </div>
                        </div>

                    ))}
                </div>
                <div className='grid grid-cols-3 gap-6 px-16 mt-[25px]'>
                    {user.type ==="musician" && suggestionType === 2 && suggestedMusiciansByNetwork?.map((result, index) => (
                        <div key={index} onClick={() => navigate("/musicians/"+result._id)} className='h-46 rounded-[8px] bg-white border-l-[4px] border-cyan-500 flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4' >
                            <h2 className='text-cyan-500 text-[20px] leading-[24px] font-bold'>{result.username}</h2>
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
};

export default SuggestedMusicians;