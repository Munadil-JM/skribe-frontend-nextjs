"use client";

import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import {
  GET_CITY,
  GET_OUTELET,
  GET_STATE,
  POST_FORM_DATA,
} from "../../constants";
import Multiselect from "multiselect-react-dropdown";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import axios from "axios";
import tokenService from "../../Services/token.service";
import { useRouter } from "next/navigation";

const PressReleaseForm = () => {
  const router = useRouter();
  const [stateisLoading, setStateIsLoading] = useState(true);
  const [cityisLoading, setCityIsLoading] = useState(true);
  const [outeltIsLoading, setOutletIsLoading] = useState(true);
  //STATE DATA GET IN STATE
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [outlet, setOutlet] = useState([]);

  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  //FILE UPLOAD STATES START
  // const [files, setFiles] = useState([]);
  // const [errors, setErrors] = useState("");
  // const MAX_FILES = 5;
  // const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  // const ALLOWED_TYPES = [
  //   "application/pdf",
  //   "application/msword",
  //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // ];
  //FILE UPLOAD STATES END
  const intitalFormState = {
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    pressTitle: "",
    date: "",
    budgetRange: "",
    pressContent: "",
    Files: [],
    state: [],
    city: [],
    outlet: [],
    addInfo: "",
  };
  const [formData, setFormData] = useState(intitalFormState);

  //SELECTED STATE,CITY,OUTLET SELECTED DATA IN DROP DOWN
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState([]);

  //SET TO SEND FINAL ID ON FORM
  // const [selectedStateName, setSelectedStateName] = useState([]);
  // const [selectedCityName, setSelectedCityName] = useState([]);
  // const [selectedOutletName, setSelectedOutletName] = useState([]);

  const [sentData, setSentData] = useState(false);

  const storeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  //GET ALL STATE DATA
  const getState = () => {
    setStateIsLoading(true);
    userService
      .get(GET_STATE)
      .then((result) => {
        if (result?.response?.status === "Ok" && Array.isArray(result?.data)) {
          let convertData = result.data.map((state) => ({
            stateId: state.stateId,
            stateName:
              typeof state.stateName === "string"
                ? state.stateName.charAt(0).toUpperCase() +
                  state.stateName.slice(1).toLowerCase()
                : state.stateName,
          }));
          setState(convertData);
        }
      })
      .catch((errors) => {
        console.log(errors, "check errors");
      })
      .finally(() => {
        setStateIsLoading(false);
      });
  };

  //BASED ON SELECTED STATE GET CITY DATA
  const getCity = (outletSelectedIds) => {
    const selectedState = {
      stateIds: outletSelectedIds,
    };
    setCityIsLoading(true);
    userService
      .post(GET_CITY, selectedState)
      .then((result) => {
        if (result?.response?.status === "Ok" && Array.isArray(result?.data)) {
          let convertData = result?.data?.map((city) => ({
            cityId: city.cityId,
            cityName:
              typeof city.cityName === "string"
                ? city.cityName.charAt(0).toUpperCase() +
                  city.cityName.slice(1).toLowerCase()
                : city.cityName,
          }));
          setCity(convertData);
        }
      })
      .catch((errors) => {
        console.log(errors, "check errors");
      })
      .finally(() => {
        setCityIsLoading(false);
      });
  };

  //BASE ON SELECTED CITY GET OUTLET
  const getOutlet = (citySelectedIds) => {
    const selectedCity = {
      cityIds: citySelectedIds,
    };
    setOutletIsLoading(true);
    userService
      .post(GET_OUTELET, selectedCity)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setOutlet(result?.data);
        }
      })
      .catch((errors) => {
        console.log(errors, "check errors");
      })
      .finally(() => {
        setOutletIsLoading(false);
      });
  };

  const handleState = (selectedList, stName) => {
    setSelectedState(selectedList);
    setSelectedCity([]);
    setSelectedOutlet([]);
  };
  const handleCity = (selectedList) => {
    setSelectedCity(selectedList);
    setSelectedOutlet([]);
  };

  const handleOutlet = (selectedList) => {
    setSelectedOutlet(selectedList);
  };

  useEffect(() => {
    getState();
  }, []);

  useEffect(() => {
    if (selectedState?.length) {
      const stateIds = selectedState.map(({ stateId }) => stateId);
      setFormData((prev) => ({
        ...prev,
        state: selectedState.map(({ stateName }) => stateName),
        city: selectedCity?.map(({ cityName }) => cityName) || [],
        outlet: selectedOutlet?.map(({ outletName }) => outletName) || [],
      }));
      getCity(stateIds);
    } else {
      setFormData((prev) => ({
        ...prev,
        state: selectedState.map(({ stateName }) => stateName),
      }));

      setCity([]);
      setOutlet([]);
    }
  }, [selectedCity, selectedState]);

  useEffect(() => {
    if (selectedCity?.length) {
      const cityIds = selectedCity.map(({ cityId }) => cityId);
      setFormData((prev) => ({
        ...prev,
        city: selectedCity.map(({ cityName }) => cityName),
        outlet: selectedOutlet?.map(({ outletName }) => outletName) || [],
      }));
      getOutlet(cityIds);
    } else {
      setOutlet([]);
    }
  }, [selectedOutlet]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      outlet: selectedOutlet?.map(({ outletName }) => outletName) || [],
    }));

    if (!selectedOutlet?.length) setOutlet([]);
  }, [selectedOutlet]);

  // const [displayImage, setDisplayImage] = useState([]);
  // const totalSizeLimit = 5; // 28 MB for all files combined
  const fileSizeLimit = 5; // 28 MB for all files combined

  const allowedExtensions = ["pdf", "doc", "docx"]; // Added Excel formats
  // const [attachment, setAttachment] = useState([]);
  const FileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Check if the total file count (including current and existing files) exceeds the limit
    if (selectedFiles.length + formData.Files.length > 5) {
      warning("You can attach a maximum of 5 files", "warning");
      return;
    }

    const uploadCheck = selectedFiles.reduce(
      (sum, file) => sum + file.size / (1024 * 1024),
      0
    );

    const existingFilesSize = formData.Files.reduce(
      (sum, file) => sum + file.size / (1024 * 1024),
      0
    );

    if (uploadCheck + existingFilesSize > fileSizeLimit) {
      let totalFileMB = uploadCheck + existingFilesSize;
      let inMB = totalFileMB.toFixed(2);
      warning(`The maximum permissible file size is ${inMB} MB`, "warning");
      return;
    }

    // Validate file extensions and filter valid files
    const validatedFiles = selectedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        warning(
          `Only files with extensions ${allowedExtensions.join(", ")} are allowed.`,
          "warning"
        );
        return false;
      }
      return true;
    });

    if (validatedFiles.length > 0) {
      setFormData({
        ...formData,
        Files: [...(formData.Files || []), ...Array.from(e.target.files)],
      });
    }
  };

  const removeFile = (e, index) => {
    e.preventDefault();
    setFormData((old) => ({
      ...old,
      Files: old?.Files?.filter((_, i) => i !== index) || [],
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    // Form Validations
    if (!formData?.fullName || formData.fullName.trim().length < 3) {
      warning("Please enter at least 3 characters for full name", "warning");
      return;
    }
    if (!formData?.companyName || formData.companyName.trim().length < 3) {
      warning("Please enter at least 3 characters for company name", "warning");
      return;
    }
    if (!formData?.email || !validateEmail(formData.email)) {
      warning("Please enter a valid email address", "warning");
      return;
    }
    if (!formData?.phone || formData.phone.length < 10) {
      warning("Please enter a 10-digit phone number", "warning");
      return;
    }
    if (!formData?.pressTitle || formData.pressTitle.trim().length < 5) {
      warning(
        "Please enter at least 5 characters for press release title",
        "warning"
      );
      return;
    }
    if (!formData?.pressContent) {
      warning("Please enter press release content", "warning");
      return;
    }
    if (!formData?.state) {
      warning("Please select a state", "warning");
      return;
    }
    if (!formData?.city) {
      warning("Please select a city", "warning");
      return;
    }
    if (!formData?.outlet) {
      warning("Please select a publication", "warning");
      return;
    }

    setSentData(true);

    const formDataToSend = new FormData();

    // const jsonFormData = JSON.stringify({ ...formData });
    const jsonFormData = JSON.stringify({
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      pressTitle: formData.pressTitle,
      date: formData.date,
      budgetRange: formData.budgetRange,
      pressContent: formData.pressContent,
      state: formData.state,
      city: formData.city,
      outlet: formData.outlet,
      addInfo: formData.addInfo,
    });
    formData.Files.forEach((file) => formDataToSend.append("files", file));
    formDataToSend.append("formData", jsonFormData);

    // Send the form data
    // Debugging: Log what is being sent
    // console.log("Sending formData:");
    // for (let pair of formDataToSend.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    try {
      // const result = await userService.post(POST_FORM_DATA, formDataToSend);

      const result = await axios.post(POST_FORM_DATA, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
        },
      });
      if (result?.data?.response?.status === "Ok") {
        success(
          "Your query has been successfully submitted. Our team will review it and get back to you shortly. Thank you for reaching out",
          "success"
        );
        router.push("/dashboard");
        // setFormData(intitalFormState);
        // setSelectedState([]);
        // setSelectedCity([]);
        // setSelectedOutlet([]);
      } else {
        warning("Something went wrong, please try again!", "warning");
      }
    } catch (errors) {
      console.error("Error posting form data:", errors);
      warning("Error submitting form. Please try again later.", "error");
    } finally {
      setSentData(false);
    }
  };

  const resetForm = () => {
    setFormData(intitalFormState);
    if (selectedState?.length > 0) {
      setSelectedState([]);
      setSelectedCity([]);
      setSelectedOutlet([]);
    }
  };

  return (
    <div className="w-full md:w-11/12 lg:w-8/12 xl:w-6/12 mx-auto p-6 py-6 px-4 lg:pl-8 lg:pr-0 section">
      <fieldset className="border border-gray-300 p-2 rounded-lg bg-gray-50">
        <legend className="ml-4 px-3 rounded-md py-1 text-gray-700 text-lg font-medium">
          Press Release Distribution
        </legend>

        <div className="p-5 pt-0">
          <h3 className="text-lg text-gray-700 font-medium">
            Your News, Your Way – Guaranteed Media Coverage!
          </h3>
          <p className="text-gray-500 text-sm">
            Want your press release published in major outlets? With{" "}
            <i className="text-[#002b5b] text-sm font-medium">
              {" "}
              Skribe’s paid advertorial distribution
            </i>
            , you get direct access to regional, national, and niche media
            without the hassle of journalist outreach.
          </p>
          <p className="text-gray-500 text-sm mt-5">
            Pick your target location & media category Submit your press release
            See it published – no waiting, no pitching! Take control of your
            brand’s media presence. Start now!
          </p>
        </div>
        <div className="pt-2 p-5">
          <h3 className="font-medium mb-2 text-sm">
            Step: 1 Client Information
          </h3>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-600 text-xs">
                Full Name<span className="text-red-500 text-sm">*</span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-500 text-xs"
                type="text"
                name="fullName"
                value={formData?.fullName}
                onChange={(e) => storeFormData(e)}
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-600 text-xs">
                Company Name<span className="text-red-500 text-sm">*</span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 leading-tight focus:outline-none focus:border-gray-500 text-xs"
                name="companyName"
                value={formData?.companyName}
                onChange={(e) => storeFormData(e)}
                type="text"
                placeholder=""
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-600 text-xs">
                Email<span className="text-red-500 text-sm">*</span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-500 text-xs"
                type="email"
                placeholder=""
                name="email"
                value={formData?.email}
                onChange={(e) => storeFormData(e)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-600 text-xs">
                Phone Number<span className="text-red-500 text-sm">*</span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-xs"
                id="grid-last-name"
                type="phone"
                placeholder=""
                maxLength={10}
                name="phone"
                value={formData?.phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  storeFormData({
                    target: { name: "phone", value: numericValue },
                  });
                }}
              />
            </div>
          </div>
          <hr className="border border-b border-gray-300 my-8" />
          {/* PRESS RESLEASE DETAIL START */}
          <h3 className="font-medium mb-2 text-sm">
            Step: 2 Press Release Details
          </h3>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
              <label className="block tracking-wide text-gray-600 text-xs">
                Press Release Title
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-500 text-xs"
                type="text"
                placeholder=""
                name="pressTitle"
                value={formData?.pressTitle || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 150) {
                    storeFormData(e);
                  }
                }}
              />
              <span class="text-[10px] text-gray-400 absolute -bottom-1 right-3">
                Character Limit {`${formData?.pressTitle.length}/150`}
              </span>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-600 text-xs">
                Preferred Publication Date
                <span className="text-red-500 text-sm"></span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-[6px] px-2 mb-3 leading-tight focus:outline-none focus:border-gray-500 text-xs"
                type="date"
                placeholder=""
                name="date"
                value={formData?.date}
                onChange={(e) => storeFormData(e)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-600 text-xs">
                Budget Range
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-500 text-xs"
                type="text"
                placeholder=""
                name="budgetRange"
                value={formData?.budgetRange}
                onChange={(e) => storeFormData(e)}
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-600 text-xs">
                Press Release Content{" "}
                <span className="text-red-500 text-sm">*</span>
              </label>
              <div className="flex flex-col mb-3">
                <textarea
                  className="block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 leading-tight focus:outline-none focus:border-gray-500 text-xs h-[150px] resize-none"
                  placeholder="Write content..."
                  name="pressContent"
                  value={formData?.pressContent}
                  onChange={(e) => storeFormData(e)}
                ></textarea>
                {/* <span class="text-[10px] text-gray-400">
                    Character Limit 0/250
                  </span> */}
              </div>
              <div className="flex gap-x-2">
                <input
                  type="file"
                  id="file"
                  multiple
                  className="file-input"
                  style={{ display: "none" }}
                  onChange={FileUpload}
                />
                <label
                  htmlFor="file"
                  style={{
                    display: "inline-flex", //
                    alignItems: "center",
                    color: "#666",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "20px",
                  }}
                >
                  <span className="icon">
                    <span className="material-icons-outlined icon-35 -rotate-90">
                      attachment
                    </span>
                  </span>
                </label>
                <ul className="flex gap-[10px] flex-wrap items-center">
                  {formData?.Files?.map((file, index) => (
                    <li
                      key={index}
                      className="flex gap-x-3 items-center bg-gray-200 rounded-md p-2 text-xs text-gray-700"
                    >
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      <button
                        onClick={(e) => removeFile(e, index)}
                        className="bg-gray-400 material-icons-outlined icon-12 p-1 rounded-sm text-gray-700"
                      >
                        close
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-500 text-sm">
                Attach a PDF or DOC file (Max: 5MB, 5 File)
              </p>
            </div>
          </div>

          {/* PRESS RESLEASE DETAIL END */}

          <hr className="border border-b border-gray-300 my-8" />
          {/* TARGET REGION SELECTION START*/}
          <h3 className="font-medium mb-2 text-sm">
            Step: 3 Target Region Selection
          </h3>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-600 text-xs">
                Select a State<span className="text-red-500 text-sm">*</span>
              </label>

              <Multiselect
                options={state}
                displayValue="stateName"
                selectedValues={selectedState}
                onSelect={handleState}
                onRemove={handleState}
                placeholder="Select State"
                className="custom-multiselect mb-3 text-sm"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-600 text-xs">
                Select a City<span className="text-red-500 text-sm">*</span>
              </label>

              <Multiselect
                options={city}
                displayValue="cityName"
                selectedValues={selectedCity}
                onSelect={handleCity}
                onRemove={handleCity}
                placeholder="Select City"
                className="custom-multiselect mb-3 text-sm"
              />
            </div>
            <div className="w-full  md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-600 text-xs">
                Select a Publication
                <span className="text-red-500 text-sm">*</span>
              </label>

              <Multiselect
                options={outlet}
                displayValue="outletName"
                selectedValues={selectedOutlet}
                onSelect={handleOutlet}
                onRemove={handleOutlet}
                placeholder="Select Outlet"
                className="custom-multiselect mb-3 text-sm"
              />
            </div>
          </div>
          <hr className="border border-b border-gray-300 my-8" />
          <div className="flex flex-wrap -mx-3 ">
            <div className="w-full px-3 mb-6 md:mb-0">
              <h3 className="font-medium mb-2 text-sm">
                Step: 4 Additional Info
              </h3>
              <div className="flex flex-col mb-3">
                <textarea
                  className="block w-full text-gray-700 border border-gray-400 rounded py-2 px-2 leading-tight focus:outline-none focus:border-gray-500 text-xs h-[150px] resize-none"
                  placeholder="If you have any additional Instruction for outlet, Please fill it here."
                  name="addInfo"
                  value={formData?.addInfo}
                  onChange={(e) => storeFormData(e)}
                ></textarea>
                {/* <span class="text-[10px] text-gray-400">
                    Character Limit 0/250
                  </span> */}
              </div>
              {sentData ? (
                <button
                  type="submit"
                  className="bg-gray-400 px-4 py-2 text-white rounded-md text-sm"
                >
                  Sending...
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={formSubmit}
                  className="bg-[#002b5b] px-4 py-1 text-white rounded-md text-sm"
                >
                  Submit
                </button>
              )}
              <button
                type="reset"
                onClick={resetForm}
                className="bg-gray-400 px-4 py-1 text-white rounded-md text-sm ml-2"
              >
                Reset
              </button>
            </div>
          </div>

          {/* TARGET REGION SELECTION END*/}
        </div>
      </fieldset>
    </div>
  );
};

export default PressReleaseForm;
