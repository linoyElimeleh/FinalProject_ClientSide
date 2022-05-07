import {configData} from '../settings'

const getUserGroups = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me/groups`);
        const groups = await response.json();
        return groups;

    } catch (error) {
        console.error(error);
    }
};


export const GetMeDetails = async () => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users/me`,
            {
                method: 'GET',
            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return (error)
    }
};

export const editProfile = async (id, displayName,image) => {
    try {
        const response = await fetch(`${configData.SERVER_URL}/users`,
            {
                method: 'PUT',
                body: JSON.stringify({id,"display_name":displayName,image})
            });
        return response;
    } catch (error) {
        console.error(error);
        return (error)
    }
};


export default {
    getUserGroups
};