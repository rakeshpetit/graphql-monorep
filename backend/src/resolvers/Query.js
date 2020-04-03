const { forwardTo } = require('prisma-binding')
const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  users: forwardTo('db'),
  user: forwardTo('db'),
  async queryUser(parent, args, ctx, info) {
    const where = { id: args.id }
    const user = await ctx.db.query.user({ where })
    const item = await ctx.db.query.items()
    return { user, item }
  }
};

module.exports = Query;
