import { ProductData } from "../../data/product.js";
import { GalleryData } from "../../data/gallery.js";
import { htmlToFragment } from "../../lib/utils.js";
import { DetailView } from "../../ui/detail/index.js";
import template from "./template.html?raw";

let M = {
  products: [],
  gallery: [],
};

M.getProductById = function (id) {
  return M.products.find((product) => product.id == id);
};

let C = {};

C.handler_clickOnProduct = function (ev) {
  if (ev.target.dataset.buy !== undefined) {
    let id = ev.target.dataset.buy;
    alert(`Produit ajouté au panier ! (Quand il y en aura un)`);
  }
};
C.handler_clickOnImage = function (ev) {
  if (ev.target.tagName === "IMG") {
    let imgCliqué = ev.target;
    let imgMain = document.querySelector("#main-img");

    // Swap des sources
    let temp = imgMain.src;
    imgMain.src = imgCliqué.src;
    imgCliqué.src = temp;
  }
};

C.init = async function (params) {

  const productId = params.id;

  M.products = await ProductData.fetch(params.id);
  console.log(M.products);
  M.gallery = await GalleryData.fetch(params.id);
  let p = M.products[0];
  return V.init(p);
};

let V = {};

V.init = async function (data) {
  let fragment = await V.createPageFragment(data);
  V.attachEvents(fragment);
  return fragment;
};


V.createPageFragment = async function (data) {

  let pageFragment = htmlToFragment(template);

  let detailDOM = await DetailView.dom(data, M.products[0].id);
  console.log(detailDOM)

  pageFragment.querySelector('slot[name="detail"]').replaceWith(detailDOM);

  return pageFragment;
};



V.attachEvents = function (pageFragment) {
  // Attacher un event listener au bouton
  const addToCartBtn = pageFragment.querySelector("[data-buy]");
  addToCartBtn.addEventListener("click", C.handler_clickOnProduct);
  let gallery = pageFragment.querySelector("#figure");
  gallery.addEventListener("click", C.handler_clickOnImage);
  return pageFragment;
};

export function ProductDetailPage(params) {
  console.log("ProductDetailPage", params);
  return C.init(params);
}
