import Link from "next/link";

type SearchCardProps = {
  url?: string;
  title: string;
  category: string;
  setValueZero: any;
};

export const Searchcard = ({
  url = "/",
  title,
  category,
  setValueZero,
}: SearchCardProps) => {
  return (
    <Link
      href={url}
      onClick={setValueZero}
      className="block w-full p-1 font-[roboto]"
    >
      <p className="font-sans text-[12px] text-[#0000006c]">{category}</p>
      <h1 className="text-lg font-bold">{title}</h1>
    </Link>
  );
};
