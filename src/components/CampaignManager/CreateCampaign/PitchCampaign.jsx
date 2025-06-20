// import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useRef } from "react";
// import { DELETE_BRAND_KEYWORD } from "../../../constants";
// import userService from "../../../Services/user.service";
import pdf from "../../assets/pdf.png";
import excel from "../../assets/excel.png";
import word from "../../assets/word.png";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { GENERATE_MARKETING_CONTENT } from "../../../constants";
import axios from "axios";
import tokenService from "../../../Services/token.service";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";
import { TemplateFormat } from "../PickTemplate/TemplateFormat";

const promptSuggestions = [
  {
    id: 1,
    content:
      "Write a professional press release announcing Apple's launch of a revolutionary new AI-powered device. Include a strong headline, subhead, and a detailed first paragraph covering the who, what, when, where, and why. Add a quote from Apple's CEO and a boilerplate about the company",
  },
  {
    id: 2,
    content:
      "Create a press release that feels more narrative-driven, opening with a real-world problem that Tesla's latest energy storage innovation solves. Keep it newsworthy but engaging. Include key stats, a customer use case or testimonial if appropriate, and a quote from Tesla's CTO. End with a strong call to action.",
  },
  {
    id: 3,
    content:
      "Draft a concise media pitch email introducing Reliance's new e-commerce platform launch to a top tech reporter. Hook the reporter in the first two sentences, explain why this is relevant to their audience, and suggest a few angles they might cover. Keep it under 200 words and include a clear next step.",
  },
  {
    id: 4,
    content:
      "Write a PR pitch offering an exclusive story or first interview about Amazon's breakthrough in drone delivery technology to a top-tier outlet like Bloomberg. Focus on why this news matters now, what makes it unique, and what insider details the journalist would get by covering it. End with a call to schedule a conversation.",
  },
  {
    id: 5,
    content:
      "Compose a bold, energetic press release that frames Netflix's entry into live sports streaming as a major industry disruptor. Use confident language, compelling statistics, and vivid imagery. Open with a powerful headline and opening line. Include two quotes: one from Netflix leadership and one from a major sports partner or expert",
  },
];

const PitchCampaign = ({
  previewData,
  isLoader,
  formData,
  setFormData,
  inputValue,
  setInputValue,
  AddKeyword,
  FileUpload,
  preBrandMention,
  error,
  deleteMention,
  brandMention,
  storeImages,
  displayImage,
  deleteAPI,
  handleDelete,
  ATTACH_URL,
  templateData,
  updateType,
  saveAndPreview,
  update,
  deleteBrandKeyword,
}) => {
  // const [selected, setSelected] = useState("");
  const textareaRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [isPromptSent, setIsPromptSent] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handlePromptSent = async () => {
    try {
      setIsLoading(true);

      if (!prompt.trim()) {
        showNotification("Please enter a prompt", "warning");
        return;
      }

      const res = await axios.post(
        GENERATE_MARKETING_CONTENT,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
          },
        }
      );

      const formattedContent =
        TemplateFormat[0].html + res.data.data.replace(/\n/g, "<br/>");
      setFormData({
        ...formData,
        editorContent: formattedContent,
      });
      setSelectedPrompt(prompt);
      setPrompt("");
      setIsPromptSent(true);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, 50);
    } catch (err) {
      console.error("Error while generating AI content: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* {isLoader && (
        <div className="fixed inset-0 z-50 bg-gray-700 opacity-70"></div>
      )} */}
      <section className="mt-4 md:mt-0">
        <h3 className="text-lg font-semibold text-gray-600 mb-0 leading-normal ">
          Step 3: Get ready to PITCH
        </h3>
        <p className="text-gray-400 text-xs mb-2">
          Create your brand PITCH story with a strong subject line and
          compelling proposition.
        </p>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <div className="mx-auto w-12/12">
              <div className="w-12/12">
                <div className="border border-gray-300 rounded-lg bg-[#F8F9FC]">
                  <section className="p-3">
                    <div className="flex flex-col">
                      {/* <label className="text-gray-500 font-medium text-md">
                      Write Subject:
                    </label> */}
                      <div className="flex flex-col relative pb-2">
                        {isLoading ? (
                          <div className="border border-gray-300 rounded-md h-10 w-full bg-white flex items-center pl-2">
                            <div className="w-10/12 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            className="border bg-white border-gray-300  text-gray-500 p-2 rounded-md focus:outline-none text-sm pr-6"
                            // className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none text-lg text-gray-500"
                            placeholder="Subject"
                            value={formData?.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                          />
                        )}
                        {!formData.subject && !isLoading && (
                          <span className="absolute left-16 top-1 text-red-500 text-lg">
                            *
                          </span>
                        )}
                      </div>

                      {/* <label className="text-gray-500 font-medium text-md">
                      Company Introduction:
                    </label> */}
                      <div className="relative h-[350px]">
                        {/* <span className="absolute right-2 -top-4 text-red-500 text-xl">
                          *
                        </span> */}
                        <ReactQuill
                          theme="snow"
                          value={formData.editorContent}
                          onChange={(content) => {
                            setFormData({
                              ...formData,
                              editorContent: content,
                            });
                          }}
                          className="w-full rounded-lg focus:outline-none text-lg text-gray-500 resize-none h-[300px]"
                          style={{
                            fontFamily: "Poppins",
                            whiteSpace: "pre-wrap !important",
                            wordWrap: "break-word",
                          }}
                        />
                        {isLoading && (
                          <div className="w-full bg-white flex items-start flex-col gap-y-2 absolute left-0 top-0 oveflow-hidden h-[350px]">
                            {Array(3)
                              .fill("")
                              .map((_e, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <div className="w-full h-6 rounded-sm bg-gray-200 animate-pulse"></div>
                                    <div className="w-full h-6 rounded-sm bg-gray-200 animate-pulse"></div>
                                    <div className="w-full h-6 rounded-sm bg-gray-200 animate-pulse"></div>
                                    <div className="w-full h-6 rounded-sm bg-gray-200 animate-pulse"></div>
                                  </React.Fragment>
                                );
                              })}
                          </div>
                        )}
                        {isLoading && (
                          <img
                            width={100}
                            className={`${"opacity-100"} transition-opacity duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                            src="/assets/editor-star.webp"
                            alt="Star loader"
                          />
                        )}
                      </div>

                      {/* <Editor
                          apiKey="9zxxwm37t84lnkxqjnlav4c9kmcpvffvkk2h9gfzldehjc6w"
                          name="editorContent"
                          value={formData.editorContent}
                          style={{ fontFamily: "Poppins" }}
                          init={{
                            height: 390,
                            menubar: false,
                            newline_behavior: "invert",
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect fontsizeselect | " +
                              "bold italic forecolor backcolor | fontsizeselect | " +
                              "alignleft aligncenter alignright alignjustify | " +
                              "bullist numlist outdent indent | removeformat | help",
                            font_formats: "Poppins=poppins;",
                            paste_data_images: false,
                          }}
                          onEditorChange={(content) =>
                            setFormData({
                              ...formData,
                              editorContent: content,
                            })
                          }
                          className="w-full border border-gray-800 p-3 rounded-lg focus:outline-none text-lg text-gray-500 resize-none h-[390px]"
                        /> */}

                      {/* <p className="text-gray-600 text-xs p-0 m-0 mb-2 pt-2 ">
                        You can upload jpg, jpeg, png, pdf, doc, docx, xls,
                        xlsx, CSV
                      </p> */}
                      <p className="text-red-600 text-sm p-0 m-0 mb-2">
                        {error}
                      </p>

                      {/* Attachments  */}
                      <div className="flex items-center py-5 gap-x-2">
                        <ul className="flex gap-2 flex-wrap">
                          {storeImages?.length > 0 &&
                            storeImages?.map((curItem, index) => {
                              if (curItem?.attachmentUrl?.includes("pdf")) {
                                return (
                                  <li
                                    key={`${index}`}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          deleteAPI(curItem.intCampAttacId)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={pdf.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else if (
                                curItem?.attachmentUrl.includes("xlsx") ||
                                curItem?.attachmentUrl.includes("xls")
                              ) {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          deleteAPI(curItem.intCampAttacId)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={excel.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else if (
                                curItem?.attachmentUrl.includes("csv")
                              ) {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          deleteAPI(curItem.intCampAttacId)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={excel.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else if (
                                curItem?.attachmentUrl.includes("doc") ||
                                curItem?.attachmentUrl.includes("docx")
                              ) {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          deleteAPI(curItem.intCampAttacId)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={word.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else {
                                return (
                                  <li
                                    key={curItem.intCampAttacId}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    <span
                                      onClick={() =>
                                        deleteAPI(curItem.intCampAttacId)
                                      }
                                      className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                    >
                                      close
                                    </span>

                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={`${ATTACH_URL}${curItem?.attachmentUrl}`}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              }
                            })}
                        </ul>

                        <ul className="flex gap-x-2 flex-wrap">
                          {displayImage?.length > 0 &&
                            displayImage?.map((curItem, index) => {
                              if (curItem?.file.name.includes("pdf")) {
                                return (
                                  <li
                                    key={index}
                                    className="bg-gray-200 p-2 relative rounded-lg "
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          handleDelete(curItem.file)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={pdf.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else if (
                                curItem?.file.name.includes("xlsx") ||
                                curItem?.file.name.includes("xls")
                              ) {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          handleDelete(curItem.file)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={excel.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else if (curItem?.file.name.includes("csv")) {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg "
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          handleDelete(curItem.file)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={excel.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else if (
                                curItem?.file.name.includes("doc") ||
                                curItem?.file.name.includes("docx")
                              ) {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg"
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          handleDelete(curItem.file)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={word.src}
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              } else {
                                return (
                                  <li
                                    key={curItem.url}
                                    className="bg-gray-200 p-2 relative rounded-lg "
                                  >
                                    {curItem?.size !== "" && (
                                      <span
                                        onClick={() =>
                                          handleDelete(curItem.file)
                                        }
                                        className="material-icons-outlined icon-16 cursor-pointer absolute -right-2 -top-2 p-1 bg-gray-500 text-white rounded-full"
                                      >
                                        close
                                      </span>
                                    )}
                                    <img
                                      //src={`https://beta.goskribe.com/API/${curItem.url}`}
                                      src={
                                        curItem?.url.includes("blob")
                                          ? curItem.url
                                          : `${ATTACH_URL}${curItem.url}`
                                      }
                                      alt={`preview-${index}`}
                                      border="0"
                                      className="w-8 rounded-md object-cover"
                                    />
                                  </li>
                                );
                              }
                            })}
                        </ul>

                        <input
                          type="file"
                          id="file"
                          multiple
                          className="file-input ml-auto"
                          style={{ display: "none" }}
                          onChange={FileUpload}
                        />
                        <label
                          htmlFor="file"
                          className="ml-auto"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "#666",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          <img
                            width={22}
                            src="/assets/prompt-flow-attachment.webp"
                            alt="Attachment icon"
                          />
                        </label>
                      </div>
                      {/* <p className="text-gray-400 text-sm">
                        Max file size limit 20MB
                      </p> */}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-0 w-full lg:w-5/12 order-1 sm:order-1 md:order-1 lg:order-2 lg:mt-0">
            <h3 className="text-lg font-semibold text-gray-600 mb-0 leading-normal">
              ChatGPT Templates
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              Kickstart your PITCH with ChatGPT suggested template or create
              your own
            </p>
            <ul className="flex flex-row flex-wrap gap-x-2 gap-y-2 md:flex-wrap xl:gap-y-2">
              {templateData?.length > 0 &&
                templateData?.map((curItem, ind) => {
                  return (
                    <>
                      <li key={ind}>
                        <Link
                          onClick={() => {
                            if (previewData?.campaigns?.vchTemplateType) {
                              previewData.campaigns.vchTemplateType = null; // Or any other reset logic for previewData
                            }
                            updateType(curItem?.tempName);
                            setSelected(curItem.tempName);
                          }}
                          className={`
    ${
      previewData?.campaigns?.vchTemplateType === curItem?.tempName
        ? "bg-gray-300 text-gray-800"
        : selected === curItem.tempName
          ? "bg-gray-300 text-gray-800"
          : "text-purple-800"
    } 
    bg-gray-100 p-2 text-sm rounded-md inline-block px-4 border border-gray-300 hover:bg-gray-300 hover:text-gray-800 font-medium`}
                        >
                          {curItem.tempName}
                        </Link>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div> */}

          {/* Step - 3 Right Side Section */}
          <div
            className={`flex ${isPromptSent ? "justify-between" : "justify-center"} flex-col lg:w-1/2 bg-[#F8F9FC] rounded-md border border-black/20 p-2`}
          >
            <div>
              <h3 className="font-semibold text-sm">
                {isPromptSent ? "Hi there," : "What's New?"}
              </h3>

              <p className="mt-1 text-black/50 text-xs">
                Kickstart your PITCH with writing a prompt to me.
              </p>

              <p
                className={`${isPromptSent ? "block" : "hidden"} mt-2 bg-white p-2 rounded-lg border border-[#E5E5E5] text-[#434343] text-sm`}
              >
                {selectedPrompt}
              </p>
            </div>

            {/* Input box */}
            <div className="mt-4 relative bg-white border border-black/20 rounded-lg">
              <textarea
                ref={textareaRef}
                className="w-11/12 outline-none rounded-lg p-2 flex items-center resize-none text-xs text-gray-500"
                placeholder="Tell me what your email is about"
                rows={1}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (prompt.trim() && e.key === "Enter") {
                    e.preventDefault();
                    handlePromptSent();
                    textareaRef.current.blur();
                  }
                }}
              />

              <button
                className="group absolute bottom-[2px] right-1 cursor-pointer flex items-center bg-black rounded-lg p-1 px-2"
                type="button"
                aria-label="Send prompt"
                onClick={handlePromptSent}
              >
                <img
                  width={20}
                  src="/assets/prompt-flow-ai-button.webp"
                  alt="Write with AI Button icon"
                />
                <span className="group-hover:block hidden bg-black text-sm pl-1 text-white/70">
                  Create
                </span>
              </button>
            </div>

            {!prompt.trim() && !isPromptSent && (
              <div className="flex mt-2 flex-col gap-1 pl-24">
                {promptSuggestions.map((prompt) => {
                  return (
                    <button
                      key={prompt.id}
                      className="text-gray-500 cursor-pointer text-xs rounded-lg bg-white border border-black/20 p-2 truncate"
                      onClick={() => {
                        setPrompt(prompt.content);
                        setTimeout(() => {
                          if (textareaRef.current) {
                            textareaRef.current.style.height = "auto";
                            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                            textareaRef.current.focus();
                          }
                        }, 0);
                      }}
                    >
                      {prompt.content}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-full order-2 sm:order-2 md:order-2 lg:order-1 ">
            <div className="w-12/12 ">
              <h3 className="text-lg font-semibold text-gray-600 mb-0 mt-4 leading-normal">
                Step 4: Track your campaign to measure PR performance
              </h3>
              <p className="text-gray-400 text-xs mb-2">
                Add your brand name, company spokesperson to trigger automated
                web tracking
              </p>
              <div className="flex flex-col w-full  border border-gray-300 p-3 rounded-md bg-gray-50">
                <div className="flex w-[300px] relative">
                  <input
                    type="text"
                    className="border bg-white border-gray-300 p-2 rounded-md text-md focus:outline-none text-gray-500 rounded-r-none w-full text-sm"
                    placeholder="Enter brand keywords"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={30}
                  />
                  {/* <span className="absolute right-14 top-2 text-red-500 text-xl">
                    *
                  </span> */}
                  <input
                    type="submit"
                    value="Add"
                    className="cursor-pointer bg-[#002b5b] text-white py-2 px-2 rounded-r-md text-md focus:outline-none"
                    onClick={AddKeyword}
                  />
                </div>
                <p className="text-[10px] text-gray-400">
                  Character limit: {`${inputValue?.length ?? 0}/30`}
                </p>

                <div className="flex flex-wrap mt-2 ">
                  {preBrandMention?.length > 0 && (
                    <ul className="flex flex-wrap">
                      {preBrandMention?.map((curItem, ind) => {
                        return (
                          <li
                            key={`${ind}`} // Combining intcampKeyId and index
                            className="border mb-2 text-gray-500 border-gray-400 bg-gray-200 px-1 text-sm flex items-center mr-3 gap-x-2 rounded-md"
                          >
                            {curItem.vchCampaignKeyword
                              .charAt(0)
                              .toUpperCase() +
                              curItem.vchCampaignKeyword.slice(1).toLowerCase()}
                            <span
                              className="material-icons-outlined text-gray-500 icon-16 cursor-pointer"
                              onClick={() =>
                                deleteBrandKeyword(curItem.intcampKeyId)
                              }
                            >
                              close
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {brandMention?.length > 0 && (
                    <ul className="flex flex-wrap ">
                      {brandMention?.map((curItem, ind) => {
                        return (
                          <li
                            key={`${ind}`}
                            className="border mb-2 text-gray-500 text-sm border-gray-400 px-2 flex items-center mr-3 gap-x-2 rounded-md bg-white"
                          >
                            {curItem.charAt(0).toUpperCase() +
                              curItem.slice(1).toLowerCase()}
                            <span
                              className="material-icons-outlined text-gray-500 icon-14 cursor-pointer"
                              onClick={() => deleteMention(curItem)}
                            >
                              close
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-7/12 w-full">
              {isLoader ? (
                <button
                  disabled
                  className="p-3 bg-gradient-to-b from-gray-500 to-gray-400 rounded-lg text-white w-full text-center text-xl font-medium mt-4"
                >
                  Uploading...
                </button>
              ) : (
                <button
                  onClick={() => saveAndPreview(update)}
                  className="p-3 bg-[#002b5b] rounded-lg text-white  w-full text-center text-lg font-medium mt-4"
                >
                  Save your PITCH and review your Draft
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PitchCampaign;
