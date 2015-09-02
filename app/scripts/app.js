var app = app || {};



$(function () {
  
      var candidate = new app.Application();
      var newFormView = new app.FormView({model: candidate});
      var candidateView = new app.ApplicationView({model: candidate});

      $(".application-wrap").append(candidateView.render().el);

});