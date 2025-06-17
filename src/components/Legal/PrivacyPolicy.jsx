"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../BeforeLoginPages/Navbar";
import Footer from "../BeforeLoginPages/Footer";
import ContactUs from "../BeforeLoginPages/ContactUs";

// const quickLinks = [
//   {
//     id: 1,
//     text: "Chai Time",
//     linkTo: "/chai-time",
//   },
//   {
//     id: 2,
//     text: "Terms and Conditions",
//     linkTo: "/terms-condition",
//   },
//   {
//     id: 3,
//     text: "Privacy Policy",
//     linkTo: "/privacy-policy",
//   },
// ];

const PrivacyPolicy = () => {
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  return (
    <div className="font-inter">
      <Navbar />

      <div className="container mx-auto px-5">
        <ContactUs
          open={isContactUsOpen}
          onClose={() => setIsContactUsOpen(false)}
        />

        <div className="section flex flex-col justify-center lg:flex-row">
          {/* <div className="section item w-full rounded-xl bg-white shadow-xl lg:sticky lg:top-20 mt-5 lg:mt-0 mb-10 lg:w-1/4">
            <h2 className="rounded-t-xl bg-gray-200 p-3 px-8 text-lg">
              Quick Links
            </h2>

            <div className="mx-8 my-3 flex flex-col">
              <button
                onClick={() => setIsContactUsOpen(true)}
                className="flex gap-x-1 border-b border-gray-300 py-3 text-sm text-black/80 hover:text-gray-500"
              >
                Request Demo
              </button>

              {quickLinks.map((link) => {
                return (
                  <Link
                    key={link.id}
                    className="border-b border-gray-300 py-3 text-sm text-black/80 hover:text-gray-500 last:border-0"
                    href={link.linkTo}
                  >
                    {link.text}
                  </Link>
                );
              })}
            </div>
          </div> */}

          <div className="section w-12/12 lg:w-9/12 mt-4 mb-10">
            <h2 className="pb-2 pt-4 text-xl font-medium text-black">
              Privacy Policy
            </h2>

            <div className="rounded-xl bg-white p-4 shadow-xl lg:p-6">
              <div className="">
                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>1.</span>
                    Privacy Policy
                  </h3>

                  <p className="pl-5 text-sm text-gray-500">
                    SKRIBE (operating as &quot;SKRIBE&quot; brand,
                    &quot;we&quot;, or &quot;us&quot;) is committed to
                    protecting and respecting your privacy. This Notice sets out
                    the basis on which any personal data we collect from you, or
                    that you provide to us, will be processed by us and our
                    partners. Please read this Notice carefully to understand
                    our views and practices regarding your personal data and how
                    we will treat it. We provide data services for persons in
                    the journalism &amp; media industries
                    (&quot;Services&quot;).
                  </p>
                </div>

                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>2.</span>
                    The Database
                  </h3>
                  <p className="pl-5 text-sm text-gray-500">
                    The SKRIBE media data ncludes profiles and information of
                    journalists, bloggers and other media contacts. In addition,
                    we may also collect/obtain the following kinds of personal
                    data: including professional job titles; business and
                    contact information (including mobile phone number and
                    personal email if provided to us); career history; articles
                    written, and personal interests. The data sources are
                    primarily media outlets and journalists e.g., newspapers and
                    magazines.
                  </p>
                </div>

                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>3.</span>
                    Information Collection
                  </h3>
                  <p className="pl-5 text-sm text-gray-500">
                    SKRIBE collects information media information from public
                    sources, using primary and secondary techniques. By using
                    our site, you are giving us permission to use your personal
                    information in the ways set out in this Notice for the
                    provision of business services.
                  </p>
                </div>

                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>4.</span>
                    Use of Data
                  </h3>
                  <p className="pl-5 text-sm text-gray-500">
                    Professional business data about individuals (journalists)
                    is made available on SKRIBE for corporate brand subscribers
                    who may use our services for professional engagement with
                    media. Subscribers can access information about individuals
                    (including contact information) and may be sent alerts on
                    changes in job titles, journalist moves and contact
                    information. Corporate customers may connect directly send
                    press releases or other PR material of interest to the
                    individuals in question. SKRIBE does not control and is not
                    responsible for the content of any such communications.
                    Individuals (journalists/influencers) featured on the SKRIBE
                    database always have an opportunity to review, request
                    changes and have their information removed from the SKRIBE
                    database. To review personal data, you can contact
                    sandeep@jangamedia.in. We will respect your rights under
                    applicable laws, including by updating or deleting your
                    personal data, upon your request.
                  </p>
                </div>

                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>5.</span>
                    Information Use &amp; Disclosure
                  </h3>
                  <p className="pl-5 text-sm text-gray-500">
                    We use the information you provide to identify you,
                    communicate with you, to conduct our business, and provide
                    the Services. Our use of collected information is limited
                    to: i) facilitating transactions and collaborations between
                    you and other users; ii) servicing our relationship with
                    you; iii) providing you with better customer service;
                    iv) contacting you, including with promotional materials and
                    notifications. v) billing and account management;
                    vi) evaluating the effectiveness of our marketing, and for
                    statistical analysis; vii) research and development to
                    improve Services and developing new solutions. viii) sharing
                    your information to registered subscribers of our service ;
                    and monitoring and maintaining our computers and network.
                    ix) Your information may be shared with our corporate group.
                  </p>
                </div>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>6.</span>
                  Data Security
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  All personal information is stored on secure servers, some
                  servers may be located in other countries. Access to your
                  personal information is only limited to who need to use that
                  information in order to perform their roles and service
                  delivery. All subscribers are given passwords that enable
                  access specific areas of the site. Subscribers are responsible
                  for keeping that password confidential and for it not to be
                  shared with anyone.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>7.</span>
                  Google Analytics &amp; Cookies
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  Google Analytics, a web analytics service is used to monitor
                  website usage (such as the number of visitors to our site or
                  the number of unique page views). The web cookies we use on
                  this site won&#39;t collect personally identifiable
                  information about you and we won&#39;t disclose information
                  stored in cookies that we place on your device to third
                  parties.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>8.</span>
                  Links
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  This site may contain links to other websites.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>9.</span>
                  Your Rights
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  Personal information collected by us will be used only for
                  purposes outlined in this Notice. If we propose to use your
                  information for any other purpose, you will be provided with a
                  means to opt out of the use of your information for those
                  purposes. You have the right to ask us not to use your
                  personal information for marketing purposes. You can also
                  exercise the right at any time by contacting us at{" "}
                  <Link
                    href="mailto:sandeep@jangamedia.in"
                    className="text-blue-600 underline"
                  >
                    sandeep@jangamedia.in
                  </Link>
                  .
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 pl-3 font-medium text-gray-600">
                  <span></span>
                  Disclosure to third parties:
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  if we sell or buy any business or assets, we may disclose your
                  personal information to any prospective third party (as
                  transfer of assets).
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>10.</span>
                  Contact Us
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  Questions, comments and requests regarding this Notice are
                  welcomed and should be addressed to{" "}
                  <Link
                    href="mailto:sandeep@jangamedia.in"
                    className="text-blue-600 underline"
                  >
                    sandeep@jangamedia.in
                  </Link>
                  . For information about how to obtain a copy of your personal
                  information or how to update your personal information, please
                  see section below entitled &quot;Your Rights&quot;. We may
                  change this Notice from time to time, to reflect changes at
                  SKRIBE, or for legal or regulatory reasons. .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
