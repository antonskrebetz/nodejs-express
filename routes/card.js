const {Router} = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/card')
})

function computePrice(courses) {
  return courses.reduce((total, course) => {
    return total += course.count * course.courseId.price
  }, 0)
}

router.delete('/remove/:id', auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.courseId')

  const courses = user.cart
  const cart = {
    courses,
    price: computePrice(courses.items)
  }

  res.status(200).json(cart)
})

router.get('/', auth, async (req, res) => {
  const user = await req.user.populate('cart.items.courseId')

  res.render('card', {
    title: 'Card',
    isCard: true,
    courses: user.cart.items,
    price: computePrice(user.cart.items)
  })
})

module.exports = router