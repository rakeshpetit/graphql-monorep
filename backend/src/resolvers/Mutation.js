const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        },
      },
      info
    )
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    const item = await ctx.db.query.item({ where }, `{ id title }`)
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password= await brcypt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER']},
        },
      },
      info
    )
    //JWT token
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    })
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({
      where: { email }
    }) 
    if(!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    console.log('signin', user)
    const isValid = await brcypt.compare(password, user.password)
    console.log('signin', isValid)
    if (!isValid) {
      throw new Error(`Invalid password`)
    }
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    })
    return user
  },
  signout(parent, { email, password }, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Bye!' }
  }
};

module.exports = Mutations;
