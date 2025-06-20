"use client";

import { useState, useEffect } from "react";
// import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import userService from "../../Services/user.service";
import { FAVOURITEJOURNALISTS } from "../../constants";
import nodata from "../assets/unavilaible.png";
import "./TrendingJournalist.css";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.get(FAVOURITEJOURNALISTS);
        setData(res?.data?.hits?.hits || []);
        setFilteredData(res?.data?.hits?.hits || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        data.filter((journalist) =>
          journalist._source.vchauthor
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const handleNavigate = () => {
    router.push("/journalist-search");
  };

  if (loading) {
    return (
      <div className="w-[90%]">
        <fieldset className="h-[480px] p-1 border-2 border-black/10 rounded-[10px] bg-white">
          <legend className="pl-3 pr-2 text-sm font-[500] text-[#333]">
            Favorites
          </legend>
          <div className="w-full m-3">
            <Skeleton width="90%" height={30} />
            <div className="mt-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-full mb-4">
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="60%" height={15} className="mt-1" />
                  <Skeleton width="50%" height={15} className="mt-1" />
                </div>
              ))}
            </div>
          </div>
        </fieldset>
      </div>
    );
  }

  if (!data.length) {
    return (
      <fieldset className="h-[480px] p-1 border-2 border-black/10 rounded-[10px]">
        <legend className="pl-3 pr-2 text-sm font-[500] text-[#333]">
          Favorites
        </legend>
        <div className="flex flex-col items-center justify-center">
          <img className="mt-9" src={nodata.src} alt="No data..." />
          <p className="mt-3 text-semibold">Your Favorites List is Empty</p>
          <p className="mt-3 mb-3 ml-10 mr-10 text-sm text-center text-black/50">
            It looks like you haven’t added any favorite journalists yet. Add
            your favorite journalists to see their latest articles here!
          </p>
          <button
            onClick={handleNavigate}
            variant="outline"
            colorscheme="red"
            className="mt-5 mb-5 text-sm text-center text-red-500 font-weight-400"
          >
            <p>Add journalists +</p>
          </button>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="h-[480px] p-1 border-2 border-black/10 rounded-[10px]">
      <legend className="pl-3 pr-2 text-sm font-[500] text-[#333]">
        Favorites
      </legend>
      <div className="flex gap-x-1 items-center px-2 border border-black/10 rounded-[5px] mt-3 mx-3 mb-2 text-[12px]">
        <span className="text-sm icon-16 text-black/50 material-icons-outlined">
          search
        </span>

        <input
          type="search"
          placeholder="Search journalist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          focusbordercolor="transparent"
          className="text-black/50 w-full p-2 rounded-md focus:outline-none"
        />
      </div>
      <div className="overflow-y-auto scrollbar h-[345px] w-full p-4 text-sm text-black/50">
        {filteredData.map((journalist) => (
          <div key={journalist?._id}>
            <div className="mb-1">
              <p className="font-[500] text-[12px] text-[#002b5b]">
                {journalist?._source?.vchtitle}
              </p>
              <div className="flex gap-1 items-center">
                {journalist?._source?.vchauthor && (
                  <p className="text-gray-700 text-xs">
                    {journalist?._source?.vchauthor}
                  </p>
                )}
                <p className="text-[12px] font-[400]">
                  {journalist?._source?.vchwebsite}
                </p>
              </div>
              <p className="text-right text-black/50 font-[500] text-[12px]">
                {new Date(
                  journalist?._source?.dtmpublishdate
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <hr className="mx-1 my-1 text-black/10" />
            </div>
          </div>
        ))}
      </div>
      <Link href="/favorites" className="block text-center">
        <p className="flex items-center justify-center gap-1 m-2 text-[#318fff] text-sm">
          View All{" "}
          <span className="text-sm icon-16 material-icons-outlined">
            arrow_forward
          </span>
        </p>
      </Link>
    </fieldset>
  );
};

export default Favorites;
