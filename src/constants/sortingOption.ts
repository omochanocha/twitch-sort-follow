/**
 * 「ソート条件・ソート順」の選択肢の一つを表す型
 */
export type SortingOption = {
  /** 一意の id。select の value として使う。*/
  id: string;
  /** sort クエリパラメータの値 */
  sort: string;
  /** order クエリパラメータの値 */
  order: string;
  /** 表示名。select の表示等に使う */
  label: string;
};

/**
 * 「商品一覧」ページの「ソート順」の選択肢をまとめた SSoT
 */
export const sortingOptions = {
  priceDesc: {
    id: 'priceDesc',
    sort: 'price',
    order: 'desc',
    label: '価格が高い順',
  },
  priceAsc: {
    id: 'priceAsc',
    sort: 'price',
    order: 'asc',
    label: '価格が安い順',
  },
  ratingDesc: {
    id: 'ratingDesc',
    sort: 'rating',
    order: 'desc',
    label: '平均評価が高い順',
  },
  ratingAsc: {
    id: 'ratingAsc',
    sort: 'rating',
    order: 'asc',
    label: '平均評価が低い順',
  },
} as const satisfies Record<string, SortingOption>;

/**
 * {@link SortingOption} の id が取りうる値のユニオン型。
 */
export type SortingOptionId = keyof typeof sortingOptions;
