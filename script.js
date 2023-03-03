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
        pizzas.innerHTML += renderHTML_pizzas(i,food,description,formatedPrice,food_image);
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

    let basketSum_responvive = document.getElementById('button_basket');
    basketSum_responvive.innerHTML = `<div>
    </div>Warenkorb: 0,00 €</div>
    </div>`;
}

// filled basked
function render_basket_filled() {
    let basket = document.getElementById('shoppingBasket');
    basket.innerHTML = ``;
    basket.innerHTML = generateHTML_filledBasket();
    
    for (let i = 0; i < basket_foods.length; i++) {
            let food = basket_foods[i];
            let price = basket_prices[i];
                formatedPrice = price.toFixed(2).replace('.', ',');
            let amount = basket_amounts[i];
            let foods_within_basket = document.getElementById('all_foods_within_basket');
            foods_within_basket.innerHTML += generateHTML_foodWithinBasket(amount,food,formatedPrice,i);
    }
    
    let sum = 0;
    for (let i = 0; i < basket_foods.length; i++) {
        sum += basket_prices[i] * basket_amounts[i];
        formatedSum = sum.toFixed(2).replace('.', ',');
        total = sum + 2;
        formatedTotal = total.toFixed(2).replace('.', ',');
    } 
    basket.innerHTML += generateHTML_sumArea(formatedSum,formatedTotal);

    let basketSum_responvive = document.getElementById('button_basket');
    basketSum_responvive.innerHTML = `<div>
    </div>Warenkorb: ${formatedSum} €</div>
    </div>`;
}


function add_to_basket(food) {
    let index_basket = basket_foods.indexOf(food);
    let index_foods = foods.indexOf(food);
    if (index_basket == -1) {
        basket_foods.push(foods[index_foods]);
        basket_prices.push(prices[index_foods]);
        basket_amounts.push(1);
    } else {
        basket_amounts[index_basket]++;
    }
    render_basket_filled();
}

function remove_from_basket(food) {
    let index_basket = basket_foods.indexOf(food);
    if (basket_foods.length == 1 && basket_amounts[index_basket] == 1) {
        basket_foods = [];
        basket_prices = [];
        basket_amounts = [];
        render_basket_empty();
    }
    else if (basket_amounts[index_basket] == 1) {
        basket_foods.splice(index_basket, 1);
        basket_prices.splice(index_basket, 1);
        basket_amounts.splice(index_basket, 1);
        render_basket_filled();
    } else {
        basket_amounts[index_basket]--;
        render_basket_filled();
        }
}


//// templates
function renderHTML_pizzas(i,food,description,formatedPrice,food_image) {
return `
        <div>
            <div class="pizza">
                <p class="food" id="food">${food}</p>
                <p class="description" id="description">${description}</p>
                <div class="price_pizza_container">
                    <p class="price" id="price">${formatedPrice} €</p>
                    <img class="food_image" id="food_image"src="images/pizza_img/${food_image}.jpg">
                </div>
                <img class="plus_img" id="plus_img" src="icons/plus-8-48.png" onclick="add_to_basket('${food}')">
            </div>
        </div>
    `;
}

function generateHTML_filledBasket() {
return`
        <div class="basket_filled">
            <h1 class="basket_empty_headline">Warenkorb</h1>
            <img class="basket_icon icon" src="icons/shopping-basket-48-black.png">
            <div id="all_foods_within_basket" class="all_foods_within_basket"></div>
        </div>
    `;
}

function generateHTML_foodWithinBasket(amount,food,formatedPrice,i) {
    return`
    <div class="food_within_basket">
        <div class="amount_food_price">
            <div>${amount} x ${food} </div> <div>${formatedPrice} €</div>
        </div>
        <div class="plus_minius_container">
            <img class="img_plus_minus" src="icons/plus-8-48.png" onclick="add_to_basket('${food}')">
            <img class="img_plus_minus" src="icons/minus-2-48.png" onclick="remove_from_basket('${food}')">
        </div>
    </div>
`   ;
}





function generateHTML_sumArea(formatedSum,formatedTotal) {
return`
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
