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

const TermsCondition = () => {
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
          {/* <div className="section item w-full rounded-xl bg-white shadow-xl lg:sticky mt-5 lg:mt-0 lg:top-20 mb-10 lg:w-1/4">
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

          <div className="section w-12/12 lg:w-9/12 mb-10">
            <h2 className="pb-2 pt-4 text-xl font-medium text-black lg:pt-8">
              Terms &amp; Conditions
            </h2>
            <div className="rounded-xl bg-white p-4 shadow-xl lg:p-6">
              <div className="">
                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>1.</span> Who we are?
                  </h3>
                  <p className="pl-4 text-sm text-gray-500">
                    This site is owned and operated by Janga Media Pvt. Ltd, a
                    company registered in{" "}
                    <span className="font-semibold">
                      New Delhi under C.I. number U74900DL2012PTC242595
                    </span>
                  </p>
                </div>
                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>2.</span>
                    Use of this site
                  </h3>
                  <p className="pl-[20px] text-sm text-gray-500">
                    Janga Media reserves the right to suspend access to, or
                    withdraw all or any elements of this site, and to restrict
                    access to some parts to registered users only. Janga Media
                    shall have no liability for unavailability of this site.
                    Janga Media reserves the right to make changes to this site
                    at any time without notice.
                  </p>
                </div>
                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>3.</span>
                    Use of the Janga Media service
                  </h3>
                  <p className="pl-[20px] text-sm text-gray-500">
                    We restrict access to the Janga Media service to users who
                    have registered with Janga Media as a user of the Janga
                    Media service and who have agreed to Janga Media's Terms of
                    Service.
                  </p>
                  <p className="pl-[20px] pt-1 text-sm text-gray-500">
                    We may refuse or may cease to provide the Janga Media
                    service where we consider that it is or may be used in
                    breach of our Terms of Service, or for any unlawful or
                    improper purpose or for any other reason.
                  </p>
                </div>
                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>4.</span>
                    Your information
                  </h3>
                  <p className="pl-[20px] text-sm text-gray-500">
                    We process information about you in accordance with our
                    Privacy Policy. By using this site you are giving us
                    permission to use your personal information in the ways set
                    out in our Privacy Policy and you warrant that all data
                    provided by you is accurate.
                  </p>
                </div>

                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>5.</span>
                    Ownership of rights
                  </h3>
                  <p className="pl-[20px] text-sm text-gray-500">
                    All rights, including copyright, in this site and the Janga
                    Media service are owned by or licensed to Janga Media.
                  </p>
                </div>
                <div className="pb-2">
                  <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                    <span>6.</span>
                    General disclaimer
                  </h3>
                  <p className="pl-[20px] text-sm text-gray-500">
                    To the maximum extent permitted by applicable law, Janga
                    Media provides this site on an "as is" and on an "as
                    available" basis, without representations, warranties or
                    conditions of any kind, either express or implied,
                    including, without limitation, any representations,
                    warranties or conditions of satisfactory quality, fitness
                    for a particular purpose, non-infringement, compatibility,
                    security and accuracy.
                  </p>
                </div>
              </div>
              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>7.</span>
                  Limitation of Liability
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  In no event shall Janga Media be liable (whether in tort
                  (including negligence), contract, or otherwise) for any loss
                  or damage (including, without limitation, any direct,
                  indirect, special, incidental, or consequential damages of any
                  character) arising as a result of the use or inability to use
                  this site (including, without limitation, damages for loss of
                  business, loss of profits, loss of goodwill, work stoppage,
                  computer failure or malfunction, business interruption, loss
                  of business information or any other pecuniary loss).
                </p>
                <div className="pl-[20px] pt-1 text-sm text-gray-500">
                  <b>We do not exclude or limit any liability for:</b> <br />
                  <p className="leading-6">
                    (i) death or personal injury resulting from our negligence;
                    <br />
                    (ii) fraud or fraudulent misrepresentation; or <br />
                    (iii) any other liability that cannot by law be limited or
                    excluded.
                  </p>
                </div>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>8.</span>
                  Links
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  You may link to our site, provided you do so in a way that is
                  fair and legal and does not damage our reputation or take
                  advantage of it, but you must not establish a link in such a
                  way as to suggest any form of association, approval or
                  endorsement on our part where none exists.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>9.</span>
                  Viruses
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  You must not misuse this site by knowingly introducing
                  viruses, trojans, worms, logic bombs or other material which
                  is malicious or technologically harmful. You must not attempt
                  to gain unauthorised access to this site, the server on which
                  this site is stored or any server, computer or database
                  connected to this site. You mustnot attack this site via a
                  denial-of-service attack or a distributed denial-of service
                  attack.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>10.</span>
                  Enforceability
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  If any of these terms should be determined to be illegal,
                  invalid or otherwise unenforceable under applicable law, then
                  to the extent the term is illegal, invalid or unenforceable,
                  it shall be severed and deleted from these terms and the
                  remaining terms shall survive and continue to be binding and
                  enforceable.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>11.</span>
                  Changes to the terms
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  We reserve the right to change these terms from time to time
                  and recommend that you look through them on a regular basis.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="text-md flex gap-x-2 font-medium text-gray-600">
                  <span>12.</span>
                  Feedback
                </h3>
                <p className="pl-[20px] text-sm text-gray-500">
                  If you want to ask us anything about these terms, or have any
                  comments on this site, please email us at{" "}
                  <Link
                    href="mailto:sandeep@jangamedia.in"
                    className="text-blue-800 underline"
                  >
                    sandeep@jangamedia.in
                  </Link>
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

export default TermsCondition;
