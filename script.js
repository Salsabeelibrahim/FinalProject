$(document).ready(function () {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const productData = [
        { price: 59.99, image: '7.jpg' },
        { price: 74.99, image: '8.jpg' },
        { price: 89.99, image: '9.jpg' },
        { price: 64.99, image: '10.jpg' },
        { price: 99.99, image: '11.jpg' },
        { price: 79.99, image: '12.jpg' },
        { price: 69.99, image: '15.jpg' },
        { price: 84.99, image: '16.jpg' },
        { price: 94.99, image: '17.jpg' },
        { price: 74.99, image: '18.jpg' }
    ];

    let products = [];
    updateCartCount();

    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {
            console.log('Fetched data:', data);
            data.slice(0, 10).forEach((item, index) => {
                const product = {
                    title: item.title || 'Unknown Title',
                    body: item.body || 'No description available',
                    price: productData[index]?.price || 0,
                    image: productData[index]?.image || 'placeholder.jpg',
                    index
                };

                console.log('Combined product:', product);

                products.push(product);

                const productCard = `
                    <div class="product-card">
                        <img src="${product.image}" alt="Perfume Image">
                        <h3>${product.title}</h3>
                        <p>${product.body.replace(/\n/g, '<br>')}</p>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-index="${index}">Add to Cart</button>
                    </div>
                `;
                $('#product-grid').append(productCard);
            });

            $('.add-to-cart').on('click', function () {
                const index = $(this).data('index');
                console.log('Clicked product index:', index);
                const product = products[index];
                console.log('Clicked product:', product);
                addToCart(product);
            });
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex(item => item.title === product.title);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.title} has been added to your cart.`);
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        $('#cart-count').text(cart.reduce((total, item) => total + item.quantity, 0));
    }
});
