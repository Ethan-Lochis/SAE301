
import { Router } from "./lib/router.js";
import { AboutPage } from "./pages/about/page.js";
import { HomePage } from "./pages/home/page.js";
import { FilteredPage } from "./pages/category/page.js";
import { ProductDetailPage } from "./pages/productDetail/page.js";

import { RootLayout } from "./layouts/root/layout.js";
import { The404Page } from "./pages/404/page.js";

// Exemple d'utilisation avec authentification

const router = new Router('app');

router.addLayout("/", RootLayout);

router.addRoute("/", HomePage);
router.addRoute("/about", AboutPage);

router.addRoute("/categories/:id/:slug", FilteredPage);
router.addRoute("/products/:id/:slug", ProductDetailPage);

router.addRoute("*", The404Page);

// Démarrer le routeur
router.start();

