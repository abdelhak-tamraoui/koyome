import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  //fetch all collections
  const { items: collections } = await wixClient.collections
    .queryCollections()
    .find();

  //fetch a single collection
  const { collection } = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-orange-100/75  sm:flex justify-between rounded-md overflow-hidden">
        <div className="w-1/2 my-8  flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl text-center font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/2">
          <Image src="/banner.jpg" alt="" fill className="object-cover" />
        </div>
      </div>
      {/* FILTER */}
      <Filter collections={collections} />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">
        {collection?.name} For You!
      </h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          collectionId={
            collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
