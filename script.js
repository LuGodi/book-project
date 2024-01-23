const myLibrary = [];
const library = document.querySelector(".library");
const addBookButton = document.querySelector(".add-book");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

const book1 = new Book("Midnight Library", "Matt Huang", "409", true);
const book2 = new Book("Harry Potter", "Jk Rowling", "200", false);
const book3 = new Book("Im tired", "myself", "1", true);
//TODO ability to set background-color for book
//TODO define layout for cards
//TODO get unsplash images
console.log(book1);
console.log(book1.info());

function addBookToLibrary(book) {
  myLibrary.push(book);
}
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
function displayBooks() {
  const myDivs = [];
  for (let book of myLibrary) {
    console.log(book);
    const bookElement = document.createElement("div");
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.textContent = book.title;
    bookElement.appendChild(cardHeader);
    bookElement.className = "card";
    myDivs.push(bookElement);
  }
  library.append(...myDivs);
}
displayBooks();
// qual a diferença do return de Object.getPrototypeOf(Player) pra Player.prototype ? toda
//Player.prototype eh uma propriedade da funcao, todas as instancias criadas atraves do constructor player using new vao ter uma referencia a Player.prototype
//Object.getPrototypeOf(Player) eh a hidden property da funcao Player. Eh codigo nativo, que tem um prototype que referencia Object.prototype
