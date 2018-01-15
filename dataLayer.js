/* testing dl */
function getItemByProp(prop) {
  var dl = dataLayer || [];

  return dl.filter(function (product) {
    return product[prop];
  })
}
