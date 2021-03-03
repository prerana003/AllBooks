// Add to Cart logic
let addBtns = document.querySelectorAll(".add__btn");
let navTxt = document.querySelector(".nav-link").textContent;
let cart = document.querySelector("#cart");
addBtns.forEach((btn) => {
	btn.addEventListener('click', (b) => {
		if (navTxt === "Log Out"){
			btn.parentElement.setAttribute("target", "hidden");
			btn.setAttribute("value", "Added");
			setTimeout(() => {
				btn.setAttribute("disabled", true);
				cart.textContent = "(" + (Number(cart.textContent[1]) + 1) + ")";
			}, 50);
			btn.style.background = 'green';
		}
	})
});

// Populating search options logic
let searchBox = document.querySelector(".search-box");
let searchTxt = document.querySelector(".search__txt");
let searchList = document.querySelector(".search__list");
let searchEach = document.querySelectorAll(".search__each");

searchTxt.addEventListener('keyup', (e) => {
	e.preventDefault();
	searchBox.setAttribute("action", "/search/book_name/" + e.target.value);
	searchList.innerHTML = '';
	let query = { q: e.target.value };
	fetch('/search', {
		method: "POST",
		body: JSON.stringify(query),
		headers: {"Content-type": "application/json; charset=UTF-8"}
	}).then(res => res.json())
	  .then(data => {
		// console.log(data);
		if(e.target.value == ""){
			searchList.style.display = 'none';
			searchList.innerHTML = '';
		}
		else{
			searchList.style.display = 'block';
			searchList.innerHTML = '';
			data.list.forEach((d) => {
				// console.log(d.title);
				let li = document.createElement("li");
				li.appendChild(document.createTextNode(d.title));
				li.classList.add("search__each");
				li.addEventListener('click', () => {
					searchTxt.value = d.title;
					searchList.style.display = 'none';
					searchBox.setAttribute("action", "/search/book_name/" + d.title);
				});
				searchList.appendChild(li);
			});
		}
	}).catch(err => console.log(err));
	// console.log(e.target.value);
});

searchBox.addEventListener('submit', () => {
	if(searchTxt.value === "")
		searchBox.setAttribute("action", "/search");
})