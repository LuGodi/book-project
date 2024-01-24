const myLibrary = [];
const myLibraryCardElements = [];
const library = document.querySelector(".library");
const addBookButton = document.querySelector(".add-book");
const bookModal = document.querySelector("#add-book-modal");
const closeModal = document.querySelector("#close-modal-button");
const submitButtonModal = document.querySelector("#submit-button");
const addBookForm = document.querySelector("#add-book-form");

function Book(title, author, pages, readPages, read, color) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readPages = readPages;
  this.read = read;
  this.bookColor = color ?? "white";
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

addBookButton.addEventListener("click", () => bookModal.showModal());
closeModal.addEventListener("click", () => bookModal.close());
submitButtonModal.addEventListener("click", readForm);
//implement form validation
function readForm(e) {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookTotalPages = document.querySelector("#pages").value;
  const bookReadPages = document.querySelector("#pages-read").value;
  const bookColorChoice = document.querySelector(
    '[name="book-color"]:checked'
  ).value;
  const bookReadBool = document.querySelector("#read-checkbox").checked;
  console.log(
    bookTitle,
    bookAuthor,
    bookTotalPages,
    bookReadPages,
    bookColorChoice,
    bookReadBool
  );
  const newBook = new Book(
    bookTitle,
    bookAuthor,
    bookTotalPages,
    bookReadPages,
    bookReadBool,
    bookColorChoice
  );
  addBook(newBook);
  displayBooks();
  e.preventDefault();
  addBookForm.reset();
  bookModal.close();
}
//get values from the form

const book1 = new Book("Midnight Library", "Matt Huang", "409", "409", true);
const book2 = new Book("Harry Potter", "Jk Rowling", "200", "100", false);
const book3 = new Book("Im tired", "myself", "1", "1", true);
//TODO ability to set background-color for book
//TODO define layout for cards
//TODO get unsplash images

function addBook(book) {
  addBookToLibrary(book);
  createBookCard(book);
}
function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBook(book1);
addBook(book2);
addBook(book3);
function createBookCard(book) {
  function createIconSpan(value, iconText) {
    const spanContainer = document.createElement("span");
    spanContainer.className = "card-footer-icon";
    spanContainer.textContent = value;
    const spanIcon = document.createElement("span");
    spanIcon.className = "material-symbols-outlined";
    spanIcon.textContent = iconText;

    spanContainer.appendChild(spanIcon);
    return spanContainer;
  }
  function addBookElementToCardLibrary(bookElement) {
    myLibraryCardElements.push(bookElement);
  }
  const bookElement = document.createElement("div");
  const cardHeader = document.createElement("div");
  const cardContent = document.createElement("div");
  const cardFooter = document.createElement("div");

  cardHeader.className = "card-header";
  cardContent.className = "card-content";
  cardFooter.className = "card-footer";
  cardFooter.append(
    createIconSpan(book.readPages, "bookmark_add"),
    createIconSpan(book.pages, "auto_stories")
  );
  cardHeader.textContent = book.title;
  bookElement.appendChild(cardHeader);
  bookElement.appendChild(cardContent);
  bookElement.appendChild(cardFooter);

  bookElement.className = "card";
  addBookElementToCardLibrary(bookElement);
}

function displayBooks() {
  library.replaceChildren(...myLibraryCardElements);
}

displayBooks();
// qual a diferença do return de Object.getPrototypeOf(Player) pra Player.prototype ? toda
//Player.prototype eh uma propriedade da funcao, todas as instancias criadas atraves do constructor player using new vao ter uma referencia a Player.prototype
//Object.getPrototypeOf(Player) eh a hidden property da funcao Player. Eh codigo nativo, que tem um prototype que referencia Object.prototype
