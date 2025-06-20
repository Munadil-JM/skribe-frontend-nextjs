import articleDefaultImg from "../assets/article-default.gif";
import { CHAIIMG } from "../../constants";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";

const TeaTimeRecord = ({
  bgBlogId,
  intBlogType,
  vchHeading,
  vchImagePath,
  vchSubHeading,
  vchContent,
  createdDate,
  vchReadMoreLink,
}) => {
  const date = new Date(createdDate);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedDate = formatter.format(date);

  return (
    <>
      <article
        hed={vchHeading}
        aid={bgBlogId}
        className="img-wrap mb-6 rounded-xl bg-white p-3 shadow-xl"
      >
        <Link
          href={""}
          id={vchHeading}
          className="text-md cursor-default font-medium leading-none text-gray-400"
        >
          {intBlogType}
        </Link>
        <h3 className="text-md m-0 pb-1 font-medium text-gray-600">
          {vchHeading}
        </h3>
        <figure>
          <Image
            width={200}
            height={100}
            quality={70}
            priority={false}
            placeholder="blur"
            blurDataURL={
              vchImagePath !== ""
                ? `${CHAIIMG}${vchImagePath}`
                : articleDefaultImg
            }
            src={
              vchImagePath !== ""
                ? `${CHAIIMG}${vchImagePath}`
                : articleDefaultImg
            }
            alt="Article Default"
            className="mb-4 w-full object-contain"
          />

          <figcaption>
            <h2 className="text-md pb-1 font-medium text-gray-600">
              {vchSubHeading === "string" ? "" : vchSubHeading}
            </h2>
            <div className="edit-style break-words pb-2 text-sm leading-5  text-gray-600">
              {parse(vchContent.substring(0, 350) + "...")}
              {vchReadMoreLink.trim() !== "string" && (
                <Link
                  href={vchReadMoreLink}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  Read more
                </Link>
              )}
            </div>
          </figcaption>
          <div className=" text-xs text-gray-500">{formattedDate}</div>
        </figure>
      </article>
    </>
  );
};

export default TeaTimeRecord;
