import React, { useState } from 'react';
import {FiLink} from 'react-icons/fi';
import {MdCalendarMonth, MdInfo, MdLocationCity, MdOutlinePermIdentity, MdPassword, MdPiano, MdTransgender} from 'react-icons/md';
import {GiMailbox} from 'react-icons/gi';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaGuitar, FaItunesNote } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import Select from 'react-select';
import locations from '../../assets/locations.json';
import baseGenres from '../../assets/genres.js';
import baseInstruments from '../../assets/instruments.js';
import { checkUser, register } from '../../services/authService.js';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [type, setType] = useState('Musician');
    const [username, setUsername] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [about, setAbout] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [genres, setGenres] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [location, setLocation] = useState(null);
    const locationOptions = locations.map((location, index) => ({
        value: location,
        label: location.city.toUpperCase(),
    }));
    const [locationsProposed, setLocationsProposed] = useState(locationOptions.splice(0, 10));
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('-');
    const [age, setAge] = useState('');
    const [yearsTogether, setYearsTogether] = useState('');
    const [gigsPlayed, setGigsPlayed] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const availableGenres = baseGenres;
    const genreOptions = availableGenres.map(genre => ({ value: genre, label: genre }));
    
    const availableInstruments = baseInstruments;
    const instrumentsOptions = availableInstruments.map(instrument => ({ value: instrument, label: instrument }));
    
    let navigate = useNavigate();

    const handleGenreChange = (selectedOptions) => {
        setGenres(selectedOptions || []);
    };

    const handleInstrumentChange = (selectedOptions) => {
        setInstruments(selectedOptions || []);
    };

    const handleLocationInputChange = (inputValue) => {
        setLocationsProposed(locationOptions.filter(option => option.value.city.toUpperCase().includes(inputValue.toUpperCase())).splice(0, 10));
    };

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption.value);
    };

    const handleUserChange = async (value) => {
        // if the user already exists, show a message and disable the submit button
        const exists = await checkUser(type.toLowerCase(), value);
        if (exists)
            toast.error('User already exists');
        setSubmitDisabled(exists);
        setUser(value);
    };
    
    const handleSignup = async (event) => {
        event.preventDefault();
        const labelsInstruments = instruments.map(instrument => instrument.label);
        const labelsGenres = genres.map(genre => genre.label);
        // Handle Signup logic here
        const payload = {
            _id: "",
            username,
            contactEmail,
            about,
            profilePictureUrl,
            genres: labelsGenres,
            instruments: labelsInstruments,
            location,
            firstName,
            lastName,
            gender, 
            age, 
            yearsTogether,
            gigsPlayed,
            credentials: {
                user,
                password
            },
            creationDateTime: new Date().toISOString().split('T')[0],
            lastUpdateDateTime: new Date().toISOString().split('T')[0],
            lastLoginDateTime: new Date().toISOString().split('T')[0],
            applications:[],
            opportunities: []
        }

        const result = await register(type, payload);
        if (result.error)
            toast.error('Error creating user');
        else {
            toast.success('User created successfully');
            navigate('/login');
        }
    }

    return (
        <div className='flex flex-col items-center overflow-y-scroll w-full'>
            <div className='rounded-[8px] bg-white border-t-[4px] border-[#4E73DF] w-1/2 flex items-center justify-between hover:shadow-lg transform transition duration-300 ease-out overflow-y-auto mt-16'>
                <form onSubmit={handleSignup} className='bg-[#F8F9FC] p-[20px] rounded-[5px] shadow-lg w-full mx-auto'>
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-[10px]'>Signup</h2>
                    
                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <FaItunesNote />
                            <label className="font-bold" htmlFor="type">Type</label>
                            
                        </div>
                        <div className='flex space-x-3'>
                            <div className="flex space-x-3">
                                <input 
                                    type="radio" 
                                    name="type" 
                                    value="Musician"
                                    checked={type === "Musician"}
                                    onChange={(e) => setType(e.target.value)}
                                />
                                <label htmlFor="Musician">Musician</label>
                            </div>
                            <div className="flex space-x-3">
                                <input 
                                    type="radio" 
                                    name="type" 
                                    value="Band"
                                    checked={type === "Band"}
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </div>
                            <label htmlFor="Band">Band</label>
                        </div>
                    </div>

                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <MdOutlineAlternateEmail />
                            <label className="font-bold" htmlFor="username">Username</label>
                        </div>
                        <input 
                            type="text" 
                            name="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <GiMailbox />
                            <label className="font-bold" htmlFor="contactEmail">Contact Email</label>
                        </div>
                        <input 
                            type="email" 
                            name="contactEmail" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <MdInfo />
                            <label className="font-bold" htmlFor="about">About</label>
                        </div>
                        <textarea 
                            name="about" 
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            maxLength={1500}
                        />
                    </div>

                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <FiLink />
                            <label className="font-bold" htmlFor="profilePictureUrl">Profile Picture URL</label>
                        </div>
                        <input 
                            type="url" 
                            name="profilePictureUrl" 
                            value={profilePictureUrl}
                            onChange={(e) => setProfilePictureUrl(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <FaItunesNote />
                            <label className="font-bold">Genres</label>
                        </div>
                        <Select 
                            isMulti
                            options={genreOptions}
                            value={genres}
                            onChange={handleGenreChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    {type === "Musician" && <div className='flex flex-col space-x-4 mb-[10px]'>
                                                <div className='flex space-x-3 items-center mb-3'>
                                                    <MdPiano />
                                                    <label className="font-bold">Instruments</label>
                                                </div>
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

                    <div className='flex flex-col space-x-4 mb-[10px]'>
                        <div className='flex space-x-3 items-center mb-3'>
                            <MdLocationCity />
                            <label className="font-bold" htmlFor="location">City</label>
                        </div>
                        <Select
                            value={locationsProposed.find(option => option.value === location)}
                            onChange={handleLocationChange}
                            onInputChange={handleLocationInputChange}
                            options={locationsProposed}
                        />
                    </div>

                    {type === "Musician" && <>
                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <MdOutlinePermIdentity />
                                <label className="font-bold" htmlFor="firstName">First Name</label>
                            </div>
                            <input 
                                type="text" 
                                name="firstName" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <MdOutlinePermIdentity />
                                <label className="font-bold" htmlFor="lastName">Last Name</label>
                            </div>
                            <input 
                                type="text" 
                                name="lastName" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>  
                                <MdTransgender />
                                <label className="font-bold" htmlFor='gender'>Gender</label>
                            </div>
                            <select onChange={(e) => setGender(e.target.value)} value={gender}>
                                <option value="-">-</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>

                        </div>

                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <MdCalendarMonth />
                                <label className="font-bold" htmlFor="age">Age</label>
                            </div>
                            <input 
                                type="number" 
                                name="age" 
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                required
                            />
                        </div>
                    </>
                    }
                    {type === "Band" &&
                        <>
                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <FaBirthdayCake />
                                <label className="font-bold" htmlFor="yearsTogether">Years Together</label>
                            </div>
                            <input 
                                type="number" 
                                name="yearsTogether" 
                                value={yearsTogether}
                                onChange={(e) => setYearsTogether(parseInt(e.target.value))}
                            />
                        </div>

                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <FaGuitar />
                                <label className="font-bold" htmlFor="gigsPlayed">Gigs Played</label>
                            </div>
                            <input 
                                type="number" 
                                name="gigsPlayed" 
                                value={gigsPlayed}
                                onChange={(e) => setGigsPlayed(parseInt(e.target.value))}
                            />
                        </div>
                        </>
                    }

                    <div>
                        <h3 className='text-[18px] leading-[20px] font-bold text-[#5a5c69] mb-[10px]'>Credentials</h3>
                    
                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <MdOutlineAlternateEmail />
                                <label className="font-bold" htmlFor="user">User</label>
                            </div>
                            <input 
                                type="text" 
                                name="user" 
                                value={user}
                                onChange={(e) => handleUserChange(e.target.value)}
                                required
                                />
                        </div>

                        <div className='flex flex-col space-x-4 mb-[10px]'>
                            <div className='flex space-x-3 items-center mb-3'>
                                <MdPassword />
                                <label className="font-bold" htmlFor="password">Password</label>
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                        </div>
                    </div>

                    <button type="submit" disabled={submitDisabled} className='bg-[#4E73DF] h-[40px] w-full rounded-[5px] text-white font-bold'>Signup</button>
                </form>
            </div>
            <button 
                onClick={() => navigate('/')} 
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                Home
            </button>
        </div>
    )
}

export default Signup;
