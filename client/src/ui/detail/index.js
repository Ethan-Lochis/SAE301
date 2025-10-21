import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  html: function (data) {
    console.log('html')
    return genericRenderer(template, data);
  },

  dom: function (data) {
    console.log('dom')
    return htmlToFragment(DetailView.html(data));
  }
};

export { DetailView };
