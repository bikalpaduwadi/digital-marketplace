import React from "react";

import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}
const MaxWidthWrapper = (props: MaxWidthWrapperProps) => {
  const { className, children } = props;

  const wrapperClassname = cn(
    "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
    className
  );

  return <div className={wrapperClassname}>{children}</div>;
};

export default MaxWidthWrapper;
