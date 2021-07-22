import { home } from '../controllers/homeController'
import {
  deleteAuthor,
  editAuthorById,
  getAllAuthors,
  getAuthorById,
  createAuthor,
} from '../controllers/authorController'
import {
  deleteBook,
  editBookById,
  getAllBooks,
  getBookById,
  createBook,
} from '../controllers/bookController'
import Router from 'koa-router'
import {
  createShop,
  deleteShop,
  editShopById,
  getAllShops,
  getShopById,
} from '../controllers/shopController'

export const router = new Router()

// Home route
router.get('/', home)

// Author Routes

// GET ALL Authors
router.get('/authors', getAllAuthors)

// GET an Author
router.get('/authors/:id', getAuthorById)

// Post new Author
router.post('/authors', createAuthor)

// EDIT Author
router.patch('/authors/:id', editAuthorById)

// Delete Author
router.delete('/authors/:id', deleteAuthor)

// Books Routes

// GET ALL Books
router.get('/books', getAllBooks)

// GET a Book
router.get('/books/:id', getBookById)

// POST a Book
router.post('/books', createBook)

// EDIT a book
router.patch('/books/:id', editBookById)

// DELETE a Book
router.delete('/books/:id', deleteBook)

// Shops Routes

// GET ALL shops
router.get('/shops', getAllShops)

// GET a Shop
router.get('/shops/:id', getShopById)

// POST a Shop
router.post('/shops', createShop)

// EDIT a Shop
router.patch('/shops/:id', editShopById)

// DELETE a Shop
router.delete('/shops/:id', deleteShop)
