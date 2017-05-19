module.exports = {

  base: function(type) {

    // base page level information passed into every page. Title, Description, Meta, Etc. Can be used for anything
    var data = {
      "home": {name: "Home Page", display:"THIS IS HOME PAGE CONTENT", title: "Base Template for Marko Projects", description: "Base Template for Marko Projects."},
      "dashboard": {name: "Dashboard", display:"THIS IS DASHBOARD CONTENT", title: "Base Template for Marko Projects", description: "Base Template for Marko Projects."},
      "login": {name: "Login Page", display:"THIS IS LOGIN PAGE CONTENT", title: "Base Template for Marko Projects", description: "Base Template for Marko Projects."},
      "default": {name: "", display:"", title: "Welcome to our site!", description: "Welcome to our really cool site."}
    };

    return data[type] ? data[type] : data["default"];
  }
};
