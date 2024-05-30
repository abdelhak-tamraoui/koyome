"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-40">
          <Link
            href="/list?cat=all-products"
            onClick={() => setOpen((prev) => !prev)}
          >
            Shop
          </Link>
          <Link href="/deals" onClick={() => setOpen((prev) => !prev)}>
            Deals
          </Link>
          <Link href="/about" onClick={() => setOpen((prev) => !prev)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen((prev) => !prev)}>
            Contact
          </Link>
          <div className="flex gap-3 items-center">
            <Link
              href="/login"
              className="cursor-pointer p-4 rounded-md bg-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image
                src="/profile.png"
                alt=""
                width={22}
                height={22}
                className=" "
              />
            </Link>
            <div className="cursor-pointer p-4 rounded-md bg-white">
              <Image
                src="/notification.png"
                alt=""
                width={22}
                height={22}
                className=" "
              />
            </div>
            <Link
              href="/cart"
              className="cursor-pointer p-4 rounded-md bg-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image
                src="/cart.png"
                alt=""
                width={22}
                height={22}
                className=" "
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
