import {Form} from "react-router";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "@/config/env.ts";
import {useAuth} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button.tsx";
import {Row, Col, Tabs, Tab} from "react-bootstrap";
import StudentManagement from "@/pages/StudentManagement.tsx";


const AdminDashboardPage = () => {
    // const {getToken} = useAuth();
    // const [classRoomData, setClassRoomData] = useState([]);


    // FETCH call for get all classes
    // const getAllClassRoomData = async () => {
    //     const token = await getToken({template: "skillmentor-auth-frontend"});
    //     if (!token) return;
    //
    //     const requested = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         redirect: "follow"
    //     };
    //
    //     try {
    //         const response = await fetch(`${BACKEND_URL}/academic/classroom`, requested);
    //         const data = await response.json();
    //         setClassRoomData(data);
    //     } catch (error) {
    //         console.error("Error fetching classroom data!", error);
    //     }
    // }


    // useEffect(() => {
    //     getAllClassRoomData();
    //     getStudents();
    // }, []);


    return (
        <>
            {/* --Tab Section-- */}
            <Row>
                <Col md={9} style={{paddingLeft: "15px !important"}}>
                    <div className="tab-section">
                        <Tabs
                            defaultActiveKey="student"
                            id="tab_view"
                            className="mb-3"
                            justify
                            onSelect={() => {
                            }}
                            variant="tabs"
                        >
                            <Tab eventKey="student"
                                 title={<span style={{color: '#158fff'}}>Student management</span>}>
                                <Col lg={12} sm={12} className="d-flex  gap-1">
                                    <StudentManagement/>
                                </Col>
                            </Tab>
                            <Tab eventKey="class"
                                 title={<span style={{color: '#fcad00'}}>ClassRoom Management</span>}>
                                <Col lg={12} sm={12} className="d-flex  gap-1">

                                </Col>
                            </Tab>
                            <Tab eventKey="mentor"
                                 title={<span style={{color: '#26d700'}}>Mentor management</span>}>
                                <Col lg={12} sm={12} className="d-flex  gap-1">

                                </Col>
                            </Tab>
                            <Tab eventKey="session"
                                 title={<span style={{color: '#26d700'}}>Sessions management</span>}>
                                <Col lg={12} sm={12} className="d-flex  gap-1">

                                </Col>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>

        </>
    )
}
export default AdminDashboardPage
