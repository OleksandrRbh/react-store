const API_URL = 'https://online-store.bootcamp.place/api/'

export const fetchProducts = async (filters) => {
  const url = new URL('products', API_URL)

  for (const key in filters) {
    if (filters[key]) {
      if (!Array.isArray(filters[key])) {
        url.searchParams.set(key, filters[key])
      } else {
        filters[key].forEach(el => {
          url.searchParams.append(key, el)
        })
      }
    }
  }

  const response = await fetch(url);
  const totalCount = Number(response.headers.get('X-Total-Count'))
  const totalPages = Math.ceil(totalCount / filters._limit)
  const products = await response.json();

  return { products, totalPages }
}

export const fetchCategories = async () => {
  const url = new URL('categories', API_URL)

  const response = await fetch(url);
  const categories = await response.json();

  return categories
}

export const fetchBrands = async () => {
  const url = new URL('brands', API_URL)

  const response = await fetch(url);
  const brands = await response.json();

  return brands
}
