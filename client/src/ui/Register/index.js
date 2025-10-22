import { htmlToFragment } from "../../lib/utils";
import template from "./template.html?raw";

let RegisterView = {
  html: function () {
    return template;
  },

  dom: function () {
    return htmlToFragment(template);
  }
};

export { RegisterView };
