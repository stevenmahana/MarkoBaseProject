$_mod.def("/MarkoBaseTemplate$0.0.1/src/components/form_select_menu/index", function(require, exports, module, __filename, __dirname) { var request = require('/browser-request$0.3.3/index'/*'request'*/);

module.exports = require('/marko-widgets$6.6.2/lib/index-browser'/*'marko-widgets'*/).defineComponent({
  template: require('/MarkoBaseTemplate$0.0.1/src/components/form_select_menu/template.marko'/*'./template.marko'*/),

  /**
   * Return the initial state for the UI component based on
   * the input properties that were provided.
   */
  getInitialState: function(input) {
    return {
      greetingName: input.greetingName
    };
  },

  /**
   * Return an object that is used as the template data. The
   * template data should be based on the current widget state
   * that is passed in as the first argument
   */
  getTemplateData: function(state) {

    return {
      greetingName: state.greetingName,
      timesMessage: state.timesMessage
    };
  },

  /**
   * This is the constructor for the widget. Called once when
   * the widget is first added to the DOM.
   */
  init: function() {
    var self = this;

    var menuEl = this.getEl('setstates');
    $(menuEl).on('change', function(event) {
      self.setMenus(event, menuEl)
    });
  },

  handleStatesChange: function(event, el) {
    var state = el.value;
    this.setState('states', state);
    this.setState('timesMessage', state);
    this.setState('greetingName', state);
    //console.log(state);

    //var self = this;
    //this.setStatesName(state);
  },

  /**
   * Expose a method to let other code change the "greeting name".
   * If the value of the "greetingName" state property changes
   * then the UI component will automatically rerender and the
   * DOM will be updated.
   */
  setGreetingName: function(newName) {
    this.setState('greetingName', newName);
  },

  setStatesName: function(event, el) {
    request('/apps/menus/WA', function(er, response, body) {
      if(er)
        throw er;
      console.log(body);
    });

    this.getEl('changestates').value = el.value;
  }

});
});