import React, { useState } from 'react';
import { FaSearch, FaRegBell, FaEnvelope } from 'react-icons/fa';
import { FaRegCalendarMinus } from 'react-icons/fa';
import Select from 'react-select';
import locations from '../../assets/locations.json';
import { searchUsers } from '../../services/homepageService';

const Homepage = () => {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('douglymcgee');

    const [searchType, setSearchType] = useState('Musician');
    const [searchUsername, setSearchUsername] = useState('');
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
    const [searchMaxAge, setSearchMaxAge] = useState(100);
    const [searchMinAge, setSearchMinAge] = useState(1);
    const [searchGender, setSearchGender] = useState('-');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const availableGenres = [
        "Alternative",
        "Blues",
        "Classical",
        "Country",
        "Electronic",
        "Folk",
    ] 
    const genreOptions = availableGenres.map(genre => ({ value: genre, label: genre }));

    const availableInstruments = [
        "Acoustic Guitar",
        "Bass Guitar",
        "Drums",
        "Electric Guitar",
        "Keyboard",
        "Piano"
    ]
    const instrumentsOptions = availableInstruments.map(instrument => ({ value: instrument, label: instrument }));

    const showProfile = () => {
        setOpen(!open)
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

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = {
            type: searchType,
            username: searchUsername,
            genres: searchGenres.map(genre => genre.value),
            instruments: searchInstruments.map(instrument => instrument.value),
            location: searchLocation,
            maxDistance: searchMaxDistance,
            maxAge: searchMaxAge,
            minAge: searchMinAge,
            gender: searchGender,
            pageSize,
            pageNumber
        }
        console.log(params);
        const data = await searchUsers(params);
        console.log(data);
    }

    return (
        <div className='px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px] h-full'>
            <div className='rounded-[8px] flex items-center justify-between h-[70px] shadow-md px-[25px] '>
                <div className='flex items-center rounded-[5px]'>
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69]'>Hi {username}, welcome back! 👋🏼</h2>
                </div>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[15px] relative border-l-[1px] pl-[25px]' onClick={showProfile} >
                        <p>Douglas McGee</p>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40' >
                            <img src={"https://img.villaggiomusicale.com/avt/5989.jpg"} alt="" className='rounded-full' />

                        </div>

                        {
                            open &&
                            <div className='bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]'>
                                <p className='cursor-pointer hover:text-[blue] font-semibold'>Profile</p>
                                <p className='cursor-pointer hover:text-[blue] font-semibold'>Settings</p>
                                <p className='cursor-pointer hover:text-[blue] font-semibold'>Log out</p>
                            </div>

                        }
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-24 px-16 mt-[25px] pb-[15px]'>
                <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#B589DF] text-[11px] leading-[17px] font-bold'>FOR YOU...</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>MUSICIANS</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />

                </div>
                <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>
                            FOR YOU...</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>BANDS</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} />
                </div>
                <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>FOR YOU... </h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>OPPORTUNITIES</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} />
                </div>
            </div>
            {/* search form */}
            <div className='rounded-[8px] flex flex-col justify-between border-t-[4px] border-[#FF0000] mx-16 mt-8 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
                <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>SEARCH FOR MUSICIANS, BANDS AND OPPORTUNITIES</h2>
                {/* search by type, username, genres, instruments, location */}
                <form className='grid grid-cols-4'>
                    <div className='flex flex-col w-3/4 mb-4'>
                        <label htmlFor="type" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Type</label>
                        <select onChange={(e) => setSearchType(e.target.value)} name="type" id="type" className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]'>
                            <option value="Musician">Musician</option>
                            <option value="Band">Band</option>
                            <option value="Opportunity">Opportunity</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-3/4 mb-4'>
                        <label htmlFor="username" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Username</label>
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

                    {searchType === "Musician" && <div className='flex flex-col space-x-4 w-3/4 mb-4'>
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

                    {searchType === "Musician" && 
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
        </div>
    )
}

export default Homepage;
