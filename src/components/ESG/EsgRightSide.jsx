import Link from "next/link";

const EsgRightSide = () => {
  return (
    <>
      <aside>
        <div className="block mb-4">
          <header>
            <h2 className="text-lg text-gray-600 font-medium border-b pb-1">
              Trending Topics
            </h2>
          </header>
          <div className="pt-3">
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Importance of Education
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Fake News
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Online Learning
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Public Transport Free
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Social Impact of Covid-19
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Enviornment
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Citizen vote
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Importance of Reading
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="bg-teal-50 bg-opacity-60 px-4 py-2 flex text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                >
                  Importance of Education
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="block mb-4">
          <header>
            <h2 className="text-lg text-gray-600 font-medium border-b pb-1">
              Top Writers
            </h2>
          </header>
          <div className="pt-3">
            <ul className="flex flex-col max-h-52 overflow-y-scroll">
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Ketan Thakkar</div>
                  <p className="text-xs text-gray-500">Hindustan Times</p>
                </Link>
              </li>
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Naina Sood</div>
                  <p className="text-xs text-gray-500">Times of India</p>
                </Link>
              </li>
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Ketan Thakkar</div>
                  <p className="text-xs text-gray-500">Hindustan Times</p>
                </Link>
              </li>
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Naina Sood hover</div>
                  <p className="text-xs text-gray-500">Times of India</p>
                </Link>
              </li>
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Ketan Thakkar</div>
                  <p className="text-xs text-gray-500">Hindustan Times</p>
                </Link>
              </li>
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Naina Sood</div>
                  <p className="text-xs text-gray-500">Times of India</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="block mb-4">
          <header>
            <h2 className="text-lg text-gray-600 font-medium border-b pb-2">
              Brands/ Spokes People quoted
            </h2>
          </header>
          <div className="pt-3">
            <ul className="flex flex-col max-h-52 overflow-y-scroll">
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Srishti Kapoor</div>
                  <p className="text-xs text-gray-500">GE Motors Pvt. Ltd.</p>
                </Link>
              </li>

              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">
                    Roshan Kumar Singh
                  </div>
                  <p className="text-xs text-gray-500">Audi India</p>
                </Link>
              </li>

              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Aditiya Nagpal</div>
                  <p className="text-xs text-gray-500">
                    Dhruv Global India Pvt. Ltd.
                  </p>
                </Link>
              </li>
              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Srishti Kapoor</div>
                  <p className="text-xs text-gray-500">GE Motors Pvt. Ltd.</p>
                </Link>
              </li>

              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">
                    Roshan Kumar Singh
                  </div>
                  <p className="text-xs text-gray-500">Audi India</p>
                </Link>
              </li>

              <li className="hover:bg-gray-50 py-2 px-2">
                <Link href="">
                  <div className="text-sm text-gray-700">Aditiya Nagpal</div>
                  <p className="text-xs text-gray-500">
                    Dhruv Global India Pvt. Ltd.
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EsgRightSide;
