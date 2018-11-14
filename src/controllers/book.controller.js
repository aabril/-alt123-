/*
 * book resource handler
 */
const _ = require('lodash');
const Book = require('../models/book.model');

async function list(req, res) {
  try{
    const books = await Book.find()
    return res.jsend(books)
  }catch(err){
    return handleError(res, err)
  }
}

async function item(req, res) {
  try{
    const isbn = req.param.isbn
    const book = await Book.find({isbn: isbn})
    return res.jsend(book)
  }catch(err){
    return handleError(res, err)
  }
}

async function create(req, res) {
  return res.jsend({})
}

async function update(req, res) {
  return res.jsend({})
}

async function destroy(req, res) {
  return res.jsend({})
}

function handleError(res, err) {
  return res.jsend.error(err);
}

module.exports = {
  list,
  item,
  create,
  update,
  destroy
}