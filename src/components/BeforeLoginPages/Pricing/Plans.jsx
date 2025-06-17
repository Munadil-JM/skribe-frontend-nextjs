import { useState } from "react";
import PlanCard from "./PlanCard";

const plans = [
  {
    tag: "Agency",
    plans: [
      {
        id: 1,
        name: "Freelancer",
        price: "₹5000",
        image: "/assets/plans-freelancer-icon.png",
        connect: {
          downloads: "1000 monthly",
        },
        campaigns: {
          emails: "5000 monthly",
          postCampaignTracking: "-",
          gaIntegration: "-",
        },
        brand: {
          realTimeTracking: "-",
          competitorTracking: "-",
          personalisedReport: "-",
          brandReports: "-",
        },
        teamManagement: {
          teamPerformance: "Paid",
        },
        licences: 1,
        charges: "-",
        isHighlighted: false,
      },
      {
        id: 2,
        name: "Starter",
        price: "₹11500",
        image: "/assets/plans-starter-icon.png",
        connect: {
          downloads: "1000 monthly",
        },
        campaigns: {
          emails: "5000 monthly",
          postCampaignTracking: "-",
          gaIntegration: "-",
        },
        brand: {
          realTimeTracking: "-",
          competitorTracking: "-",
          personalisedReport: "-",
          brandReports: "-",
        },
        teamManagement: {
          teamPerformance: "-",
        },
        licences: 5,
        charges: "₹20000 yearly",
        isHighlighted: true,
      },
      {
        id: 3,
        name: "Partner",
        price: "Get on a call",
        image: "/assets/plans-partner-icon.png",
        connect: {
          downloads: "1000 monthly",
        },
        campaigns: {
          emails: "5000 monthly",
          postCampaignTracking: "-",
          gaIntegration: "-",
        },
        brand: {
          realTimeTracking: "-",
          competitorTracking: "-",
          personalisedReport: "-",
          brandReports: "-",
        },
        teamManagement: {
          teamPerformance: "-",
        },
        licences: 5,
        charges: "₹20000 yearly",
        isHighlighted: false,
      },
    ],
  },
  {
    tag: "Corporate",
    plans: [
      {
        id: 1,
        name: "Free",
        price: "₹0",
        image: "/assets/plans-freelancer-icon.png",
        licences: 1,
        charges: "-",
        isHighlighted: false,
        database: {
          journalistSearch: 100,
          instagramInfluencers: 50,
          xInfluencers: 50,
          podcasts: 20,
        },
        connect: {
          downloads: "-",
          phoneNumbers: "No",
        },
        campaigns: {
          emails: "1000",
          postCampaignTracking: "-",
          gaIntegration: "-",
        },
        brand: {
          realTimeTracking: "-",
          competitorTracking: "-",
          personalisedReport: "-",
          brandReports: "-",
        },
        teamManagement: {
          teamPerformance: "-",
        },
      },
      {
        id: 2,
        name: "Startup",
        price: "₹15000",
        image: "/assets/plans-starter-icon.png",
        licences: 2,
        charges: "₹50000 yearly",
        isHighlighted: true,
        connect: {
          downloads: "1000 monthly",
        },
        campaigns: {
          emails: "5000 monthly",
        },
        brand: {
          competitorTracking: "Upto 2",
          personalisedReport: "3 / week",
        },
        teamManagement: {
          teamPerformance: "-",
        },
      },
      {
        id: 3,
        name: "Enterprise",
        price: "₹40000",
        image: "/assets/plans-partner-icon.png",
        licences: 5,
        charges: "₹50000 yearly",
        isHighlighted: false,
        connect: {
          downloads: "1000 monthly",
        },
        campaigns: {
          emails: "20000 monthly",
        },
        brand: {
          competitorTracking: "Upto 4",
          personalisedReport: "Daily",
        },
      },
    ],
  },
];

const Plans = () => {
  const [isAgency, setIsAgency] = useState(true);
  const selectedPlan = isAgency ? plans[0].plans : plans[1].plans;

  return (
    <section className="-mt-[250px] sm:-mt-[520px] flex flex-col justify-center items-center gap-10 container mx-auto px-10 py-10 sm:py-20">
      <div className="flex items-center justify-center gap-4 py-4 relative sm:-left-4">
        <span className="text-lg text-[#474747] font-medium">Corporate</span>

        <button
          onClick={() => setIsAgency(!isAgency)}
          className="w-16 h-8 bg-white cursor-pointer hadow-lg rounded-full flex items-center transition-all duration-300 px-1"
        >
          <div
            className={`w-6 h-6 rounded-full bg-[#002B5B] transition-transform duration-300 ${
              isAgency ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </button>

        <span className="text-lg text-[#474747] font-medium">Agency</span>
      </div>

      <section className="flex flex-col gap-10 sm:gap-0 sm:flex-row items-center justify-center">
        {selectedPlan.map((plan) => {
          return <PlanCard key={plan.id} {...plan} />;
        })}
      </section>
    </section>
  );
};

export default Plans;
