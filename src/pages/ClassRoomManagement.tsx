import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {BACKEND_URL} from "@/config/env.ts";


const ClassRoomManagement = () => {
    const [formData, setFormData] = useState({
        className: "",
        classImg: ""
    });
    const {getToken} = useAuth();
    const [classRoomData, setClassRoomData] = useState(null);

    // FETCH for get all classes
    const getClassRoomData = async () => {
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

    useEffect(() => {
        getClassRoomData();
    }, []);


    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h4 className="flex text-center">Class Management</h4>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Class Name</th>
                        <th className="px-4 py-2 text-left">Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classRoomData && classRoomData.map((classRoom, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 ">{classRoom.title}</td>
                            <td className="px-4 py-2 "><img className="w-6" src={classRoom.class_image}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-6 p-6 bg-white rounded rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-4 text-center">Add New Student</h4>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Class Name"
                            name="className"
                            value={formData.className}
                            onChange={() => {
                            }}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            type="file"
                            placeholder="Enter Image"
                            name="classImg"
                            value={formData.classImg}
                            onChange={() => {
                            }}
                        />
                        <div>
                            <Button className="rounded" type="submit" onClick={() => {
                            }}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ClassRoomManagement
