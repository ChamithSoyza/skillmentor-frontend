import { LayoutDashboard, Loader2 } from "lucide-react";

const AdminDashboardPage = () => {
    return (
    <>
        <div className="flex items-center justify-center">
            <div className="bg-white p-10 rounded text-center">
                {/* Icon */}
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full shadow-md">
                        <LayoutDashboard size={40} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Home</h1>

                {/* Subtitle */}
                <p className="text-gray-500 mb-6">
                    Welcome to the admin dashboard.
                    Use the sidebar to manage classrooms, mentors, sessions, and students.
                </p>

                {/* Loading Indicator */}
                <div className="flex items-center justify-center space-x-2 text-indigo-600">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="font-medium">Fetching dashboard data...</span>
                </div>
            </div>
        </div>
    </>
    );
};

export default AdminDashboardPage;
