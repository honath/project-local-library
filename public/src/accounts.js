function findAccountById(accounts, id) 
{
  const foundAccount = accounts.find(account => account.id == id);

  return foundAccount;
}

function sortAccountsByLastName(accounts)
{
    const sortedAccounts = accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);

    return sortedAccounts;
}

function numberOfBorrows(account, books) 
{
  const id = account.id;
  let totalBorrows = 0;
  books.forEach(book => book.borrows.forEach(borrow => {
    if (borrow.id == id)
    {
      totalBorrows++;
    }
  }));

  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) 
{
  const id = account.id;
  const checkedOutBooks = books.filter(book => book.borrows.some(borrow => borrow.id == id && !borrow.returned));
  const result = addAuthorToBook(checkedOutBooks, authors);
  return result;
}

function addAuthorToBook(books, authors)
{
  const condensedBooks = []; 
  books.forEach(book => {
    book.author = authors.find(author => author.id == book.authorId);
    condensedBooks.push(book);
  });
  
  return condensedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
