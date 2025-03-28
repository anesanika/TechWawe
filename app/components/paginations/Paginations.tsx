"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Paginations = ({ counts }: { counts: number }) => {
  return (
    <div>
      {Array.from({ length: counts }, (_, i) => (
        <Link href={`?page=${i + 1}`} key={i}>
          {i + 1}
        </Link>
      ))}
    </div>
  );
};
