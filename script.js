// pizzas
let foods = ['Pizza Margherita', 'Pizza Fungi', 'Pizza Olive', 'Pizza 4 Käse', 'Pizza Salami', 'Pizza Brokkoli'];
let descriptions = ['Mit Pizzasauce und echtem Gouda', 'Mit Pizzasauce, frischen Champignons und echtem Gouda', 'Mit Pizzasauce, frischen schwarzen Oliven und echtem Gouda', 'Mit Pizzasauce, Fetakäse. Mazzarelle, Cheddar und echtem Gouda', 'Mit Pizzasauce, Salami und Reibegenuss', 'Mit Pizzasauce, Brokkoliröschen und echtem Gouda'];
let prices = [8.50, 9.50, 9.50, 10.50, 10.50, 9.50];
let food_images = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', ];

// basket
let basket_foods = [];
let basket_prices = [];
let basket_amounts = [];


//// render functions
function render_all() {
    render_stars(5);
    render_pizzas();
    render_basket();
}

// stars
function render_stars(s) {
    let stars = document.getElementById('stars');
    stars.innerHTML = ``;
    for (let i = 0; i < s ; i++) {
    stars.innerHTML += `<img class="icon" src="icons/star.png">`;  
    }   
}
 
// foods
function render_pizzas() {
    let pizzas = document.getElementById('pizzas');
    pizzas.innerHTML = ``;
    for (let i = 0; i < foods.length; i++) {
        let food = foods[i];
        let description = descriptions[i];
        let price = prices[i];
            formatedPrice = price.toFixed(2).replace('.',',');
        let food_image = food_images[i];
        pizzas.innerHTML += `
        <div>
            <div class="pizza">
                <p class="food" id="food">${food}</p>
                <p class="description" id="description">${description}</p>
                <div class="price_pizza_container">
                    <p class="price" id="price">${formatedPrice} €</p>
                    <img class="food_image" id="food_image"src="images/pizza_img/${food_image}.jpg">
                </div>
                <img class="plus_img" id="plus_img" src="icons/plus-8-48.png" onclick="add_to_basket(${i})">
            </div>
        </div>
        `;
        
    }
}

// basket
function render_basket() {
    if (basket_foods.length == 0) {
        render_basket_empty();
    } else
        render_basket_filled();
}

// empty basket
function render_basket_empty() {
    let basket = document.getElementById('shoppingBasket');
    basket.innerHTML = ``;
    basket.innerHTML = `
        <h1 class="basket_empty_headline">Warenkorb</h1>
        <img class="basket_icon icon" src="icons/shopping-basket-48-black.png">
        <p class="text1_basket_empty">Fülle deinen Warenkorb</p>
        <p class="text2_basket_empty">Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    `;
}

// filled basked
function render_basket_filled() {
    let basket = document.getElementById('shoppingBasket');
    basket.innerHTML = ``;
    basket.innerHTML = `
        <div class="basket_filled">
            <h1 class="basket_empty_headline">Warenkorb</h1>
            <img class="basket_icon icon" src="icons/shopping-basket-48-black.png">
            <div id="all_foods_within_basket" class="all_foods_within_basket"></div>
        </div>
    `;
    for (let i = 0; i < basket_foods.length; i++) {
            let food = basket_foods[i];
            let price = basket_prices[i];
                formatedPrice = price.toFixed(2).replace('.', ',');
            let amount = basket_amounts[i];
            foods_within_basket = document.getElementById('all_foods_within_basket');
            foods_within_basket.innerHTML += `
            <div class="food_within_basket">
                <div class="amount_food_price">
                    <div>${amount} x ${food} </div> <div>${formatedPrice} €</div>
                </div>
                <div class="plus_minius_container">
                    <img class="img_plus_minus" src="icons/plus-8-48.png" onclick="add_to_basket(${i})">
                    <img class="img_plus_minus" src="icons/minus-2-48.png" onclick="remove_from_basket(${i})">
                </div>
            </div>
        `;
    }
    
    let sum = 0;
    for (let i = 0; i < basket_foods.length; i++) {
        sum += basket_prices[i] * basket_amounts[i];
        formatedSum = sum.toFixed(2).replace('.', ',');
        total = sum + 2;
        formatedTotal = total.toFixed(2).replace('.', ',');
    } 

    basket.innerHTML += `
    <div class="sum_area" id="sum_area">
        <div class="space_between">
            <span>Summe</span><span>${formatedSum} €</span>
        </div>
        <div class="space_between">
            <span>Lieferkosten</span><span>2,00 €</span>
        </div>
        <div class="space_between">
            <b>Gesamt</b><b class="total">${formatedTotal} €</b>
        </div>
    </div>
    `;
}


function add_to_basket(i) {
    if (basket_foods.indexOf(foods[i]) == -1) {
        basket_foods.push(foods[i]);
        basket_prices.push(prices[i]);
        basket_amounts.push(1);
    } else {
        basket_amounts[i]++;
    }
    render_basket_filled();
}

function remove_from_basket(i) {
    if (basket_amounts[i] == 1 && basket_foods.length == 1) {
        render_basket_empty();
    }
    else if (basket_amounts[i] == 1) {
        basket_foods.splice(i, 1);
        basket_prices.splice(i, 1);
        basket_amounts.splice(i, 1);
        render_basket_filled();
    } else {
        basket_amounts[i]--;
        render_basket_filled();
    }
}

