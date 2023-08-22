const galleryItems = document.querySelectorAll('.gallery-main-container > div');

function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * galleryItems.length);
    return galleryItems[randomIndex];
}

function updateGridItemStyles() {
    galleryItems.forEach(item => {
        const randomClass = ['small', 'wide', 'tall', 'big'][Math.floor(Math.random() * 3)];
        item.classList.remove('small', 'wide', 'tall', 'big');
        item.classList.add(randomClass);
    });
}

function shuffleGalleryItems() {
    const parent = galleryItems[0].parentNode;
    const newOrder = Array.from(galleryItems).sort(() => Math.random() - 0.5);
    newOrder.forEach(item => parent.appendChild(item));
}

// Call the functions to set the initial layout
updateGridItemStyles();
shuffleGalleryItems();
