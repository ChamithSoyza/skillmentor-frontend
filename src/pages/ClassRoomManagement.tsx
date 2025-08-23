import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {BACKEND_URL} from "@/config/env.ts";

type Mentor = {
    mentor_id: number,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    title: string,
    session_fee: number,
    profession: string,
    subject: string,
    phone_number: string,
    qualification: string,
    mentor_image: string,
    class_room_id: number
};

const ClassRoomManagement = () => {
    const [formData, setFormData] = useState({
        className: "",
        classImg: "",
        studentCount:"",
        mentorId:0,
    });
    const {getToken} = useAuth();
    const [classRoomData, setClassRoomData] = useState(null);
    const [mentorData, setMentorData] = useState<Mentor[]>([]);

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

    // FETCH call for get all mentors
    const getMentors = async () => {
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
            const response = await fetch(`${BACKEND_URL}/academic/mentor`, requested);
            const data = await response.json();
            setMentorData(data);
        } catch (error) {
            console.error("Error fetching mentor data!", error);
        }
    }

    useEffect(() => {
        getClassRoomData();
        getMentors();
    }, []);

    // handle input change
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken({template: "skillmentor-auth-frontend"});
        if (!token) return;

        const menterDTO = mentorData?.find(mentor => mentor.mentor_id === formData.mentorId);

        const requestedData = {
            title: formData.className,
            enrolled_student_count: formData.studentCount,
            class_image: formData.classImg,
            mentor: menterDTO
        }
        try {
            const createdClass = await fetch(`${BACKEND_URL}/academic/classroom`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestedData),
            });

            const craetedClass = await createdClass.json();
            console.log(craetedClass);
        } catch (error) {
            console.error("Error creating classroom", error);
        }
    }


    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h4 className="text-center text-2xl font-bold">Class Management</h4>
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
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Image URL "
                            name="classImg"
                            value={formData.classImg}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Student Count"
                            name="studentCount"
                            value={formData.studentCount}
                            onChange={handleInputChange}
                        />
                        <select
                            className="p-3 border border-gray-300 rounded w-full"
                            name="mentorId"
                            value={formData.mentorId}
                            onChange={handleInputChange}
                        >
                            <option>Select a mentor</option>
                            {mentorData && mentorData.map((mentor, index) => (
                                <option key={index} value={mentor.mentor_id}>
                                    {mentor.first_name} {mentor.last_name}
                                </option>
                            ))}
                        </select>
                        <div>
                            <Button className="rounded" type="submit" onClick={handleSubmit}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ClassRoomManagement
