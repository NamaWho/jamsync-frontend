import React, { useEffect, useState } from 'react';
import { FaBirthdayCake, FaGuitar, FaItunesNote } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { GiMailbox } from 'react-icons/gi';
import { MdCalendarMonth, MdInfo, MdLocationCity, MdOutlineAlternateEmail, MdOutlinePermIdentity, MdPiano, MdTransgender } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import locations from '../../assets/locations.json';
import baseGenres from '../../assets/genres.js';
import baseInstruments from '../../assets/instruments.js';
import {updateUser} from '../../services/registeredUserService';
import toast from 'react-hot-toast';

const Edit = ({type}) => {

    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});

    const [genres, setGenres] = useState([]);
    const availableGenres = baseGenres;
    const genreOptions = availableGenres.map(genre => ({ value: genre, label: genre }));

    const [instruments, setInstruments] = useState([]);
    const availableInstruments = baseInstruments;
    const instrumentsOptions = availableInstruments.map(instrument => ({ value: instrument, label: instrument }));
    
    const locationOptions = locations.map((location, index) => ({
        value: location,
        label: location.city.toUpperCase(),
    }));
    const [locationsProposed, setLocationsProposed] = useState(locationOptions.splice(0, 9));

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const userPassed = location.state.detail;
            setUser(userPassed);
            setUpdatedUser(userPassed);
            setLocationsProposed([...locationsProposed, { value: userPassed.location, label: userPassed.location.city.toUpperCase()}])
        }
    }, [location]);

    const handleLocationInputChange = (inputValue) => {
        setLocationsProposed(locationOptions.filter(option => option.value.city.toUpperCase().includes(inputValue.toUpperCase())).splice(0, 10));
    };

    const handleLocationChange = (selectedOption) => {
        setUpdatedUser({...updatedUser, location: selectedOption.value});
    };

    const handleGenreChange = (selectedOptions) => {
        setGenres(selectedOptions || []);
    }

    const handleInstrumentsChange = (selectedOptions) => {
        setInstruments(selectedOptions || []);
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const user = updatedUser;
        user.genres = genres.map(genre => genre.value);
        user.instruments = instruments.map(instrument => instrument.value);

        const result = await updateUser(user, type);
        if (result) {
            toast.success('User updated successfully');
            navigate(`/${type}s/${user._id}`);
        } else {
            toast.error('Error updating user');
        }
    }

    return (
        <>
            {updatedUser && 
                <div className='flex flex-col items-center overflow-y-scroll w-full'>
                    <div className='rounded-[8px] bg-white border-t-[4px] border-[#4E73DF] w-1/2 flex items-center justify-between hover:shadow-lg transform transition duration-300 ease-out overflow-y-auto mt-16'>
                        <form onSubmit={handleEdit} className='bg-[#F8F9FC] p-[20px] rounded-[5px] shadow-lg w-full mx-auto'>
                            <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-[10px]'>Edit {type}</h2>
                            <div className='flex flex-col space-x-4 mb-[10px]'>
                                <div className='flex space-x-3 items-center mb-3'>
                                    <MdOutlineAlternateEmail />
                                    <label className="font-bold" htmlFor="username">Username</label>
                                </div>
                                <input  type="text" 
                                        className="form-control" 
                                        id="name" 
                                        name="name"
                                        value={updatedUser.username} 
                                        onChange={(e) => setUpdatedUser({...updatedUser, username: e.target.value})}
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
                                    value={updatedUser.contactEmail}
                                    onChange={(e) => setUpdatedUser({...updatedUser, contactEmail: e.target.value})}
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
                                    value={updatedUser.about}
                                    onChange={(e) => setUpdatedUser({...updatedUser, about: e.target.value})}
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
                                    value={updatedUser.profilePictureUrl}
                                    onChange={(e) => setUpdatedUser({...updatedUser, profilePictureUrl: e.target.value})}
                                />
                            </div>
                            
                            <div className='flex flex-col space-x-4 mb-[10px]'>
                                <div className='flex space-x-3 items-center mb-3'>
                                    <MdLocationCity />
                                    <label className="font-bold" htmlFor="location">City</label>
                                </div>
                                <Select 
                                    value={locationsProposed.find(option => option.value === updatedUser.location)} 
                                    onChange={handleLocationChange}
                                    onInputChange={handleLocationInputChange}
                                    options={locationsProposed} 
                                    />
                            </div>
                            <div className='flex flex-col space-x-4 mb-[10px]'>
                                <div className='flex space-x-3 items-center mb-3'>
                                    <FaItunesNote />
                                    <label className="font-bold">Genres</label>
                                </div>
                                <Select isMulti 
                                        name="genre" 
                                        options={genreOptions} 
                                        value={genres} 
                                        onChange={handleGenreChange} 
                                        className='basic-multi-select' 
                                        classNamePrefix="select"
                                />
                            </div>
                            {type === "musician" && 
                                <div className='flex flex-col space-x-4 mb-[10px]'>
                                    <div className='flex space-x-3 items-center mb-3'>
                                        <MdPiano />
                                        <label className="font-bold">Instruments</label>
                                    </div>
                                    <Select isMulti 
                                            name="instrument" 
                                            options={instrumentsOptions} 
                                            value={instruments} 
                                            onChange={handleInstrumentsChange} 
                                            className='basic-multi-select' 
                                            classNamePrefix="select"
                                            />
                                </div>
                            }

                            {type === "musician" && <>
                                <div className='flex flex-col space-x-4 mb-[10px]'>
                                    <div className='flex space-x-3 items-center mb-3'>
                                        <MdOutlinePermIdentity />
                                        <label className="font-bold" htmlFor="firstName">First Name</label>
                                    </div>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={updatedUser?.firstName}
                                        onChange={(e) => setUpdatedUser({...updatedUser, firstName: e.target.value})}
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
                                        value={updatedUser.lastName}
                                        onChange={(e) => setUpdatedUser({...updatedUser, lastName: e.target.value})}
                                    />
                                </div>

                                <div className='flex flex-col space-x-4 mb-[10px]'>
                                    <div className='flex space-x-3 items-center mb-3'>  
                                        <MdTransgender />
                                        <label className="font-bold" htmlFor='gender'>Gender</label>
                                    </div>
                                    <select onChange={(e) => setUpdatedUser({...updatedUser, gender: e.target.value})}
                                            value={updatedUser.gender}>
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
                                        value={updatedUser.age}
                                        onChange={(e) => setUpdatedUser({...updatedUser, age: e.target.value})}
                                        required
                                    />
                                </div>
                            </>
                            }

                            {type === "band" &&
                                <>
                                <div className='flex flex-col space-x-4 mb-[10px]'>
                                    <div className='flex space-x-3 items-center mb-3'>
                                        <FaBirthdayCake />
                                        <label className="font-bold" htmlFor="yearsTogether">Years Together</label>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="yearsTogether" 
                                        value={updatedUser?.yearsTogether}
                                        onChange={(e) => setUpdatedUser({...updatedUser, yearsTogether: e.target.value})}
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
                                        value={updatedUser?.gigsPlayed}
                                        onChange={(e) => setUpdatedUser({...updatedUser, gigsPlayed: e.target.value})}
                                    />
                                </div>
                                </>
                            }   

                            <button type="submit" className='bg-[#4E73DF] h-[40px] w-full rounded-[5px] text-white font-bold'>Edit</button>
                        </form>              
                    </div>
                    <button 
                        onClick={() => navigate('/')} 
                        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                        Home
                    </button>
                </div>
            }
        </>
    );
    };

export default Edit;