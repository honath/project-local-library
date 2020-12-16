function findAuthorById(authors, id) 
{
  const foundAuthor = authors.find(author => author.id == id);

  return foundAuthor;
}

function findBookById(books, id) 
{
  const foundBook = books.find(book => book.id == id);

  return foundBook;
}

function partitionBooksByBorrowedStatus(books) 
{
  const checkedOut = [];
  const available = [];
  
  books.forEach(book => {
    if (book.borrows.some(borrow => borrow.returned == false))
    {
      checkedOut.push(book);
    }
    else
    {
      available.push(book);
    }
  });

  const partitionedBooks = [checkedOut, available];
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) 
{
  const borrowList = accounts.reduce((acc = [], account) => {
    book.borrows.forEach(borrow =>{
      if (borrow.id == account.id && acc.length < 10)
      {
        acc.push({...borrow, ...account});
      }
    });
    return acc;
  }, []);

  return borrowList;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
