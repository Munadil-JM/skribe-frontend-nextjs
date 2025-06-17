"use client";

import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import ListTable from "./ListTable";
import ChooseSkribe from "../HomePage/ChooseSkribe";
import Footer from "../Footer";
import tokenService from "../../../Services/token.service";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Top Journalist Lists by Beat & City in India | Skribe",
    url: "https://app.goskribe.com/projournalist-list",
    description:
      "Browse verified journalist lists by topic and location. Find top reporters covering real estate, tech, finance, and more across India.",
    inLanguage: "en",
  },
];

const ProJournalistList = () => {
  useMetadata(schema);

  // const [roleType, setRoleType] = useState(tokenService.getLocalRole());

  const [roleType, setRoleType] = useState(null);

  useEffect(() => {
    const role = tokenService.getLocalRole();
    setRoleType(role);
  }, []);

  return (
    <main className="font-inter">
      {!(
        roleType?.includes("Freebies") ||
        roleType?.includes("Agency") ||
        roleType?.includes("Enterprise")
      ) && (
        <>
          <Navbar /> <Hero />
        </>
      )}

      <ListTable />
      {!(
        roleType?.includes("Freebies") ||
        roleType?.includes("Agency") ||
        roleType?.includes("Enterprise")
      ) && (
        <>
          <ChooseSkribe />
          <Footer />
        </>
      )}
    </main>
  );
};

export default ProJournalistList;
