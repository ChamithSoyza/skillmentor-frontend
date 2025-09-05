import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@clerk/clerk-react";
import {BACKEND_URL} from "@/config/env.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

const SessionManagement = () => {
    const {getToken} = useAuth();
    const [sessionData, setSessionData] = useState([]);

    // Fetch for session details
    const getSessionDetails = async () => {
        const token = await getToken({template: "skillmentor-auth-frontend"});
        if (!token) return;

        const required = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            redirect: "follow"
        };

        try {
            const response = await fetch(`${BACKEND_URL}/academic/session`, required);
            const data = await response.json();
            setSessionData(data);
        } catch (error) {
            console.error("Error Fetching Session", error);
        }
    }

    // Fetch for update status
    const updateSessionDetails = async (sessionId, status) => {
        const token = await getToken({template: "skillmentor-auth-frontend"});
        if (!token) return;

        try {
            const response = await fetch(`${BACKEND_URL}/academic/session/${sessionId}?sessionStatus=${status}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update session");
            }

            const updatedSession = await response.json();
            alert(`Updated Session Status  ${status}`);
            console.log("Session updated", updatedSession);
            getSessionDetails();
        } catch (error) {
            console.error("Error Fetching Update Session", error);
        }
    }

    // Handle onload functionalities
    useEffect(() => {
        getSessionDetails();
    }, []);

    // Handle session action clicks
    const handleAction = (sessionId, status) => {
        updateSessionDetails(sessionId, status);
    }


    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h4 className="text-center text-2xl font-bold">Session Management</h4>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Session ID</th>
                        <th className="px-4 py-2 text-left">Topic</th>
                        <th className="px-4 py-2 text-left">Mentor</th>
                        <th className="px-4 py-2 text-left">Student</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sessionData && sessionData.map((session, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">{session.session_id}</td>
                            <td className="px-4 py-2">{session.topic}</td>
                            <td className="px-4 py-2">{session.mentor.first_name + " " + session.mentor.last_name}</td>
                            <td className="px-4 py-2">{session.student.first_name + " " + session.student.last_name}</td>
                            <td className="px-4 py-2" style={session?.session_status === "PENDING" ? {} : {}}>{session.session_status}</td>
                            <td className="px-4 py-2">{session.start_time}</td>
                            <td className="flex px-4 py-2 gap-2">
                                <Button
                                    className="button  rounded bg-gray-600 text-white hover:bg-gray-500"
                                    onClick={() => handleAction(session.session_id, "ACCEPTED")}
                                >
                                    Accept
                                </Button>
                                <Button
                                    className="button rounded hover:bg-amber-500"
                                    onClick={() => handleAction(session.session_id, "COMPLETED")}
                                >
                                    Complete
                                </Button>
                            </td>
                        </tr>
                    ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}
export default SessionManagement

