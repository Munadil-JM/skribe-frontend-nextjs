"use client";

import { useEffect, useState } from "react";
import userService from "../../../Services/user.service";
import {
  ATTACH_URL,
  CAMPAIGN_KEYWORDS,
  CAMPAIGN_SEND_MAIL,
  CREATE_CAMPAIGN,
  DELETE_ATTACHMENT,
  DELETE_BRAND_KEYWORD,
  GET_ATTACH,
  GET_ATTACHMENTS,
  GET_PREVIEW,
  GETCAMPAIGNLIST,
  GETEMAILQUOTA,
  LIST_BREAKDOWN,
  SAVE_ATTACHMENTS,
  UPDATE_CAMPAIGN,
} from "../../../constants";
import axios from "axios";
import tokenService from "../../../Services/token.service";
// import { Editor } from "@tinymce/tinymce-react";
import { useRouter, useParams } from "next/navigation";
import { TemplateFormat } from "../PickTemplate/TemplateFormat";
// import { debug } from "util";
import PreviewData from "./PreviewData";
import CampaignDetail from "./CampaignDetail";
import MediaList from "./MediaList";
import PitchCampaign from "./PitchCampaign";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const CreateCampaign = ({ campaignId, mailerType, update, listId }) => {
  //NEW CODE FOR CREATE CAMPAIGN START
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignList, setCampaignList] = useState([]);
  const [token, setToken] = useState("");
  const [type, setType] = useState(""); // Initially set type state
  const [selectedListId, setSelectedListId] = useState(null);

  const [flag, setFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [listBreak, setListBreak] = useState({
    count: null,
    locationCount: null,
    outletCount: null,
  });
  const [campaignIds, setCampaignIds] = useState("");
  const [previewData, setPreviewData] = useState({});
  const [mailStatus, setMailStatus] = useState(false);
  const [trackingId, setTrackingId] = useState();

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  //CAMPAIGN LIST BREAK DOWN STATS START
  const listBreakDown = () => {
    if (!selectedListId) return;
    let LIST_BREAK = `${LIST_BREAKDOWN}?ListId=${selectedListId}`;
    // setIsLoading(true);
    userService
      .get(LIST_BREAK)
      .then((curData) => {
        if (curData?.response?.status === "Ok") {
          setListBreak(curData?.data);
        }
      })
      .catch((err) => console.log("List break down api not working", "error"))
      .finally(() => {});
  };
  //CAMPAIGN LIST BREAK DOWN STATS END

  const router = useRouter();
  // const [file, setFile] = useState(null);
  const [displayImage, setDisplayImage] = useState([]);
  //following state to send data on mail as a image url in array start
  const [storeImages, setStoreImages] = useState([]);
  const [storeImageSize, setStoreImageSize] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [errors, setErrors] = useState("");
  const [remainingQuota, setRemainingQuota] = useState(null);

  const [campaignInput, setCampaignInput] = useState({
    campaign_Name: "",
    campaignDescription: "",
    campaign_Type: "",
  });

  const [formData, setFormData] = useState({
    subject: "",
    editorContent: "",
    //  attachments: [],
  });
  const [brandMention, setBrandMention] = useState([]);
  const [preBrandMention, setPreBrandMention] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [attachment, setAttachment] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  //   const type = decodeURIComponent(mailerType); // Replace with any type you want to filter

  const allowedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "csv",
  ]; // Added Excel formats
  const totalSizeLimit = 28; // 28 MB for all files combined
  const fileSizeLimit = 20; // 28 MB for all files combined

  const handleDelete = (fileToDelete) => {
    // Remove the file from the attachment list
    setAttachment((prevAttachment) =>
      prevAttachment.filter((file) => file.name !== fileToDelete.name)
    );

    // Remove the file from the displayImage list
    setDisplayImage((old) =>
      old.filter((curItem) => {
        if (curItem.file) {
          return curItem.file.name !== fileToDelete.name;
        } else {
          return curItem;
        }
      })
    );
  };

  const deleteAPI = (id) => {
    // Construct the delete URL
    let deleteUrl = `${DELETE_ATTACHMENT}?AttachId=${id}`;

    // Perform the delete operation
    userService
      .delete(deleteUrl)
      .then((curItem) => {
        // Check if the deletion was successful
        if (curItem?.status === "Success") {
          // Update the state to remove the deleted image
          setStoreImages((prevStoreImage) => {
            const updatedImages = prevStoreImage.filter(
              (item) => item.intCampAttacId !== id
            );

            return updatedImages;
          });

          // Fetch the updated attachments after deletion (optional)
          getAttachment(campaignId);
        }

        // Handle case if the attachment is not found
        if (curItem?.status === "NotFound") {
          error(curItem?.message, "error");
        }
      })
      .catch((err) => {
        // Handle any errors that occur during the delete process
        console.log(err.message);
      })
      .finally(() => {
        // Any finalization code if needed
      });
  };

  // Function to calculate size of a string (subject and editor content)
  const calculateStringSize = (str) => {
    // Convert the string to a Blob and calculate the size in bytes
    const sizeInBytes = new Blob([str]).size;

    // Convert bytes to megabytes (MB)
    const sizeInMB = sizeInBytes / (1024 * 1024);

    return sizeInMB;
  };

  const FileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 🚨 Check for specific special characters: \ / : * ? < > |
    const specialCharFiles = selectedFiles.filter((file) =>
      /[\\\/:*?<>|]/.test(file.name)
    );

    if (specialCharFiles.length > 0) {
      warning(
        "File names should not contain special characters: \\ / : * ? < > |",
        "warning"
      );
      return;
    }

    if (specialCharFiles.length > 0) {
      warning("File names should not contain special characters.", "warning");
      return; // Stop further execution
    }
    // Check if the total file count (including current and existing files) exceeds the limit
    if (displayImage.length + selectedFiles.length + storeImages.length > 5) {
      warning("You can attach a maximum of 5 files", "warning");
      return;
    }

    const uploadCheck = selectedFiles.reduce(
      (sum, file) => sum + file.size / (1024 * 1024),
      0
    );

    const serverImagesSize = [...storeImageSize].reduce(
      (sum, file) => sum + file,
      0
    );

    const imageOverLimit = [...displayImage].reduce(
      (sum, file) => sum + file.file.size / (1024 * 1024),
      0
    );
    if (uploadCheck + imageOverLimit + serverImagesSize > fileSizeLimit) {
      let totalFileMB = uploadCheck + imageOverLimit + serverImagesSize; // Convert to MB

      let inMB = totalFileMB.toFixed(2);

      // setError(
      //   `The file size exceeds the allowed limit of ${fileSizeLimit} MB. and it's currently ${inMB} MB.`
      // );
      setErrors(`The maximum permissible file size is ${inMB} MB`);
      return;
    }

    const editorContentString = formData.editorContent.toString();
    const subjectContenetString = formData.subject.toString();
    // Check if overall size exceeds the limit (files + subject + content)
    const overallSize =
      uploadCheck +
      serverImagesSize +
      calculateStringSize(editorContentString) +
      calculateStringSize(subjectContenetString);

    // formData.editorContent.toString();

    if (overallSize > totalSizeLimit) {
      setErrors(
        `The total size (files, subject, and content) should not exceed ${
          totalSizeLimit / 1024 / 1024
        } MB.`
      );
      return;
    }

    setErrors(""); // Clear previous errors

    // Get the list of attachment names from storeImages
    const attachmentNames = storeImages?.map(
      (curItem) => curItem.attachmentName
    );

    // Check if there are any duplicates between selected files and files already in storeImages
    const duplicateStoreCheck = selectedFiles.filter((file) =>
      attachmentNames.includes(file.name)
    );

    if (duplicateStoreCheck.length > 0) {
      // Alert if duplicate files exist
      warning("This file has already been uploaded", "warning");
      return; // Stop further execution
    }

    // Check for duplicates with the existing files (attachment array)
    const duplicateFiles = selectedFiles.filter((file) =>
      attachment.some((existingFile) => existingFile.name === file.name)
    );

    if (duplicateFiles.length > 0) {
      // Alert if duplicate files exist
      warning("This file has already been uploaded", "warning");
      return; // Stop further execution
    }

    // Validate file extensions and filter valid files
    const validatedFiles = selectedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setErrors(
          `Only files with extensions ${allowedExtensions.join(
            ", "
          )} are allowed.`
        );
        return false;
      }
      return true;
    });

    // Add validated files to display images
    if (validatedFiles.length > 0) {
      const newImages = validatedFiles?.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setDisplayImage((prevImages) => [...prevImages, ...newImages]);
    }

    // Update attachment state with validated files
    setAttachment((prevAttachments) => [...prevAttachments, ...validatedFiles]);
  };

  const saveAttachments = async (campaignIds) => {
    const formData = new FormData();
    formData.append("id", campaignIds);

    // Ensure unique files based on file name and size (or other attributes like hash if needed)
    const uniqueFiles = [];
    const fileMap = new Map(); // Store files in a map using name+size as the key to prevent duplicates

    attachment.forEach((file) => {
      const key = `${file.name}-${file.size}`; // Create a unique key based on name and size
      if (!fileMap.has(key)) {
        fileMap.set(key, file);
        uniqueFiles.push(file);
      }
    });

    // Append unique files to the formData
    uniqueFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(SAVE_ATTACHMENTS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
        },
      });

      if (response?.status === 201) {
        setIsOpen(true);
        document.body.classList.add("overflow-hidden");
        setAttachment([]);
      } else {
        error(response?.message, "error");
      }
    } catch (err) {
      error(err.message, "error");
    }
  };

  // const formDataToSend = new FormData();
  const convertFiles = async () => {
    try {
      if (storeImages && storeImages.length > 0) {
        const imageSizes = [];
        const promises = storeImages?.map(async (image) => {
          const imageUrl = image.attachmentUrl.split("/")[1];
          try {
            const response1 = await axios.get(`${GET_ATTACH}/${imageUrl}`, {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${tokenService.getLocalAccessToken()}`, // Include the authorization token
              },
            });
            if (response1.status !== 200) {
              throw new Error("Failed to fetch image");
            }
            const blob = response1.data;
            const sizeInMB = blob.size / (1024 * 1024); // Convert from bytes to MB
            imageSizes.push(sizeInMB);

            // const file = new File([blob], image.attachmentName, {
            //   type: blob.type,
            // });
            // formDataToSend.append("files", file);
          } catch (err) {
            error(`${image.attachmentName}`, "error");
          }
        });
        await Promise.all(promises);
        setStoreImageSize(imageSizes);
      } else {
        console.log("No images to process.");
      }
    } catch (err) {
      error(err, "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (storeImages?.length > 0) {
        await convertFiles();
      }
    };

    fetchData();
  }, [storeImages]);

  // Helper function to reset form

  const saveAndPreview = async (update) => {
    const trimmedCampaignName = campaignInput.campaign_Name?.trim();
    // const trimmedCampaignDescription =
    //   campaignInput.campaignDescription?.trim();
    // Validate necessary fields

    // Handle new campaign creation
    if (!update) {
      if (selectedListId === null) {
        warning(
          "Step 1: Please specify the media list you wish to pitch",
          "warning"
        );
        return;
      }
      if (
        !trimmedCampaignName ||
        !campaignInput.campaign_Type
        // !trimmedCampaignDescription ||
      ) {
        warning("Step 2: Every campaign needs a name, type", "warning");
        return;
      }
      if (trimmedCampaignName?.length < 3) {
        warning(
          "Step 2: Campaign name needs to be at least 3 characters",
          "warning"
        );
        return;
      }
      // if (trimmedCampaignDescription.length < 5) {
      //   warning(
      //     "Step 2: Campaign description needs to be at least 5 characters",
      //     "warning"
      //   );
      //   return;
      // }

      const imageOverLimit = [...displayImage].reduce(
        (sum, file) => sum + file.file.size,
        0
      );
      const imageOverLimitInMB = imageOverLimit / (1024 * 1024);

      let limitCheck = imageOverLimitInMB > 20;

      // Calculate size of subject, editor content, and brand mentions (in MB)
      const subjectSizeMB = calculateStringSize(formData.subject); // Size in MB
      const editorContentSizeMB = calculateStringSize(formData.editorContent); // Size in MB
      const brandMentionSizeMB = calculateStringSize(brandMention.join(" ")); // Size in MB

      // Calculate overall size in MB
      const overallSizeMB =
        subjectSizeMB +
        editorContentSizeMB +
        brandMentionSizeMB +
        imageOverLimit / (1024 * 1024);

      if (limitCheck) {
        warning(
          "Step 3: One or more images exceed the 20MB size limit.",
          "warning"
        );
        return;
      }

      if (overallSizeMB > 28) {
        // 28MB in bytes
        warning(
          "Step 3: Total size (files + subject + content + brand mentions) exceeds the 28MB limit.",
          "warning"
        );
        return;
      }

      // Handle new campaign creation
      if (!formData.subject) {
        warning(
          "Step 3: Please enter the Subject line for your email",
          "warning"
        );
        return;
      }
      // if (brandMention.length === 0) {
      //   warning(
      //     "Step 4: Enter the brand keywords you wish to track through this campaign",
      //     "warning"
      //   );
      //   return;
      // }
      if (!formData.editorContent) {
        warning("Step 3: Please enter the content of your pitch", "warning");
        return;
      }

      // Prepare data for campaign creation
      const createData = {
        campaign_Name: campaignInput.campaign_Name,
        campaignDescription: campaignInput.campaignDescription,
        campaign_Type: campaignInput.campaign_Type,
        intCampListId: selectedListId,
        vchSubject: formData.subject,
        vchBody: formData.editorContent,
        vchTemplateType: type || "blank",
        campaignKeyWord: brandMention,
      };

      setIsLoader(true);
      try {
        const dataSubmit = await userService.post(CREATE_CAMPAIGN, createData);
        if (dataSubmit?.response?.status === "Ok") {
          setCampaignIds(dataSubmit?.newCampId);

          // Save attachments only if there are attachments
          if (displayImage?.length > 0) {
            await saveAttachments(dataSubmit?.newCampId);
            setDisplayImage([]);

            // Only call getAttachment if attachments were saved
            await getAttachment(dataSubmit?.newCampId);
          }

          setIsOpen(true);
          document.body.classList.add("overflow-hidden");
          success("Campaign created successfully", "success");

          // Reset input fields
          resetForm();
        } else if (dataSubmit?.status === "Already") {
          warning("Campaign name already exists", "warning");
        }
      } catch (err) {
        error(err.message, "error");
      } finally {
        setIsLoader(false);
      }
    } else {
      // Handle campaign update
      if (!formData.subject && !formData.editorContent) {
        warning(
          "Step 2: Please enter the Subject line for your email and the content of your pitch",
          "warning"
        );
        return;
      }

      const updateData = {
        vchCampaignName: campaignInput.campaign_Name,
        vchCampaignDesc:
          campaignInput.campaignDescription?.length > 0
            ? campaignInput.campaignDescription
            : "",
        intCampListId: selectedListId,
        vchCampaignType: campaignInput.campaign_Type,
        vchSubject: formData.subject,
        vchBody: formData.editorContent,
        btIsSent: false,
        vchTemplateType: type,
      };

      setIsLoader(true);
      try {
        const curData = await userService.put(
          `${UPDATE_CAMPAIGN}?id=${campaignId}`,
          updateData
        );
        if (curData?.status === "Success") {
          // Only save and get attachments if necessary
          if (displayImage?.length > 0) {
            await saveAttachments(campaignId);

            // Only call getAttachment if attachments were saved or updated
            await getAttachment(campaignId);
          }
          success("Campaign updated Successfully", "success");
          setIsOpen(true);
          document.body.classList.add("overflow-hidden");

          if (brandMention.length > 0) {
            await updateKeyword(campaignId);
          }

          await campdata(campaignId);
          setBrandMention([]);
        }
      } catch (err) {
        error(err.message, "error");
      } finally {
        setIsLoader(false);
      }
    }
  };

  const resetForm = () => {
    setCampaignInput({
      campaign_Name: "",
      campaignDescription: "",
      campaign_Type: "",
    });
    setFormData({
      subject: "",
      editorContent: "",
    });
    setBrandMention([]);
    setSelectedListId(null);
  };

  const updateKeyword = async (cmpId) => {
    setIsLoading(true);

    const url = `${CAMPAIGN_KEYWORDS}?CampId=${cmpId}`;
    const keyword = { campaignKeyWord: brandMention };

    try {
      const response = await userService.post(url, keyword);

      // Destructure the response for clarity
      const { status, message } = response?.response || {};

      if (status === "Ok") {
        setBrandMention([]);
      } else {
        // Handle the case where the response status isn't "Ok"
        error(message, "error");
      }
    } catch (err) {
      // Provide a more descriptive error message
      // error(err?.response?.data?.message, "error");
      error(
        "An error occurred while updating the keyword. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getAttachment = (campId) => {
    const url = `${GET_ATTACHMENTS}/${campId}`;
    setIsLoading(true);
    userService
      .get(url)
      .then((data) => {
        if (data?.response?.status === "Ok") {
          setStoreImages(data?.attachments);
        }

        if (data?.response?.status === "NotFound") {
          error(data?.response?.message, "error");
        }
      })
      .catch((err) => {
        console.log(err.message, "error from getAttachment");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const campdata = (campId) => {
    const url = `${GET_PREVIEW}?CampId=${campId}`;
    setIsLoading(true);
    userService
      .get(url)
      .then((data) => {
        if (data?.response?.status === "Ok") {
          setPreviewData(data);
          setPreBrandMention(data?.campaigns?.keyWords);
          setFormData({
            subject: data?.campaigns?.vchSubject,
            editorContent: data?.campaigns?.vchBody,
          });
        }

        if (storeImages.length > 0) {
          getAttachment(campId);
        }
      })
      .catch((err) => {
        error(err.message, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (update === "update" && !flag) {
      campdata(campaignId);
      setFlag(true);
    } else {
      if (campaignIds) {
        campdata(campaignIds);
      }
    }
  }, [campaignIds, campaignId]); // Add campaignId here

  // Handle add keyword click
  const AddKeyword = (e) => {
    e.preventDefault();

    // Trim input to ensure no leading/trailing spaces
    const sanitizedInput = inputValue.trim();

    // Check if input is too short
    if (sanitizedInput.length < 3) {
      warning("Please enter at least 3 characters to add a brand.", "warning");
      setInputValue(""); // Clear the input field
      return; // Exit early to avoid further checks
    }

    // Check if the brand has already been added
    if (brandMention?.includes(sanitizedInput)) {
      warning("Brand already added!", "warning");
      setInputValue(""); // Clear the input field
      return; // Exit early
    }

    // Add the new brand to the list
    setBrandMention((prev) => [...prev, sanitizedInput]);

    // Clear the input field after adding the brand
    setInputValue("");
  };

  const deleteMention = (brandName) => {
    // Filter out the brand to delete
    const updatedBrands = brandMention.filter((brand) => brand !== brandName);
    setBrandMention(updatedBrands);
  };

  //WRITE NEW CODE FOR CREATE CAMPAIGN START
  let url = `${GETCAMPAIGNLIST}?pageSize=20`;

  const campList = () => {
    setIsLoading(true);

    userService
      .get(url)
      .then((curData) => {
        if (curData?.response?.status === "Ok") {
          setCampaignList((prev) => {
            if (campaignList?.length > 0) {
              return [...prev, ...curData?.lists];
            }
            return [...curData?.lists];
          });
          // setCampaignList((prevList) => [...prevList, ...curData?.lists]);
          const nextToken = curData?.nextpagetoken?.token;
          setToken(nextToken && nextToken !== "" ? nextToken : "");
        }
      })
      .catch((err) => {
        error(
          "An error occurred while fetching data. Please try again.",
          "error"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCheckboxChange = (listId) => {
    setSelectedListId((prevSelectedId) =>
      prevSelectedId === listId ? null : listId
    );
  };

  const handleScroll = () => {
    if (token) {
      url += `&token=${encodeURIComponent(token)}`;
      campList(); // Pass URL with token to the campList function
    }
  };

  // Fetch remaining email quota
  const getMailQuota = () => {
    userService
      .get(GETEMAILQUOTA)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setRemainingQuota(result?.data?.remainingQuota);
        }
      })
      .catch((err) => {
        error(err?.message, "error");
      });
  };

  // Initial API call when component mounts
  useEffect(() => {
    campList();
    getMailQuota();
  }, []);

  useEffect(() => {
    if (listId) {
      setSelectedListId(Number(listId));
    }
  }, [listId]);

  // Trigger listBreakDown based on selectedListId and update flag
  useEffect(() => {
    if (selectedListId !== null && update === "update") {
      listBreakDown();
    } else if (selectedListId) {
      listBreakDown();
    }
  }, [selectedListId, update]);

  useEffect(() => {
    if (remainingQuota > 0 && listBreak && listBreak?.count > remainingQuota) {
      warning(
        "You have insufficient email credits. Please contact your account manager to add email credits so you can execute this campaign.",
        "warning"
      );
    }
  }, [listBreak, remainingQuota]);

  const templateData = [
    { tempName: "Start it Blank" },
    {
      tempName: "Company Introduction",
    },
    {
      tempName: "Founder Profiling",
    },
    {
      tempName: "Event Invitation",
    },
    {
      tempName: "Product Launch",
    },
    {
      tempName: "Rebranding Announcement",
    },
    {
      tempName: "Hiring Announcements",
    },
    {
      tempName: "Funding Announcements",
    },
    {
      tempName: "Geographical Expansion",
    },
    {
      tempName: "Trends Reports",
    },
    {
      tempName: "Milestone Achievements",
    },
  ];

  const filterDataByType = (type) => {
    return TemplateFormat.filter((obj) => obj.trmptype === type);
  };

  // Update filtered data whenever the type changes
  useEffect(() => {
    if (type) {
      const filtered = filterDataByType(type);
      setFilteredData(filtered); // Set the filtered data based on type
    }
  }, [type]);

  // Update the editor content when filteredData changes
  useEffect(() => {
    if (filteredData?.length) {
      setFormData({ ...formData, editorContent: filteredData[0]?.html || "" });
    }
  }, [filteredData]);

  // Handle type change (on click)
  const updateType = (newType) => {
    setType(newType);
  };

  const flowCondition = () => {
    if (
      previewData?.campaigns?.vchCampaignName ||
      previewData?.campaigns?.campaign_Type ||
      previewData?.campaigns?.vchCampaignDesc ||
      previewData?.campaigns?.listId !== null
      //   previewData?.campaigns?.listId !== undefined
    ) {
      // document.body.classList.add("overflow-hidden");
      setCampaignInput((old) => {
        return {
          campaign_Name: previewData?.campaigns?.vchCampaignName,
          campaign_Type: previewData?.campaigns?.vchCampaignType,
          campaignDescription: previewData?.campaigns?.vchCampaignDesc,
        };
      });
      setSelectedListId(previewData?.campaigns?.listId || null);
      setFormData((old) => {
        return {
          subject: previewData?.campaigns?.vchSubject,
          editorContent: previewData?.campaigns?.vchBody,
        };
      });
    } else if (previewData?.campaigns?.keyWords) {
      setPreBrandMention(previewData?.campaigns?.keyWords);
    }
    // else if (previewData?.campaigns?.vchBody) {
    //   setFormData((old) => {
    //     return {
    //       editorContent: previewData?.campaigns?.vchBody || "Default Content",
    //     };
    //   });
    // }
    // else if (previewData?.campaigns?.vchSubject) {

    // }
  };

  useEffect(() => {
    if (Object.keys(previewData).length > 0) {
      flowCondition();
    }
  }, [previewData]);

  const deleteBrandKeyword = (id) => {
    let deleteUrl = `${DELETE_BRAND_KEYWORD}?keyWordId=${id}`;

    userService
      .delete(deleteUrl)
      .then((curItem) => {
        if (curItem?.response?.status === "Ok") {
          campdata(campaignId);
          success(curItem?.response?.message, "success");
        }
      })
      .catch((err) => {
        error(err, "error");
      })
      .finally(() => {});
  };

  const editPreview = (campId, campType) => {
    setIsOpen(false); // Close the modal
    document.body.classList.remove("overflow-hidden");
    router.push(`/create-campaign/${campId}/${campType}/update`);
    setDisplayImage([]);
    if (update === "update") {
      campdata(campaignId);
      setDisplayImage([]);
    }
  };

  const { email } = JSON.parse(localStorage.getItem("userInfo"));

  const testMail = async (test = "test") => {
    try {
      if (test === "send") {
        if (listBreak.count > remainingQuota) {
          warning(
            "Your do not have enough credits to pitch this list. Please contact your account manager for additional credits",
            "warning"
          );
          return;
        }
      }
      setMailStatus(true);
      const formDataToSend = new FormData();

      // If storeImages contains any images, process them
      if (storeImages && storeImages.length > 0) {
        // Wait for all image fetch operations to complete
        await Promise.all(
          storeImages?.map(async (image) => {
            const imageUrl = image.attachmentUrl.split("/")[1];

            // Fetch image as a blob
            const response1 = await axios.get(`${GET_ATTACH}/${imageUrl}`, {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
              },
            });

            // Ensure the response is successful
            if (response1.status !== 200) {
              throw new Error("Failed to fetch image");
            }

            // Create a file object from the blob
            const blob = response1.data;
            const file = new File([blob], image.attachmentName, {
              type: blob.type,
            });

            // Append the file to the FormData object
            formDataToSend.append("files", file);
          })
        );
      }

      // Append other form data fields
      formDataToSend.append("FromMail", email);
      // formDataToSend.append(
      //   "ListId",
      //   test === "test" ? 0 : previewData?.campaigns?.listId
      // );
      formDataToSend.append(
        "MailType",
        test === "test" ? "TestMail" : "ListMail"
      );
      formDataToSend.append("Subject", previewData?.campaigns?.vchSubject);
      formDataToSend.append("Body", previewData?.campaigns?.vchBody);
      formDataToSend.append("CampaignId", previewData?.campaigns?.bgintcampid);

      const pitchUrl = CAMPAIGN_SEND_MAIL;

      // Send the email via axios
      const response = await axios.post(pitchUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
        },
      });

      if (response?.data?.status === "Ok") {
        if (test === "send") {
          if (test === "send") {
            success("Your email has been sent", "success");
          }
          setIsOpen(false);
          document.body.classList.remove("overflow-hidden");
          router.push(`/campaign-summary`);
        } else if (test === "test") {
          getMailQuota();
          success(
            "A test email has been sent to your registered email ID",
            "success"
          );
        }
      } else if (response?.data?.status === "NotEnoughQuota") {
        warning(
          "Your do not have enough credits to pitch this list. Please contact your account manager for additional credits.",
          "warning"
        );
      }
    } catch (err) {
      if (err?.response?.data?.status === "NotAccepted") {
        warning("Something went wrong", "warning");
        console.log(err?.response?.data, "not accepted");
      }

      if (err?.response?.status === "Request Size BadRequest") {
        warning(err?.response.message, "warning");
      }
      if (err?.response?.status === "NotAccepted") {
        warning(err?.response.message, "warning");
      }
      if (err?.response?.status === "BadRequest") {
        error(err?.response.message, "error");
      }
    } finally {
      setMailStatus(false);
    }
  };

  const goBack = () => {
    router.push("/media-lists");
  };

  const updateBack = () => {
    router.push("/campaign-summary");
  };

  return (
    <>
      {isOpen && (
        <PreviewData
          testMail={testMail}
          mailStatus={mailStatus}
          previewData={previewData}
          campaignId={campaignId}
          mailerType={mailerType}
          storeImages={storeImages}
          listBreak={listBreak}
          remainingQuota={remainingQuota}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            document.body.classList.remove("overflow-hidden");
            const segments = window.location.pathname.split("/");
            segments.pop();
            // const newPath = segments.join("/");
            // const finalPath = newPath && `/${newPath}/campaign-summary`;
            const finalPath = "/campaign-summary";
            router.push(finalPath);

            setCampaignInput({
              campaign_Name: "",
              campaignDescription: "",
              campaign_Type: "",
            });
          }}
          updateCampaign={campaignId}
          editPreview={editPreview}
        />
      )}
      {isLoading && update === "update" && (
        <div className="bg-gray-500 bg-opacity-40 fixed inset-0 z-50 flex justify-center items-center">
          Loading...
        </div>
      )}
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209, 213, 219)" }}
      >
        <div className="flex flex-wrap items-center justify-between bg-white p-3 pl-8 pr-0">
          <ul className="flex items-center gap-x-1 text-xs text-gray-400">
            <li className="flex items-center">
              Home
              <span className="material-icons-outlined b-font text-gray-400">
                navigate_next
              </span>
            </li>
            <li className="flex items-center">
              {update ? "Update Campaign" : "Create Campaign"}
            </li>
          </ul>
        </div>
      </section>
      <div className="w-full xl:w-11/12 md:p-6 md:pt-2 md:pb-0 py-6 section">
        <div className="rounded-lg p-3">
          <div className="flex justify-start">
            <span
              className="flex items-center text-sm text-gray-600 gap-x-1 mb-2 cursor-pointer"
              // to="/campaign-summary"
              onClick={() => {
                update ? updateBack() : goBack();
              }}
            >
              <span className="material-icons-outlined icon-16 text-gray-400 ">
                arrow_back_ios_new
              </span>{" "}
              Back
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {update === "update" ? `Update Campaign` : "  New Campaign"}
            </h3>
            <div
              className={`border-gray-500 text-gray-500 px-2 py-1 text-xs border rounded-md`}
            >
              Email Balance: {remainingQuota}
            </div>
          </div>

          <MediaList
            selectedListId={selectedListId}
            campaignList={campaignList}
            handleCheckboxChange={handleCheckboxChange}
            token={token}
            isLoading={isLoading}
            handleScroll={handleScroll}
            listBreak={listBreak}
          />
          <CampaignDetail
            campaignInput={campaignInput}
            setCampaignInput={setCampaignInput}
            campaignType={mailerType}
            update={update}
          />

          <div className="flex flex-col my-4 gap-y-6">
            <PitchCampaign
              isLoader={isLoader}
              formData={formData}
              setFormData={setFormData}
              inputValue={inputValue}
              setInputValue={setInputValue}
              AddKeyword={AddKeyword}
              FileUpload={FileUpload}
              preBrandMention={preBrandMention}
              error={errors}
              deleteMention={deleteMention}
              brandMention={brandMention}
              storeImages={storeImages}
              displayImage={displayImage}
              deleteAPI={deleteAPI}
              handleDelete={handleDelete}
              ATTACH_URL={ATTACH_URL}
              templateData={templateData}
              updateType={updateType}
              saveAndPreview={saveAndPreview}
              update={update}
              deleteBrandKeyword={deleteBrandKeyword}
              previewData={previewData}
              //send test mail
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCampaign;
