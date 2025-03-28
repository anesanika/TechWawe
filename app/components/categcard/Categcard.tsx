import Image from "next/image";
import Link from "next/link";

export default function Categcard({
  small,
  title,
  image = "https://static.thenounproject.com/png/5191452-200.png",
}: {
  small?: boolean | false;
  title?: string;
  image?: string;
}) {
  const smallTitle = title?.toLowerCase();

  return (
    <Link
      href={`/products?category=${smallTitle}`}
      className={`flex flex-col border border-[#00000027] rounded-md p-2 relative overflow-hidden ${
        small ? "h-17 min-w-70 overflow-hidden" : "h-32"
      }`}
    >
      <div
        className={`w-full ${
          small ? "text-start mt-3 text-[20px]" : "text-center"
        } text-2xl font-[roboto]`}
      >
        <h5>{title}</h5>
      </div>
      <div className={`absolute  ${small ? "top-0" : "-bottom-6"} -right-4`}>
        <Image
          src={image}
          width={100}
          height={100}
          alt="iamgeCate"
          sizes="50wv"
        />
      </div>
    </Link>
  );
}
