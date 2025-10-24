import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

// Template d'un lien de catégorie avec Tailwind
const linkTemplate = `
<a href="/categories/{{id}}/{{name}}" data-link
   class="text-black px-4 py-2 rounded transition-colors duration-200 hover:bg-white/10">
   {{name}}
</a>`;

/**
 * Génère les liens HTML pour les catégories ou les liens fournis
 * @param {Array|Object} data
 * @returns {string} HTML des liens concaténés
 */
function generateLinks(data) {
  const items = Array.isArray(data)
    ? data
    : (data && (data.links || data.categories)) || [];

  return items
    .map((item) =>
      linkTemplate
        .replace(/{{id}}/g, String(item.id))
        .replace(/{{name}}/g, encodeURIComponent(String(item.name)))
    )
    .join("");
}

/**
 * Remplace le placeholder {{links}} dans le template HTML par les liens générés
 * @param {Object|Array} data
 * @returns {string} HTML final
 */
function renderTemplateWithLinks(data) {
  return template.replace(/{{\s*links\s*}}/g, generateLinks(data));
}

// ---------------------------------------------------------
// VUE HEADER
// ---------------------------------------------------------
let HeaderView = {};

/**
 * Retourne le HTML de l'en-tête avec les liens injectés
 * @param {Object|Array} data
 * @returns {string} HTML
 */
HeaderView.html = function (data) {
  return renderTemplateWithLinks(data);
};

/**
 * Retourne un fragment DOM prêt à être injecté
 * @param {Object|Array} data
 * @returns {DocumentFragment}
 */
HeaderView.dom = function (data) {
  return htmlToFragment(HeaderView.html(data));
};

export { HeaderView };
