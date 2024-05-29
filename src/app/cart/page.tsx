"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import Link from "next/link";
const CartPage = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  return (
    <div className="px-4 mt-6 md:mt-12 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h2 className="text-2xl mb-8">Shopping Cart</h2>
      {!cart.lineItems?.length ? (
        <div className="flex items-center justify-center h-[calc(100vh-300px)]">
          <div className="text-2xl mb-8 text-gray-400">Cart is Empty</div>
        </div>
      ) : (
        <>
          {/* LIST */}
          <div className="space-y-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <Link
                href={`/${item.catalogReference?.catalogItemId}`}
                className="flex flex-col items-center sm:flex-row gap-4"
                key={item._id}
              >
                {item.image && (
                  <Image
                    src={
                      wixMedia.getScaledToFillImageUrl(
                        item.image,
                        400,
                        400,
                        {}
                      ) as string
                    }
                    alt=""
                    width={400}
                    height={400}
                    className="object-cover w-full sm:w-32 rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="space-y-2">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold md:text-base xl:text-xl">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      className="bg-red-400 rounded-md p-2 text-white"
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="mt-8 bg-gray-100  p-4 rounded space-y-4">
            <div className="flex items-center justify-between font-semibold">
              <span className="md:text-lg xl:text-xl">Subtotal</span>
              {/* <span className="">${cart.subtotal.amount}</span> */}
            </div>
            <p className="text-gray-500 text-sm md:text-base xl:text-lg mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-500">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CartPage;
