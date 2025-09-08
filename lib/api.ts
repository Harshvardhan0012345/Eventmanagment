// lib/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

export const getEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events", error);
        return [];
    }
};

interface EventData {
    // Define the properties of your event data here
    title: string;
    date: string;
    location?: string;
    [key: string]: any;
}

export const addEvent = async (eventData: EventData) => {
    try {
        const response = await axios.post(`${API_URL}/events/add`, eventData);
        return response.data;
    } catch (error) {
        console.error("Error adding event", error);
    }
};

// ... create functions for all your API calls