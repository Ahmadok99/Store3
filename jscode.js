
const btnNav = document.getElementById("btnN")
const navbar = document.querySelector('.mainnavbar');
const buttoncart = document.getElementById("myButton")
const nav = document.getElementById('cartdiv')
const cartButton = document.getElementById('myButton');
const cartDiv = document.getElementById('cartdiv');
const itemsContainer = document.querySelector('.items3');







document.addEventListener('DOMContentLoaded', function () {
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
        bt.className = 'bti'
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

    buttoncart.addEventListener('click', function (event) {
        event.preventDefault();
        if (nav.style.display === "block") {
            nav.style.display = "none";
        } else {
            nav.style.display = "block";
        }
    })

    const carditem = document.querySelectorAll('.card2');
    const searchitem = document.getElementById('searchInput');
    const categoryBtn = document.querySelectorAll('.cat');




    /**
     * Filter and display the cards based on the selected category.
     * @param {string} category - The category to filter by.
    */
    function filterCard(category) {
        carditem.forEach(card => {
            const cardcategory = card.getAttribute('data-category');
            if (category === 'all' || cardcategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    filterCard('all')

    categoryBtn.forEach(button => {
        button.addEventListener('click', function () {
            const cateogryselected = this.textContent.toLowerCase();
            filterCard(cateogryselected)
        });
    });

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
    if (!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([]));
    }



    /**
    * Add an item to the cart.
     * @param {Object} item - The item to be added to the cart.
    */
    function addToCart(item) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const uniqueId = generateUniqueId(); // Generate a unique ID for each item
        item.id = uniqueId;
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }




    /**
     * Display the items in the cart.
     */
    function displayCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        cartDiv.innerHTML = '';
        let total = 0; // Initialize the total price
        let itemCount = 0; // Initialize the item count
        if (!cartItems.length) {
            cartDiv.innerHTML = '<p>Your cart is empty.</p>';
            total.textContent='0'
            itemCount.textContent='0'
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
            cartDiv.appendChild(itemDiv);

            

        }); 
        
        const cartSummary = document.createElement('div');
        cartSummary.className = 'cart-summary';

        if (!cartItems.length){
            cartSummary.innerHTML = `<p>Total:${'0'}  | Item Count: 0</p>`;
        }else{cartSummary.innerHTML = `<p>Total: $${total.toFixed(2)} | Item Count: ${itemCount}</p>`;}
        
        cartDiv.appendChild(cartSummary);
    }


    itemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('bti')) {
            const itemDiv = event.target.closest('.card2');
            const itemName = itemDiv.querySelector('h5').textContent;
            const itemPrice = itemDiv.querySelector('h4').textContent;
            const itemImageSrc = itemDiv.querySelector('img').src;
            addToCart({ name: itemName, imageSrc: itemImageSrc, price: itemPrice });
        }
        displayCart()
    });


    cartButton.addEventListener('click', () => {
        displayCart();
        cartDiv.style.display = 'block';
    });


    /**
     * Remove an item from the cart based on its ID and update the cart display.
     * @param {string} id - The ID of the item to be removed.
     */
    function removeFromCart(id) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== id); // Compare with the provided ID
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        displayCart();
    }

    btnNav.onclick = function () {
        navbar.classList.toggle("showNav");
    }
    /**
 * Generate a unique ID using timestamp and random number.
 * @returns {string} The unique ID.
 */
    function generateUniqueId() {
        const timestamp = new Date().getTime(); // Get current timestamp
        const random = Math.floor(Math.random() * 100000); // Generate a random number
        return `${timestamp}-${random}`;
    }


});





















