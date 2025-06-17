"use client";

import { useState, useEffect, useRef } from "react";
import BeatCheckBox from "../CheckBox/BeatCheckBox";
import { useAllBeat } from "../utils/useAllBeat";
import { useSelected } from "../utils/useAllGeo";
import Link from "next/link";
import { useBeatMutation } from "../../custom-hooks/useBeatMutation";
import { Skeleton } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const AllBeat = () => {
  const [allBeat, setAllBeat] = useState([]);
  const { selectedBeat, isLoadingSelected, isRefetching } = useSelected();
  const { mediaBeat, isLoadingBeat } = useAllBeat();
  const beatMutation = useBeatMutation();
  const ref = useRef({
    selectedBeat: [],
    add: [],
    remove: [],
  });

  const checkedOrUncheckedFn = (id, checked) => {
    let data = { intBeatId: id };
    let checkStatus = checked;

    let status = ref.current.selectedBeat.findIndex(
      (ele) => ele.intBeatId === data.intBeatId
    );

    if (status !== -1 && checkStatus === true) {
      ref.current = {
        ...ref.current,
        remove: [
          ...ref.current.remove,
          { intBeatId: ref.current.selectedBeat[status].intBeatId },
        ],
      };
    } else if (status !== -1 && checkStatus === false) {
      let flag = ref.current.remove.findIndex(
        (ele) => ele.intBeatId === data.intBeatId
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
        (ele) => ele.intBeatId === data.intBeatId
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
    const updatedState = mediaBeat.map((curElem) => {
      const matching = selectedBeat.find(
        (val) => val.intBeatId === curElem.beatid
      );
      const status = matching ? true : false;
      return {
        ...curElem,
        status,
      };
    });

    if (
      (!isLoadingBeat && !isLoadingSelected) ||
      (!isLoadingBeat && !isLoadingSelected && isRefetching)
    ) {
      ref.current = { ...ref.current, selectedBeat: selectedBeat };
      setAllBeat(updatedState);
    }
  }, [isLoadingBeat, isLoadingSelected, isRefetching]);

  return (
    <div className="flex flex-1">
      <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="flex-1 border-b border-gray-300 pb-4 text-sm">
          Please Select Beat
        </h2>
        <div className="my-4 max-h-96 overflow-y-auto " id="scrollHeight">
          {isRefetching && <Skeleton height={300} />}
          {!isLoadingBeat || !isLoadingSelected || <Skeleton height={300} />}
          <ul className="flex flex-wrap gap-y-3">
            <li className="flex w-full flex-col">
              <span className="flex gap-x-4 bg-gray-50">
                <label className="text-sm lowercase text-gray-500 first-letter:uppercase peer-checked/published:font-medium peer-checked/published:text-gray-800">
                  <ul className="flex flex-col flex-wrap gap-y-3 md:flex-row">
                    {allBeat.length > 0 &&
                      !isRefetching &&
                      allBeat.map((curElem) => {
                        return (
                          <li className="flex w-1/3 gap-x-4" key={uuidv4()}>
                            <BeatCheckBox
                              {...curElem}
                              beatFn={checkedOrUncheckedFn}
                            />
                          </li>
                        );
                      })}
                  </ul>
                </label>
              </span>
            </li>
          </ul>
        </div>
        <Link
          href={""}
          className="mt-4 w-fit cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-sm font-normal text-white hover:bg-orange-600 focus:outline-none"
          onClick={() => {
            beatMutation([ref.current.add, ref.current.remove]);
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
            setAllBeat([]);
          }}
          hidden={!allBeat.length ? true : false}
        >
          Submit
        </Link>
      </section>
    </div>
  );
};

export default AllBeat;
