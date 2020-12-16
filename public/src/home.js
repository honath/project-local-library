function totalBooksCount(books) 
{
  let numOfBooks = 0;
  books.forEach(book => numOfBooks++);

  return numOfBooks;
}

function totalAccountsCount(accounts) 
{
  let numOfAccounts = 0;
  accounts.forEach(account => numOfAccounts++);

  return numOfAccounts;
}

function booksBorrowedCount(books) 
{
  let numOfBorrows = 0;
  books.forEach(book => book.borrows.forEach(borrow => {
    if (!borrow.returned)
    {
      numOfBorrows++;
    }
  }));

  return numOfBorrows;
}

function getMostCommonGenres(books) 
{
  const bookGenres = books.map(book => book.genre);
  const filteredBooks = bookGenres.reduce((acc = [], genre) => {
    const obj = {};
    if (acc.length == 0)
    {
      obj.name = genre;
      obj.count = bookGenres.filter(book => book == genre).length;
      acc.push(obj);
    }
    else if (acc.length > 0 && !acc.some(obj => obj.name == genre))
    {
      obj.name = genre;
      obj.count = bookGenres.filter(book => book == genre).length;
      acc.push(obj);
    }

    return acc;
  }, [])

  filteredBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);

  return filteredBooks.slice(0, 5);
}

function getMostPopularBooks(books) 
{
  const popBooks = books.reduce((acc, book) => {
    const obj = {};
    obj.name = book.title;
    obj.count = book.borrows.length;
    acc.push(obj);
    return acc;
  }, []);

  popBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);


  return popBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) 
{
  const rankedAuthors = [];

  authors.forEach(author => {
    let bookCount = 0;
    const obj = {};
    books.forEach(book => {
      if (book.authorId == author.id)
      {
        bookCount += book.borrows.length;
      }
    })
    obj.name = `${author.name.first} ${author.name.last}`;
    obj.count = bookCount;

    rankedAuthors.push(obj);
  });

  rankedAuthors.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1);

  return rankedAuthors.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
