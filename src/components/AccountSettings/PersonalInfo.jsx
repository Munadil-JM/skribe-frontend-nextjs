const PersonalInfo = () => {
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="w-5/5 border-gray-500 px-8 md:border-l lg:w-3/5">
      <h3 className="text-sm font-medium text-gray-600">Personal Info</h3>
      <p className="text-xs text-gray-500">User Detail</p>
      <form>
        <div className="mt-4 flex max-w-full flex-col gap-4 xl:flex-row xl:gap-8 ">
          <div className="flex flex-auto flex-col">
            <label className="text-sm font-normal text-gray-500">Name</label>
            <input
              type="text"
              name="fullName"
              placeholder={userDetail?.name && userDetail?.name}
              className="w-auto rounded-md border border-gray-500 p-3 py-2 text-sm text-gray-300"
            />
          </div>

          <div className="flex flex-auto flex-col">
            <label className="text-sm font-normal text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder={userDetail?.email && userDetail?.email}
              className="w-auto rounded-md border border-gray-500 p-3 py-2 text-sm text-gray-300"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex flex-auto flex-col">
            <label className="text-sm font-normal text-gray-500">Mobile</label>
            <input
              type="text"
              name="mobile"
              className="w-auto rounded-md border border-gray-500 p-3 py-2 text-sm text-gray-300"
              placeholder={
                userDetail?.phoneNumber !== null
                  ? userDetail?.phoneNumber
                  : "N/A"
              }
            />
          </div>

          <div className="flex flex-auto flex-col">
            <label className="text-sm font-normal text-gray-500">Company</label>
            <input
              type="text"
              disabled
              name="email"
              placeholder=""
              className="w-auto rounded-md border border-gray-500 p-3 py-2 text-sm text-gray-300"
            />
          </div>
        </div>
        {/* <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex flex-auto flex-col">
            <label className="text-sm font-normal text-gray-500">
              Account Type
            </label>
            <input
              type="text"
              name="mobile"
              disabled
              placeholder="Accounts Manager"
              className="w-auto rounded-md border border-gray-200 p-3"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex flex-auto flex-col">
            <label className="text-sm font-normal text-gray-500">
              Signature
            </label>
            <textarea
              type="text"
              name="mobile"
              placeholder="Dummy content for now!"
              className="h-40 w-auto resize-none rounded-md border border-gray-200 p-3"
            ></textarea>
          </div>
        </div> */}
        <div className="mt-4 flex gap-4 xl:gap-8">
          <div className="flex gap-4">
            <input
              type="submit"
              value="Update"
              className=" cursor-pointer rounded-md border border-purple-600 px-6 py-1 text-sm text-purple-600 hover:bg-purple-600 hover:text-white"
              onClick={(e) => e.preventDefault()}
            />
            <input
              type="button"
              value="Clear"
              className="cursor-pointer rounded-md border border-gray-400 px-6 py-1 text-sm text-gray-400 hover:bg-gray-400 hover:text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
