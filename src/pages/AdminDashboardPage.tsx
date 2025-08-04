import {Form} from "react-router";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "@/config/env.ts";
import {useAuth} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button.tsx";


const AdminDashboardPage = () => {
    const {getToken} = useAuth();
    const [classRoomData, setClassRoomData] = useState([]);
    const [studentData, setStudentData] = useState([]);


    // FETCH call for get all classes
    const getAllClassRoomData = async () => {
        const token = await getToken({template: "skillmentor-auth-frontend"});
        if (!token) return;

        const requested = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            redirect: "follow"
        };

        try {
            const response = await fetch(`${BACKEND_URL}/academic/classroom`, requested);
            const data = await response.json();
            setClassRoomData(data);
        } catch (error) {
            console.error("Error fetching classroom data!", error);
        }
    }

    // FETCH call for get all classes
    const getStudents = async () => {
        const token = await getToken({template: "skillmentor-auth-frontend"});
        if (!token) return;

        const requested = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            redirect: "follow"
        };

        try {
            const response = await fetch(`${BACKEND_URL}/academic/student`,requested);
            const data = await response.json();
            setStudentData(data);
        } catch (error) {
            console.error("Error fetching classroom data!", error);
        }
    }

    useEffect(() => {
        getAllClassRoomData();
        getStudents();
    }, []);


    return (
        <>
            <div className="p-2 border border-gray-200 ">
                <h4>Student Data</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentData && studentData.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>

                <div className="data-form">
                    <form>
                        <input
                            placeholder="Enter Class Name"
                            name="name"
                            value=""/>
                        <input
                            placeholder="Enter Class Image"
                            name="name"
                            value=""/>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AdminDashboardPage
