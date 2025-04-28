import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { ChevronLeft, BarChart2, Vote } from "lucide-react";

const PollsList = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch(`${(process.env.API_HOST || 'http://localhost:3000')}/polls`);
                const data = await response.json();
                setPolls(data.polls);
            } catch (error) {
                console.error('Error fetching polls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!polls.length) {
        return <div>No polls available</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Available Polls</h1>
                </div>
                <span className="text-sm text-gray-500">{polls.length} polls found</span>
            </div>

            <div className="space-y-4">
                {polls.map((poll) => (
                    <div
                        key={poll.id}
                        className="rounded-lg border border-gray-200 p-5 hover:shadow-md transition duration-300 bg-gradient-to-r from-white to-gray-50"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-medium text-gray-800 text-lg">{poll.title}</h2>
                            <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                                {poll.options.reduce((sum, option) => sum + option.votes, 0)} votes
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>Created {new Date(poll.createdAt).toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Link
                                to={`/poll/${poll.id}`}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                            >
                                <Vote size={16} />
                                Vote Now
                                <ChevronRight size={16} />
                            </Link>

                            <Link
                                to={`/poll/${poll.id}/results`}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                            >
                                <BarChart2 size={16} />
                                See Results
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {polls.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No polls available at the moment</p>
                </div>
            )}
        </div>
    );
};

export default PollsList;
