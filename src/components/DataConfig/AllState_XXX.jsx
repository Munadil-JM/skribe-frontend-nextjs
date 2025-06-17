"use client";

import { useState, useEffect, useRef } from "react";
import Checkbox from "../CheckBox/Checkbox";
import { useGeoMutation } from "../../custom-hooks/useGeoMutation";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useAllGeo, useSelected } from "../utils/useAllGeo";
import { Skeleton } from "@chakra-ui/react";
import Spinner from "../../Services/Spinner";

const AllState = () => {
  const { data, isLoading } = useAllGeo();
  const { userGeoPref, isLoadingSelected, isRefetching } = useSelected();

  const [allGeo, setAllGeo] = useState([]);
  let geoMutate = useGeoMutation();

  const ref = useRef({
    selectedGeo: [],
    add: [],
    remove: [],
  });

  const checkedOrUncheckedFn = (id, checked) => {
    let data = { intGeoId: id };
    let checkStatus = checked;

    let status = ref.current.selectedGeo.findIndex(
      (ele) => ele.intGeoId === data.intGeoId
    );

    if (status !== -1 && checkStatus === true) {
      ref.current = {
        ...ref.current,
        remove: [
          ...ref.current.remove,
          { intGeoId: ref.current.selectedGeo[status].intGeoId },
        ],
      };
    } else if (status !== -1 && checkStatus === false) {
      let flag = ref.current.remove.findIndex(
        (ele) => ele.intGeoId === data.intGeoId
      );

      if (flag !== -1) {
        ref.current.remove.splice(flag, 1);
      }
      ref.current = {
        ...ref.current,
        remove: [...ref.current.remove],
      };
    } else if (status === -1 && checkStatus === false) {
      ref.current = {
        ...ref.current,
        add: [...ref.current.add, data],
      };
    } else if (status === -1 && checkStatus === true) {
      let flag = ref.current.add.findIndex(
        (ele) => ele.intGeoId === data.intGeoId
      );

      if (flag !== -1) {
        ref.current.add.splice(flag, 1);
      }

      ref.current = {
        ...ref.current,
        add: [...ref.current.add],
      };
    }
  };

  useEffect(() => {
    const updatedState = data.map((state) => {
      const updatedData = state.cities.map((city) => {
        let matching = "";
        if (userGeoPref) {
          matching = userGeoPref.find((val) => val.intGeoId === city.cityId);
        }
        const status = matching ? true : false;
        return {
          ...city,
          status,
        };
      });
      return {
        ...state,
        cities: updatedData,
      };
    });

    if (
      (!isLoading && !isLoadingSelected) ||
      (!isLoading && !isLoadingSelected && isRefetching)
    ) {
      ref.current = { ...ref.current, selectedGeo: userGeoPref };
      setAllGeo([...updatedState]);
    }
  }, [isLoading, isLoadingSelected, isRefetching]);

  return (
    <div className="flex flex-1">
      <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="flex-1 border-b border-gray-300 pb-4  text-sm">
          Please Select State
        </h2>

        <div className="my-4 max-h-96 overflow-y-auto" id="scrollHeight">
          {isRefetching && <Skeleton height={300} />}
          {!isLoading || !isLoadingSelected || <Skeleton height={300} />}
          <ul className="flex flex-wrap gap-y-3">
            {allGeo.length > 0 &&
              !isRefetching &&
              allGeo.map((curItem) => (
                <li className="flex w-full flex-col" key={curItem.stateName}>
                  <span className="gap-x-4 bg-gray-50">
                    <label className="font-text-sm text-gray-500 first-letter:uppercase peer-checked/published:font-medium peer-checked/published:text-gray-800">
                      {curItem.stateName}

                      <ul className="mt-2 flex flex-col flex-wrap gap-y-3 border-t border-gray-300 pt-3 md:flex-row">
                        {curItem.cities.map((curElem) => {
                          return (
                            <li className="flex w-1/3 gap-x-4" key={uuidv4()}>
                              <Checkbox
                                {...curElem}
                                cityFun={checkedOrUncheckedFn}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </label>
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <Link
          href={""}
          className=" w-fit cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-sm font-normal text-white hover:bg-orange-600 focus:outline-none"
          onClick={() => {
            geoMutate([ref.current.add, ref.current.remove]);
            if (ref.current.add.length > 0 && ref.current.remove.length > 0) {
              ref.current = {
                ...ref.current,
                add: new Array(0),
                remove: new Array(0),
              };
            } else if (ref.current.add.length > 0) {
              ref.current = { ...ref.current, add: new Array(0) };
            } else if (ref.current.remove.length > 0) {
              ref.current = { ...ref.current, remove: new Array(0) };
            }
            setAllGeo([]);
          }}
          hidden={!allGeo.length ? true : false}
        >
          Submit
        </Link>
        {isLoading && <Spinner status={true}></Spinner>}
      </section>
    </div>
  );
};
export default AllState;
