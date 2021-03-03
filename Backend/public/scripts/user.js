let cartBooks = document.querySelectorAll(".book").length;
let remBtns = document.querySelectorAll(".add__btn");
let header = document.querySelector(".cart__header");
let afterHeader = document.querySelector("#contains");
let expBtn = document.querySelector(".explore-btn");
let cartLogo = document.querySelector(".cart__logo");
let checkOut = document.querySelector(".checkout");
let totalPrice = document.querySelector(".checkout > span") ? 
	document.querySelector(".checkout > span") : null;

remBtns.forEach((r) => {
	r.addEventListener('click', () => {
		let book = r.parentElement.parentElement;
		book.style.display = 'none';
		cartBooks = cartBooks - 1;
		let val = r.getAttribute("value").slice(2);
		totalPrice.textContent = Number(totalPrice.textContent) - Number(val); 
		if(cartBooks == 0){
			header.textContent = 'Your cart is empty!';
			afterHeader.style.display = 'none';
			cartLogo.style.display = 'none';
			checkOut.style.display = 'none';
			expBtn.textContent = 'Explore';
			header.style.paddingBottom = '1%';
		}
	});
});