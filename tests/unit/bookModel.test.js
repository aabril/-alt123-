const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const Book = require('../../src/models/book.model');

describe('Book Model', () => {
  it('should create a new book', (done) => {
    const bookObj = {
      name: "Book Title",
      author: "Book Author",
      ISBN: "978-3-16-148410-0"
    }
    const BookMock = sinon.mock(new Book(bookObj));
    const book = BookMock.object;

    BookMock
      .expects('save')
      .yields(null);

    book.save((err) => {
      BookMock.verify();
      BookMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

  it('should return error if book is not created', (done) => {
    const bookObj = {
      name: "Book Title",
      author: "Book Author",
      ISBN: "978-3-16-148410-0"
    }
    const BookMock = sinon.mock(new Book(bookObj));
    const book = BookMock.object;
    const expectedError = {
      name: 'ValidationError'
    };

    BookMock
      .expects('save')
      .yields(expectedError);

    book.save((err, result) => {
      BookMock.verify();
      BookMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should not create a book with the unique ISBN', (done) => {
    const bookObj = {
      name: "Book Title",
      author: "Book Author",
      isbn: "978-3-16-148410-0"
    }
    const BookMock = sinon.mock(Book(bookObj));
    const book = BookMock.object;
    const expectedError = {
      name: 'MongoError',
      code: 11000
    };

    BookMock
      .expects('save')
      .yields(expectedError);

    book.save((err, result) => {
      BookMock.verify();
      BookMock.restore();
      expect(err.name).to.equal('MongoError');
      expect(err.code).to.equal(11000);
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should find book by name', (done) => {
    const bookMock = sinon.mock(Book);
    const expectedMockedBook = {
      _id: '5700a128bd97c1341d8fb365',
      name: 'Book Title'
    };

    bookMock
      .expects('findOne')
      .withArgs({ name: 'Book Title' })
      .yields(null, expectedMockedBook);

    Book.findOne({ name: 'Book Title' }, (err, result) => {
      bookMock.verify();
      bookMock.restore();
      expect(result.name).to.equal('Book Title');
      done();
    });
  });

  it('should remove book by ISBN', (done) => {
    const bookMock = sinon.mock(Book);
    const expectedMockedResult = {
      nRemoved: 1
    };

    bookMock
      .expects('remove')
      .withArgs({ isbn: '978-3-16-148410-0' })
      .yields(null, expectedMockedResult);

    Book.remove({ isbn: '978-3-16-148410-0' }, (err, result) => {
      bookMock.verify();
      bookMock.restore();
      expect(err).to.be.null;
      expect(result.nRemoved).to.equal(1);
      done();
    });
  });
});
