import ChangePassword from "./ChangePassword";
import PagesNav from "./PagesNav";

const AccountSetting = () => {
  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className=" flex w-full flex-col flex-wrap gap-6 self-start pl-8">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pr-0">
              <ul className="flex items-center gap-x-1 text-xs text-gray-400">
                <li className="flex items-center">
                  Home
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Account Settings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section w-11/12 p-6 pt-0 pl-8 pr-0">
        <section className="section p-4 pb-6 pt-0">
          <div className="w-5/5 flex flex-col gap-8 pt-8 md:flex-row md:flex-nowrap lg:w-4/5">
            <PagesNav />
            <ChangePassword />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountSetting;
