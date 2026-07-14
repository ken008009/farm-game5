// src/utils/loadImages.js
/** 语言码 → 图片文件夹；台湾用 zh，其余无独立图包的默认 en */
const IMAGE_FOLDER_MAP = {
  zh: 'zh',
  tw: 'zh',
}

export const getImageFolder = (locale) => IMAGE_FOLDER_MAP[locale] || 'en'

export const getImage = (locale, category, name) => {
  try {
    const folder = getImageFolder(locale)
    // 动态构建路径（Vite 要求使用 `new URL`）
    const path = new URL(
      `../assets/images/${category}/${folder}/${name}`,
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
