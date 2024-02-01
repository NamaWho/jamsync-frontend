import React, { useState } from 'react';
import {FiLink} from 'react-icons/fi';
import {MdInfo} from 'react-icons/md';
import {GiMailbox} from 'react-icons/gi';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaItunesNote } from "react-icons/fa6";
import Select from 'react-select';
import axios from 'axios';



const Signup = () => {
    const [type, setType] = useState('Musician');
    const [username, setUsername] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [about, setAbout] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [genres, setGenres] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [location, setLocation] = useState(null);
    const [locationLabel, setLocationLabel] = useState('');
    const [locationsProposed, setLocationsProposed] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('-');
    const [age, setAge] = useState('');
    const [yearsTogether, setYearsTogether] = useState('');
    const [gigsPlayed, setGigsPlayed] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
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


    const handleGenreChange = (selectedOptions) => {
        setGenres(selectedOptions || []);
    };

    const handleInstrumentChange = (selectedOptions) => {
        setInstruments(selectedOptions || []);
    };

    const handleLocationLabelChange = async (event) => {
            setLocationLabel(event.target.value);
        
            // Replace with your actual API endpoint
            const response = await axios.get(`${process.env.BASE_URI}/locations?prefix=${event.target.value}`);
            
            setLocationsProposed(response.data);
    }

    const handleLocationClick = (location) => {
        setLocation(location);
        setLocationLabel(location);
        setLocationsProposed([]);
    };
    
    const handleSignup = (event) => {
        event.preventDefault();
        // Handle Signup logic here
    }

    return (
        <div className='flex flex-col items-center overflow-y-scroll w-full'>
            <div className='rounded-[8px] bg-white border-t-[4px] border-[#4E73DF] w-9/12 flex items-center justify-between hover:shadow-lg transform transition duration-300 ease-out overflow-y-auto mt-16'>
                <form onSubmit={handleSignup} className='bg-[#F8F9FC] p-[20px] rounded-[5px] shadow-lg w-full mx-auto'>
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-[10px]'>Signup</h2>
                    
                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <FaItunesNote />
                        <label htmlFor="type">Type</label>
                        <div>
                            <input 
                                type="radio" 
                                name="type" 
                                value="Musician"
                                checked={type === "Musician"}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label htmlFor="Musician">Musician</label>
                            <input 
                                type="radio" 
                                name="type" 
                                value="Band"
                                checked={type === "Band"}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label htmlFor="Band">Band</label>
                        </div>
                    </div>

                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <MdOutlineAlternateEmail />
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <GiMailbox />
                        <label htmlFor="contactEmail">Contact Email</label>
                        <input 
                            type="email" 
                            name="contactEmail" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <MdInfo />
                        <label htmlFor="about">About</label>
                        <textarea 
                            name="about" 
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            maxLength={1500}
                        />
                    </div>

                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <FiLink />
                        <label htmlFor="profilePictureUrl">Profile Picture URL</label>
                        <input 
                            type="url" 
                            name="profilePictureUrl" 
                            value={profilePictureUrl}
                            onChange={(e) => setProfilePictureUrl(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <FaItunesNote />
                        <label>Genres</label>
                        <Select 
                            isMulti
                            options={genreOptions}
                            value={genres}
                            onChange={handleGenreChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    {type === "Musician" && <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                                                <FaItunesNote />
                                                <label>Instruments</label>
                                                <Select 
                                                    isMulti
                                                    options={instrumentsOptions}
                                                    value={instruments}
                                                    onChange={handleInstrumentChange}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                    }

                    <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                        <FaItunesNote />
                        <label htmlFor="location">Location</label>
                        <div>
                            <input type="text" value={locationLabel} onChange={handleLocationLabelChange} />
                            {locationsProposed.map((location, index) => (
                                <div key={index} onClick={() => handleLocationClick(location)}>
                                {location}
                                </div>
                            ))}
                        </div>
                    </div>

                    {type === "Musician" && <>
                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <FaItunesNote />
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <FaItunesNote />
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <label htmlFor='gender'>Gender</label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="-"
                                checked={gender === "-"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="-">-</label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="M"
                                checked={gender === "M"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="M">M</label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="F"
                                checked={gender === "F"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="F">F</label>
                        </div>

                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <FaItunesNote />
                            <label htmlFor="age">Age</label>
                            <input 
                                type="number" 
                                name="age" 
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                    </>
                    }
                    {type === "Band" &&
                        <>
                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <FaItunesNote />
                            <label htmlFor="yearsTogether">Years Together</label>
                            <input 
                                type="number" 
                                name="yearsTogether" 
                                value={yearsTogether}
                                onChange={(e) => setYearsTogether(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <FaItunesNote />
                            <label htmlFor="gigsPlayed">Gigs Played</label>
                            <input 
                                type="number" 
                                name="gigsPlayed" 
                                value={gigsPlayed}
                                onChange={(e) => setGigsPlayed(e.target.value)}
                            />
                        </div>
                        </>
                    }

                    <div>
                        <h3 className='text-[18px] leading-[20px] font-bold text-[#5a5c69] mb-[10px]'>Credentials</h3>
                    
                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <MdOutlineAlternateEmail />
                            <label htmlFor="user">User</label>
                            <input 
                                type="text" 
                                name="user" 
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                                />
                        </div>

                        <div className='flex items-center justify-between space-x-4 mb-[10px]'>
                            <MdOutlineAlternateEmail />
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                        </div>
                    </div>

                    <button type="submit" className='bg-[#4E73DF] h-[40px] w-full rounded-[5px] text-white font-bold'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
