var app = app || {};

(function() {

  app.ApplicationView = Backbone.View.extend({
      tagName: "div",
      template: _.template($("#application").html()),
     
      initialize: function() {
        this.listenTo(this.model, 'change', this.updateApplication);
      },
      
      render: function() {
        var template = this.template(this.model.toJSON());
        this.$el.html(template);
        return this;
      },

      updateApplication: function() {
        var template = this.template(this.model.toJSON());
        this.$el.html(template);
      },
      
  });
})();