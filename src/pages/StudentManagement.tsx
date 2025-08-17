import {BACKEND_URL} from "@/config/env.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button.tsx";

const StudentManagement = () => {
    const {getToken} = useAuth();
    const [studentData, setStudentData] = useState([]);
    const [createdStudent, setCreatedStudent] = useState(null);
    const [formData, setFormData] = useState({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        age: ""
    })

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
            const response = await fetch(`${BACKEND_URL}/academic/student`, requested);
            const data = await response.json();
            setStudentData(data);
        } catch (error) {
            console.error("Error fetching classroom data!", error);
        }
    }

    useEffect(() => {
        getStudents();
    }, [createdStudent]);

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
            clerk_student_id: formData.studentId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phone,
            address: formData.address,
            age: formData.age,
        }
        try {
            const createdUser = await fetch(`${BACKEND_URL}/academic/student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestedData),
            });

            const userData = await createdUser.json();
            setCreatedStudent(userData);
            resetFormData();
            console.log("CreatedNewUSer:", userData);
        } catch (error) {
            console.error("Error creating/fetching user:", error);
        }
    }

    // reset Form Data
    const resetFormData = () => {
        setFormData({
            studentId: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            age: ""
        })
    }

    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h4 className="flex text-center">Student Management</h4>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Student ID</th>
                        <th className="px-4 py-2 text-left">First Name</th>
                        <th className="px-4 py-2 text-left">Last Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone Number</th>
                        <th className="px-4 py-2 text-left">Address</th>
                        <th className="px-4 py-2 text-left">Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentData && studentData.map((student, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors duration-150`}
                        >
                            <td className="px-4 py-2">{student.student_id}</td>
                            <td className="px-4 py-2">{student.first_name}</td>
                            <td className="px-4 py-2">{student.last_name}</td>
                            <td className="px-4 py-2">{student.email}</td>
                            <td className="px-4 py-2">{student.phone_number}</td>
                            <td className="px-4 py-2">{student.address}</td>
                            <td className="px-4 py-2">{student.age}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-4 text-center">Add New Student</h4>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Enter Student ID"
                            name="studentId"
                            value={formData.studentId}
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
                            placeholder="Enter Mobile Number"
                            name="phone"
                            value={formData.phone}
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
                            placeholder="Enter Age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                        <div className="col-span-full flex justify-center">
                            <Button className="rounded" type="submit" onClick={handleSubmit}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default StudentManagement
