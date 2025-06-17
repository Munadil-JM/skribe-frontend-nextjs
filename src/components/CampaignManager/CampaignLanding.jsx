import Link from "next/link";

const CampaignLanding = () => {
  return (
    <div className="bg-gray-100 pb-60" style={{ height: "calc(100% - 70px)" }}>
      <div className="w-full flex items-center justify-center xl:w-9/12 md:p-6 md:pt-2 md:pb-0 py-6 mx-auto section">
        <div className="rounded-lg p-3 pt-32 text-center">
          <h2 className="text-xl text-gray-700 font-semibold">
            Are you ready to PITCH your story?
          </h2>
          <p className="text-sm text-gray-700">
            To kick-start your PITCH, either pick an existing campaign list or
            create a campaign.
          </p>
          <ul className="flex gap-x-6 mt-6 justify-center">
            <li>
              <Link
                href="/journalist-search"
                className="bg-white shadow-xl  rounded-lg p-6 px-16 text-md text-gray-600 flex flex-col hover:bg-gray-200 items-center"
              >
                <span className="material-icons-outlined icon-100 text-gray-400">
                  campaign
                </span>
                <span className="pt-2 font-medium">Create a new list</span>
              </Link>
            </li>
            <li>
              <Link
                href="/create-campaign"
                className="bg-white shadow-xl rounded-lg p-6 px-16 text-md text-gray-600 flex flex-col hover:bg-gray-200 items-center"
              >
                <span className="material-icons-outlined icon-100 text-gray-400">
                  list_alt
                </span>
                <span className="pt-2 font-medium">Use an existing list</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CampaignLanding;
