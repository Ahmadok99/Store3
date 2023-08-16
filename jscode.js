
const buttonNav = document.getElementById("button-nav")
const navbar = document.querySelector('.mainnavbar');
const buttoncart = document.getElementById("my-button")
const nav = document.getElementById('cart-div')
const cartButton = document.getElementById('my-button');
const cartdiv = document.getElementById('cart-div');
const itemsContainer = document.querySelector('.items3');




//Function >>>>


/**
* Generate a unique ID using timestamp and random number.
* @returns {string} The unique ID.
*/
const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 100000); 
    return `${timestamp}-${random}`;
}


/**
* Add an item to the cart.
* 
 * @param {Object} item - The item to be added to the cart.
 * 
 * @return {void} 
*/
const addToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const uniqueId = generateUniqueId();
    item.id = uniqueId;
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


/**
 * Display the items in the cart.
 * 
 */
const displayCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartdiv.innerHTML = '';
    let total = 0; 
    let itemCount = 0; 
    if (!cartItems.length) {
        cartdiv.innerHTML = '<p>Your cart is empty.</p> Total: 0  Item Count : 0';
        total.textContent = '0'
        itemCount.textContent = '0'
        return;
    }

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'listcart';

        const itemImage = document.createElement('img');
        itemImage.src = item.imageSrc;
        itemImage.style.width = '3rem';
        itemImage.style.height = '3rem';
        itemDiv.appendChild(itemImage);

        const itemName = document.createElement('span');
        itemName.textContent = item.name;
        itemDiv.appendChild(itemName);

        const itemPrice = document.createElement('h4');
        itemPrice.textContent = item.price;
        itemDiv.appendChild(itemPrice);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteBt');
        deleteButton.setAttribute('data-id', item.id);
        deleteButton.addEventListener('click', () => removeFromCart(item.id));
        itemDiv.appendChild(deleteButton);

        total += parseFloat(item.price.replace('$', ''));
        itemCount++;
        cartdiv.appendChild(itemDiv);
    });

    const cartSummary = document.createElement('div');
    cartSummary.className = 'cart-summary';
    cartSummary.innerHTML = `<p>Total: $${total.toFixed(2)} | Item Count: ${itemCount}</p>`;
    cartdiv.appendChild(cartSummary);
}



/**Create Cards in store.
 * 
 * @param {object} 
 * 
 * @return {void}
 */
const createCards = () => {
    const itemsContainer = document.querySelector('.items3');
    const cardsData = [
        { category: 'cake', image: 'Images/12.jpeg', name: 'Cake Item', price: '$85', id: '12' },
        { category: 'doughnuts', image: 'Images/21.jpeg', name: 'Doughnuts Item', price: '$75', id: '11' },
        { category: 'doughnuts', image: 'Images/17.jpeg', name: 'Doughnuts Item', price: '$65', id: '10' },
        { category: 'doughnuts', image: 'Images/13.jpeg', name: 'Doughnuts Item', price: '$25', id: '9' },
        { category: 'sweet', image: 'Images/10.jpeg', name: 'Sweet Item', price: '$2', id: '8' },
        { category: 'sweet', image: 'Images/14.jpeg', name: 'Sweet Item', price: '$5', id: '7' },
        { category: 'sweet', image: 'Images/18.jpeg', name: 'Sweet Item', price: '$14', id: '6' },
        { category: 'cake', image: 'Images/19.jpeg', name: 'Cake Item', price: '$9', id: '5' },
        { category: 'cake', image: 'Images/16.jpeg', name: 'Cake Item', price: '$3', id: '4' },
        { category: 'cupcake', image: 'Images/11.jpeg', name: 'CupCake Item', price: '$7', id: '3' },
        { category: 'cupcake', image: 'Images/15.jpeg', name: 'CupCake Item', price: '$54', id: '2' },
        { category: 'cupcake', image: 'Images/20.jpeg', name: 'CupCake Item', price: '$900', id: '1' },
    ];


    cardsData.forEach(data => {

        const uniqueId = generateUniqueId();
        data.id = uniqueId;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card2');
        cardDiv.setAttribute('data-category', data.category);
        cardDiv.setAttribute('data-id', uniqueId)

        const cardImage = document.createElement('div');
        cardImage.classList.add('cimage');

        const image = document.createElement('img');
        image.src = data.image;
        image.alt = data.name;
        image.classList.add('imcard');
        cardImage.appendChild(image);

        const bt = document.createElement('button');
        bt.className = 'button-cart'
        bt.innerHTML = '&#128722'

        const cardBody = document.createElement('div');
        cardBody.classList.add('cbody');

        const name = document.createElement('h5');
        name.textContent = data.name;

        const price = document.createElement('h4');
        price.textContent = data.price;

        cardBody.appendChild(name);
        cardBody.appendChild(price);
        cardBody.appendChild(bt);
        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(cardBody);
        itemsContainer.appendChild(cardDiv);
    });
}


createCards()
const carditem = document.querySelectorAll('.card2');
const categoryBtn = document.querySelectorAll('.cat');

/**
 *Filter and display the cards based on the selected category.
*
*  @param {string} category - The category to filter by.
* 
*  @return {void}  filtered category.
*/
const filterCard = (category) => {
    carditem.forEach(card => {
        
        const cardcategory = card.getAttribute('data-category');
        if (category === 'all' || cardcategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


/**
* Remove an item from the cart based on its ID and update the cart display.
* 
* @param {string} id - The ID of the item to be removed.
* 
* @return {void} list cart items after remove an item
*/
const removeFromCart = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id); 
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    displayCart();
}




document.addEventListener('DOMContentLoaded', function () {
    filterCard('all')

    //memory initialization .
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
});



//Hidde and Show the nav bar .
buttonNav.onclick = function () {
        navbar.classList.toggle("showNav");
}


//Hidde and Show the ncart list .
cartButton.addEventListener('click', (event) => {
        displayCart();
        event.preventDefault();
        if (nav.style.display === "none") 
        {nav.style.display = "block";} 
        else
        {nav.style.display = "none";}
});




// List item card filtered by category .
categoryBtn.forEach(button => {
        button.addEventListener('click', function () {
            const cateogryselected = this.textContent.toLowerCase();
            filterCard(cateogryselected)
        });
});


//Add item to cart .
itemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('button-cart')) {
        const itemDiv = event.target.closest('.card2');
        const itemName = itemDiv.querySelector('h5').textContent;
        const itemPrice = itemDiv.querySelector('h4').textContent;
        const itemImageSrc = itemDiv.querySelector('img').src;
        addToCart({ name: itemName, imageSrc: itemImageSrc, price: itemPrice });
    }
    displayCart()
});


//Search in card . 
searchInput.addEventListener('input', function () {
        const info = searchInput.value.toLowerCase();
        const filter = Array.from(carditem).filter(card => {
            const cardName = card.querySelector('.cbody h5').textContent.toLowerCase();
            return cardName.includes(info);
        });

        carditem.forEach(card => {
            card.style.display = 'none';
        });

        filter.forEach(card => {
            card.style.display = 'block';
        });
});













