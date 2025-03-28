"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="content text-gray-500 text-[11px]">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-700 italic">
                  {decodeURIComponent(segment)}
                </span>
              ) : (
                <Link href={path} className="text-white hover:underline italic">
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
