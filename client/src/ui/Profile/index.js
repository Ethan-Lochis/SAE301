import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProfileView = {
  html: function (data) {
      let htmlString = genericRenderer(template, data);
    return htmlString
  },

  dom: function (data) {
    return htmlToFragment( ProfileView.html(data) );
  }

};

export { ProfileView };
