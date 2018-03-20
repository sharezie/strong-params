var _ = require('lodash')
var Parameters = require('../parameters')

/**
 * Koa middleware for strong params.
 *
 * @return {Function}
 * @api public
 */

module.exports = function () {
  return function (ctx, next) {
    /**
     * Params data.
     */

    var _params

    /**
     * Params `getter` and `setter`.
     */

    Object.defineProperty(ctx, 'parameters', {

      /**
       * Returns an extended data object of merged context params.
       *
       * @return {object}
       * @api public
       */

      get: function () {
        return _params.clone()
      },

      /**
       * Replaces the default params data.
       *
       * @param {object}
       * @api public
       */

      set: function (o) {
        _params = Parameters(o)
      }
    })

    /*
     * Populating params.
     *
     * NOTE: Use the `koa-qs` module to enable nested query string objects. To
     * enable body params, which are usually received over `post` or `put`
     * method, use `koa-bodyparser` middleware. To enable route params,
     * use `koa-router` middleware.
     */

    ctx.parameters = _.merge({}, ctx.request.body, ctx.query, ctx.params)

    /*
     * Next middleware.
     */

    return next()
  }
}
