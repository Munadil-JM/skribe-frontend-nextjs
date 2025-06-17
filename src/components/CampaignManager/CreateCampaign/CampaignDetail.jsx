const CampaignDetail = ({
  campaignInput,
  setCampaignInput,
  update,
  campaignType,
}) => {
  // const date = new Date();
  // const day = String(date.getDate()).padStart(2, "0");
  // const monthIndex = date.getMonth(); // Months are 0-indexed
  // const year = date.getFullYear();

  // Array of month names
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const month = months[monthIndex];

  // const formattedDate = `${day} ${month} ${year}`;

  return (
    <div>
      <div className="flex items-start flex-col">
        {/* <div className="text-md font-medium text-gray-400">
          {" "}
          {formattedDate}
        </div> */}
        <h2 className="text-lg font-semibold text-gray-600 mt-4 mb-0 ">
          {/* {updateCampaign ? "Update Campaign" : "Create Campaign"} */}
          Step 2: Enter Campaign Details
        </h2>
        <p className="text-gray-400 text-xs mb-2">
          Create a new PITCH list by adding a Campaign description
        </p>
        {/* <p className="text-red-500 text-xs mb-8">
          A red asterisk (*) written next to a field typically indicates that it
          is a required field that must be filled out before submitting a form.
        </p> */}

        {/* <h3 className="text-xl font-medium text-gray-600">Enter Details</h3> */}
      </div>

      <div className="flex flex-col my-4 mt-0 gap-y-3 border border-gray-300 p-3 rounded-md bg-gray-50">
        {/* <div className="text-gray-600">
       
        </div> */}
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-0 gap-x-4">
          <div className="flex flex-col w-full md:w-3/4 ">
            <label className="text-xs text-gray-600">
              Campaign Name<span className="text-red-500 text-xl">*</span>
            </label>
            <input
              type="text"
              placeholder="Nivea Skincare Tracker"
              className="w-full border bg-white border-gray-300 p-2 rounded-md focus:outline-none  text-sm text-gray-500"
              value={campaignInput?.campaign_Name}
              maxLength="30"
              onChange={(e) => {
                setCampaignInput((old) => {
                  return {
                    ...old,
                    campaign_Name: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col w-full md:w-2/4 ">
            <label className="text-xs text-gray-500">
              Select a Type<span className="text-red-500 text-xl">*</span>
            </label>
            <select
              value={campaignInput?.campaign_Type}
              onChange={(e) =>
                setCampaignInput((old) => {
                  return {
                    ...old,
                    campaign_Type: e.target.value.trim(),
                  };
                })
              }
              className="border bg-white border-gray-300 p-2 rounded-md text-gray-500 focus:outline-none text-xs"
            >
              <option value="">Select Type</option>
              <option value="Company Introduction">Company Introduction</option>
              <option value="Founder Profiling">Founder Profiling</option>
              <option value="Event Invitation">Event Invitation</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Rebranding Announcement">
                Rebranding Announcement
              </option>
              <option value="Hiring Announcements">Hiring Announcements</option>
              <option value="Funding Announcements">
                Funding Announcements
              </option>
              <option value="Geographical Expansion">
                Geographical Expansion
              </option>
              <option value="Trends Reports">Trends Reports</option>
              <option value="Milestone Achievements">
                Milestone Achievements
              </option>
              <option value="blank">Other</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full relative ">
          <label className="text-xs text-gray-600">
            Description<span className=" text-red-500 text-xl"></span>
          </label>
          <div className="border bg-white border-gray-300 pb-2 rounded-md">
            <textarea
              placeholder="We will track competitors and progress for Nivea Skincare......"
              maxLength="250"
              className="bg-white p-2 rounded-md resize-none h-20 lg:h-16 focus:outline-none text-sm w-full text-gray-500"
              value={campaignInput?.campaignDescription}
              onChange={(e) => {
                setCampaignInput((old) => {
                  return {
                    ...old,
                    campaignDescription: e.target.value,
                  };
                });
              }}
            ></textarea>
          </div>

          <span className="text-[10px] text-gray-400 absolute left-2 bottom-0">
            {`Character Limit ${
              campaignInput?.campaignDescription?.length ?? 0
            }/250`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
