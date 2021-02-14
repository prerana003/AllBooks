let cartBooks = document.querySelectorAll(".book").length;
let remBtns = document.querySelectorAll(".add__btn");
let header = document.querySelector(".cart__header");
let afterHeader = document.querySelector("#contains");
let expBtn = document.querySelector(".explore-btn");
let cartLogo = document.querySelector(".cart__logo");
remBtns.forEach((r) => {
	r.addEventListener('click', () => {
		let book = r.parentElement.parentElement;
		book.style.display = 'none';
		cartBooks = cartBooks - 1;
		if(cartBooks == 0){
			header.textContent = 'Your cart is empty!';
			afterHeader.style.display = 'none';
			cartLogo.style.display = 'none';
			expBtn.textContent = 'Explore';
			header.style.paddingBottom = '1%';
		}
	});
});