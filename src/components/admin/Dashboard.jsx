import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarMinus } from "react-icons/fa"
import { fetchTop5Publishers, fetchTop5AppliedOpportunities, fetchOpportunitiesByAgeRange, fetchTopGenres, fetchTopLocations } from '../../services/analyticsService';
import Search from './Search';

const Dashboard = () => {

    const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [top5Publishers, setTop5Publishers] = useState([]);
    const [top5AppliedOpportunities, setTop5AppliedOpportunities] = useState([]);
    const [opportunitiesByAgeRange, setOpportunitiesByAgeRange] = useState([]);
    const [topLocations, setTopLocations] = useState([]);
    const [top5Genres, setTop5Genres] = useState([]);

    const navigate = useNavigate();

    const fetchAnalytics = async () => {
        const top5Publishers = await fetchTop5Publishers();
        console.log(top5Publishers);
        setTop5Publishers(top5Publishers);

        const top5AppliedOpportunities = await fetchTop5AppliedOpportunities();
        console.log(top5AppliedOpportunities);
        setTop5AppliedOpportunities(top5AppliedOpportunities);

        const opportunitiesByAgeRange = await fetchOpportunitiesByAgeRange();
        console.log(opportunitiesByAgeRange);
        setOpportunitiesByAgeRange(opportunitiesByAgeRange);

        const topLocations = await fetchTopLocations();
        console.log(topLocations);
        setTopLocations(topLocations);

        const top5Genres = await fetchTopGenres();
        console.log(top5Genres);
        setTop5Genres(top5Genres);
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);


    const toggleAnalytics = () => {
        setIsAnalyticsOpen(!isAnalyticsOpen);
        setIsSearchOpen(false);
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsAnalyticsOpen(false);
    }

    return (
        <div className='px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-2 gap-[30px] mt-[25px] pb-[15px]'>
                <div className={`h-24 rounded-[8px] border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out ${isAnalyticsOpen ? "bg-blue-200 scale-[103%]": "bg-white"}`} onClick={toggleAnalytics}>
                    <div>
                        <h2 className='text-[#B589DF] text-[11px] leading-[17px] font-bold'>FOR YOU...</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>ANALYTICS</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className={`h-24 rounded-[8px] border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out ${isSearchOpen ? "bg-green-200 scale-[103%]": "bg-white"}`} onClick={toggleSearch}>
                    <div>
                        <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>
                            SEARCH...</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>USERS AND OPPORTUNITIES</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} />
                </div>
            </div>
            {isAnalyticsOpen && 
                <div className='bg-white rounded-[8px] border-l-[4px] border-[#4E73DF] flex flex-col justify-between p-8 hover:shadow-lg transform transition duration-300 ease-out'>
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69]'>TOP 5 PUBLISHERS THIS WEEK</h2>
                    <table className='table-auto w-full mt-4'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'></th>
                                <th className='px-4 py-2'></th>
                                <th className='px-4 py-2'>Publisher</th>
                                <th className='px-4 py-2'>Opportunities published</th>
                                <th className='px-4 py-2'>Applications Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top5Publishers?.map((publisher, index) => (
                                <tr key={index} className=''>
                                    <td className='border px-4 py-2'>{index + 1}</td>
                                    <td className='border px-4 py-2'>
                                        {publisher?.profilePictureUrl !== "" && <img src={publisher.profilePictureUrl} alt={publisher.username} className='w-10 h-10 rounded-full' />}
                                        {publisher?.profilePictureUrl === "" && <div className='w-10 h-10 rounded-full bg-[#F8F9FC]'></div>}
                                    </td>
                                    <td onClick={() => navigate("/"+publisher.type.toLowerCase()+"s/"+publisher._id)} className='border px-4 py-2 hover:text-blue-500 hover:underline cursor-pointer'>{publisher.username}</td>
                                    <td className='border px-4 py-2'>{publisher.totalOpportunities}</td>
                                    <td className='border px-4 py-2'>{publisher.totalApplications}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-8'>TOP 5 APPLIED OPPORTUNITIES</h2>
                    <table className='table-auto w-full mt-4'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'></th>
                                <th className='px-4 py-2'>Title</th>
                                <th className='px-4 py-2'>For</th>
                                <th className='px-4 py-2'>Total Applications</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top5AppliedOpportunities?.map((opportunity, index) => (
                                <tr key={index} className=''>
                                    <td className='border px-4 py-2'>{index + 1}</td>
                                    <td className='border px-4 py-2 underline hover:text-blue-500 hover:cursor-pointer' onClick={() => navigate("/opportunities/"+ opportunity._id)}>
                                        {opportunity.title}
                                    </td>
                                    <td className='border px-4 py-2'>{opportunity.publisher.type === "Band" ? "Musicians" : "Bands"}</td>
                                    <td className='border px-4 py-2'>{opportunity.numApplications}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-8'>OPPORTUNITIES FOR MUSICIANS BY AGE RANGE</h2>
                    <table className='table-auto w-full mt-4'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'></th>
                                <th className='px-4 py-2'>Age Range</th>
                                <th className='px-4 py-2'>Total Opportunities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {opportunitiesByAgeRange?.map((range, index) => (
                                <tr key={index} className=''>
                                    <td className='border px-4 py-2'>{index + 1}</td>
                                    <td className='border px-4 py-2'>{range.ageRange}</td>
                                    <td className='border px-4 py-2'>{range.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-8'>TOP LOCATIONS</h2>
                    <table className='table-auto w-full mt-4'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'></th>
                                <th className='px-4 py-2'>City</th>
                                <th className='px-4 py-2'>Country</th>
                                <th className='px-4 py-2'>Total Opportunities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topLocations?.map((location, index) => (
                                <tr key={index} className=''>
                                    <td className='border px-4 py-2'>{index + 1}</td>
                                    <td className='border px-4 py-2'>{location._id.city}</td>
                                    <td className='border px-4 py-2'>{location._id.country || location._id.state}</td>
                                    <td className='border px-4 py-2'>{location.totalOpportunities}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-8'>TOP 5 GENRES USED IN OPPORTUNITIES</h2>
                    <table className='table-auto w-full mt-4'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'></th>
                                <th className='px-4 py-2'>Genre</th>
                                <th className='px-4 py-2'>Total Occurences</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top5Genres?.map((genre, index) => (
                                <tr key={index} className=''>
                                    <td className='border px-4 py-2'>{index + 1}</td>
                                    <td className='border px-4 py-2'>{genre._id}</td>
                                    <td className='border px-4 py-2'>{genre.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            {isSearchOpen && <div className='flex mt-[22px] w-full'>
                <Search />
            </div>
            }

        </div >
    )
}

export default Dashboard;   