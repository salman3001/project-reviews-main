import Route from '@ioc:Adonis/Core/Route'

export const paginate = (count: number, page: number, skip: number, routeName: string) => {
  const totalPages = count > skip ? Math.ceil(count / skip) : 1
  const startCount = page === 1 ? 1 : (page - 1) * skip + 1

  const currentPageUrl = Route.builder().qs({ page }).make(routeName)

  const nextPageUrl = Route.builder()
    .qs({ page: page < totalPages ? page + 1 : null })
    .make(routeName)
  const prevPageUrl = Route.builder()
    .qs({ page: page > 1 ? page - 1 : null })
    .make(routeName)

  const pages: any[] = []

  for (let index = 0; index < totalPages; index++) {
    const url = Route.builder()
      .qs({
        page: index + 1,
      })
      .make(routeName)

    const object = { number: index + 1, url }

    pages.push(object)
  }

  return {
    currentPage: page,
    currentPageUrl,
    nextPageUrl,
    prevPageUrl,
    pages,
    count,
    perPage: skip,
    startCount,
  }
}
