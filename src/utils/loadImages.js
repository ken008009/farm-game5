// src/utils/loadImages.js
export const getImage = (locale, category, name) => {
  try {
    // 动态构建路径（Vite 要求使用 `new URL`）
    const path = new URL(
      `../assets/images/${category}/${locale}/${name}`,
      import.meta.url
    ).href;
    return path;
  } catch (error) {
    // 错误处理：返回默认图片或空字符串
    console.error(`Image not found: ${locale}/${category}/${name}`);
    return '';
  }
};
export const getLandImage = (level) => {
  try {
    // 动态构建路径（Vite 要求使用 `new URL`）
    const path = new URL(
      `../assets/images/game/land_${level}.png`,
      import.meta.url
    ).href;
    return path;
  } catch (error) {
    // 错误处理：返回默认图片或空字符串
    console.error(`Image not found: `);
    return '';
  }
};
export const getGoodsImage = (num) => {
  try {
    const path = new URL(
      `../assets/images/game/goods_${num}.png`,
      import.meta.url
    ).href;
    return path;
  } catch (error) {
    // 错误处理：返回默认图片或空字符串
    console.error(`Image not found: `);
    return '';
  }
};
export const getPlantImage = (type, level) => {
  try {
    const path = new URL(
      `../assets/images/game/plant${type}_${level}.png`,
      import.meta.url
    ).href;
    return path;
  } catch (error) {
    // 错误处理：返回默认图片或空字符串
    console.error(`Image not found: `);
    return '';
  }
};