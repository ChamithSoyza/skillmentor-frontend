import {BACKEND_URL} from "@/config/env.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import {Col, Row} from "react-bootstrap";
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
        imageUrl: ""
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
            class_room_id: 1
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
            imageUrl: ""
        })
    }

    return (
        <>
            <Row className="p-3">
                <h4>Student Data</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Mentor ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Session Fee</th>
                        <th>Profession</th>
                        <th>Subject</th>
                        <th>Phone Number</th>
                        <th>Qualification</th>

                    </tr>
                    </thead>
                    <tbody>
                    {mentorData && mentorData.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>{student.clerk_mentor_id}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td>{student.title}</td>
                                <td>{student.session_fee}</td>
                                <td>{student.profession}</td>
                                <td>{student.subject}</td>
                                <td>{student.phone_number}</td>
                                <td>{student.qualification}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>
                <Col>
                    <form>
                        <div className="data-form flex">
                            <Col md={6} className="block">
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter  ID"
                                    name="mentorId"
                                    value={formData.mentorId}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />


                            </Col>
                            <Col md={6}>
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Session Fee"
                                    name="sessionFee"
                                    value={formData.sessionFee}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Profession"
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter  Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="p-2 border rounded w-75 mb-3"
                                    placeholder="Enter Image Url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                />
                                <select className="form-select">
                                    <option value="">Select a class</option>
                                    {classroomData && classroomData.map((classroom, index) => (
                                        <option key={index} value={classroom.id}>
                                            {classroom.title}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </div>
                        <Button type="submit" onClick={handleSubmit}>Save</Button>
                    </form>
                </Col>
            </Row>


        </>
    )
}