import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProductView = {
  html: function (data) {
    let htmlString = '<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1.5rem;">';
    for (let obj of data) {
      htmlString  += genericRenderer(template, obj);
    }
    return htmlString + '</div>';
  },

  dom: function (data) {
    return htmlToFragment( ProductView.html(data) );
  }

};

export { ProductView };
