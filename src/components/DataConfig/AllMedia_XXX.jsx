"use client";

import { useState, useEffect, useRef } from "react";
import MediaCheckBox from "../CheckBox/MediaCheckBox";
import Link from "next/link";
import { useSelected } from "../utils/useAllGeo";
import { useAllMedia } from "../utils/useAllMedia";
import { useMediatypeMutation } from "../../custom-hooks/useMediatypeMutation";
import { Skeleton } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const AllMedia = () => {
  const { userMediaPrefs, isLoadingSelected, isRefetching } = useSelected();
  const { mediaData, isLoadingMedia } = useAllMedia();
  const mediaMutation = useMediatypeMutation();
  const [allMedia, setAllMedia] = useState([]);
  const ref = useRef({
    selectedMediatype: [],
    add: [],
    remove: [],
  });

  /* add or remove logic for mediatype */
  const checkedOrUncheckedFn = (id, checked) => {
    let data = { intMediaId: id };
    let checkStatus = checked;
    let status = ref.current.selectedMediatype.findIndex(
      (ele) => ele.intMediaId === data.intMediaId
    );

    if (status !== -1 && checkStatus === true) {
      ref.current = {
        ...ref.current,
        remove: [
          ...ref.current.remove,
          { intMediaId: ref.current.selectedMediatype[status].intMediaId },
        ],
      };
    } else if (status !== -1 && checkStatus === false) {
      let flag = ref.current.remove.findIndex(
        (ele) => ele.intMediaId === data.intMediaId
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
        (ele) => ele.intMediaId === data.intMediaId
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
    const updatedState = mediaData?.map((curElem) => {
      const matching = userMediaPrefs?.find(
        (val) => val.intMediaId === curElem.mediaid
      );
      const status = matching ? true : false;
      return {
        ...curElem,
        status,
      };
    });

    if (
      (!isLoadingMedia && !isLoadingMedia) ||
      (!isLoadingMedia && !isLoadingSelected && isRefetching)
    ) {
      ref.current = { ...ref.current, selectedMediatype: userMediaPrefs };
      setAllMedia(updatedState);
    }
  }, [isLoadingMedia, isLoadingSelected, isRefetching]);

  return (
    <div className="flex flex-1">
      <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="flex-1 border-b border-gray-300 pb-4  text-sm">
          Please Select Media Types
        </h2>
        <div className="my-4 max-h-96 overflow-y-auto" id="scrollHeight">
          {isRefetching && <Skeleton height={300} />}
          {!isLoadingMedia || !isLoadingSelected || <Skeleton height={300} />}
          <ul className="flex flex-wrap gap-y-3">
            <li className="flex w-full flex-col">
              <span className="flex gap-x-4 bg-gray-50">
                <label className="text-sm lowercase text-gray-500 first-letter:uppercase peer-checked/published:font-medium peer-checked/published:text-gray-800">
                  <ul className="flex flex-col flex-wrap gap-y-3 md:flex-row">
                    {allMedia.length > 0 &&
                      !isRefetching &&
                      allMedia.map((curElem) => {
                        return (
                          <li className="flex w-1/3 gap-x-4" key={uuidv4()}>
                            <MediaCheckBox
                              {...curElem}
                              mediaFn={checkedOrUncheckedFn}
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
            mediaMutation([ref.current.add, ref.current.remove]);
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
            setAllMedia([]);
          }}
          hidden={!allMedia.length ? true : false}
        >
          Submt
        </Link>
      </section>
    </div>
  );
};
export default AllMedia;
