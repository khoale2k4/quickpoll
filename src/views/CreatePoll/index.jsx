import { useState } from 'react';
import { ChevronRight } from 'react-feather';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusCircle, Send, Trash2 } from 'lucide-react';

export default function PollCreator() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [link, setLink] = useState(null);
    const [linkResult, setLinkResult] = useState(null);
    const navigate = useNavigate();

    const handleCreate = async () => {
        console.log({ question, options: options.filter(opt => opt !== '') });
        const response = await axios.post((process.env.API_HOST || 'http://localhost:3000') + '/polls', {
            title: question,
            options
        });
        const data = response.data;
        console.log(data.poll.id);
        setLink((process.env.REACT_APP_HOST || 'http://localhost:3001') + '/poll/' + data.poll.id)
        setLinkResult((process.env.REACT_APP_HOST || 'http://localhost:3001') + '/poll/' + data.poll.id + '/results')
        alert('Poll created successfully!', data);
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };

    const handleCopyLink = (str) => {
        if (str === 'link' && link) {
            navigator.clipboard.writeText(link).then(() => {
                alert('Link copied to clipboard!');
            });
        } else if (str === 'result' && linkResult) {
            navigator.clipboard.writeText(linkResult).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    const handleViewAllPolls = () => {
        navigate(`/poll`);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Create a Poll</h2>
                <p className="text-gray-500 text-sm">Add a question and at least two options</p>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="What would you like to ask?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-3">
                    {options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder={`Option ${idx + 1}`}
                                value={opt}
                                onChange={(e) => {
                                    const newOpts = [...options];
                                    newOpts[idx] = e.target.value;
                                    setOptions(newOpts);
                                }}
                            />
                            {options.length > 2 && (
                                <button
                                    className="text-gray-400 hover:text-red-500 transition p-2"
                                    onClick={() => removeOption(idx)}
                                    aria-label="Remove option"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:border-blue-300 transition bg-blue-50 hover:bg-blue-100"
                    onClick={() => setOptions([...options, ""])}
                >
                    <PlusCircle size={18} />
                    Add Another Option
                </button>

                <button
                    className="flex items-center justify-center gap-2 text-white font-medium py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                    onClick={handleCreate}
                    disabled={!question.trim() || options.filter(opt => opt.trim()).length < 2}
                >
                    <Send size={18} />
                    Create Poll
                </button>

                {link && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Poll Link:</p>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600">{link}</span>
                            <button
                                onClick={() => handleCopyLink('link')}
                                className="text-blue-600 hover:text-blue-800 transition p-2 rounded"
                                title="Copy Link"
                            >
                                Copy Link
                            </button>
                        </div>
                    </div>
                )}
                {linkResult && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Poll Result Link:</p>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600">{linkResult}</span>
                            <button
                                onClick={() => handleCopyLink('result')}
                                className="text-blue-600 hover:text-blue-800 transition p-2 rounded"
                                title="Copy Link"
                            >
                                Copy Result Link
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex gap-4">
                    <button
                        onClick={handleViewAllPolls}
                        className="flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                    >
                        <ChevronRight size={18} />
                        View All Polls
                    </button>
                </div>
            </div>
        </div>
    );
}