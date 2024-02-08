import React, { useEffect, useState } from 'react';
import { getApplicationById } from '../../services/applicationService';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { decodeJWT } from '../../services/utils/jwt';

const Application = () => {

    const {id} = useParams();
    const [loggedUser, setLoggedUser] = useState({});
    const [opportunity, setOpportunity] = useState(null);
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

    return (
        <>
            {opportunity && ((opportunity.publisher._id === loggedUser.id) || (opportunity.applications[0].applicant._id === loggedUser.id)) &&
                <div>
                    Application
                </div>
            }
        </>
    );
}

export default Application;