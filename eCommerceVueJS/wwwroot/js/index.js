async function LoadNew() {
	console.log("LoadNew");
  var result = await fetch('http://localhost:5000/getProducts/new', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  console.log(result);
  let response = await result.text();
  let productsList = JSON.parse(response);
	generateProductsList(productsList, 'newProductsList');
}
async function LoadFeatured() {
	console.log("LoadFeatured");
  var result = await fetch('http://localhost:5000/getProducts/featured', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let productsList = JSON.parse(response);
  generateProductsList(productsList, 'featuredProductsList');
}
async function LoadTop() {
	console.log("LoadTop");
  var result = await fetch('http://localhost:5000/getProducts/top', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let productsList = JSON.parse(response);
  generateProductsList(productsList, 'topProductsList');
}
function generateProductsList(products, id) {
  console.log(products);
  let productsList = document.getElementById(id);
  productsList.innerHTML = "";
  products.forEach(product => {
    var NewProducts = $(`
        <li class="col-xs-12 col-sm-6 col-md-4 col-lg-4 text-center">
          <div class="product">
            <figure class="figure-hover-overlay">
              <a href="#"  class="figure-href" onclick="gotoDetails('${product.id}')"></a>
              <img src="${product.imgurl}" alt="Image" class="img-responsive">
              <span class="bar"></span>
              <figcaption>
                <a href="#" class="shoping" onclick="addtoCart('${product.id}')"><i class="glyphicon glyphicon-shopping-cart"></i></a>
              </figcaption>
            </figure>
            <div class="product-caption" onclick="gotoDetails('${product.id}')">
              <a href="#" class="product-name">${product.name}</a>
              <p class="product-price"><span>${product.actual_price}$</span> ${product.offer_price}$</p>
              <div class="product-rating">
                <div class="stars">
                  <span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span>
                </div>
              </div>
            </div>
          </div>
        </li> `);
    NewProducts.appendTo(productsList);
  });
}
async function addtoCart(product) {
	console.log("LoadNew");
  if(product == ''){
    var url = window.location.search;
    product = url.substring(url.lastIndexOf('=') + 1);
  }
	data = { userID: 'Xyz123', productID: product, quantity: 1 };
  var result = await fetch('http://localhost:5000/addtoCart', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let cart = JSON.parse(response);
}
async function pullCartList() {
  var result = await fetch('http://localhost:5000/getCartItems', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  let response = await result.text();
  let cartList = JSON.parse(response);
  createCart(cartList);
}
function createCart(cart) {
  $('#cart_items').html(cart['count'])

  cart['items'].forEach(product => {
    console.log(product)
    var NewProducts = $(`
     <div class="item pull-left">
      <img src="${product.imgurl}" alt="Product Name" class="pull-left">
      <div class="pull-left">
        <p> ${product.name} </p>
        <p>$ ${product.offer_price} &nbsp;<strong>x ${product._collection}</strong></p>
      </div>
      <a href="" class="pull-right"><i class="icon-trash icon-large pull-left"></i></a>
    </div>`);
    NewProducts.appendTo($('.shopping-cart-items'));
  });
}
function gotoDetails(productID) {
  if (productID) {
    window.location.href = 'http://localhost:5000/product.html?id=' + productID;
  } else {
    window.location.href = 'http://localhost:5000/index.html';
  }
}
async function onDetailsLoad() {
  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=') + 1);
  var result = await fetch('http://localhost:5000/getProductDetails/' + id, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let productsList = JSON.parse(response);
  // $('product-zoom').attr('src', productsList.product[0].imgurl);
  document.getElementById('product-zoom').src = productsList.product.imgurl;
  document.getElementById('product_name').innerHTML = productsList.product.name;
  document.getElementById('product_brand').innerHTML = productsList.product.brand;
  document.getElementById('product_collection').innerHTML = productsList.product._collection;
  document.getElementById('product_actualPrice').innerHTML = productsList.product.actual_price;
  document.getElementById('product_offer_price').innerHTML = productsList.product.offer_price;
  document.getElementById('product_description').innerHTML = productsList.product.description;
}
async function addReview() {
  let comment = document.getElementById('reviews-comment').value;
  let reating = document.getElementById('reviews-rating').value;
  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=') + 1);
	data = { 'commentDescription': comment, 'rating': reating || 1, 'userID': 'Xyz123', 'productID': id };
  var result = await fetch('http://localhost:5000/postComments', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  loadComments();
  document.getElementById('reviews-comment').innerHTML = "";
}
async function loadComments() {
  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=') + 1);
  var result = await fetch('http://localhost:5000/getComments/' + id, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
  let response = await result.text();
  let commentsList = JSON.parse(response);
  let users = commentsList.users;
  let productsList = document.getElementById('commentsSection');
  productsList.innerHTML = "";
  commentsList.results.forEach((item) => {
    let user = users.find((u) => { return item.userID == u.id });
    item['userName'] = user.firstName + ' ' + user.lastName;
	  var comment = $(`<div class="review-header"> <h5>${item.userName}</h5> <div class="product-rating"> <div class="">Rating : ${item.rating}</div> </div> <small class="text-muted">${item.updatedAt}</small> </div> <div class="review-body"> <p>${item.commentDescription}</p> </div> <hr>`);
    comment.appendTo(productsList);
  });
}
async function login() {
	let email = document.getElementById('email-signin').value;
	let password = document.getElementById('password-signin').value;
	data = { 'email': email, 'password': password };
	if (email && password) {
		var result = await fetch('http://localhost:5000/login', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		});
		let response = await result.text();
		let loginResponse = JSON.parse(response);
		if (loginResponse.success) {
			document.getElementById('header-login-close').click();
			getUser()
		}
	}

}
async function register() {
	let email = document.getElementById('email-reg').value;
	let password = document.getElementById('password-reg').value;
	data = { 'email': email, 'password': password }
	if (email && password) {
		var result = await fetch('http://localhost:5000/register', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		});
		let response = await result.text();
		let loginResponse = JSON.parse(response);
		if (loginResponse.success) {
			document.getElementById('header-login-close').click();
			getUser();
		}
	}
}
async function getUser() {
	var result = await fetch('http://localhost:5000/getUser', {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
	let response = await result.text();
	let user = JSON.parse(response);
	if (user.email != "") {
		console.log(user.email)
		document.getElementById('user-details').innerHTML = user.email;
	}
}