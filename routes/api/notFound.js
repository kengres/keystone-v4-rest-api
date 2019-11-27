
/**
 * 404
 */

exports = module.exports = function (req, res) {
  console.log(`req all`)
  res.json({
    code: 404,
    message: 'route not found'
  });
}