"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <Button
      onClick={() => {
        setIsSuccess(true);
        addItem(product);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
