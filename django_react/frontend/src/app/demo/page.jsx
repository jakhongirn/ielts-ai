'use client';
import { useEffect, useState } from "react";

export default function Demo () {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8000/api/demo/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
        }, })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Unauthorized: Authentication credentials were not provided.')
                    throw new Error('Unauthorized');
            }
            throw new Error('An error occured while fetching data from the API.')
            }
            return response.json();
        })
        .then(data => {
            setData(data)
            setError(null);
        })
        .catch(error => console.error('Error fetching data:', error))   
    }, [])
    if (error) {
        return <p>{error}</p>;
    }
    if (!data) return <p></p>;
    return (
        <div>
            <h1>
                Data from API
            </h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
