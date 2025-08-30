import React from 'react'
import {Button} from "@/components/ui/button.tsx";

const SessionManagement = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h4 className="text-center text-2xl font-bold">Session Management</h4>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Session ID</th>
                        <th className="px-4 py-2 text-left">Topic</th>
                        <th className="px-4 py-2 text-left">Mentor</th>
                        <th className="px-4 py-2 text-left">Student</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="px-4 py-2">SEO001</td>
                        <td className="px-4 py-2">Science</td>
                        <td className="px-4 py-2">Kamal</td>
                        <td className="px-4 py-2">Sunimal</td>
                        <td className="px-4 py-2">Pending</td>
                        <td className="px-4 py-2">2025/05/08</td>
                        <td className="flex px-4 py-2 gap-2">
                            <Button className="button  rounded bg-gray-600 text-white hover:bg-gray-500" >Cancel</Button>
                            <Button className="button rounded hover:bg-amber-500">Approve</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default SessionManagement

