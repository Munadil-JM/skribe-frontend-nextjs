"use client";

// import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import TokenService from "../../Services/token.service";
import { LISTSENDMAIL } from "../../constants";
import useGetListSendMail from "../utils/useGetListSendMail";
import useEmailQuota from "../utils/useEmailQuota";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const PitchAList = ({
  open,
  onClose,
  selectedList,
  updateTracking,
  emailId,
  getMail,
}) => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const {
    quotaAdded,
    remainingQuota,
    monthlyEMailQuota,
    usedQuota,
    totalQuota,
    emailQuotaStatus,
  } = useEmailQuota();
  const { ccSuggestions, emailSignature, getmailCount, getEmail } =
    useGetListSendMail(selectedList);

  const [formData, setFormData] = useState({
    subject: "",
    editorContent: "",
    attachments: [],
    ccEmails: [],
  });

  const [errors, setErrors] = useState({
    subject: "",
    editorContent: "",
    attachments: "",
    ccEmails: "",
  });

  const [ccEmail, setCCEmail] = useState("");
  const [ccEmailList, setCCEmailList] = useState([]);
  let { email } = JSON.parse(localStorage.getItem("userInfo"));
  const [suggestions, setSuggestions] = useState([]);
  const [mailStatus, setMailStatus] = useState(true);
  const [mailSendStatus, setMailSendStatus] = useState(true);

  const handleCCEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      processTypedEmail();
    }
  };
  const processTypedEmail = () => {
    const cleanedEmail = ccEmail.replace(/[, ]+$/, "").trim(); // Remove trailing comma/space
    const isValidEmail = /\S+@\S+\.\S+/.test(cleanedEmail);

    if (isValidEmail && !ccEmailList.includes(cleanedEmail)) {
      setCCEmailList([...ccEmailList, cleanedEmail]);
    }

    setCCEmail(""); // Clear input field
  };
  const handleCCEmailChange = (e) => {
    const typedEmail = e.target.value;
    setCCEmail(typedEmail);

    const matchingEmails = ccSuggestions
      .filter(({ email }) => email.includes(typedEmail))
      .map(({ userName, email, id }) => ({
        label: `${userName} (${email})`,
        value: id,
      }));
    setSuggestions(matchingEmails);

    if (typedEmail.endsWith(",") || typedEmail.endsWith(" ")) {
      processTypedEmail();
    }
  };

  const handleSelectSuggestion = (selectedId) => {
    const selectedEmail = ccSuggestions.find(
      ({ id }) => id === selectedId
    ).email;
    setCCEmailList([...ccEmailList, selectedEmail]);
    setCCEmail("");
    setSuggestions([]);
  };

  const handleRemoveCCEmail = (removedId) => {
    const updatedList = ccEmailList.filter((record) => record !== removedId);
    setCCEmailList(updatedList);
  };

  const handleValidation = () => {
    const { subject, editorContent } = formData;
    const newErrors = {
      subject:
        subject.trim() === ""
          ? "Subject is required"
          : subject.length > 500
            ? "Subject must be 500 characters or less"
            : "",
      editorContent:
        editorContent.trim() === ""
          ? "Editor content is required"
          : editorContent.length > 10000000000000000
            ? "Editor content must be 10000000000000000 characters or less"
            : "",
    };

    setErrors(newErrors);
    return !(newErrors.subject || newErrors.editorContent);
  };

  const [uploadProgress, setUploadProgress] = useState({});

  const handleTestMail = () => {
    if (selectedList) {
      if (handleValidation()) {
        const { subject, editorContent, attachments, ccEmails } = formData;
        const formDataToSend = new FormData();
        formDataToSend.append("Subject", subject);
        formDataToSend.append("Body", editorContent);
        formDataToSend.append("FromMail", email);
        formDataToSend.append("MailType", "TestMail");
        formDataToSend.append("JournalistIds", selectedList);

        // formDataToSend.append(`To`, email);
        attachments.forEach((file, index) => {
          formDataToSend.append(`files`, file);
          console.log(file, "check attachement");
        });
        ccEmailList?.length > 0 &&
          ccEmailList.forEach((cc, index) => {
            formDataToSend.append(`CcEmails`, cc);
          });
        setMailStatus(false);
        axios
          .post(LISTSENDMAIL, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
            },
          })
          .then((output) => {
            if (output?.data?.response?.status === "Ok") {
              success("Mail has been sent to your Email id", "success");
              getMail();
            } else if (output?.data?.response?.status === "NotEnoughQuota") {
              warning(output.data.response.message, "warning");
            }
          })
          .catch((error) => {
            //for attachment only
            if (error?.response.data?.status === "BadRequest") {
              error(error?.response?.data?.message, "error");
            } else if (error?.response?.data?.status === "NotAccepted") {
              error(error.data.response.data.message, "error");
            } //body content limit
            else if (
              error?.response?.data?.status === "Request Size BadRequest"
            ) {
              error(error.data.response.data.message, "error");
            } else if (error?.response?.data?.status === "Error") {
              error("something went wrong!", "error");
            }
          })
          .finally(() => {
            setMailStatus(true);
            onClose();
          });
      }
    }
  };

  const removeAttachment = (index) => {
    const newAttachments = [...formData.attachments];
    newAttachments.splice(index, 1);

    const newUploadProgress = { ...uploadProgress };
    delete newUploadProgress[index];

    setFormData({ ...formData, attachments: newAttachments });
    setUploadProgress(newUploadProgress);
  };

  const handleSendMail = () => {
    if (selectedList) {
      if (handleValidation()) {
        const { subject, editorContent, attachments, ccEmails } = formData;
        console.log(ccEmailList, "check cc email when send");
        const formDataToSend = new FormData();
        formDataToSend.append("Subject", subject);
        formDataToSend.append("Body", editorContent);
        formDataToSend.append("MailType", "SendMail");
        formDataToSend.append("JournalistIds", selectedList);
        // emailId && emailId
        //   ? formDataToSend.append(`To`, emailId)
        //   : formDataToSend.append("ListId", selectedList);
        attachments.forEach((file, index) => {
          formDataToSend.append(`files`, file);
        });
        ccEmailList?.length > 0 &&
          ccEmailList.forEach((cc, index) => {
            formDataToSend.append(`CcEmails`, cc);
          });

        // ccEmailList.forEach((cc, index) => {
        //   formDataToSend.append(`To`, cc.email);
        // });
        setMailSendStatus(false);

        axios
          .post(LISTSENDMAIL, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
            },
          })
          .then((output) => {
            if (output?.data?.response?.status === "Ok") {
              success("Mail has been sent to your Email id", "success");
              getMail();
            } else if (output?.data?.response?.status === "NotEnoughQuota") {
              warning(output.data.response.message, "warning");
            }
          })
          .catch((error) => {
            //for attachment only
            if (error?.response.data?.status === "BadRequest") {
              error(error?.response?.data?.message, "error");
            } else if (error?.response?.data?.status === "NotAccepted") {
              error(error.data.response.data.message, "error");
            } //body content limit
            else if (
              error?.response?.data?.status === "Request Size BadRequest"
            ) {
              error(error.data.response.data.message, "error");
            } else if (error?.response?.data?.status === "Error") {
              error("something went wrong!", "error");
            }
          })

          .finally(() => {
            setMailSendStatus(true);
            onClose();
          });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleEditorChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setFormData({ ...formData, editorContent: content })
    setErrors({ ...errors, [name]: "" });
  };

  const handleCCClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      showCCInput: !prevData.showCCInput,
    }));
  };

  const handleRemoveAttachmentError = () => {
    setErrors({
      ...errors,
      attachments: "",
    });
  };

  const onDrop = (acceptedFiles) => {
    const maxFiles = 5;
    const allowedFormats = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
    ];
    const maxTotalSizeMB = 20; // Maximum total size in MB

    // Calculate the current total size of all uploaded files (existing + new)
    const currentTotalSize = formData.attachments.reduce(
      (total, file) => total + file.size,
      0
    );
    const newFilesTotalSize = acceptedFiles.reduce(
      (total, file) => total + file.size,
      0
    );

    // Check if total size exceeds 20 MB
    const totalSizeInMB =
      (currentTotalSize + newFilesTotalSize) / (1024 * 1024); // Convert size to MB
    if (totalSizeInMB > maxTotalSizeMB) {
      setErrors({
        ...errors,
        attachments: `Total attachment size cannot exceed ${maxTotalSizeMB} MB.`,
      });
      return;
    }

    if (acceptedFiles.length + formData.attachments.length > maxFiles) {
      setErrors({
        ...errors,
        attachments: `You can attach a maximum of ${maxFiles} files`,
      });
      return;
    }

    const newAttachments = [...formData.attachments];
    for (const file of acceptedFiles) {
      if (!allowedFormats.includes(file.type)) {
        setErrors({
          ...errors,
          attachments:
            "Invalid file format. Please attach only PDF, DOC, DOCX, JPG, JPEG, or PNG files.",
        });
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeInMB > 20) {
        setErrors({
          ...errors,
          attachments: "File size should be 20 MB or less.",
        });
        return;
      }

      newAttachments.push(file);
    }

    setFormData({ ...formData, attachments: newAttachments });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      "application/pdf, application/msword, image/png, image/jpeg, image/jpg",
    maxSize: 20 * 1024 * 1024, // 20 MB
    onDrop,
  });

  useEffect(() => {
    const signature = emailSignature ? `<br><br><br>${emailSignature}` : "";
    setFormData((prev) => ({
      ...prev,
      editorContent: signature,
    }));
  }, [emailSignature]);

  useEffect(() => {
    const signature = emailSignature ? `<br><br><br>${emailSignature}` : "";

    const initialContent = `Dear {JournalistName},<br><br>${signature}`;

    setFormData((prev) => ({ ...prev, editorContent: initialContent }));
  }, [emailSignature]);

  // console.log(emailSignature, "email signature");

  if (!open) return null;

  return (
    <div>
      <div className="fixed inset-0 z-[51] bg-gray-700 opacity-70"></div>
      {selectedList > 0 && (
        <div className="fixed left-1/2 top-1/2 z-[55] w-2/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200">
            <h2 className="text-md font-medium text-gray-600">Compose Mail</h2>
            <button onClick={onClose}>
              <span className="material-icons-outlined rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200">
                close
              </span>
            </button>
          </div>
          <div className="w-full">
            <div className="mt-2">
              <p className="flex text-sm items-center whitespace-nowrap rounded-md border-0 bg-gray-100 px-2 py-1 text-gray-500">
                <i className="material-icons">email</i>
                <span className="ml-2 text-xs">
                  Email Balance: {remainingQuota}
                </span>
              </p>
            </div>
            <div className="relative mt-2 ">
              <input
                disabled
                type="text"
                //value={`${getEmail} ${getmailCount} others`}
                value={
                  emailId && emailId
                    ? emailId
                    : getmailCount > 0
                      ? `${getEmail} ${getmailCount} others`
                      : getEmail
                }
                className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-400 focus:outline-0"
              />
              <span
                className="absolute right-2 top-1.5 cursor-pointer rounded-md bg-gray-200 px-1 text-xs"
                onClick={handleCCClick}
                title="Add Cc"
              >
                Cc
              </span>
            </div>
            {formData.showCCInput && (
              <div className="relative mt-2 flex rounded-md border border-gray-300  px-1 ">
                <div className="flex w-full flex-wrap gap-x-2 p-1">
                  {ccEmailList.map((curElem) => (
                    <div
                      key={curElem}
                      className="mb-1 mt-1 flex items-center justify-between gap-x-2 self-start rounded-md border border-gray-400 p-1"
                    >
                      <span className="text-xs">{curElem}</span>
                      <i
                        className="icon-14 material-icons cursor-pointer"
                        onClick={() => handleRemoveCCEmail(curElem)}
                      >
                        close
                      </i>
                    </div>
                  ))}

                  <input
                    className="flex-auto text-sm text-gray-400 focus:outline-0"
                    type="text"
                    id="ccEmail"
                    value={ccEmail}
                    onChange={handleCCEmailChange}
                    onKeyDown={handleCCEmailKeyDown}
                  />
                </div>
                {suggestions.length > 0 && (
                  <ul className="absolute left-0 top-7 z-50 h-28 w-full overflow-y-scroll rounded-lg bg-gray-100 p-2 text-xs">
                    {suggestions.map(({ label, value }) => (
                      <li
                        className="mb-[5px] cursor-pointer px-1"
                        key={value}
                        onClick={() => handleSelectSuggestion(value)}
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <div className="mt-2">
              <input
                className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-400 focus:outline-0"
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
              />
              <span className=" text-sm text-red-500">{errors.subject}</span>
            </div>
            <div className="hide-tiny-logo  mt-2">
              {/* <Editor
                //apiKey="8bwj7g96r90tqyf450qpfruhk67uiuk7cwaa0k1xh5c76y2z"
                apiKey="9zxxwm37t84lnkxqjnlav4c9kmcpvffvkk2h9gfzldehjc6w"
                name="editorContent"
                value={formData.editorContent}
                init={{
                  height: 250,
                  menubar: false,
                  newline_behavior: "invert",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                }}
                onEditorChange={(content) =>
                  setFormData({ ...formData, editorContent: content })
                }
                // onChange={handleEditorChange}
              /> */}

              <div className="mt-1 relative h-[220px]">
                <span className="absolute right-2 -top-8 text-red-500 text-xl">
                  *
                </span>
                {/* <ReactQuill
                  theme="snow"
                  value={formData.editorContent}
                  onChange={(content) => {
                    setFormData({
                      ...formData,
                      editorContent: content,
                    });
                  }}
                  className="w-full rounded-lg focus:outline-none text-lg text-gray-500 resize-none h-[250px]"
                  style={{ fontFamily: "Poppins" }}
                /> */}
                <ReactQuill
                  theme="snow"
                  value={formData.editorContent}
                  onChange={(content) => {
                    setFormData({
                      ...formData,
                      editorContent: content,
                    });
                  }}
                  className="w-full rounded-lg focus:outline-none text-lg text-gray-500 resize-none h-[180px]"
                  style={{ fontFamily: "Poppins" }}
                />
              </div>
              <span className="text-sm text-red-500">
                {errors.editorContent}
              </span>
            </div>
          </div>

          <div>
            {formData.attachments.length > 0 && (
              <div>
                <ul className="mt-2 flex h-16 flex-wrap gap-x-3 overflow-y-scroll">
                  {formData.attachments.map((file, index) => (
                    <li
                      key={index}
                      className=" mb-[5px] flex items-center justify-between gap-x-2 self-start rounded-md bg-gray-100 p-1"
                    >
                      <span className="text-xs">{file.name}</span>
                      {uploadProgress[index] !== undefined && (
                        <span className="ml-2.5">{`${uploadProgress[index]}%`}</span>
                      )}
                      <i
                        className="icon-14 material-icons cursor-pointer"
                        onClick={() => removeAttachment(index)}
                      >
                        close
                      </i>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <span className="text-sm text-red-500">{errors.attachments}</span>
          </div>

          <div className="flex gap-x-2 mt-4">
            {!mailStatus ? (
              <span className="whitespace-nowrap text-xs rounded-[5px] border border-gray-400 px-3 py-1  text-gray-400">
                Sending...
              </span>
            ) : (
              <button
                className="whitespace-nowrap text-xs rounded-[5px] border border-gray-400 px-3  text-gray-400  hover:border-gray-800 hover:text-gray-800"
                onClick={handleTestMail}
              >
                Test Mail
              </button>
            )}
            {!mailSendStatus ? (
              <span className="whitespace-nowrap text-xs rounded-[5px] border border-gray-400 px-3 text-gray-400 pt-[6px]">
                Sending...
              </span>
            ) : (
              <button
                className="whitespace-nowrap text-xs rounded-[5px] border border-gray-400 px-3 text-gray-400  hover:border-gray-800 hover:text-gray-800"
                onClick={handleSendMail}
              >
                Send
              </button>
            )}

            <button
              className="whitespace-nowrap text-xs rounded-[5px] border border-gray-400 px-3  text-gray-400  hover:border-gray-800 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <div
              {...getRootProps()}
              className="mr-2.5 inline-block -rotate-[90deg]"
            >
              <input {...getInputProps()} />
              <div>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-600"
                >
                  <i
                    className="material-icons"
                    onClick={handleRemoveAttachmentError}
                  >
                    attachment
                  </i>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {(selectedList === null || selectedList === "") && (
        <div className="absolute left-1/2 top-1/2 z-[51] w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p>Please select the list you wish to email</p>
            <button onClick={onClose}>
              <span className="material-icons-outlined rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200">
                close
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchAList;
