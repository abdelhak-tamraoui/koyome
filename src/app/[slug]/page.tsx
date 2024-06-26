import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DOMPurify from "isomorphic-dompurify";
import ProductList from "@/components/ProductList";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  let products;
  try {
    const wixClient = await wixClientServer();
    products = await wixClient.products
      .queryProducts()
      .eq("_id", params.slug)
      .find();
  } catch (error) {}

  if (!products?.items[0]) {
    return notFound();
  }
  const product = products.items[0];

  return (
    <div className="px-4 mt-6 md:mt-12 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* IMG */}
      <div className="relative flex flex-col lg:flex-row gap-16 ">
        <div className="w-full h-max lg:w-1/2 lg:sticky top-20 ">
          <ProductImages items={product.media?.items} />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="h-[2px] bg-gray-100" />
          {product.price?.price === product.price?.discountedPrice ? (
            <h2 className="font-medium text-2xl">${product.price?.price}</h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                ${product.price?.price}
              </h3>
              <h2 className="font-medium text-2xl">
                ${product.price?.discountedPrice}
              </h2>
            </div>
          )}
          <div className="h-[2px] bg-gray-100" />
          {product.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <Add
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product.stock?.quantity || 0}
            />
          )}
          <div className="h-[2px] bg-gray-100" />
          {product.additionalInfoSections?.map((section: any) => (
            <div className="text-sm" key={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(section.description),
                }}
              />
            </div>
          ))}
          <div className="h-[2px] bg-gray-100" />
        </div>
      </div>
      <div className="mt-14">
        <h2 className="mt-12 text-xl font-semibold">Related Products</h2>
        <ProductList
          collectionId={
            product.collectionIds
              ? product.collectionIds[0]
              : process.env.NEW_IN_CATEGORY_ID!
          }
          limit={4}
        />
      </div>
    </div>
  );
};

export default SinglePage;
