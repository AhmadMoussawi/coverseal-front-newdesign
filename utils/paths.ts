import slugify from "slugify";

export function generateAchievementPath(
  categoryId: number,
  category: string,
  itemId: number,
  itemName: string
) {
  return `/achievements/${categoryId}/${slugify(category, {
    lower: true,
  })}/${itemId}/${slugify(itemName, {
    lower: true,
  })}`;
}
export function generateBlogPath(
  category: number,
  itemName: string,
  id:number
) {
  return `/conseils-pratiques/${category}/${slugify(itemName, {
    lower: true,
  })}/${id}`;
}

export function generateAchievementCategoryPath(
  categoryId: number,
  category: string
) {
  return `/achievements/${categoryId}/${slugify(category, {
    lower: true,
  })}`;
}
