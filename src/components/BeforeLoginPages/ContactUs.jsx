"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { CONTACTSKRIBE } from "../../constants";
import userService from "../../Services/user.service";
import skribeHeader from "../assets/request-demo.webp";

const ContactUs = ({ open, onClose }) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    contactNo: "",
    company: "",
    message: "",
  });

  const storeValue = (e) => {
    setContactForm((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  };

  const contact = () => {
    if (contactForm.name.length === 0) {
      alert("please enter your name");
    } else if (contactForm.email.length === 0) {
      alert("please enter your official email address");
    } else if (contactForm.contactNo.length < 10) {
      alert("please enter your valid mobile Number");
    } else {
      userService.post(CONTACTSKRIBE, contactForm).then((result) => {
        if (result?.response?.message === "Success") {
          onClose();
          setContactForm({
            name: "",
            email: "",
            contactNo: "",
            company: "",
            message: "",
          });
          alert("Your query has successfully been submitted");
        }
      });
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="font-inter">
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-[50]"></div>
      <div
        className={`fixed left-1/2 top-1/2  w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg  bg-[#F1F1E6] shadow-2xl lg:w-3/5 xl:w-2/5 z-[51]`}
      >
        <div className="flex rounded-lg">
          <div
            className="hidden w-2/3 md:block"
            style={{
              background: `URL(${skribeHeader.src}) center no-repeat`,
              transform: `scaleX(-1)`,
            }}
          >
            {/* <img
              src="https://cloud.goskribe.com/v2_Images/request-bg.jpg"
              className="h-full w-full rounded-l-lg rounded-bl-lg object-cover grayscale "
            /> */}
          </div>
          <div className="p-10 py-5">
            <div className="relative flex items-center justify-between border-b border-gray-400 pb-2">
              <h2 className="text-sm font-medium text-gray-600">
                For more about PR automation, leave us your details below and
                we'll do the rest!
              </h2>
              <button onClick={onClose}>
                <span className="material-icons-outlined absolute cursor-pointer -right-8 -top-4 rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200 icon-16">
                  close
                </span>
              </button>
            </div>
            <div className="flex flex-col justify-center gap-x-1 pt-5">
              <div>
                <label className="text-xs text-gray-600">Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => storeValue(e)}
                  value={contactForm.name}
                  className="w-full rounded-md p-[6px] text-sm text-gray-400 bg-white shadow-none focus:outline-0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Official Email:</label>
                <input
                  name="email"
                  required
                  onChange={(e) => storeValue(e)}
                  value={contactForm.email}
                  type="email"
                  className="w-full rounded-md p-[6px] text-sm text-gray-400 bg-white shadow-none focus:outline-0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Mobile:</label>
                <input
                  name="contactNo"
                  value={contactForm.contactNo}
                  onChange={(e) => storeValue(e)}
                  type="number"
                  className="w-full rounded-md p-[6px] text-sm text-gray-400 bg-white shadow-none focus:outline-0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">I am an:</label>
                <select
                  name="company"
                  value={contactForm.company}
                  onChange={(e) => storeValue(e)}
                  className="w-full rounded-md p-[6px] cursor-pointer text-sm text-gray-400 bg-gray-100 shadow-none focus:outline-0"
                >
                  <option value="" disabled hidden>
                    Choose one...
                  </option>
                  <option>Enterprise</option>
                  <option>Agency</option>
                  <option>Freelancer</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">
                  How did you come to know about us?:
                </label>
                <select
                  name="message"
                  value={contactForm.message}
                  onChange={(e) => storeValue(e)}
                  className="w-full rounded-md p-[6px] cursor-pointer text-sm text-gray-400 bg-gray-100 shadow-none focus:outline-0"
                >
                  <option value="" disabled hidden>
                    Choose one...
                  </option>
                  <option value="Search Engine">Search Engine.</option>
                  <option value="Google Ads">Google Ads.</option>
                  <option value="Facebook Ads">Facebook Ads.</option>
                  <option value="Youtube Ads">Youtube Ads.</option>
                  <option value="Other paid social media advertising">
                    Other paid social media advertising.
                  </option>
                  <option value="Facebook post/group">
                    Facebook post/group.
                  </option>
                  <option value="Twitter post">Twitter post.</option>
                  <option value="Instagram post/story">
                    Instagram post/story.
                  </option>
                </select>
              </div>
              <button
                onClick={() => contact()}
                className="relative mt-4 w-fit cursor-pointer rounded-md bg-[#002B5B] px-6 py-1 text-sm font-normal text-white hover:bg-[#002a5be4] focus:outline-none"
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ContactUs;
