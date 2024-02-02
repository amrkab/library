let bookTitle = document.querySelector('#book-title');
let bookAuthor = document.querySelector('#book-author');
let pages = document.querySelector('#pages');
let submitBtn = document.querySelector('#submit-btn');
let library = document.querySelector('.library');
let modal = document.querySelector('[data-modal]');


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBooksToLibrary() {
    // Clear existing content in the library before re-rendering
    library.innerHTML = '';

    // Loop through the myLibrary array and display each book
    myLibrary.forEach((book, index) => {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.id = `container-${index}`;

        let cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `'${book.title}'`;

        let cardAuthor = document.createElement('div');
        cardAuthor.classList.add('card-author');
        cardAuthor.textContent = book.author;

        let cardPages = document.createElement('div');
        cardPages.classList.add('card-pages');
        cardPages.textContent = `${book.pages} pages`;

        let isRead = document.createElement('button');
        isRead.classList.add('change-status-button');
        isRead.classList.add('is-read');

        if(book.read){
            isRead.textContent = 'Read';
        } else if(!book.read) {
            isRead.textContent = 'Not Read';
        }
        
    
        isRead.addEventListener('click', () => {
            if(book.read) {
                book.read = !book.read;
                isRead.textContent = 'Not Read';
            } else {
                book.read = !book.read;
                isRead.textContent = 'Read';
            }
            addBooksToLibrary();
        });

        let deleteButton = document.createElement('img');
        deleteButton.src = 'icons/bin.svg';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', function() {
            // Get the index of the current cardContainer using 'this.parentElement'
            const containerIndex = parseInt(this.parentElement.parentElement.id.split('-')[1]);
        
            // Remove the corresponding item from myLibrary array
            myLibrary.splice(containerIndex, 1);
        
            // Remove the cardContainer from the DOM
            cardContainer.remove();
        
            // Display books again after removal
            addBooksToLibrary();
        });

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(isRead);
        imgContainer.appendChild(deleteButton);
        

        cardContainer.appendChild(cardTitle);
        cardContainer.appendChild(cardAuthor);
        cardContainer.appendChild(cardPages);
        cardContainer.appendChild(imgContainer);

        library.appendChild(cardContainer);
    });
}

submitBtn.addEventListener('click', e => {

    let readStatus = document.querySelector('.checkbox').checked;

    // Check form validity before processing submission
    if (document.querySelector('[data-modal-form]').checkValidity()) {
        let currentBook = new Book(bookTitle.value, bookAuthor.value, pages.value, readStatus);
        myLibrary.push(currentBook);

        addBooksToLibrary();


        // Reset form after submission
        modal.close();
        document.querySelector('[data-modal-form]').reset();
    }
    

});

const openButton = document.querySelector('[data-open-modal]');
const cancelButton = document.querySelector('.cancel-btn');

openButton.addEventListener('click', () => {
    modal.showModal();
});

cancelButton.addEventListener('click', e => {
    modal.close();
});

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        document.querySelector('[data-modal-form]').reset();
        modal.close();
    }
});
