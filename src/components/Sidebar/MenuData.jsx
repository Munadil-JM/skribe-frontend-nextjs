import { useState } from "react";
// import { useSelector } from "react-redux";
import Link from "next/link";
import BeatPopup from "../AllBeats/BeatPopup";
import HeaderLock from "../Tooltip/HeaderLock";

const MenuData = ({ description, id, linking, role, showPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BeatPopup
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          document.body.classList.remove("overflow-hidden");
        }}
      />
      {description === "Beats" ? (
        <li>
          <Link
            name="Beats"
            href="#"
            className="flex text-white"
            onClick={(e) => {
              setIsOpen(true);
              document.body.classList.add("overflow-hidden");
            }}
          >
            {description}
          </Link>
        </li>
      ) : role?.includes("Freebies") && description === "Skribe 365" ? (
        <>
          <Link
            href="#"
            onClick={() => showPopup()}
            className="flex flex-1 items-center gap-x-2 relative"
          >
            <span className="text-white text-sm w-[95px]">
              {description}{" "}
              <HeaderLock
                left="-right-[10px]"
                top="top-[3px]"
                leftPosition="-left-[0px]"
                topPosititon="top-[38px]"
                title="Feature Locked!"
              />
            </span>{" "}
          </Link>{" "}
        </>
      ) : (
        <li>
          <Link href={"/" + linking} id={id} className="flex text-white">
            {description}
          </Link>
        </li>
      )}
    </>
  );
};

export default MenuData;
