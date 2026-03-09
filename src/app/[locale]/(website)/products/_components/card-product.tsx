// "use client";

// import HeartButton from "@/components/shared/heart-button";
// import { ProductBadge } from "@/lib/utils/product-badge.util";
// import { ShoppingCart, Star } from "lucide-react";
// import { useFormatter, useTranslations } from "next-intl";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useWishlist } from "@/hooks/use-wishlist";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import useAddToCart from "@/hooks/use-add-to-cart";

// type AddToCartFields = {
//   product: string;
//   quantity: number;
// };

// export default function CardProduct({ product }: { product: Product }) {
//   // Translations
//   const t = useTranslations();
//   const format = useFormatter();

//   // Variables
//   const badges = ProductBadge(product);

//   // Hooks
//   const [loggedIn, setLoggedIn] = useState(false);
//   const { addToCart, error: addToCartError, isPending: isAddingToCart } = useAddToCart();
//   const { addToWishList, error: addToWishListError } = useWishlist();

//   // Check if user is logged in effect
//   useEffect(() => {
//     const isLogged = localStorage.getItem("isLoggedIn") === "true";
//     setLoggedIn(isLogged);
//   }, []);

//   // Add to cart as a guest functions
//   const getCartAsGuest = () => {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   };

//   const addToCartAsGuest = (product: Product) => {
//     const cart = getCartAsGuest();
//     const existing = cart.find((item: Product) => item._id === product._id);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));

//     toast.success(t("added-to-cart-successfully-as-a-guest"), {
//       position: "bottom-right",
//       duration: 2000,
//     });
//   };

//   // Logged in user functions
//   const submitAddToCart = ({ product, quantity }: AddToCartFields) => {
//     addToCart({ product, quantity });
//   };

//   // Button handler if logged in or guest
//   const handleAddToCart = () => {
//     if (loggedIn) {
//       submitAddToCart({ product: product._id, quantity: 1 });
//     } else {
//       addToCartAsGuest(product);
//     }
//   };

//   return (
//     <div key={product._id} className="relative">
//       {/* Image */}
//       <div className="relative rounded-xl w-full h-272 overflow-hidden">
//         <Image
//           src={product.imgCover!}
//           alt={product.description || t("product-image")}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//         <div className="flex justify-between mx-2.5 mt-2.5">
//           <div onClick={() => addToWishList(product._id)}>
//             <HeartButton _id={product._id} isInWishlist={product.isInWishlist} />
//           </div>

//           {/* Badges */}
//           <div className="relative">
//             {badges.map((badge, i) => (
//               <span
//                 key={i}
//                 className={`text-xs font-semibold px-2 py-1 rounded-full me-1.5 ${
//                   badge === t("new")
//                     ? "bg-zinc-100 text-zinc-700"
//                     : badge === t("hot")
//                       ? "bg-maroon-50 text-maroon-600"
//                       : badge === t("out-of-stock")
//                         ? "bg-red-600 text-softPink-50"
//                         : ""
//                 }`}
//               >
//                 {badge}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Product header */}
//       <Link
//         href={`/products/${product._id}`}
//         className="mt-5 font-semibold text-maroon-700 dark:text-softPink-200 text-lg text-start "
//       >
//         {product.title.split(" ").length > 5
//           ? `${product.title.split(" ").slice(0, 4).join(" ")} ...`
//           : product.title}
//       </Link>

//       {/* Product footer */}
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="flex mt-1.5">
//             {[...Array(4)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-3 h-3 ${i < Math.round(product.rateAvg) ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`}
//               />
//             ))}
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="mt-2 font-medium text-maroon-700 dark:text-softPink-200">
//               {format.number(product.price, {
//                 style: "currency",
//                 currency: "EGP",
//               })}{" "}
//               {/* Price after discount if available */}
//               {product.priceAfterDiscount && (
//                 <span className="text-zinc-400 line-through">
//                   {format.number(product.priceAfterDiscount, {
//                     style: "currency",
//                     currency: "EGP",
//                   })}
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>
//         <span className="flex justify-center items-center bg-maroon-600 dark:bg-maroon-500 rounded-full w-10 h-10 text-white">
//           {/* <div className="relative cursor-pointer" onClick={handleAddToCart}>
//             <ShoppingCart size={24} />
//             <span className="right-wheel-right bottom-wheel-bottom absolute bg-maroon-500 rounded-full w-[0.094rem] h-[0.094rem]"></span>
//             <span className="bottom-wheel-bottom left-wheel-left absolute bg-maroon-500 rounded-full w-[0.094rem] h-[0.094rem]"></span>
//           </div> */}

//           {/* Add to cart error */}
//           {addToCartError && toast.error(addToCartError.message)}

//           {/* Add to wishlist error */}
//           {addToWishListError && toast.error(addToWishListError.message)}

//           <div className="relative">
//             <Button
//               disabled={product.quantity <= 0 || isAddingToCart}
//               className="flex justify-center items-center bg-[#A6252A] dark:bg-[#CD2E33] rounded-full w-10 h-10 text-white"
//               onClick={handleAddToCart}
//             >
//               <ShoppingCart />
//             </Button>
//           </div>
//         </span>
//       </div>
//     </div>
//   );
// }



"use client";

import HeartButton from "@/components/shared/heart-button";
import { ProductBadge } from "@/lib/utils/product-badge.util";
import { ShoppingCart, Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useAddToCart from "@/hooks/use-add-to-cart";
import { useDeleteWishlist } from "../../wishlist/hooks/use-delete-wishlist";

type AddToCartFields = {
  product: string;
  quantity: number;
};

export default function CardProduct({ product }: { product: Product }) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Variables
  const badges = ProductBadge(product);

  const [isInWishlist, setIsInWishlist] = useState(product.isInWishlist);

  // Hooks
  const [loggedIn, setLoggedIn] = useState(false);
  const { addToCart, error: addToCartError, isPending: isAddingToCart } = useAddToCart();
  const { addToWishList, error: addToWishListError } = useWishlist();
 const { deleteFromWishList, error, isPending } = useDeleteWishlist();
  
  // Check if user is logged in effect
  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLogged);
  }, []);

  // Add to cart as a guest functions
  const getCartAsGuest = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const addToCartAsGuest = (product: Product) => {
    const cart = getCartAsGuest();
    const existing = cart.find((item: Product) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(t("added-to-cart-successfully-as-a-guest"), {
      position: "bottom-right",
      duration: 2000,
    });
  };

  // Logged in user functions
  const submitAddToCart = ({ product, quantity }: AddToCartFields) => {
    addToCart({ product, quantity });
  };

  // Button handler if logged in or guest
  const handleAddToCart = () => {
    if (loggedIn) {
      submitAddToCart({ product: product._id, quantity: 1 });
    } else {
      addToCartAsGuest(product);
    }
  };

  const handleWishlist = async () => {
  if (isInWishlist) {
    await deleteFromWishList(product._id);
    setIsInWishlist(false);
  } else {
    await addToWishList(product._id);
    setIsInWishlist(true);
  }
};

  return (
    <div key={product._id} className="relative">
      {/* Image */}
      <div className="relative rounded-xl w-full h-272 overflow-hidden">
        <Image
          src={product.imgCover!}
          alt={product.description || t("product-image")}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="flex justify-between mx-2.5 mt-2.5">
        <div onClick={handleWishlist}>
  <HeartButton _id={product._id} isInWishlist={isInWishlist} />
</div>
          

          {/* Badges */}
          <div className="relative">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`text-xs font-semibold px-2 py-1 rounded-full me-1.5 ${
                  badge === t("new")
                    ? "bg-zinc-100 text-zinc-700"
                    : badge === t("hot")
                      ? "bg-maroon-50 text-maroon-600"
                      : badge === t("out-of-stock")
                        ? "bg-red-600 text-softPink-50"
                        : ""
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product header */}
      <Link
        href={`/products/${product._id}`}
        className="mt-5 font-semibold text-maroon-700 dark:text-softPink-200 text-lg text-start "
      >
        {product.title.split(" ").length > 5
          ? `${product.title.split(" ").slice(0, 4).join(" ")} ...`
          : product.title}
      </Link>

      {/* Product footer */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex mt-1.5">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rateAvg) ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="mt-2 font-medium text-maroon-700 dark:text-softPink-200">
              {format.number(product.price, {
                style: "currency",
                currency: "EGP",
              })}{" "}
              {/* Price after discount if available */}
              {product.priceAfterDiscount && (
                <span className="text-zinc-400 line-through">
                  {format.number(product.priceAfterDiscount, {
                    style: "currency",
                    currency: "EGP",
                  })}
                </span>
              )}
            </p>
          </div>
        </div>
        <span className="flex justify-center items-center bg-maroon-600 dark:bg-maroon-500 rounded-full w-10 h-10 text-white">
          {/* <div className="relative cursor-pointer" onClick={handleAddToCart}>
            <ShoppingCart size={24} />
            <span className="right-wheel-right bottom-wheel-bottom absolute bg-maroon-500 rounded-full w-[0.094rem] h-[0.094rem]"></span>
            <span className="bottom-wheel-bottom left-wheel-left absolute bg-maroon-500 rounded-full w-[0.094rem] h-[0.094rem]"></span>
          </div> */}

          {/* Add to cart error */}
          {addToCartError && toast.error(addToCartError.message)}

          {/* Add to wishlist error */}
          {addToWishListError && toast.error(addToWishListError.message)}

          <div className="relative">
            <Button
              disabled={product.quantity <= 0 || isAddingToCart}
              className="flex justify-center items-center bg-[#A6252A] dark:bg-[#CD2E33] rounded-full w-10 h-10 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart />
            </Button>
          </div>
        </span>
      </div>
    </div>
  );
}