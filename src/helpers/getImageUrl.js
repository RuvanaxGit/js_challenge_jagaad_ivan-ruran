const handleGetImageUrl = function (product) {
  if (!product.cover_image_url) {
    return require('@/assets/img/activity_image.jpeg')
  }
  return product.cover_image_url
}

export default handleGetImageUrl
