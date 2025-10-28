import { useTranslations } from "next-intl";

export function ProductBadge(product: Product) {
  const t = useTranslations();
  // Calc Now time and created time and compare
  const now = new Date();
  const createdAt = new Date(product.createdAt);
  const diffDays =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const isNew = diffDays < 60;

  // Calc product sold and quantity
  const soldRatio = (product.sold / (product.sold + product.quantity)) * 100;
  const isHot = soldRatio > 50 || product.sold > 300;

  // Calc product quantity
  const isOutOfStock = product.quantity <= 0;

  //  Badges
  const badges = [];
  if (isNew) badges.push(t("new"));
  if (isHot) badges.push(t("hot"));
  if (isOutOfStock) badges.push(t("out-of-stock"));

  return badges;
}
