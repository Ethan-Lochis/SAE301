import { htmlToFragment, genericRenderer } from "../../lib/utils.js";
import template from "./template.html?raw";

let link = `<a href="/categories/{{id}}/{{name}}" data-link class="text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-white/10">{{name}}</a>`;

function generateLinks(data) {
  const items = Array.isArray(data)
    ? data
    : (data && (data.links || data.categories)) || [];

  const liens = items
    .map(item => 
      link
        .replace(/{{id}}/g, String(item.id))
        .replace(/{{name}}/g, encodeURIComponent(String(item.name))) // encode pour URL
    )
    .join("");

  return liens;
}

function renderTemplateWithLinks(data) {
  // Remplacer proprement {{links}} où qu'il soit
  const output = template.replace(/{{\s*links\s*}}/g, generateLinks(data));
  return output;
}


let HeaderView = {};

HeaderView.html = function (data) {
  return renderTemplateWithLinks(data);
  
};
HeaderView.dom = function (data) {
  return htmlToFragment(HeaderView.html(data));
};

export { HeaderView };
