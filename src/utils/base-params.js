function getBaseParams(router, thePerPage, page) {
  let params = {
    per_page: thePerPage,
    page: page,
  };

  if (router.query?.sort) {
    params.sort = router.query?.sort;
  }

  if (router.query?.show_all) {
    params.show_all = router.query.show_all;
  }
  return params;
}

export { getBaseParams };
