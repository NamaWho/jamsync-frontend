import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { createOpportunity } from '../../services/opportunityService';
import toast from 'react-hot-toast';

const CreateOpportunityForm = ({user, baseGenres, baseInstruments, baseLocations}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState({
        city: "",
        country: "",
        state: "",
        geojson: {
            coordinates: []
        }
    });
    const [role, setRole] = useState('');
    const [instruments, setInstruments] = useState([]);
    const [genres, setGenres] = useState([]);
    const [minimumAge, setMinimumAge] = useState(0);
    const [maximumAge, setMaximumAge] = useState(0);
    const [gender, setGender] = useState('-');
    const [expiresAt, setExpiresAt] = useState(null);

    const locationOptions = baseLocations.map((location, index) => ({
        value: location,
        label: location.city.toUpperCase(),
    }));
    const [locationsProposed, setLocationsProposed] = useState(locationOptions.splice(0, 10));

    const availableGenres = baseGenres
    const genreOptions = availableGenres.map(genre => ({ value: genre, label: genre }));

    const availableInstruments = baseInstruments;
    const instrumentsOptions = availableInstruments.map(instrument => ({ value: instrument, label: instrument }));

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            _id: uuidv4(),
            title,
            description,
            location,
            role,
            instruments: instruments.map(instrument => instrument.value),
            genres: genres.map(genre => genre.value),
            minimumAge,
            maximumAge,
            gender, 
            visits: 0,
            publisher: {
                _id: user.id,
                type: user.type === "band" ? "Band" : "Musician",
                username: user.username,
                profilePictureUrl: user.profilePictureUrl
            },
            applications: [],
            createdAt: new Date().toISOString().split('T')[0],
            expiresAt,
            // modifiedAt: new Date().toISOString().split('T')[0]
        }

        const result = await createOpportunity(data);
        if (result !== null) {
            toast.success('Opportunity created successfully');
            setTitle('');
            setDescription('');
            setLocation({
                city: "",
                country: "",
                state: "",
                geojson: {
                    coordinates: []
                }
            });
            setRole('');
            setInstruments([]);
            setGenres([]);
            setMinimumAge(0);
            setMaximumAge(0);
            setGender('-');
            setExpiresAt(null);
        } else {
            toast.error('Error creating opportunity');
        }
    };

    return (
        <div className='rounded-[8px] flex flex-col justify-between border-t-[4px] border-orange-500 mx-16 my-8 px-12 py-8 cursor-pointer hover:shadow-lg transform transition duration-300 ease-out bg-white'>
        <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>PUBLISH A NEW OPPORTUNITY</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-4'>
            <div className='flex flex-col w-3/4 mb-4 col-span-2'>
                <label htmlFor="title" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Title</label>
                <input type="text" 
                        className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' 
                        placeholder='Title' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}     
                        required   
                />
            </div>
            <div className='flex flex-col mb-4 col-span-2'>
                <label htmlFor="description" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Description</label>
                <textarea   type="text" 
                            className='bg-white h-10 outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' 
                            placeholder='Description' 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}            
                />
            </div>
            <div className='flex flex-col space-x-4 w-3/4 mb-4 col-span-2'>
                <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal" htmlFor="location">City</label>
                    <Select
                        value={locationsProposed.find(option => option.value === location)}
                        onChange={handleLocationChange}
                        onInputChange={handleLocationInputChange}
                        options={locationsProposed}
                        required
                    />
            </div>

            <div className='flex flex-col space-x-4 w-3/4 mb-4 col-span-2'>
                <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal">Genres</label>
                <Select 
                    isMulti
                    options={genreOptions}
                    value={genres}
                    onChange={handleGenreChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>

            {(user.type === "band") && 
                <>
                    <div className='flex flex-col space-x-4 w-3/4 mb-4 col-span-2'>
                        <label className="text-[#5a5c69] text-[14px] leading-[20px] font-normal">Instruments</label>
                        <Select 
                            isMulti
                            options={instrumentsOptions}
                            value={instruments}
                            onChange={handleInstrumentChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className='flex flex-col w-3/4 mb-4 col-span-2'>
                        <label htmlFor="role" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Role</label>
                        <input  type="text" 
                                onChange={(e) => setRole(e.target.value)} 
                                className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' 
                                placeholder='Role' 
                        />
                    </div>
                
                    <div className='flex flex-col w-3/4 mb-4 col-span-2'>
                        <label htmlFor="minimumAge" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Minimum Age</label>
                        <input  type="number" 
                                onChange={(e) => setMinimumAge(e.target.value)} 
                                value={minimumAge}
                                className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' 
                                placeholder='Minimum Age' 
                        />
                    </div>

                    <div className='flex flex-col w-3/4 mb-4 col-span-2'>
                        <label htmlFor="maximumAge" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Maximum Age</label>
                        <input  type="number" 
                                onChange={(e) => setMaximumAge(e.target.value)} 
                                value={maximumAge}
                                className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' 
                                placeholder='Maximum Age' 
                        />
                    </div>

                    <div className='flex flex-col w-3/4 mb-4 col-span-2'>
                        <label htmlFor='gender' className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Gender</label>
                        <select onChange={(e) => setGender(e.target.value)} value={gender} name="gender" id="gender" className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal mb-[10px]'>
                            <option value="-">-</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                </>
            }

            <div className='flex flex-col w-3/4 mb-4 col-span-2'>
                <label htmlFor="expiresAt" className='text-[#5a5c69] text-[14px] leading-[20px] font-normal'>Expires At</label>
                <input  type="date" 
                        onChange={(e) => setExpiresAt(e.target.value)} 
                        className='bg-white h-[40px] outline-none pl-[13px] w-full rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' 
                        placeholder='Expires At' 
                        min={new Date().toISOString().split('T')[0]}
                />
            </div>
            <div className='col-span-4 flex justify-center items-center'>
                <button type="submit" className='bg-[#ff5a00] text-white h-[40px] rounded-[5px] hover:bg-orange-600 transition duration-300 ease-in-out w-1/2'>Publish</button>
            </div>
        </form>
    </div>
    );
};

export default CreateOpportunityForm;