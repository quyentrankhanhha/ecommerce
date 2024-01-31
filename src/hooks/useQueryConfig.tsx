import useQueryParams from 'src/hooks/useQueryParams'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      categoy: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
