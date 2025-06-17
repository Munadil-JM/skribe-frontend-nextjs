import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const dummyData = [
  {
    name: "Geo Location",
  },
  {
    name: "Media Types",
  },
  {
    name: "Beats",
  },
  {
    name: "Competitors",
  },
  {
    name: "Topics",
  },
  {
    name: "Brand",
  },
  {
    name: "Spokes Person",
  },
];

const ConfigTabs = () => {
  const [active, setActive] = useState();
  const path = useLocation();

  useEffect(() => {
    switch (path.pathname) {
      case "/all-settings": {
        setActive(0);
        break;
      }
      case "/Media%20Types": {
        setActive(1);
        break;
      }
      case "/Beats": {
        setActive(2);
        break;
      }
      case "/Competitors": {
        setActive(3);
        break;
      }
      case "/Topics": {
        setActive(4);
        break;
      }
      case "/Brand": {
        setActive(5);
        break;
      }
      case "/Spokes Person": {
        setActive(6);
        break;
      }
      default:
    }
  }, [active]);

  return (
    <nav>
      <ul className="flex flex-wrap border-b md:flex-col md:gap-6 md:border-none">
        {dummyData.map((curElem, ind) => (
          <li key={ind}>
            <Link
              to={curElem.name}
              onClick={() => setActive(curElem.id)}
              className={
                active === ind
                  ? "flex flex-col border-gray-600 bg-gray-100 px-4 py-3 text-sm font-normal text-gray-500 hover:border-gray-600 hover:text-gray-800 md:rounded-lg md:border md:bg-white md:px-12 md:py-4 "
                  : "flex flex-col rounded-lg border-gray-300 px-4 py-3 text-sm  font-normal text-gray-500 hover:border-gray-600 hover:text-gray-800 md:border md:px-12 md:py-4"
              }
            >
              {curElem.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ConfigTabs;
