import Link from "next/link";

const links = [
  {
    id: 1,
    text: "Home",
    linkTo: "/",
  },
  {
    id: 2,
    text: "Discover",
    linkTo: "/discover",
  },
  {
    id: 3,
    text: "Monitoring",
    linkTo: "/monitoring",
  },
  {
    id: 4,
    text: "Analytics",
    linkTo: "/analytics",
  },
];

const resources = [
  {
    id: 1,
    text: "Chai Time",
    linkTo: "/chai-time",
  },
  {
    id: 2,
    text: "Skribe 365",
    linkTo: "/skribe365",
  },
  {
    id: 3,
    text: "Top Journalists",
    linkTo: "/projournalist-list",
  },
];

const others = [
  {
    id: 1,
    text: "Careers",
    linkTo: "/careers",
  },
  {
    id: 2,
    text: "About Us",
    linkTo: "/about-us",
  },
  {
    id: 3,
    text: "Privacy Policy",
    linkTo: "/privacy-policy",
  },
  {
    id: 4,
    text: "Terms & Conditions",
    linkTo: "/terms-condition",
  },
];

const socialMedia = [
  {
    id: 1,
    imageSrc: "/assets/x.svg",
    imageAlt: "X Icon",
    linkTo: "https://x.com/goskribe",
  },
  {
    id: 2,
    imageSrc: "/assets/linkedin.svg",
    imageAlt: "LinkedIn Icon",
    linkTo: "https://www.linkedin.com/company/skribe/posts/",
  },
  {
    id: 3,
    imageSrc: "/assets/facebook.svg",
    imageAlt: "Facebook Icon",
    linkTo: "https://www.facebook.com/goskribe",
  },
  {
    id: 4,
    imageSrc: "/assets/instagram.svg",
    imageAlt: "Instagram Icon",
    linkTo: "https://www.instagram.com/goskribe/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#002B5B] font-inter text-white px-5 py-6 lg:px-10 sm:py-12">
      <div className="container mx-auto flex flex-col gap-5 sm:gap-10">
        <section className="flex flex-col justify-between items-start gap-5 sm:flex-row">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <img
              src="/assets/logo-footer.png"
              alt="Logo"
              className="w-[68px] sm:w-[85px]"
              width={85}
            />

            <Link
              href={"/signup"}
              className="sm:hidden bg-[#EDF5FF] text-[#002B5B] px-3 py-2 rounded-md font-bold cursor-pointer w-fit text-sm"
            >
              Try Skribe Free Today!
            </Link>
          </div>

          <div className="sm:w-[315px] flex flex-col gap-4 text-xs text-center sm:text-sm lg:text-base sm:text-start">
            <p>
              Ready to take your PR and media monitoring to the next level?
              Contact us for a demo or explore our pricing plans.
            </p>

            <Link
              href={"/signup"}
              className="hidden sm:block bg-[#EDF5FF] text-[#002B5B] px-4 py-2 rounded-md lg:rounded-lg font-bold sm:text-sm lg:text-md cursor-pointer w-fit"
            >
              Try Skribe Free Today!
            </Link>
          </div>

          <div className="sm:w-[382px] flex flex-col gap-4">
            <h3 className="font-bold text-center text-xs sm:text-sm lg:text-base sm:text-start">
              Skribe: Your Complete Solution for Media Monitoring and Social
              Listening
            </h3>

            <p className="text-center text-xs sm:text-start sm:text-sm lg:text-base">
              Unlock powerful media monitoring and social listening tools with
              Skribe. Analyze trends, track competitors, and enhance your PR
              strategy with AI-driven insights.
            </p>
          </div>
        </section>

        <section className="flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap">
          <ul className="flex flex-col gap-2 items-center text-xs sm:items-start sm:text-sm lg:text-base">
            <h3 className="font-bold mb-2">Links</h3>

            {links.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.linkTo}>{link.text}</Link>
                </li>
              );
            })}
          </ul>

          <ul className="flex flex-col gap-2 items-center text-xs sm:items-start sm:text-sm lg:text-base">
            <h3 className="font-bold mb-2">Resources</h3>

            {resources.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.linkTo}>{link.text}</Link>
                </li>
              );
            })}
          </ul>

          <ul className="flex flex-col gap-2 items-center text-xs sm:items-start sm:text-sm lg:text-base">
            <h3 className="font-bold mb-2">Others</h3>

            {others.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.linkTo}>{link.text}</Link>
                </li>
              );
            })}
          </ul>

          <ul className="flex flex-row items-center mt-10 gap-3 justify-center w-full sm:mt-0 sm:w-auto sm:flex-col sm:self-end">
            {socialMedia.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.linkTo} target="_blank">
                    <img
                      src={link.imageSrc}
                      alt={link.imageSrc}
                      width={25}
                      height={25}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <hr className="opacity-30" />

        <p className="text-center text-xs sm:text-base sm:text-end -mt-3">
          Copyright &copy; {new Date().getFullYear()} Janga Media Private
          Limited
        </p>
      </div>
    </footer>
  );
};

export default Footer;
