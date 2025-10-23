import { Router } from "./lib/router.js";

// Pages
import { AboutPage } from "./pages/about/page.js";
import { HomePage } from "./pages/home/page.js";
import { FilteredPage } from "./pages/category/page.js";
import { ProductDetailPage } from "./pages/productDetail/page.js";
import { AuthPage } from "./pages/Login/page.js";
import { RegisterPage } from "./pages/Register/page.js";
import { ProfilePage } from "./pages/Profile/page.js";
import { The404Page } from "./pages/404/page.js";

// Layouts
import { RootLayout } from "./layouts/root/layout.js";

// Data
import { AuthData } from "./data/Auth.js";

// Crée une instance unique du routeur et la rend globale
window.router = new Router("app");

// Définition des layouts
window.router.addLayout("/", RootLayout);

// Définition des routes publiques
window.router.addRoute("/", HomePage);
window.router.addRoute("/about", AboutPage);
window.router.addRoute("/login", AuthPage);
window.router.addRoute("/register", RegisterPage);

// Définition des routes dynamiques
window.router.addRoute("/categories/:id/:slug", FilteredPage);
window.router.addRoute("/products/:id/:slug", ProductDetailPage);

// Définition des routes protégées (requièrent une authentification)
window.router.addRoute("/profile", ProfilePage, { requireAuth: true });

// Route 404 (page non trouvée)
window.router.addRoute("*", The404Page);

// Vérification de la session côté serveur avant de démarrer le routeur
let auth = await AuthData.AmILogged();

if (auth.auth === true || auth.auth === "true") {
  window.router.setAuth(true);
  console.log("Utilisateur connecté");
  window.router.start();
} else {
  window.router.setAuth(false);
  console.log("Utilisateur non connecté");
  window.router.start();
}
