import {BACKEND_URL} from "@/config/env.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button.tsx";

const StudentManagement = () => {
    const {getToken} = useAuth();
    const [studentData, setStudentData] = useState([]);
    const [createdStudent, setCreatedStudent] = useState(null);
    const [formData, setFormData] = useState({
        studentId:"",
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
            studentId:"",
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
            {/*<div className="p-3">*/}
            {/*    <h4>Student Data</h4>*/}
            {/*    <table className="table table-striped">*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <th>Student ID</th>*/}
            {/*            <th>First Name</th>*/}
            {/*            <th>Last Name</th>*/}
            {/*            <th>Email</th>*/}
            {/*            <th>Phone Number</th>*/}
            {/*            <th>Address</th>*/}
            {/*            <th>Age</th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {studentData && studentData.map((student, index) => {*/}
            {/*            return (*/}
            {/*                <tr key={index}>*/}
            {/*                    <td>{student.student_id}</td>*/}
            {/*                    <td>{student.first_name}</td>*/}
            {/*                    <td>{student.last_name}</td>*/}
            {/*                    <td>{student.email}</td>*/}
            {/*                    <td>{student.phone_number}</td>*/}
            {/*                    <td>{student.address}</td>*/}
            {/*                    <td>{student.age}</td>*/}
            {/*                </tr>*/}
            {/*            )*/}
            {/*        })}*/}

            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*    <div>*/}
            {/*        <form>*/}
            {/*            <div className="data-form flex">*/}
            {/*                <div md={6} className="block">*/}
            {/*                    <input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student Student ID"*/}
            {/*                        name="studentId"*/}
            {/*                        value={formData.studentId}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    /><input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student First Name"*/}
            {/*                        name="firstName"*/}
            {/*                        value={formData.firstName}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                    <input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student last Name"*/}
            {/*                        name="lastName"*/}
            {/*                        value={formData.lastName}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                    <input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student Email"*/}
            {/*                        name="email"*/}
            {/*                        value={formData.email}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}

            {/*                </div>*/}
            {/*                <div md={6}>*/}
            {/*                    <input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student Mobile Number"*/}
            {/*                        name="phone"*/}
            {/*                        value={formData.phone}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                    <input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student Address"*/}
            {/*                        name="address"*/}
            {/*                        value={formData.address}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                    <input*/}
            {/*                        className="p-2 border rounded w-75 mb-3"*/}
            {/*                        placeholder="Enter Student Age"*/}
            {/*                        name="age"*/}
            {/*                        value={formData.age}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <Button type="submit" onClick={handleSubmit}>Save</Button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}


        </>
    )
}
export default StudentManagement
