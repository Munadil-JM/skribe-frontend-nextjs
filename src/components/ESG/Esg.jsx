import EsgRecord from "./EsgRecord";
import EsgRightSide from "./EsgRightSide";

const Esg = () => {
  return (
    <div className="container flex gap-x-6 w-4/5">
      <section className="container  pt-8 pb-6 xl:w-2/3">
        <h2 className="text-lg text-gray-600 font-medium">
          Special Interest: ESG
        </h2>
        <p className="text-md pt-3 pb-7 text-gray-400">
          ESG refers to the three key factors when measuring the sustainability
          and ethical impact of an investment in a business or company. Most
          socially responsible investors check companies dummy content for now
          as of now lorem ipsum dummy! dummy check
        </p>
        <main className="container bg-gray-50 rounded-2xl py-4 px-6 border border-gray-200">
          <header className="flex justify-end border-b border-gray-200 pb-4 gap-x-3">
            <div className="border border-gray-200  xl:w-[320px] rounded-lg flex items-center pl-2  bg-white ">
              <span className="material-icons-outlined text-sm text-gray-300">
                search
              </span>
              <input
                type="text"
                className="text-sm text-gray-600 px-3 p-3 rounded-lg w-full focus:outline-none"
                placeholder="Search Anything here..."
              />
            </div>
            <select className="p-3 rounded-lg border border-gray-200 text-sm text-gray-400 focus:outline-0">
              <option>Past 24 Hours</option>
            </select>
            <input
              type="text"
              placeholder="Start Date"
              disabled
              className="w-32 p-3 text-sm bg-gray-100 bg-opacity-70 border border-gray-200 rounded-lg focus:outline-0"
            />
            <input
              type="text"
              placeholder="End Date"
              disabled
              className="w-32 p-3 text-sm bg-gray-100 bg-opacity-70 border border-gray-200 rounded-lg focus:outline-0"
            />
          </header>
          <EsgRecord />
        </main>
      </section>
      <div className="w-96 pt-8">
        <EsgRightSide />
      </div>
    </div>
  );
};

export default Esg;
