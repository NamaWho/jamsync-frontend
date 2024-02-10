import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosFemale, IoIosMale } from 'react-icons/io';
import Select from 'react-select';
import locations from '../../assets/locations.json';
import baseGenres from '../../assets/genres.js';
import baseInstruments from '../../assets/instruments.js';
import { searchUsers, searchOpportunities } from '../../services/homepageService';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Search = () => {

    const [searchType, setSearchType] = useState("Musician");
    const [searchForUser, setSearchForUser] = useState("Musician");
    const [searchUsername, setSearchUsername] = useState("");
    const [searchGenres, setSearchGenres] = useState([]);
    const [searchInstruments, setSearchInstruments] = useState([]);
    const [searchLocation, setSearchLocation] = useState({
        city: "",
        country: "",
        state: "",
        geojson: {
            coordinates: []
        }
    });
    const locationOptions = locations.map((location, index) => ({
        value: location,
        label: location.city.toUpperCase(),
    }));
    const [locationsProposed, setLocationsProposed] = useState(locationOptions.splice(0, 10));
    const [searchMaxDistance, setSearchMaxDistance] = useState(25);
    const [searchGender, setSearchGender] = useState("-");
    const [searchMinAge, setSearchMinAge] = useState(0);
    const [searchMaxAge, setSearchMaxAge] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchUsersResults, setSearchUsersResults] = useState([]);
    const [searchOpportunitiesResults, setSearchOpportunitiesResults] = useState([]);


    const availableGenres = baseGenres
    const genreOptions = availableGenres.map(genre => ({ value: genre, label: genre }));

    const availableInstruments = baseInstruments;
    const instrumentsOptions = availableInstruments.map(instrument => ({ value: instrument, label: instrument }));

    const navigate = useNavigate();

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchUsersResults([]);
        setSearchOpportunitiesResults([]);
    }

    const handleSearchGenreChange = (selectedOptions) => {
        setSearchGenres(selectedOptions || []);
    };

    const handleSearchInstrumentChange = (selectedOptions) => {
        setSearchInstruments(selectedOptions || []);
    };

    const handleSearchLocationInputChange = (inputValue) => {
        setLocationsProposed(locationOptions.filter(option => option.value.city.toUpperCase().includes(inputValue.toUpperCase())).splice(0, 10));
    };

    const handleSearchLocationChange = (selectedOption) => {
        setSearchLocation(selectedOption.value);
    };

    const navigateToUser = (type, id, result) => {
        navigate(`/${type}s/${id}`, {state: { detail: result }});
    }

    const navigateToOpportunity = (id, result) => {
        navigate(`/opportunities/${id}`, {state: { detail: result }});
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = {
            type: searchType,
            forUser: searchForUser,
            username: searchUsername,
            publisherUsername: searchUsername,
            genres: searchGenres.map(genre => genre.value),
            instruments: searchInstruments.map(instrument => instrument.value),
            location: searchLocation,
            maxDistance: searchMaxDistance,
            maxAge: searchMaxAge,
            minAge: searchMinAge,
            gender: searchGender,
            pageSize,
            page: pageNumber
        }
        let resultPromise;
        if (searchType === "Opportunity") {
            resultPromise = searchOpportunities(params);
            toast.promise(resultPromise, {
                loading: 'Searching...',
                success: 'Opportunities found!',
                error: 'No opportunities found!'
            });
        }
        else {
            resultPromise = searchUsers(params);
            toast.promise(resultPromise, {
                loading: 'Searching...',
                success: 'Users found!',
                error: 'No users found!'
            });
        }
        
        resultPromise.then(result => {
            if (searchType === "Opportunity"){
                setSearchOpportunitiesResults(result.data.payload);
                setSearchUsersResults([]);
            } else {
                setSearchUsersResults(result.data.payload);
                setSearchOpportunitiesResults([]);
            }
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='rounded-[8px] flex flex-col w-full justify-between border-l-[4px] border-green-500 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
                <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>SEARCH FOR MUSICIANS, BANDS AND OPPORTUNITIES</h2>
                {/* search by type, username, genres, instruments, location */}
                <form className='grid grid-cols-4'>
                    <div className='flex flex-col w-3/4 mb-4'>
                        <label htmlFor="type" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Type</label>
                        <select onChange={(e) => handleSearchTypeChange(e)} name="type" id="type" className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]'>
                            <option value="Musician">Musician</option>
                            <option value="Band">Band</option>
                            <option value="Opportunity">Opportunity</option>
                        </select>
                    </div>
                    {searchType === "Opportunity" &&
                        <div className='flex flex-col w-3/4 mb-4'>
                            <label htmlFor="forUser" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>For User</label>
                            <select onChange={(e) => setSearchForUser(e.target.value)} name="forUser" id="forUser" className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]'>
                                <option value="Musician">Musician</option>
                                <option value="Band">Band</option>
                            </select>
                        </div>
                    }
                    <div className='flex flex-col w-3/4 mb-4'>
                        <label htmlFor="username" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>{searchType !== "Opportunity" ? "Username" : "Publisher's username"}</label>
                        <input onChange={(e) => setSearchUsername(e.target.value)} value={searchUsername} type="text" className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Username' />
                    </div>
                    
                    <div className='flex flex-col space-x-4 w-3/4 mb-4'>
                        <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal">Genres</label>
                        <Select 
                            isMulti
                            options={genreOptions}
                            value={searchGenres}
                            onChange={handleSearchGenreChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    {(searchType === "Musician" || (searchType==="Opportunity" && searchForUser==="Musician")) && <div className='flex flex-col space-x-4 w-3/4 mb-4'>
                        <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal">Instruments</label>
                        <Select 
                            isMulti
                            options={instrumentsOptions}
                            value={searchInstruments}
                            onChange={handleSearchInstrumentChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>}

                    <div className='grid grid-cols-2 col-span-4 mb-4'>
                        <div className='flex flex-col space-x-4 w-5/6'>
                            <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor="location">City</label>
                                <Select
                                    value={locationsProposed.find(option => option.value === searchLocation)}
                                    onChange={handleSearchLocationChange}
                                    onInputChange={handleSearchLocationInputChange}
                                    options={locationsProposed}
                                />
                        </div>

                        <div className='flex flex-col space-x-4 w-5/6'>
                            <label htmlFor="maxDistance" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Max Distance - {searchMaxDistance} km</label>
                            <input type="range" id="maxDistance" name="maxDistance" min="1" max="250" onChange={(e) => setSearchMaxDistance(parseInt(e.target.value))} className='bg-white mt-3 outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' />
                        </div>
                    </div>

                    {(searchType === "Musician" || (searchType === "Opportunity" && searchForUser === "Musician"))&& 
                    <div className='grid grid-cols-3 col-span-4 mb-4'>
                        <div className='flex flex-col space-x-4 w-3/4'>
                            <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor='gender'>Gender</label>
                            <select onChange={(e) => setSearchGender(e.target.value)} value={searchGender} name="gender" id="gender" className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]'>
                                <option value="-">-</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </div>

                        <div className='flex flex-col space-x-4 w-3/4'>
                            <label className="font-bold text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor="maxAge">Maximum Age</label>
                            <input 
                                type="number" 
                                name="maxAge" 
                                value={searchMaxAge}
                                onChange={(e) => setSearchMaxAge(parseInt(e.target.value))}
                            />
                        </div>

                        <div className='flex flex-col space-x-4 w-3/4'>
                            <label className="font-bold text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor="minimumAge">Minimum Age</label>
                            <input 
                                type="number" 
                                name="MinAge" 
                                value={searchMinAge}
                                onChange={(e) => setSearchMinAge(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    }

                    <div className='grid grid-cols-2 col-span-4 mb-4'>
                        <div className='flex flex-col space-x-4 w-5/6'>
                            <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor="pageSize">Page Size</label>
                            <input 
                                type="number" 
                                name="pageSize" 
                                value={pageSize}
                                onChange={(e) => setPageSize(parseInt(e.target.value))}
                            />
                        </div>

                        <div className='flex flex-col space-x-4 w-5/6'>
                            <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor="pageNumber">Page Number</label>
                            <input 
                                type="number" 
                                name="pageNumber" 
                                value={pageNumber}
                                onChange={(e) => setPageNumber(parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* submit button */}
                    <div className='flex justify-center col-span-4'>
                        <button type="button" onClick={handleSearch} className='bg-[#F40202] text-white leading-[20px] font-normal h-10 w-32 rounded-[5px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>SEARCH</button>
                    </div>
                </form>
            </div>
            {/* search results */}
            {searchUsersResults.length !== 0 && 
                <div className='grid grid-cols-3 gap-6 px-16 mt-[25px]'>
                {searchUsersResults.map((result, index) => (
                    <div key={index} className={`h-40 rounded-[8px] bg-white border-l-[4px] ${searchType === "Musician" ? "border-red-500" : "border-blue-500"} flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4`} onClick={() => navigateToUser(searchType.toLowerCase(), result._id, result)}>
                        <div className="flex justify-between">
                            <h2 className={`${searchType==="Musician" ? "text-red-500" : "text-blue-500"} text-[20px] leading-[24px] font-bold`}>{result.username}</h2>
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
            </div>}
            {searchOpportunitiesResults.length !== 0 && 
                <div className='grid grid-cols-2 gap-6 px-16 mt-[25px]'>
                    {searchOpportunitiesResults.map((result, index) => (
                        <div key={index} className='h-40 rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex flex-col justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-4' onClick={() => navigateToOpportunity(result._id, result)}>
                            <div className="flex justify-between">
                                <h2 className='text-[#B589DF] text-[20px] leading-[24px] font-bold'>{result.title.length > 35 ? result.title.substring(0, 35) + '...' : result.title}</h2>
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
            }
        </div>
    )
}

export default Search;