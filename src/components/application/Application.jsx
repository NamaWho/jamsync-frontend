import React, { useEffect, useState } from 'react';
import { getApplicationById } from '../../services/applicationService';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { decodeJWT } from '../../services/utils/jwt';

const Application = () => {

    const {id} = useParams();
    const [loggedUser, setLoggedUser] = useState({});
    const [opportunity, setOpportunity] = useState(null);
    const [application, setApplication] = useState(null);
    const navigate = useNavigate();

    const fetchApplicationAndOpportunity = async () => {
        const response = await getApplicationById(id);
        if (response) {
            const user = getAuthenticatedUser();
            if (user && ((response.publisher._id !== user.id) && (response.applications[0].applicant._id !== user.id))) {
                toast.error("You are not authorized to view this application");
                navigate("/opportunities/"+response._id);
            } else {
                setOpportunity(response);
                setApplication(response.applications[0]);
            }
        } else {
            navigate("/opportunities"+response._id);
        }
    }

    const getAuthenticatedUser = () => {
        // check if there is a token in the local storage
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeJWT(token);
            setLoggedUser(decoded);
            return decoded;
        } else {
            return null;
        }
    }

    useEffect(() => {
        fetchApplicationAndOpportunity();
    }, []);

    const navigateToUser = (type, id) => {
        navigate(`/${type}s/${id}`);
    }

    return (
        <>
            {opportunity && ((opportunity.publisher._id === loggedUser.id) || (opportunity.applications[0].applicant._id === loggedUser.id)) &&
                <div>
                    <div className='px-64 pt-20 pb-[40px]'>
                        <div className={`rounded-[18px] flex flex-col items-center justify-between shadow-md bg-white p-8 border-t-[4px] ${application.status ? "border-green-500": "border-orange-500"}`}>
                            <h4 className='text-[20px] leading-[24px] font-bold text-[#5a5c69]'>Opportunity for {opportunity.publisher.type.toLowerCase() === "musician" ? "Band":"Musician"}</h4>
                            <h1 className='text-2xl font-bold mt-2 mb-4'>{opportunity.title}</h1>
                            <h3 className={`text-[20px] leading-[24px] font-bold mb-8 ${application.status ? "text-green-500":"text-orange-500"}`}>APPLICATION {application.status ? "ACCEPTED": "PENDING"}</h3>
                            <div className={`grid grid-cols-4 gap-x-4 shadow-md rounded-[8px] px-4 py-8 border-2`}>
                                <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>APPLICATION</h2>
                                <div className='col-span-4 mb-8'>
                                    <h2 className='text-gray-500 mr-4 text-[20px] leading-[24px] font-bold mb-2 inline align-top'>Applicant</h2>
                                    <div onClick={() => navigateToUser(opportunity.publisher.type.toLowerCase() === "musician" ? "band":"musician", application.applicant._id)} className='relative rounded-[8px] cursor-pointer inline-flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-2 px-14'>
                                        <p className='text-[#5a5c69] text-[18px] leading-[20px] font-normal mt-5'>{application.applicant.username}</p>
                                        {opportunity.publisher.profilePictureUrl === "" && <div className='absolute -top-5 w-10 h-10 rounded-full bg-white shadow-lg'></div>}
                                        {opportunity.publisher.profilePictureUrl !== "" && <img src={application.applicant.profilePictureUrl} alt='profile' className='absolute -top-5 h-10 w-10 rounded-full border border-red-300 border-[1px] shadow-lg bg-white'/>}
                                    </div>
                                </div>
                                <div className='col-span-4 mb-8'>
                                    <h2 className='text-gray-500 text-[20px] leading-[24px] font-bold mb-2 '>Application Description</h2>
                                    <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{application.text || "-"}</p>
                                </div>
                                <div className="col-span-2 flex-col">
                                    <h2 className='text-gray-500 text-[20px] leading-[24px] font-bold mb-2'>Role Applied For</h2>
                                    <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.role || "-"}</p>
                                </div>
                                <div className="col-span-2 flex-col text-right">
                                    <h2 className='text-gray-500 text-[20px] leading-[24px] font-bold mb-2 text-right'>Application Date</h2>
                                    <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{application.createdAt || "-"}</p>
                                </div>
                            </div>
                            
                            <div className={`grid grid-cols-4 gap-x-4 shadow-md rounded-[8px] px-4 py-8 border-2 mt-4`}>
                                <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mb-8'>OPPORTUNITY</h2>
                                <div className='col-span-4 mb-8'>
                                    <h2 className='text-gray-500 mr-4 text-[20px] leading-[24px] font-bold mb-2 inline align-top'>Publisher</h2>
                                    <div onClick={() => navigateToUser(opportunity.publisher.type.toLowerCase(), opportunity.publisher._id)} className='relative rounded-[8px] cursor-pointer  inline-flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out py-2 px-14'>
                                        <p className='text-[#5a5c69] text-[18px] leading-[20px] font-normal mt-5'>{opportunity.publisher.username}</p>
                                        {opportunity.publisher.profilePictureUrl === "" && <div className='absolute -top-5 w-10 h-10 rounded-full bg-white shadow-lg'></div>}
                                        {opportunity.publisher.profilePictureUrl !== "" && <img src={opportunity.publisher.profilePictureUrl} alt='profile' className='absolute -top-5 h-10 w-10 rounded-full border border-red-300 border-[1px] shadow-lg bg-white'/>}
                                    </div>
                                </div>
                                <div className='col-span-4 mb-8'>
                                    <h2 className='text-gray-500 text-[20px] leading-[24px] font-bold mb-2 '>Opportunity Description</h2>
                                    <p className='italic text-[#5a5c69] text-[18px] leading-[20px] font-normal'>{opportunity.description || "-"}</p>
                                </div>
                                <div className='col-span-1'></div>
                                <div className='col-span-2'>
                                    <button onClick={() => navigate("/opportunities/"+opportunity._id)}
                                            className='bg-blue-400 h-14 w-full rounded-[16px] text-white font-bold hover:scale-[103%] hover:bg-blue-500'>View full opportunity</button>
                                </div>
                                <div className='col-span-1'></div>

                            </div>
                        </div>
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
}

export default Application;