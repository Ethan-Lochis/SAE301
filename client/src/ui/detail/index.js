import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { Gallery } from "../gallery/index.js";

let DetailView = {
  html: function (data, id) {
   let almost = genericRenderer(template, data);
   return almost.replace('{{gallery}}', Gallery.init(id))
  },

  dom: function (data, id) {
    return htmlToFragment(DetailView.html(data, id));
  }
};

export { DetailView };
