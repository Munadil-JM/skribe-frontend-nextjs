import { useState } from "react";
import { createPortal } from "react-dom";
import parse from "html-react-parser";
import { ATTACH_URL } from "../../../constants";
import pdf from "../../assets/pdf.png";
import excel from "../../assets/excel.png";
import word from "../../assets/word.png";

const PreviewData = ({
  open,
  previewData,
  listBreak,
  storeImages,
  onClose,
  editPreview,
  testMail,
  mailStatus,
  remainingQuota,
}) => {
  const date = new Date(previewData?.campaigns?.listCreatedDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTestMailClick = (action) => {
    setIsProcessing(true); // Disable buttons on click
    testMail(action).finally(() => setIsProcessing(false)); // Re-enable buttons once the mail action is done
  };
  if (!open) return null;

  return createPortal(
    <>
      {mailStatus && (
        <>
          <div className="fixed inset-0 z-[52] bg-gray-700 opacity-70"></div>
          <div className="z-[53] fixed left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 md:w-5/5  lg:w-3/5 xl:w-4/6 text-center text-white text-2xl">
            Sending...
          </div>
        </>
      )}
      <div className="fixed inset-0 z-50 bg-gray-700 opacity-70"></div>
      <div className="z-50 fixed left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl md:w-5/5  lg:w-4/5 xl:w-4/6">
        <main className="container mx-auto">
          <div className="float-right">
            <button onClick={onClose}>
              <span className="material-icons-outlined rounded-full  text-gray-800 hover:bg-gray-400 hover:text-gray-200">
                close
              </span>
            </button>
          </div>

          <div className="w-12/12 flex flex-col mx-auto rounded-lg md:overflow-x-hidden md:overflow-scroll md:h-[450px] overflow-hidden">
            <div className="flex gap-x-5  md:flex-col lg:flex-row">
              <div className=" w-full xl:w-5/12">
                <div className="flex flex-col">
                  <div className="border border-gray-300 rounded-md p-3">
                    <h2 className="text-md font-medium text-gray-700 flex items-center justify-between">
                      {!!previewData?.campaigns?.vchCampaignName &&
                        previewData?.campaigns?.vchCampaignName
                          .charAt(0)
                          .toUpperCase() +
                          previewData?.campaigns?.vchCampaignName
                            .slice(1)
                            .toLowerCase()}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {!!previewData?.campaigns?.vchCampaignDesc &&
                        previewData?.campaigns?.vchCampaignDesc
                          .charAt(0)
                          .toUpperCase() +
                          previewData?.campaigns?.vchCampaignDesc
                            .slice(1)
                            .toLowerCase()}
                    </p>
                  </div>

                  {/* <p className="text-purple-600 font-medium mb-5 text-sm">
                    {previewData?.campaigns?.vchCampaignType
                      .charAt(0)
                      .toUpperCase() +
                      previewData?.campaigns?.vchCampaignType
                        .slice(1)
                        .toLowerCase()}
                  </p> */}
                </div>

                <div className="flex flex-col mt-4">
                  <div className="flex justify-between items-center ">
                    <div className="border border-gray-300 rounded-md p-3 w-full">
                      <div className="flex justify-between items-start">
                        <h2 className="text-sm font-medium text-gray-700 flex items-center justify-between">
                          {!!previewData?.campaigns?.listName &&
                            previewData?.campaigns?.listName
                              .charAt(0)
                              .toUpperCase() +
                              previewData?.campaigns?.listName
                                .slice(1)
                                .toLowerCase()}
                        </h2>
                        <span className="text-sm font-medium text-[#002b5b]">
                          {formattedDate}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs">
                        {!!previewData?.campaigns?.listDesc
                          ? previewData?.campaigns?.listDesc
                              .charAt(0)
                              .toUpperCase() +
                            previewData?.campaigns?.listDesc
                              .slice(1)
                              .toLowerCase()
                          : ""}
                      </p>
                      <ul className="flex justify-between mx-2 gap-4 mt-4 flex-wrap">
                        <li className="bg-white border border-gray-300 flex flex-col rounded-lg flex-grow px-4 py-2 text-center gap-y-1">
                          <span className="text-4xl font-bold text-[#002b5b]">
                            {listBreak?.count}
                          </span>
                          <span className="text-sm text-gray-700 font-medium">
                            Jouranlists
                          </span>
                        </li>
                        <li className="bg-white  border border-gray-300 flex flex-col flex-grow px-4 py-2 text-center gap-y-1 rounded-lg">
                          <span className="text-4xl font-bold text-[#002b5b]">
                            {previewData?.outletCount}
                          </span>
                          <span className="text-sm text-gray-700 font-medium">
                            Outlets
                          </span>
                        </li>
                        <li className="bg-white  border border-gray-300 flex flex-col flex-grow px-4 py-2 text-center gap-y-1 rounded-lg">
                          <span className="text-4xl font-bold text-[#002b5b]">
                            {previewData?.locationCount}
                          </span>
                          <span className="text-sm text-gray-700 font-medium">
                            Locations
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-6/12  md:w-full xl:w-7/12">
                <div
                  className={`${
                    remainingQuota < 100
                      ? "bg-red-500 border-red-400 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400 "
                  } border px-2 py-1 rounded-md font-medium text-xs absolute`}
                >
                  {remainingQuota} Emails Left
                </div>
                <div className="w-12/12">
                  <div className="w-12/12 pb-4 pt-4 lg:pt-0">
                    <div className="border border-gray-300 rounded-lg bg-white mb-4">
                      <section className="p-5">
                        <div className="flex flex-col h-[400px] overflow-scroll overflow-x-hidden pt-2">
                          <div className="flex mb-4 items-center justify-between">
                            <h2 className="text-md text-gray-800 font-medium ">
                              Subject:{" "}
                              {!!previewData?.campaigns?.vchSubject &&
                                previewData?.campaigns?.vchSubject}
                            </h2>
                          </div>

                          <div className="text-xs text-gray-600">
                            {previewData?.campaigns?.vchBody?.length > 0 &&
                              parse(previewData?.campaigns?.vchBody)}
                          </div>
                          <ul className="flex gap-2 flex-wrap mt-4">
                            {storeImages?.length > 0 &&
                              storeImages?.map((curItem, index) => {
                                if (curItem?.attachmentUrl?.includes("pdf")) {
                                  return (
                                    <>
                                      <li
                                        key={curItem.url}
                                        className="bg-gray-200 p-2 relative rounded-lg"
                                      >
                                        <img
                                          //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                          src={pdf.src}
                                          alt={`preview-${index}`}
                                          border="0"
                                          className="w-16 h-16 rounded-md object-cover"
                                        />
                                      </li>
                                    </>
                                  );
                                } else if (
                                  curItem?.attachmentUrl.includes("xlsx") ||
                                  curItem?.attachmentUrl.includes("xls")
                                ) {
                                  return (
                                    <>
                                      <li
                                        key={curItem.url}
                                        className="bg-gray-200 p-2 relative rounded-lg"
                                      >
                                        <img
                                          //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                          src={excel.src}
                                          alt={`preview-${index}`}
                                          border="0"
                                          className="w-16 h-16 rounded-md object-cover"
                                        />
                                      </li>
                                    </>
                                  );
                                } else if (
                                  curItem?.attachmentUrl.includes("csv")
                                ) {
                                  return (
                                    <>
                                      <li
                                        key={curItem.url}
                                        className="bg-gray-200 p-2 relative rounded-lg"
                                      >
                                        <img
                                          //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                          src={excel.src}
                                          alt={`preview-${index}`}
                                          border="0"
                                          className="w-16 h-16 rounded-md object-cover"
                                        />
                                      </li>
                                    </>
                                  );
                                } else if (
                                  curItem?.attachmentUrl.includes("doc") ||
                                  curItem?.attachmentUrl.includes("docx")
                                ) {
                                  return (
                                    <>
                                      <li
                                        key={curItem.url}
                                        className="bg-gray-200 p-2 relative rounded-lg"
                                      >
                                        <img
                                          src={word.src}
                                          alt={`preview-${index}`}
                                          border="0"
                                          className="w-16 h-16 rounded-md object-cover"
                                        />
                                      </li>
                                    </>
                                  );
                                } else {
                                  return (
                                    <li
                                      key={index}
                                      className="bg-gray-200 p-2 relative rounded-lg"
                                    >
                                      <img
                                        src={`${ATTACH_URL}${curItem?.attachmentUrl}`}
                                        alt="Attachment"
                                        className="w-16 h-16 rounded-md object-cover"
                                      />
                                    </li>
                                  );
                                }
                              })}
                          </ul>
                        </div>
                      </section>
                    </div>

                    {previewData?.campaigns?.keyWords?.length > 0 && (
                      <div className="border border-gray-300 rounded-md p-2 py-0 pt-2 my-4">
                        <ul className="flex py-2 flex-wrap text-sm">
                          Brand Mentions: &nbsp;
                          {previewData?.campaigns?.keyWords?.map(
                            (curItem, ind) => {
                              return (
                                <li
                                  key={curItem.vchCampaignKeyword}
                                  className="border text-xs mb-2 font-normal border-gray-500 px-2 py-1 flex items-center mr-2 gap-x-1 rounded-md text-gray-500"
                                >
                                  {!!curItem.vchCampaignKeyword &&
                                    curItem.vchCampaignKeyword
                                      .charAt(0)
                                      .toUpperCase() +
                                      curItem.vchCampaignKeyword
                                        .slice(1)
                                        .toLowerCase()}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-x-4 justify-center">
                      <button
                        // to={`/create-campaign/${previewData?.campaigns?.bgintcampid}/${previewData?.campaigns?.vchTemplateType}/update`}
                        onClick={() =>
                          editPreview(
                            previewData?.campaigns?.bgintcampid,
                            previewData?.campaigns?.vchCampaignType
                          )
                        }
                        className="px-6 flex  flex-grow  justify-center rounded-md border border-[#002b5b] text-[#002b5b] text-center text-sm font-medium hover:bg-[#002b5b] hover:text-white py-2"
                      >
                        Edit
                      </button>
                      {remainingQuota >= listBreak?.count ? (
                        <>
                          <button
                            disabled={isProcessing}
                            onClick={() => handleTestMailClick("test")}
                            className="px-6 flex  flex-grow  justify-center rounded-md border border-[#002b5b] text-[#002b5b] text-center text-sm font-medium hover:bg-[#002b5b] hover:text-white py-2"
                          >
                            Test Mail
                          </button>
                          <button
                            disabled={isProcessing}
                            onClick={() => handleTestMailClick("send")}
                            className="px-6 flex  flex-grow  justify-center rounded-md border text-center text-sm font-medium bg-[#002b5b] py-2 text-white"
                          >
                            Send Mail
                          </button>{" "}
                        </>
                      ) : (
                        <p className="absolute left-0 right-0 bottom-0 bg-red-500 text-center py-2 text-white self-center text-xs lg:text-sm">
                          You have insufficient email credits. Please contact
                          your account manager to add email credits so you can
                          execute this campaign.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default PreviewData;
