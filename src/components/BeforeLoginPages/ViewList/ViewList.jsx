"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ListTable from "./ListTable";
import ChooseSkribe from "../HomePage/ChooseSkribe";
import Footer from "../Footer";
import tokenService from "../../../Services/token.service";

const ViewList = ({ listName, id }) => {
  const [roleType, setRoleType] = useState(null);

  useEffect(() => {
    setRoleType(tokenService.getLocalRole());
  }, []);

  return (
    <main className="font-inter">
      {!(
        roleType?.includes("Freebies") ||
        roleType?.includes("Agency") ||
        roleType?.includes("Enterprise")
      ) && <Navbar />}

      <ListTable id={id} listName={listName} />
      <ChooseSkribe />
      <Footer />
    </main>
  );
};

export default ViewList;
