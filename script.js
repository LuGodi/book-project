const myLibrary = [];
const library = document.querySelector(".library");
const addBookButton = document.querySelector(".add-book");
const bookModal = document.querySelector("#add-book-modal");
const closeModal = document.querySelector("#close-modal-button");
const submitButtonModal = document.querySelector("#submit-button");
const addBookForm = document.querySelector("#add-book-form");
const removeButton = document.querySelectorAll(".card-header-icon");

function Book(title, author, pages, readPages, read, color) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readPages = readPages;
  this.read = false;
  this.bookColor = color;
  this.bookElement = undefined;
  this.dataAttr = undefined;
  this.bookElement = undefined;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

Book.prototype.createBookCard = function () {
  function createIconSpan(value, iconText, footer = true) {
    const spanContainer = document.createElement("span");
    if (footer) {
      spanContainer.className = "card-footer-icon";
      spanContainer.textContent = value;
    } else {
      spanContainer.className = "card-header-icon";
    }
    const spanIcon = document.createElement("span");
    spanIcon.className = "material-symbols-outlined";
    spanIcon.textContent = iconText;

    spanContainer.appendChild(spanIcon);
    return spanContainer;
  }

  function setBookColor(bookObject, bookElement) {
    const rootEl = document.querySelector(":root");
    const chosenColor = getComputedStyle(rootEl).getPropertyValue(
      `--book-bg-color-${bookObject.bookColor}`
    );
    bookElement.style.setProperty("--library-card-bg-color", chosenColor);
  }
  const bookElement = document.createElement("div");
  const cardHeader = document.createElement("div");
  const cardContent = document.createElement("div");
  const cardFooter = document.createElement("div");
  cardHeader.className = "card-header";
  cardContent.className = "card-content";
  cardFooter.className = "card-footer";
  cardFooter.append(
    createIconSpan(this.readPages, "bookmark_add"),
    createIconSpan(this.pages, "auto_stories")
  );
  cardHeader.textContent = this.title;
  const headerOptionsIcon = createIconSpan("", "delete", false);
  headerOptionsIcon.addEventListener("click", removeCard);
  cardHeader.appendChild(headerOptionsIcon);
  cardContent.textContent = this.read ? "Read" : "Not read yet";
  bookElement.appendChild(cardHeader);
  bookElement.appendChild(cardContent);
  bookElement.appendChild(cardFooter);

  bookElement.className = "card";
  setBookColor(this, bookElement);
  this.bookElement = bookElement;
};
Book.prototype.readToggle = function () {
  this.read = this.read === true ? false : true;
};
Book.prototype.addBookToLibrary = function () {
  myLibrary.push(this);
};
Book.prototype.addBook = function () {
  console.log(this);
  this.addBookToLibrary();
  this.createBookCard();
};
function displayBooks() {
  const childrenNodes = myLibrary.reduce(
    (bookElList, currentBook, currIndex) => {
      if (currentBook.bookElement) {
        currentBook.dataAttr = currIndex;
        currentBook.bookElement.dataset.index = currIndex;
        bookElList.push(currentBook.bookElement);
      }
      return bookElList;
    },
    []
  );
  library.replaceChildren(...childrenNodes);
}
function removeCard(event) {
  const targetCard = event.currentTarget.parentNode.parentNode;
  deleteFromLibrary(targetCard.dataset.index);
  displayBooks();
}
function deleteFromLibrary(indexOfElement) {
  myLibrary.splice(indexOfElement, 1);
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
  newBook.addBook();
  displayBooks();
  e.preventDefault();
  addBookForm.reset();
  bookModal.close();
}
//get values from the form

const book1 = new Book("Midnight Library", "Matt Huang", "409", "409", true);
const book2 = new Book("Harry Potter", "Jk Rowling", "200", "100", false);
const book3 = new Book("Im tired", "myself", "1", "1", true);
//DONE ability to set background-color for book
//TODO set read status
//DONE set data-attr to be able to refer to a book
//TODO add ability to delete cards
//TODO for each read card increment counter
//TODO set 3 states for cards {read, not started yet, finished}
//TODO define layout for cards

book1.addBook();
book2.addBook();
book3.addBook();

displayBooks();
// qual a diferença do return de Object.getPrototypeOf(Player) pra Player.prototype ? toda
//Player.prototype eh uma propriedade da funcao, todas as instancias criadas atraves do constructor player using new vao ter uma referencia a Player.prototype
//Object.getPrototypeOf(Player) eh a hidden property da funcao Player. Eh codigo nativo, que tem um prototype que referencia Object.prototype
