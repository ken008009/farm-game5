import { getImage } from '@/utils/loadImages'

const MENU_ENTRIES = [
  ['menu_notice', 'icon_menu_notice.png'],
  ['menu_land', 'icon_menu_land.png'],
  ['menu_granary', 'icon_menu_granary.png'],
  ['menu_blind', 'icon_menu_blind.png'],
  ['menu_market', 'icon_menu_market.png'],
  ['menu_exchange', 'icon_menu_exchange.png'],
  ['menu_seed', 'icon_menu_seed.png'],
  ['menu_store', 'icon_menu_store.png'],
  ['menu_pledge', 'icon_menu_pledge.png'],
  ['menu_shop', 'icon_menu_shop.png'],
  ['menu_pay', 'icon_menu_pay.png'],
  ['menu_auction', 'icon_menu_auction.jpg'],
  ['icon_seed_list', 'icon_seed_list.png'],
  ['icon_record', 'icon_record.png'],
]

/** 按语言码生成 image_game（菜单/图标；弹窗背景已改用 .login-panel） */
export function buildImageGame(locale) {
  return Object.fromEntries(
    MENU_ENTRIES.map(([key, file]) => [key, getImage(locale, 'game', file)])
  )
}
