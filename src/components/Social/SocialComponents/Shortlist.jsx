"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiInfo } from 'react-icons/fi';


const ShortList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [verified, setVerified] = useState(true);
    const [selectedCreators, setSelectedCreators] = useState([]);

    const creators = [
        {
            id: 1,
            name: 'Bhuvam Bam',
            handle: '@bbkivines',
            location: 'Mumbai, Maharashtra, India',
            contact: '+91 XXXXXXXXX',
            email: 'bbxxxx@xxx.com',
            gender: 'Male',
            language: 'English, Hindi, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            avgOrganicViews: '937.4K',
            avgViews: '937.4K',
            avgCommentsPerPost: '100K',
            avgLikes: '500K',
            avgBrandedViews: '1.2K',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        },
        {
            id: 2,
            name: 'Bhuvam Bam',
            handle: '@bbkivines', 
            location: 'Mumbai, Maharashtra, India',
            contact: '+91 XXXXXXXXX',
            email: 'bbxxxx@xxx.com',
            gender: 'Male',
            language: 'English, Hindi, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            avgOrganicViews: '937.4K',
            avgViews: '937.4K',
            avgCommentsPerPost: '100K',
            avgLikes: '500K',
            avgBrandedViews: '1.2K',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        },
        {
            id: 3,
            name: 'Bhuvam Bam',
            handle: '@bbkivines',
            location: 'Mumbai, Maharashtra, India', 
            contact: '+91 XXXXXXXXX',
            email: 'bbxxxx@xxx.com',
            gender: 'Male',
            language: 'English, Hindi, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            avgOrganicViews: '937.4K',
            avgViews: '937.4K',
            avgCommentsPerPost: '100K',
            avgLikes: '500K',
            avgBrandedViews: '1.2K',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        },
        {
            id: 4,
            name: 'Bhuvam Bam',
            handle: '@bbkivines',
            location: 'Mumbai, Maharashtra, India',
            contact: '+91 XXXXXXXXX',
            email: 'bbxxxx@xxx.com', 
            gender: 'Male',
            language: 'English, Hindi, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            avgOrganicViews: '937.4K',
            avgViews: '937.4K',
            avgCommentsPerPost: '100K',
            avgLikes: '500K',
            avgBrandedViews: '1.2K',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        },
        {
            id: 5,
            name: 'Bhuvam Bam',
            handle: '@bbkivines',
            location: 'Mumbai, Maharashtra, India',
            contact: '+91 XXXXXXXXX',
            email: 'bbxxxx@xxx.com',
            gender: 'Male', 
            language: 'English, Hindi, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            avgOrganicViews: '937.4K',
            avgViews: '937.4K',
            avgCommentsPerPost: '100K',
            avgLikes: '500K',
            avgBrandedViews: '1.2K',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        },
        {
            id: 6,
            name: 'Bhuvam Bam',
            handle: '@bbkivines',
            location: 'Mumbai, Maharashtra, India',
            contact: '+91 XXXXXXXXX',
            email: 'bbxxxx@xxx.com',
            gender: 'Male',
            language: 'English, Hindi, 1+ more', 
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            avgOrganicViews: '937.4K',
            avgViews: '937.4K',
            avgCommentsPerPost: '100K',
            avgLikes: '500K',
            avgBrandedViews: '1.2K',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        }
    ];

    const handleCreatorSelect = (creatorId) => {
        setSelectedCreators(prev => {
            if (prev.includes(creatorId)) {
                return prev.filter(id => id !== creatorId);
            } else {
                return [...prev, creatorId];
            }
        });
    };

    const filteredCreators = creators.filter((creator) => {
        const matchesSearch =
            !searchTerm ||
            creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            creator.handle.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSearch && (!verified || creator.verified);
    });

    return (
        <div className="bg-white font-inter">
            <div className="min-h-screen p-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-lg mb-10">
                    <span className='text-[#686BC7]'>Create &gt;</span>
                    <span className="text-[#686BC7] ml-2">Discover &gt;</span>
                    <span className="font-[600] text-[#686BC7] ml-2 underline">Shortlist &gt;</span>
                    <span className="text-[#0000004D] ml-2">Engage</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#000000]">Sparkles Chocolate Launch for Delhi Audience</h1>
                </div>

                <div className="bg-white rounded-lg p-5 mb-6">
                    {/* Top Bar: Search + Toggle */}
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        {/* Search */}
                        <div className="relative flex-grow min-w-[250px] max-w-[412px]">
                            <input
                                type="text"
                                placeholder="Search Creator"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-4 py-[10px] border border-[#00000033] rounded-[8px] text-sm text-[#000000] placeholder:text-[#000000] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>

                        {/* Verified Toggle */}
                        <div className="flex items-center space-x-2">
                            <div className='flex flex-row'>
                                <span className="text-sm text-gray-700 font-medium">Verified</span>
                                <img
                                    src="/assets/greenverify.svg"
                                    alt="verified"
                                    className="w-[18px] h-[18px] ml-1"
                                />
                            </div>
                            <div
                                onClick={() => setVerified(!verified)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                                    verified ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                        verified ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Contact Info Toggle */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700 font-medium">Contact Info</span>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors bg-green-500">
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform translate-x-6" />
                            </div>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-[#000000] mb-4">
                        Showing results for {filteredCreators.length} Creators
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-[12px] border border-[#CDE4DA] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider ">
                                        <input
                                            type="checkbox"
                                            className="rounded border-2 border-gray-300"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedCreators(creators.map(c => c.id));
                                                } else {
                                                    setSelectedCreators([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider min-w-[280px] border-r border-[#CDE4DA]">Creator Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Gender</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider min-w-[150px] border-r border-[#CDE4DA]">Language</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Followers</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">Sub Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Avg Organic Views</span>
                                            <FiInfo className="w-4 h-4 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Avg Views</span>
                                            <FiInfo className="w-4 h-4 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Avg Comments</span>
                                            <FiInfo className="w-4 h-4 shrink-0 ml-2 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Avg Likes</span>
                                            <FiInfo className="w-4 h-4 shrink-0 ml-2 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Avg Branded Views</span>
                                            <FiInfo className="w-4 h-4 shrink-0 ml-2 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Category Size</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Weekly Post</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Overall Eng. %</span>
                                            <FiInfo className="w-4 h-4 shrink-0 ml-2 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Effective Follower %</span>
                                            <FiInfo className="w-4 h-4 shrink-0 ml-2 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider">
                                        <div className="flex items-center space-x-1">
                                            <span>Reels Views</span>
                                            <FiInfo className="w-4 h-4 shrink-0 ml-2 text-[#000000]" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCreators.length === 0 ? (
                                    <tr>
                                        <td colSpan="18" className="px-4 py-8 text-center">
                                            <div className="text-[#00000066]">
                                                <div className="text-lg">No Results Found.</div>
                                                <div className="text-lg">Edit Filters to see updated results</div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCreators.map((creator, index) => (
                                        <tr key={creator.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 ">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-2 border-gray-300"
                                                    checked={selectedCreators.includes(creator.id)}
                                                    onChange={() => handleCreatorSelect(creator.id)}
                                                />
                                            </td>
                                            <td className="px-4 py-4 border-r border-[#CDE4DA]">
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <div className="flex items-center space-x-1">
                                                            <img
                                                                src="/assets/bb.svg"
                                                                alt="profile"
                                                                className="w-[20px] h-[20px] rounded-full cursor-pointer"
                                                            />
                                                            <span className="text-xs font-medium text-[#000000]">{creator.name},</span>
                                                            <div className="text-xs text-[#00000066]">{creator.handle}</div>
                                                            <img
                                                                src="/assets/blueverify.svg"
                                                                alt="verified"
                                                                className="w-[18px] h-[18px]"
                                                            />
                                                        </div>
                                                        <div className="flex items-center text-xs text-gray-500 space-x-1">
                                                            <img
                                                                src="/assets/location.svg"
                                                                alt="location"
                                                                className="w-[14px] h-[14px] cursor-pointer"
                                                            />
                                                            <span>{creator.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] bg-[#F4BB3F66]  border-r border-[#CDE4DA]">
                                                <div className=" px-2 py-1 rounded text-center">
                                                    <div>{creator.contact}</div>
                                                    <div className="text-xs">{creator.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.gender}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.language}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.followers}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.category}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.subCategory}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r bg-[#F4BB3F66] border-[#CDE4DA]">
                                                
                                                    {creator.avgOrganicViews}
                                              
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA] bg-[#F4BB3F66]">
                                                
                                                    {creator.avgViews}
                                               
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA] bg-[#F4BB3F66]">{creator.avgCommentsPerPost}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA] bg-[#F4BB3F66]">{creator.avgLikes}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA] bg-[#F4BB3F66]">{creator.avgBrandedViews}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.categorySize}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.weeklyPost}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.overallEng}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.effectiveFollower}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080]">{creator.reelsViews}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end mt-6 bg-[#F0EDE6] p-3">
                <button className="px-8 py-3 text-white rounded-[12px] text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 outline-none bg-[#E96D70]">
                    Engage
                </button>
            </div>
        </div>
    );
};

export default ShortList;