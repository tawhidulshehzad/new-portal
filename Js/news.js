// load categories
const loadCategory = () => {
  url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCategory(data.data.news_category));
};
// display categories

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
            <button  onclick="loadNews('${category.category_id}')" class="ctg-btn bg-white fs-5 px-3">${category.category_name}</button>
          
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};
// item count

const getItemsCount = (items) => {
  const itemContainer = document.getElementById("itemsFound-Container");
  itemContainer.innerHTML = "";
  const itemDiv = document.createElement("div");
  itemDiv.innerHTML = `
              <div class=" px-3 ">
                <h3 class=" p-2">${items} Items Found for this category</h3>
              </div>
            
      `;
  itemContainer.appendChild(itemDiv);
};

// load news
const loadNews = (categoryId) => {
  toggleSpinner(true);
  url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayNews(data.data));
};
// display News
const displayNews = (bulletins) => {
  getItemsCount(bulletins.length);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  for (const bulletin of bulletins) {
    console.log(bulletin);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="d-flex m-2 p-2 shadow-sm ">
      <div class=" col-3">
        <img class="w-75" src="${bulletin.thumbnail_url}" alt="" />
      </div>
      <div class="col-9">
        <div>
          <div>
            <h1 class="fs-5">${bulletin.title}</h1>
            <p class= "news-details">
            ${bulletin.details}
            </p>
          </div>
          <div class="d-flex justify-content-between px-2">
            <div class="d-flex">
              <div class="right-img-container">
                <img class="w-100 raounded-5" src="${
                  bulletin.author.img
                }" alt="" />
              </div>
              <div>
                <h6 class="mb-0">${
                  bulletin.author.name ? bulletin.author.name : "Not found"
                }</h6>
                <p>${
                  bulletin.author.published_date
                    ? bulletin.author.published_date
                    : "not found"
                }</p>
              </div>
            </div>
            <div>
              <div class="d-flex gap-1 mt-2">
              <p><i class="fa fa-eye" aria-hidden="true"></i></p>
                <p>${
                  bulletin.total_view ? bulletin.total_view : "Not found"
                }</p>
                
              </div>
            </div>
            <div>
              <button onclick="modalShown('${
                bulletin._id
              }')" id="btn-details" data-bs-toggle="modal"
              data-bs-target="#newsModal" > Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    `;
    newsContainer.appendChild(newsDiv);
  }
  toggleSpinner(false);
};

// blog function
function getBlog(isShow) {
  const blogContainer = document.getElementById("blog-container");
  if (isShow === true) {
    blogContainer.classList.add("d-none");
  } else {
    blogContainer.classList.remove("d-none");
  }
}

const modalShown = (detailsId) => {
  url = `https://openapi.programming-hero.com/api/news/${detailsId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => modalDisplay(data.data));
};

const modalDisplay = (modalData) => {
  console.log(modalData[0].details);
  const modalTitle = document.getElementById("NewsTitleModal");
  modalTitle.innerText = modalData[0].title;
  const modalBody = document.getElementById("newsModalBody");
  modalBody.innerHTML = `
  <p> ${modalData[0].details ? modalData[0].details : "Not found"}</p>
  <p>Author : ${
    modalData[0].author.name ? modalData[0].author.name : "Not found"
  }</p>
  <p>Published : ${
    modalData[0].author.published_date
      ? modalData[0].author.published_date
      : "not found"
  }</p>
  <p>Total view: ${
    modalData[0].total_view ? modalData[0].total_view : "not found"
  }</p>
  `;
};
// spinner
const toggleSpinner = (isLoading) => {
  const loderSections = document.getElementById("spinner");
  if (isLoading === true) {
    loderSections.classList.remove("d-none");
  } else {
    loderSections.classList.add("d-none");
  }
};

// blog container button
document.getElementById("btn-blog").addEventListener("click", function () {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.classList.remove("d-none");
});

// News button

loadCategory();
// loadNews("08");
