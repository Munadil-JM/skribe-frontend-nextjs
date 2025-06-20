"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiInfo } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { RxCross2, RxTriangleDown } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineYoutube } from "react-icons/ai";

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
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] =
    useState(false);
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
    router.push("/shortlist");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        subCategoryRef.current &&
        !subCategoryRef.current.contains(event.target)
      ) {
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
    subCategories.forEach((sub) =>
      filters.push({ type: "subCategory", value: sub })
    );
    locations.forEach((loc) => filters.push({ type: "location", value: loc }));
    genders.forEach((gen) => filters.push({ type: "gender", value: gen }));
    languages.forEach((lang) =>
      filters.push({ type: "language", value: lang })
    );
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
      name: "Bhuvam Bam",
      handle: "@bbkivines",
      location: "Mumbai, Maharashtra, India",
      gender: "Male",
      language: "Hindi, English, 1+ more",
      followers: "516.95K",
      category: "Lifestyle",
      subCategory: "Comedy",
      categorySize: "100 M",
      weeklyPost: "1200",
      overallEng: "5.82%",
      effectiveFollower: "5.82%",
      reelsViews: "937.4K",
    },
    {
      id: 2,
      name: "Bhuvam Bam",
      handle: "@bbkivines",
      location: "Mumbai, Maharashtra, India",
      gender: "Male",
      language: "Hindi, English, 1+ more",
      followers: "516.95K",
      category: "Lifestyle",
      subCategory: "Comedy",
      categorySize: "100 M",
      weeklyPost: "1200",
      overallEng: "5.82%",
      effectiveFollower: "5.82%",
      reelsViews: "937.4K",
    },
    {
      id: 3,
      name: "Bhuvam Bam",
      handle: "@bbkivines",
      location: "Mumbai, Maharashtra, India",
      gender: "Male",
      language: "Hindi, English, 1+ more",
      followers: "516.95K",
      category: "Lifestyle",
      subCategory: "Comedy",
      categorySize: "100 M",
      weeklyPost: "1200",
      overallEng: "5.82%",
      effectiveFollower: "5.82%",
      reelsViews: "937.4K",
    },
    {
      id: 4,
      name: "Bhuvam Bam",
      handle: "@bbkivines",
      location: "Mumbai, Maharashtra, India",
      gender: "Male",
      language: "Hindi, English, 1+ more",
      followers: "516.95K",
      category: "Lifestyle",
      subCategory: "Comedy",
      categorySize: "100 M",
      weeklyPost: "1200",
      overallEng: "5.82%",
      effectiveFollower: "5.82%",
      reelsViews: "937.4K",
    },
    {
      id: 5,
      name: "Bhuvam Bam",
      handle: "@bbkivines",
      location: "Mumbai, Maharashtra, India",
      gender: "Male",
      language: "Hindi, English, 1+ more",
      followers: "516.95K",
      category: "Lifestyle",
      subCategory: "Comedy",
      categorySize: "100 M",
      weeklyPost: "1200",
      overallEng: "5.82%",
      effectiveFollower: "5.82%",
      reelsViews: "937.4K",
    },
    {
      id: 6,
      name: "Bhuvam Bam",
      handle: "@bbkivines",
      location: "Mumbai, Maharashtra, India",
      gender: "Male",
      language: "Hindi, English, 1+ more",
      followers: "516.95K",
      category: "Lifestyle",
      subCategory: "Comedy",
      categorySize: "100 M",
      weeklyPost: "1200",
      overallEng: "5.82%",
      effectiveFollower: "5.82%",
      reelsViews: "937.4K",
    },
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
  const availableLocations = ["Mumbai", "Delhi", "Bangalore", "Chennai"];
  const availableGenders = ["Male", "Female", "Other"];
  const availableLanguages = ["Hindi", "English", "Tamil", "Telugu", "Bengali"];

  const MultiSelectDropdown = ({
    values,
    onChange,
    options,
    placeholder,
    isOpen,
    setIsOpen,
    dropdownRef,
  }) => {
    return (
      <div className="relative inline-flex flex-col" ref={dropdownRef}>
        <div
          className="relative cursor-pointer flex items-center bg-gradient-to-b from-black/0 to-black/20 p-[10px] w-full rounded-[10px] border border-gray-300"
          role="button"
          onClick={() => setIsOpen((p) => !p)}
        >
          <span className="text-sm leading-0">{placeholder}</span>
          <RxTriangleDown className="ml-3 leading-0" />
        </div>

        {isOpen && (
          <div className="absolute mt-1 top-full w-full bg-white border shadow-sm border-black/20 z-50 max-h-48 rounded-lg">
            {options.map((item, i) => {
              const isSelected = values.includes(item);
              return (
                <p
                  key={i}
                  className={`box-content m-1 py-1 px-2 last:rounded-b-lg first:rounded-t-lg flex items-center justify-between cursor-pointer text-black text-xs ${isSelected ? "bg-[#E9F5F0]" : "bg-white"}`}
                  onClick={() => onChange(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
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
    <main className="font-inter">
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <span className="text-[#686BC7]">Create &gt;</span>
          <span className="font-[600] text-[#686BC7] ml-2 underline">
            Discover
          </span>
          <span className="text-[#0000004D] ml-2">&gt;</span>
          <span className="text-[#0000004D] ml-2">Shortlist &gt;</span>
          <span className="text-[#0000004D] ml-2">Engage</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#000000]">
            Sparkles Chocolate Launch for Delhi Audience
          </h1>

          <div className="flex space-x-1 bg-[#318FFF66] p-1 rounded-lg">
            <button
              onClick={() => setActivePlatform("instagram")}
              className={`flex items-center space-x-1 px-2 py-2 rounded-lg text-xs font-[600] cursor-pointer ${activePlatform === "instagram" ? "bg-white text-black" : " text-black"}`}
            >
              <FaInstagram className="w-4 h-4" />
              <span>Instagram</span>
            </button>
            <button
              onClick={() => setActivePlatform("youtube")}
              className={`flex items-center space-x-1 px-2 py-2 rounded-lg text-xs font-[600] cursor-pointer ${activePlatform === "youtube" ? "bg-white text-black" : " text-black"}`}
            >
              <AiOutlineYoutube className="w-5 h-5" />
              <span>Youtube</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg py-3 mb-6">
          {/* Top Bar: Search + Toggle */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            {/* Search */}
            <div className="relative flex-grow min-w-[270px] max-w-[412px] border-2 border-black/15 rounded-lg">
              <input
                type="search"
                placeholder="Search by Creator Name/Handle"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-11/12 px-3 py-2 placeholder-black/50 text-sm text-[#000000] focus:outline-none focus:ring-0"
              />
              <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>

            {/* Verified Toggle */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-row">
                <span className="text-sm">Verified</span>
                <img
                  src="/assets/greenverify.svg"
                  alt="Verift icon"
                  className="w-[18px] h-[18px] ml-1"
                />
              </div>
              <div
                onClick={() => setVerified(!verified)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer transition-colors ${verified ? "bg-green-500" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow transition-transform ${verified ? "translate-x-5" : "translate-x-1"}`}
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
            {/* <MultiSelectDropdown
              values={subCategories}
              onChange={toggleSubCategory}
              options={availableSubCategories}
              placeholder="Sub Category"
              isOpen={isSubCategoryDropdownOpen}
              setIsOpen={setIsSubCategoryDropdownOpen}
              dropdownRef={subCategoryRef}
            /> */}
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
              className="flex items-center gap-2 text-[#000000] bg-gradient-to-b from-black/0 to-black/20 px-4 py-2 rounded-[12px] text-sm  border border-gray-300 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <span className="text-sm">Advance Filters</span>
              <img
                src="/assets/filter.svg"
                alt="filter"
                className="w-[18px] h-[18px]"
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
                        <div className=" bg-[#F5F5F5] p-2 rounded-[12px]">
                          <label className="text-sm text-black block mb-1">
                            {label}
                          </label>
                          <div className="flex justify-between text-xs text-black mb-1">
                            <span>
                              0{label === "Engagement Rate" ? "%" : ""}
                            </span>
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
          <div className="flex flex-row gap-2 items-center my-4">
            <div className="text-sm text-[#000000]">
              Showing results for {filteredCreators.length} Creators
            </div>
            <div className="flex flex-wrap gap-2 items-center">
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
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider min-w-[280px] border-r border-[#CDE4DA]">
                    Creator Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider min-w-[150px] border-r border-[#CDE4DA]">
                    Language
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                    Followers
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider border-r border-[#CDE4DA]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">
                    Sub Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">
                    Category Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-[700] text-[#000000] uppercase tracking-wider whitespace-nowrap border-r border-[#CDE4DA]">
                    Weekly Post
                  </th>
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
                        <div className="text-lg">
                          Edit Filters to see updated results
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  creators.map((creator, index) => (
                    <tr key={creator.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 border-r border-[#CDE4DA]">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              isExpanded
                                ? "/assets/minus.svg"
                                : "/assets/add.svg"
                            }
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
                              <span className="text-xs font-medium text-[#000000]">
                                {creator.name},
                              </span>
                              <div className="text-xs text-[#00000066]">
                                {creator.handle}
                              </div>
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
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.gender}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.language}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.followers}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.category}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.subCategory}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.categorySize}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.weeklyPost}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.overallEng}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080] border-r border-[#CDE4DA]">
                        {creator.effectiveFollower}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#00000080]">
                        {creator.reelsViews}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-end mt-6 bg-[#F0EDE6] p-3">
        <button
          onClick={handleShortlistClick}
          className="px-8 py-3 text-white rounded-[12px] text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 outline-none bg-[#E96D70] cursor-pointer"
        >
          Shortlist
        </button>
      </div> */}

      <div className="w-full flex justify-center items-center sticky bg-[#F0EDE6] bottom-0 py-3 border-t-2 border-black/30">
        <div className="flex w-full justify-end">
          <button
            onClick={handleShortlistClick}
            className={`px-4 py-2 rounded-lg ml-auto text-sm font-medium outline-none ${true ? "bg-[#E96D70] text-white cursor-pointer hover:bg-[#ff4f4f]" : "bg-[#989898] cursor-not-allowed text-[#434343]"}`}
          >
            Discover Influencers
          </button>
        </div>
      </div>
    </main>
  );
};

export default Discover;
