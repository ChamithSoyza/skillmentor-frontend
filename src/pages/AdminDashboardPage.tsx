
import StudentManagement from "@/pages/StudentManagement.tsx";
import MentorManagement from "@/pages/MentorManagement.tsx";
import AdminLayout from "@/components/AdminLayout.tsx";


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
            <AdminLayout/>

            {/* --Tab Section-- */}
            {/*<Row>*/}
            {/*    <Col md={12} className="p-5">*/}
            {/*        <div className="tab-section">*/}
            {/*            <Tabs*/}
            {/*                defaultActiveKey="mentor"*/}
            {/*                id="tab_view"*/}
            {/*                className="mb-3"*/}
            {/*                justify*/}
            {/*                onSelect={() => {*/}
            {/*                }}*/}
            {/*                variant="tabs"*/}
            {/*            >*/}
            {/*                <Tab eventKey="mentor"*/}
            {/*                     title={<span style={{color: '#26d700'}}>Mentor management</span>}>*/}
            {/*                    <Col lg={12} sm={12} className="d-flex  gap-1">*/}
            {/*                        <MentorManagement/>*/}
            {/*                    </Col>*/}
            {/*                </Tab>*/}
            {/*                <Tab eventKey="student"*/}
            {/*                     title={<span style={{color: '#158fff'}}>Student management</span>}>*/}
            {/*                    <Col lg={12} sm={12} className="d-flex  gap-1">*/}
            {/*                        <StudentManagement/>*/}
            {/*                    </Col>*/}
            {/*                </Tab>*/}
            {/*                <Tab eventKey="class"*/}
            {/*                     title={<span style={{color: '#fcad00'}}>ClassRoom Management</span>}>*/}
            {/*                    <Col lg={12} sm={12} className="d-flex  gap-1">*/}

            {/*                    </Col>*/}
            {/*                </Tab>*/}
            {/*                <Tab eventKey="session"*/}
            {/*                     title={<span style={{color: '#26d700'}}>Sessions management</span>}>*/}
            {/*                    <Col lg={12} sm={12} className="d-flex  gap-1">*/}

            {/*                    </Col>*/}
            {/*                </Tab>*/}
            {/*            </Tabs>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

        </>
    )
}
export default AdminDashboardPage
