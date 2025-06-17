import Link from "next/link";
// import National from "./../assets/National.webp";
// import Regional from "./../assets/Regional.webp";
// import Blogs from "./../assets/Blogs.webp";
// import Online from "./../assets/Online.webp";
// import Consumer from "./../assets/Consumer.webp";
// import Broadcast from "./../assets/Broadcast.webp";
// import WireServices from "./../assets/Wire Services.webp";
// import InternationalBureau from "./../assets/International Bureau.webp";
// import B2B from "./../assets/B2B.webp";
// import Freelancer from "./../assets/Freelancer.webp";

const MediaSearchRecord = ({ data }) => {
  const imgPath = [
    "National",
    "Regional",
    "Blogs",
    "Online",
    "Consumer",
    "Broadcast",
    "Wire Services",
    "International Bureau",
    "B2B",
    "Freelancer",
  ];
  return (
    <div className="relative flex w-1/5 flex-shrink flex-col flex-wrap overflow-hidden rounded-lg border border-gray-100 p-3  py-3 pb-2 pt-9 lg:w-1/5  xl:w-1/5">
      <figure className="relative mb-3 flex flex-col items-center">
        <Link href={`/mediaTypeOutlet/${data?.mediaid}/${data?.mediaName}`}>
          {imgPath?.map((curImg, index) => {
            if (curImg.includes(data?.mediaName)) {
              return (
                <img
                  key={index}
                  src={`assets/${data?.mediaName}.webp`}
                  alt={data?.mediaName}
                  className="h-40 w-40 rounded-md object-contain"
                />
              );
            }
          })}
        </Link>
        <figcaption className="text-gray-900text-md flex flex-col  items-center pt-8  text-xl text-gray-900">
          <div className="line-clamp-2 max-h-10 overflow-hidden text-center  font-medium text-gray-600 text-sm">
            <Link href={`/mediaTypeOutlet/${data?.mediaid}/${data?.mediaName}`}>
              {data?.mediaName}
            </Link>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default MediaSearchRecord;
