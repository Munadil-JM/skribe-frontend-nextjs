import Link from "next/link";

const PressRelease = () => {
  return (
    <main className="font-sans bg-[#F1F1E6] text-[#002B5B] m-0 p-0">
      <header className=" text-white p-5 text-center">
        <h1 className="text-2xl font-bold text-[#002B5B]">
          Press Release Distribution Now Powered by Skribe
        </h1>
        <p className="text-lg text-[#002B5B]">
          Transparent, Hassle-Free, and Guaranteed
        </p>
      </header>

      <section className="p-10 max-w-5xl mx-auto">
        {/* <!-- Package 1 --> */}
        <div className="bg-white border-l-8 border-[#318FFF] p-5 mb-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Popular Distribution – ₹18,000 + taxes
          </h2>
          <p>
            <strong>Best for:</strong> Startups, independent PR professionals,
            boutique agencies
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>All-India distribution via Skribe</li>
            <li>Guaranteed coverage on IANS and UNI</li>
            <li>Choose between ANI Flash or PTI Wire</li>
            <li>Minimum 80+ online pickups</li>
            <li>Complimentary logo insertion</li>
            <li>Excel-based media list post-release</li>
          </ul>
        </div>

        {/* <!-- Package 2 --> */}
        <div className="bg-white border-l-8 border-[#318FFF] p-5 mb-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Premium Distribution – ₹26,000 + taxes
          </h2>
          <p>
            <strong>Best for:</strong> Brand launches, campaigns, corporate
            communication
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>All-India distribution via Skribe</li>
            <li>ANI Flash + PTI Wire</li>
            <li>Guaranteed posting on IANS and UNI</li>
            <li>Minimum 100+ online pickups</li>
            <li>Complimentary logo insertion</li>
            <li>Excel-based media list post-release</li>
          </ul>
        </div>

        {/* <!-- Bundles Table --> */}
        <h2 className="text-xl font-semibold mt-10">Bundles</h2>
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-3">Bundle Name</th>
              <th className="border px-4 py-3">Includes</th>
              <th className="border px-4 py-3">Price</th>
              <th className="border px-4 py-3">Ideal For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">Startup 3-Pack</td>
              <td className="border px-4 py-2 text-center">
                3x Popular Releases
              </td>
              <td className="border px-4 py-2 text-center">₹51,000 + taxes</td>
              <td className="border px-4 py-2 text-center">
                Startups and product updates
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border px-4 py-2 text-center">Agency 5-Pack</td>
              <td className="border px-4 py-2 text-center">
                5x Mixed Popular/Premium
              </td>
              <td className="border px-4 py-2 text-center">
                ₹1,15,000 + taxes
              </td>
              <td className="border px-4 py-2 text-center">
                Agencies managing multiple clients
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">Brand Quarterly</td>
              <td className="border px-4 py-2 text-center">
                4x Premium Releases
              </td>
              <td className="border px-4 py-2 text-center">₹99,000 + taxes</td>
              <td className="border px-4 py-2 text-center">
                Quarterly brand campaigns
              </td>
            </tr>
          </tbody>
        </table>

        {/* <!-- Add-Ons --> */}
        <div className="bg-[#FAC540] p-8 rounded-lg mt-10">
          <h3 className="text-lg font-semibold mb-2">
            Confirmed Postings (Add-Ons)
          </h3>
          <p>Want confirmed placements on top-tier websites?</p>
          <p>
            Add websites like Hindustan Times, Live Mint, NDTV, HT Auto, HT
            Tech, Health Shots, Slurrp, Live Hindustan.
          </p>
          <p className="font-bold mt-2">
            Confirmed placements start at ₹20,000 + taxes
          </p>
          <p className="italic text-sm">
            *Business Standard is only available with ANI Distribution
          </p>
        </div>

        {/* <!-- Why Skribe --> */}
        <div className="bg-[#FAC540] p-8 rounded-lg mt-10">
          <h3 className="text-lg font-semibold mb-2">Why Skribe?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Trusted wire partnerships and streamlined execution</li>
            <li>Media transparency with complete reporting</li>
            <li>One-click communication and support</li>
            <li>Perfect for PR agencies, startups & enterprise brands</li>
          </ul>
        </div>

        {/* <!-- CTA --> */}
        <div className="bg-[#FAC540] p-8 rounded-lg mt-10 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Ready to Distribute Your Next Press Release?
          </h3>
          <p>Reach out to us for scheduling, support or bulk discounts.</p>
          <Link
            href="/press-release"
            className="inline-block mt-5 bg-[#002B5B] text-white px-6 py-3 rounded hover:bg-[#001F40]"
          >
            Book Your Release Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PressRelease;
