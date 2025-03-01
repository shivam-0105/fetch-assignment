import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    breed: string;
    zip_code: string;
}

const Dashboard = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages , setTotalPages] = useState<number>(1);

    const fetchDogs = async (pageNumber: number) => {
        try {
            setLoading(true);

            const idsResponse = await axios.get(`${API_BASE_URL}/dogs/search`, {
                params: {page: pageNumber, size: 10},
                withCredentials: true,
            });
            
            console.log(idsResponse);
        } catch (error) {
            console.error("Error fetching dogs: ", error);

            // If unauthorized, redirect to login
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                // navigate("/login");
                console.log("Unauthorized");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                withCredentials: true,
            });
            console.log("Logged out");
        } catch (error) {
            console.error("Logout error:", error);
            console.log("Navigate to login");
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export { Dashboard };