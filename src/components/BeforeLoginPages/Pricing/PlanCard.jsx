import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiArrowSmallRight, HiOutlineCheckCircle } from "react-icons/hi2";

const PlanCard = ({
  name,
  price,
  image,
  licences,
  charges,
  database,
  connect,
  campaigns,
  brand,
  teamManagement,
  isHighlighted,
}) => {
  return (
    <article
      className={`flex flex-col gap-2 items-center border rounded-2xl px-3 lg:px-12 w-fit border-black ${isHighlighted ? "bg-[#F1F1E6] py-14 lg:py-20 sm:z-10 sm:scale-[102%]" : "bg-white py-8"}`}
    >
      <h2 className="font-bold sm:text-xl lg:text-3xl">{name}</h2>

      <span className="text-2xl flex items-center gap-2 font-bold lg:text-4xl">
        {name === "Partner" && (
          <img
            src="/assets/call-icon.png"
            alt="Call icon"
            className="w-6 lg:w-9"
          />
        )}
        {price}
      </span>

      <span className="text-[#666666] text-sm">Per User / Monthly</span>

      <img
        src={image}
        alt={`${name} icon`}
        className="w-[100px] lg:w-[150px] mb-3"
      />

      <button
        type="button"
        className={`flex gap-3 text-xs cursor-pointer lg:text-sm lg:gap-6 items-center justify-between px-3 lg:px-5 py-3 rounded-full border w-full border-[#002B5B] text-[#002B5B] ${isHighlighted ? "bg-[#002B5B] text-white" : ""}`}
      >
        Request Demo <HiArrowSmallRight />
      </button>

      <ul
        className={`flex flex-col gap-2 w-full text-xs lg:text-sm mt-3 ${isHighlighted ? "text-black" : "text-[#666666]"}`}
      >
        <h3 className="flex gap-1 items-center font-semibold text-lg">
          <img
            src="/assets/database-icon.png"
            alt="Database icon"
            className="w-6"
          />
          Database
        </h3>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Journalist search
          {database?.journalistSearch ? (
            <span>{database.journalistSearch}</span>
          ) : (
            <HiOutlineCheckCircle
              className={`${isHighlighted ? "text-white" : "text-[#01438D]"}`}
              size={20}
            />
          )}
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          Instagram Influencers
          {database?.instagramInfluencers ? (
            <span>{database.instagramInfluencers}</span>
          ) : (
            <HiOutlineCheckCircle className="text-[#234570]" size={20} />
          )}
        </li>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          X Influencers
          {database?.xInfluencers ? (
            <span>{database?.xInfluencers}</span>
          ) : (
            <HiOutlineCheckCircle
              className={`${isHighlighted ? "text-white" : "text-[#01438D]"}`}
              size={20}
            />
          )}
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          Podcasts
          {database?.podcasts ? (
            <span>{database.podcasts}</span>
          ) : (
            <HiOutlineCheckCircle className="text-[#234570]" size={20} />
          )}
        </li>
      </ul>

      <ul
        className={`flex flex-col gap-2 w-full text-xs lg:text-sm ${isHighlighted ? "text-black" : "text-[#666666]"}`}
      >
        <h3 className="flex gap-1 items-center font-semibold text-lg">
          <img
            src="/assets/connect-icon.png"
            alt="Connect icon"
            className="w-6"
          />
          Connect
        </h3>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Downloads
          <span
            className={`${isHighlighted ? "text-white" : "text-[#333333]"}`}
          >
            {connect?.downloads}
          </span>
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          Emails
          <HiOutlineCheckCircle className="text-[#234570]" size={20} />
        </li>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Phone Numbers
          {connect?.phoneNumbers ? (
            <span>{connect.phoneNumbers}</span>
          ) : (
            <HiOutlineCheckCircle
              className={`${isHighlighted ? "text-white" : "text-[#01438D]"}`}
              size={20}
            />
          )}
        </li>
      </ul>

      <ul
        className={`flex flex-col gap-2 w-full text-xs lg:text-sm ${isHighlighted ? "text-black" : "text-[#666666]"}`}
      >
        <h3 className="flex gap-1 items-center font-semibold text-lg">
          <img
            src="/assets/campaign-icon.png"
            alt="Campaign icon"
            className="w-6"
          />
          Campaigns
        </h3>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Email
          <span
            className={`${isHighlighted ? "text-white" : "text-[#333333]"}`}
          >
            {campaigns?.emails}
          </span>
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          Post Campaign Tracking
          {campaigns?.postCampaignTracking ? (
            <span>{campaigns?.postCampaignTracking}</span>
          ) : (
            <HiOutlineCheckCircle className="text-[#234570]" size={20} />
          )}
        </li>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          GA Integration
          {campaigns?.gaIntegration ? (
            <span>{campaigns?.gaIntegration}</span>
          ) : (
            <HiOutlineCheckCircle
              className={`${isHighlighted ? "text-white" : "text-[#01438D]"}`}
              size={20}
            />
          )}
        </li>
      </ul>

      <ul
        className={`flex flex-col gap-2 w-full text-xs lg:text-sm ${isHighlighted ? "text-black" : "text-[#666666]"}`}
      >
        <h3 className="flex gap-1 items-center font-semibold text-lg">
          <img src="/assets/brand-icon.png" alt="Brand icon" className="w-6" />
          Brand
        </h3>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Real Time Tracking
          {brand?.realTimeTracking ? (
            <span>{brand?.realTimeTracking}</span>
          ) : (
            <HiOutlineCheckCircle
              className={`${isHighlighted ? "text-white" : "text-[#01438D]"}`}
              size={20}
            />
          )}
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          Competitor Tracking
          <span>{brand?.competitorTracking}</span>
        </li>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Personalized Report
          <span>{brand?.personalisedReport}</span>
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          Brand Reports
          {brand?.brandReports ? (
            <span>{brand?.brandReports}</span>
          ) : (
            <HiOutlineCheckCircle className="text-[#234570]" size={20} />
          )}
        </li>
      </ul>

      <ul
        className={`flex flex-col gap-2 w-full text-xs lg:text-sm ${isHighlighted ? "text-black" : "text-[#666666]"}`}
      >
        <h3 className="flex gap-1 items-center font-semibold text-lg">
          <img src="/assets/team-icon.png" alt="Team icon" className="w-6" />
          Team Management
        </h3>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Team Performance
          {teamManagement?.teamPerformance ? (
            <span
              className={`${isHighlighted ? "text-white" : "text-[#333333]"}`}
            >
              {teamManagement?.teamPerformance}
            </span>
          ) : (
            <HiOutlineCheckCircle
              className={`${isHighlighted ? "text-white" : "text-[#01438D]"}`}
              size={20}
            />
          )}
        </li>
      </ul>

      <ul
        className={`flex flex-col gap-2 w-full text-xs lg:text-sm ${isHighlighted ? "text-black" : "text-[#666666]"}`}
      >
        <h3 className="flex gap-1 items-center font-semibold text-lg">
          <img
            src="/assets/licence-icon.png"
            alt="Licence icon"
            className="w-6"
          />
          Licences
        </h3>

        <li
          className={`flex gap-6 justify-between items-center ${isHighlighted ? "bg-[#01438D] text-white" : "bg-[#F5F5F5]"} rounded-xl py-2 px-3`}
        >
          Number of Licences
          <span
            className={`${isHighlighted ? "text-white" : "text-[#333333]"}`}
          >
            {licences}
          </span>
        </li>

        <li className="flex gap-6 justify-between items-center py-2 px-3">
          {`Additional ${name === "Freelancer" ? "Licences" : "Charges"}`}

          {charges ? (
            <span className="text-[#333333] text-center">{charges}</span>
          ) : (
            <HiOutlineCheckCircle className="text-[#234570]" size={20} />
          )}
        </li>
      </ul>

      <p className="flex gap-2 items-center text-[#474747] text-[10px] lg:text-sm lg:w-[220px]">
        <IoIosInformationCircleOutline size={25} />
        Small businesses and startups looking to gain data insights
      </p>
    </article>
  );
};

export default PlanCard;
