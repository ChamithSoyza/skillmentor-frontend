import {BACKEND_URL} from "@/config/env.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button.tsx";


export default function MentorManagement() {
    const {getToken} = useAuth();
    const [mentorData, setMentorData] = useState([]);
    const [createMentor, setCreateMentor] = useState(null);
    const [classroomData, setClassRoomData] = useState(null);
    const [formData, setFormData] = useState({
        mentorId: "",
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        title: "",
        sessionFee: "",
        profession: "",
        subject: "",
        phone: "",
        qualification: "",
        imageUrl: "",
        classRoomId: "",
    });

    // FETCH call for get all mentors
    const getClassRoom = async () => {
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
        getMentors();
        getClassRoom();
    }, [createMentor]);

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
        const requestedData = {
            clerk_mentor_id: formData.mentorId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            address: formData.address,
            email: formData.email,
            title: formData.title,
            session_fee: formData.sessionFee,
            profession: formData.profession,
            subject: formData.subject,
            phone_number: formData.phone,
            qualification: formData.qualification,
            mentor_image: formData.imageUrl,
            class_room_id: formData.classRoomId
        }
        try {
            const createdUser = await fetch(`${BACKEND_URL}/academic/mentor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestedData),
            });

            const userData = await createdUser.json();
            setCreateMentor(userData);
            resetFormData();
            console.log("CreatedNewUSer:", userData);
        } catch (error) {
            console.error("Error creating/fetching user:", error);
        }
    }

    // reset Form Data
    const resetFormData = () => {
        setFormData({
            mentorId: "",
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            title: "",
            sessionFee: "",
            profession: "",
            subject: "",
            phone: "",
            qualification: "",
            imageUrl: "",
            classRoomId: ""
        })
    }

    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h4 className="text-center text-2xl font-bold">Mentor Management</h4>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Mentor ID</th>
                        <th className="px-4 py-2 text-left">First Name</th>
                        <th className="px-4 py-2 text-left">Last Name</th>
                        <th className="px-4 py-2 text-left">Address</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Session Fee</th>
                        <th className="px-4 py-2 text-left">Profession</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Phone Number</th>
                        <th className="px-4 py-2 text-left">Qualification</th>

                    </tr>
                    </thead>
                    <tbody>
                    {mentorData && mentorData.map((student, index) =>
                        (
                            <tr key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-color duration-150`}
                            >
                                <td className="px-4 py-2">{student.clerk_mentor_id}</td>
                                <td className="px-4 py-2">{student.first_name}</td>
                                <td className="px-4 py-2">{student.last_name}</td>
                                <td className="px-4 py-2">{student.address}</td>
                                <td className="px-4 py-2">{student.email}</td>
                                <td className="px-4 py-2">{student.title}</td>
                                <td className="px-4 py-2">{student.session_fee}</td>
                                <td className="px-4 py-2">{student.profession}</td>
                                <td className="px-4 py-2">{student.subject}</td>
                                <td className="px-4 py-2">{student.phone_number}</td>
                                <td className="px-4 py-2">{student.qualification}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-4 text-center">Add New Mentor</h4>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter  ID"
                            name="mentorId"
                            value={formData.mentorId}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Session Fee"
                            name="sessionFee"
                            value={formData.sessionFee}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Profession"
                            name="profession"
                            value={formData.profession}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter  Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Image Url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                        />
                        <select
                            className="p-3 border border-gray-300 rounded w-full"
                            name="classRoomId"
                            value={formData.classRoomId}
                            onChange={handleInputChange}
                        >
                            <option>Select a class</option>
                            {classroomData && classroomData.map((classroom, index) => (
                                <option key={index} value={classroom.class_room_id}>
                                    {classroom.title}
                                </option>
                            ))}
                        </select>
                        <div className="col-span-full flex justify-end">
                            <Button className="rounded" type="submit" onClick={handleSubmit}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}