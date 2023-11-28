"use client";

import React, { useEffect, useRef, useState } from "react";

import NavItem from "./NavItem";
import { PRODUCT_CATEGORIES } from "@/configs";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = activeIndex === index;

        return (
          <NavItem
            key={index}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={!!activeIndex}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
