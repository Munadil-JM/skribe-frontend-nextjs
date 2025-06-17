import React, { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { crm_API } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Skeleton } from "@chakra-ui/react";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { useRef } from "react";

const CRMJournalist = () => {
  const infiniteQuery = useInfiniteQuery(["crm_journalist"], __, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.totalPage === lastPage.currentPage) return undefined;
      return { token: lastPage.token, currentPage: lastPage.currentPage + 1 };
    },
  });

  useScrollToBottom(
    document.getElementById("crmjournalist-scrollbar"),
    () => {
      if (!infiniteQuery?.isFetchingNextPage) infiniteQuery?.fetchNextPage();
    },
    20
  );

  return (
    <>
      <div className="mb-4 block">
        <header>
          <h2 className="border-b pb-1 text-lg font-medium text-gray-600">
            CRM Journalist
          </h2>
        </header>
        <div
          className="pt-3"
          id="crmjournalist-scrollbar"
          style={{ height: "150px", overflowY: "scroll" }}
        >
          <ul className="flex flex-wrap gap-x-3 gap-y-2">
            {infiniteQuery.isLoading && (
              <Skeleton height="400px" width="400px" />
            )}
            {!infiniteQuery.isLoading &&
              infiniteQuery.data.pages.map((page, index) => (
                <Fragment key={index}>
                  <Chips
                    journoId={
                      infiniteQuery.data?.pages[0].data[3].journoProfileId
                    }
                  >
                    {page.data.map(
                      ({
                        journoProfileId,
                        journoName,
                        photoPath,
                        journoTitle,
                      }) => (
                        <li className="relative" key={uuidv4()}>
                          <input
                            name="crm_journalist"
                            value={journoProfileId}
                            id={journoProfileId}
                            type="radio"
                            photopath={photoPath}
                            title={journoTitle}
                            jname={journoName}
                            className="absolute -left-3 hidden"
                          />
                          <label htmlFor={journoProfileId}>{journoName}</label>
                        </li>
                      )
                    )}
                  </Chips>
                </Fragment>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

async function __({ pageParam } = { pageParam: undefined }) {
  const login_TKN = localStorage.getItem("userToken");
  let processed_url = undefined;
  let currentPage = undefined;

  if (!pageParam) processed_url = crm_API;
  else processed_url = `${crm_API}&token=${pageParam.token}`;

  const result = await axios.get(processed_url, {
    headers: {
      Authorization: `Bearer ${login_TKN}`,
    },
  });

  const { data } = result.data;

  const token = encodeURIComponent(result.data.nextpagetoken.token);
  const count = result.data.nextpagetoken.count;
  const totalPage = parseInt(count / 10) + (count % 10 !== 0 ? 1 : 0);
  if (!pageParam) currentPage = 1;
  else currentPage = pageParam.currentPage;

  return { data, token, count, totalPage, currentPage };
}

function Chips({ children, journoId }) {
  const { setVchartjourno } = useContext(DashboardContext);
  const [selectedJournalist, setSelectedJournalist] = React.useState(journoId);
  const handleChange = (event) => {
    setSelectedJournalist(event.target.value);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        const {
          props: { children },
        } = child;

        return React.cloneElement(child, {
          children: React.Children.map(children, (nstchild, index) => {
            if (index === 0) {
              return React.cloneElement(nstchild, {
                checked: selectedJournalist === nstchild.props.value,
                onChange: handleChange,
                onClick: () => {
                  setVchartjourno({
                    id: nstchild.props.value,
                    path: nstchild.props.photopath,
                    title: nstchild.props.title,
                    jname: nstchild.props.jname,
                  });
                },
              });
            } else
              return React.cloneElement(nstchild, {
                style: {
                  backgroundColor:
                    selectedJournalist === nstchild.props.htmlFor
                      ? "#9CA3AF"
                      : undefined,
                  color:
                    selectedJournalist === nstchild.props.htmlFor
                      ? "#FFFFFF"
                      : undefined,
                },
                className: `flex px-4 py-2 text-sm bg-teal-50 bg-opacity-60 text-gray-500 hover:bg-gray-400 hover:text-white`,
              });
          }),
        });
      })}
    </>
  );
}

function useScrollToBottom(container, callback, offset = 0) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container?.addEventListener("scroll", handleScroll, { passive: true });
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [container, offset]);
}

export default CRMJournalist;
