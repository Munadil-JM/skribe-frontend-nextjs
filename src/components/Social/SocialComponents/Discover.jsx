"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown, FiInfo } from 'react-icons/fi';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { RxCross2, RxTriangleDown, RxCheckbox, RxBox } from 'react-icons/rx';
import { useRouter } from 'next/navigation';

const Discover = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [genders, setGenders] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [verified, setVerified] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activePlatform, setActivePlatform] = useState("instagram");

    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

    const modalRef = useRef(null);
    const categoryRef = useRef(null);
    const subCategoryRef = useRef(null);
    const locationRef = useRef(null);
    const genderRef = useRef(null);
    const languageRef = useRef(null);

    const router = useRouter();

    const handleShortlistClick = () => {
        router.push('/shortlist');
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
            if (subCategoryRef.current && !subCategoryRef.current.contains(event.target)) {
                setIsSubCategoryDropdownOpen(false);
            }
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setIsLocationDropdownOpen(false);
            }
            if (genderRef.current && !genderRef.current.contains(event.target)) {
                setIsGenderDropdownOpen(false);
            }
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setIsLanguageDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleIcon = () => {
        setIsExpanded((prev) => !prev);
    };

    const toggleCategory = (value) => {
        if (categories.includes(value)) {
            setCategories(categories.filter((cat) => cat !== value));
        } else {
            setCategories([...categories, value]);
        }
    };

    const toggleSubCategory = (value) => {
        if (subCategories.includes(value)) {
            setSubCategories(subCategories.filter((sub) => sub !== value));
        } else {
            setSubCategories([...subCategories, value]);
        }
    };

    const toggleLocation = (value) => {
        if (locations.includes(value)) {
            setLocations(locations.filter((loc) => loc !== value));
        } else {
            setLocations([...locations, value]);
        }
    };

    const toggleGender = (value) => {
        if (genders.includes(value)) {
            setGenders(genders.filter((gen) => gen !== value));
        } else {
            setGenders([...genders, value]);
        }
    };

    const toggleLanguage = (value) => {
        if (languages.includes(value)) {
            setLanguages(languages.filter((lang) => lang !== value));
        } else {
            setLanguages([...languages, value]);
        }
    };

    const getSelectedFilters = () => {
        const filters = [];
        categories.forEach((cat) => filters.push({ type: "category", value: cat }));
        subCategories.forEach((sub) => filters.push({ type: "subCategory", value: sub }));
        locations.forEach((loc) => filters.push({ type: "location", value: loc }));
        genders.forEach((gen) => filters.push({ type: "gender", value: gen }));
        languages.forEach((lang) => filters.push({ type: "language", value: lang }));
        return filters;
    };

    const removeFilter = (filterType, value) => {
        switch (filterType) {
            case "category":
                setCategories(categories.filter((cat) => cat !== value));
                break;
            case "subCategory":
                setSubCategories(subCategories.filter((sub) => sub !== value));
                break;
            case "location":
                setLocations(locations.filter((loc) => loc !== value));
                break;
            case "gender":
                setGenders(genders.filter((gen) => gen !== value));
                break;
            case "language":
                setLanguages(languages.filter((lang) => lang !== value));
                break;
            default:
                break;
        }
    };

    const creators = [
        {
            id: 1,
            name: 'Bhuvam Bam',
            handle: '@bbkivines',
            location: 'Mumbai, Maharashtra, India',
            gender: 'Male',
            language: 'Hindi, English, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
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
            gender: 'Male',
            language: 'Hindi, English, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
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
            gender: 'Male',
            language: 'Hindi, English, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
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
            gender: 'Male',
            language: 'Hindi, English, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
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
            gender: 'Male',
            language: 'Hindi, English, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
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
            gender: 'Male',
            language: 'Hindi, English, 1+ more',
            followers: '516.95K',
            category: 'Lifestyle',
            subCategory: 'Comedy',
            categorySize: '100 M',
            weeklyPost: '1200',
            overallEng: '5.82%',
            effectiveFollower: '5.82%',
            reelsViews: '937.4K'
        }
    ];

    const availableCategories = [
        "Lifestyle",
        "Technology",
        "Fashion",
        "Food",
        "Travel",
    ];
    const availableSubCategories = [
        "Comedy",
        "Vlog",
        "Tutorial",
        "Review",
        "Entertainment",
    ];
    const availableLocations = [
        "Mumbai, India",
        "Delhi, India",
        "Bangalore, India",
        "Chennai, India",
    ];
    const availableGenders = ["Male", "Female", "Other"];
    const availableLanguages = ["Hindi", "English", "Tamil", "Telugu", "Bengali"];

    const MultiSelectDropdown = ({ values, onChange, options, placeholder, isOpen, setIsOpen, dropdownRef }) => {
        return (
            <div className="relative inline-flex flex-col" ref={dropdownRef}>
                <div
                    className="relative cursor-pointer flex items-center bg-white py-2 px-3 w-full rounded-[12px] border border-gray-300"
                    role="button"
                    onClick={() => setIsOpen((p) => !p)}
                >

                    <span className="ml-2">{placeholder}</span>
                    <RxTriangleDown className="ml-2" />
                </div>
                {isOpen && (
                    <div className="absolute top-full -mt-[5px] w-full flex flex-col gap-y-1 bg-white border border-black/20 z-50 max-h-48 overflow-scroll overflow-x-hidden rounded-b-lg">
                        {options.map((item, i) => {
                            const isSelected = values.includes(item);
                            return (
                                <p
                                    key={i}
                                    className={`w-full py-1 px-2 flex items-center justify-between cursor-pointer hover:bg-[#EDEDED] hover:text-black ${isSelected ? "bg-[#E9F5F0] text-black" : "bg-white text-black/40"}`}
                                    onClick={() => onChange(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                                    {/* {isSelected ? (
                                        <RxCheckbox size={17} />
                                    ) : (
                                        <RxBox size={15} className="mr-[1px]" />
                                    )} */}
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const selectedFilters = getSelectedFilters();

    const filteredCreators = creators.filter((creator) => {
        const matchesSearch =
            !searchTerm ||
            creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            creator.handle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategories =
            categories.length === 0 ||
            categories.some((cat) => creator.category.includes(cat));

        const matchesSubCategories =
            subCategories.length === 0 ||
            subCategories.some((sub) => creator.subCategory.includes(sub));

        const matchesLocations =
            locations.length === 0 || locations.includes(creator.location);

        const matchesGenders =
            genders.length === 0 || genders.includes(creator.gender);

        const matchesLanguages =
            languages.length === 0 ||
            languages.some((lang) => creator.language.includes(lang));

        return (
            matchesSearch &&
            matchesCategories &&
            matchesSubCategories &&
            matchesLocations &&
            matchesGenders &&
            matchesLanguages &&
            (!verified || creator.verified)
        );
    });

    return (
        <div className="bg-white font-inter">
            <div className="min-h-screen p-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-lg mb-10">
                    <span className='text-[#686BC7]'>Create &gt;</span>
                    <span className="font-[600] text-[#686BC7] ml-2 underline">Discover &gt;</span>
                    <span className="text-[#0000004D] ml-2">Shortlist &gt;</span>
                    <span className="text-[#0000004D] ml-2">Engage</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-[#000000]">Sparkles Chocolate Launch for Delhi Audience</h1>
                    <div className="flex space-x-2 bg-[#318FFF66] p-1 rounded-[12px]">
                        <button
                            onClick={() => setActivePlatform("instagram")}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-[8px] text-sm font-[600] cursor-pointer ${activePlatform === "instagram" ? "bg-white text-black" : " text-black"}`}
                        >
                            <FaInstagram className="w-4 h-4" />
                            <span>Instagram</span>
                        </button>
                        <button
                            onClick={() => setActivePlatform("youtube")}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-[8px] text-sm font-[600] cursor-pointer ${activePlatform === "youtube" ? "bg-white text-black" : " text-black"}`}
                        >
                            <FaYoutube className="w-4 h-4" />
                            <span>Youtube</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-5 mb-6">
                    {/* Top Bar: Search + Toggle */}
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        {/* Search */}
                        <div className="relative flex-grow min-w-[250px] max-w-[412px]">
                            <input
                                type="text"
                                placeholder="Search by Creator/Handle"
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
                                    alt="calendar"
                                    className="w-[18px] h-[18px] ml-1"
                                />
                            </div>
                            <div
                                onClick={() => setVerified(!verified)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${verified ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${verified ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        <MultiSelectDropdown
                            values={categories}
                            onChange={toggleCategory}
                            options={availableCategories}
                            placeholder="Category"
                            isOpen={isCategoryDropdownOpen}
                            setIsOpen={setIsCategoryDropdownOpen}
                            dropdownRef={categoryRef}
                        />
                        <MultiSelectDropdown
                            values={subCategories}
                            onChange={toggleSubCategory}
                            options={availableSubCategories}
                            placeholder="Sub Category"
                            isOpen={isSubCategoryDropdownOpen}
                            setIsOpen={setIsSubCategoryDropdownOpen}
                            dropdownRef={subCategoryRef}
                        />
                        <MultiSelectDropdown
                            values={locations}
                            onChange={toggleLocation}
                            options={availableLocations}
                            placeholder="Location"
                            isOpen={isLocationDropdownOpen}
                            setIsOpen={setIsLocationDropdownOpen}
                            dropdownRef={locationRef}
                        />
                        <MultiSelectDropdown
                            values={genders}
                            onChange={toggleGender}
                            options={availableGenders}
                            placeholder="Gender"
                            isOpen={isGenderDropdownOpen}
                            setIsOpen={setIsGenderDropdownOpen}
                            dropdownRef={genderRef}
                        />
                        <MultiSelectDropdown
                            values={languages}
                            onChange={toggleLanguage}
                            options={availableLanguages}
                            placeholder="Language"
                            isOpen={isLanguageDropdownOpen}
                            setIsOpen={setIsLanguageDropdownOpen}
                            dropdownRef={languageRef}
                        />
                        <button
                            className="flex items-center gap-2  text-[#000000] px-4 py-2 rounded-[12px] text-sm  border border-gray-300 cursor-pointer"
                            onClick={() => setShowModal(true)}
                        >
                            <span>Advance Filters</span>
                            <img
                                src="/assets/filter.svg"
                                alt="filter"
                                className="w-[20px] h-[20px]"
                            />
                        </button>

                        {showModal && (
                            <div className="flex justify-center items-center z-50 absolute right-[6%] max-w-[416px]">
                                <div
                                    className="bg-white rounded-xl p-6 w-[360px] sm:w-[420px] shadow-lg relative"
                                    ref={modalRef}
                                >
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="absolute top-3 right-3 text-black text-xl font-bold"
                                    >
                                        ×
                                    </button>
                                    <div className="space-y-6">
                                        {[
                                            "Engagement Rate",
                                            "Effective Followers",
                                            "Avg reel views",
                                            "Avg branded views",
                                        ].map((label, index) => (
                                            <div key={index}>
                                                <div className=' bg-[#F5F5F5] p-2 rounded-[12px]'>
                                                    <label className="text-sm text-black block mb-1">
                                                        {label}
                                                    </label>
                                                    <div className="flex justify-between text-xs text-black mb-1">
                                                        <span>0{label === "Engagement Rate" ? "%" : ""}</span>
                                                        <span>
                                                            {label === "Engagement Rate" ? ">20%" : "200K"}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        className="w-[240px] accent-[#F4BB3F]"
                                                        min={0}
                                                        max={100}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>

                    {/* Footer */}
                    <div className="flex flex-row gap-2 items-center">
                        <div className="text-sm text-[#000000]">
                            Showing results for {filteredCreators.length} Creators
                        </div>
                        <div className="flex flex-wrap gap-2 items-center mb-3 mt-4">
                            {selectedFilters.length > 0 &&
                                selectedFilters.map((item, i) => (
                                    <p
                                        className="bg-[#F4BB3F] rounded-lg text-white px-2 text-sm py-1 flex items-center gap-1"
                                        key={i}
                                    >
                                        <span>
                                            {item.value.charAt(0).toUpperCase() +
                                                item.value.slice(1).toLowerCase()}
                                        </span>
                                        <RxCross2
                                            className="rounded-full relative -top-[1px] border-2 p-[1px] box-content cursor-pointer"
                                            size={10}
                                            onClick={() => removeFilter(item.type, item.value)}
                                        />
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-[12px] border border-[#CDE4DA] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider min-w-[280px] border-r border-[#CDE4DA]">Creator Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Gender</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider min-w-[150px] border-r border-[#CDE4DA]">Language</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Followers</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">Sub Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">Category Size</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">Weekly Post</th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Overall Eng. % </span>
                                            <FiInfo className="w-4 h-4 text-[#000000]" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                                        <div className="flex items-center space-x-1">
                                            <span>Effective Follower</span>
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
                                {creators.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="px-4 py-8 text-center">
                                            <div className="text-[#00000066]">
                                                <div className="text-lg ">No Results Found.</div>
                                                <div className="text-lg">Edit Filters to see updated results</div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    creators.map((creator, index) => (
                                        <tr key={creator.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 border-r border-[#CDE4DA]">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={isExpanded ? "/assets/minus.svg" : "/assets/add.svg"}
                                                        alt="toggle"
                                                        className="w-[24px] h-[24px] cursor-pointer"
                                                        onClick={toggleIcon}
                                                    />
                                                    <div>
                                                        <div className="flex items-center space-x-1">
                                                            <img
                                                                src="/assets/bb.svg"
                                                                alt="location"
                                                                className="w-[20px] h-[20px] rounded-full cursor-pointer"
                                                            />
                                                            <span className="text-xs font-medium text-[#000000]">{creator.name},</span>
                                                            <div className="text-xs text-[#00000066]">{creator.handle}</div>
                                                            <img
                                                                src="/assets/blueverify.svg"
                                                                alt="calendar"
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
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.gender}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.language}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.followers}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.category}</td>
                                            <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">{creator.subCategory}</td>
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
                <button
                     onClick={handleShortlistClick}
                    className="px-8 py-3 text-white rounded-[12px] text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 outline-none bg-[#E96D70] cursor-pointer"
                >
                    Shortlist
                </button>
            </div>
        </div>
    );
};

export default Discover;