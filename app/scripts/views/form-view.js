var app = app || {};

(function() {

  app.FormView = Backbone.View.extend({
      el: '.form',

      initialize: function() {
        var form = this;
        this.model.on('invalid', function(model, errors) {
          _.each(errors, function(error, i) {
            $(form.el).find('#' + error.name).addClass('error').parent().append('<p class="error-text">' + error.message + '</p>');
          });
        });
        this.listenTo(this.model, 'change', this.saveLocalStorage);
      },

      events:
      {
          "click #btnSubmit": "submit"
      },

      render: function () {
          return this;
      },

      submit: function () {
        
        if ($('input').hasClass('error')) {
          $('input').removeClass('error').parent().find('.error-text').remove();
        }
        if ($('textarea').hasClass('error')) {
          $('textarea').removeClass('error').parent().find('.error-text').remove();
        }

        var Vacancy = this.$el.find($("#vacancy")).val();
        var Surname = this.$el.find($("#surname")).val();
        var Name = this.$el.find($("#name")).val();
        var Patronymic = this.$el.find($("#patronymic")).val();
        var Age = this.$el.find($("#age")).val();
        var Password = this.$el.find($('#password')).val();
        var Birthday = this.$el.find($('#birthday')).val();
        var Resume = this.$el.find($('#resume')).val();

        this.model.set({
          vacancy: Vacancy,
          surname: Surname,
          name: Name,
          patronymic: Patronymic,
          age: Age,
          password: Password,
          birthday: Birthday,
          resume: Resume
        }, {
          validate : true
        })
      },

      saveLocalStorage: function() {
        localStorage.setItem('candidate', JSON.stringify(this.model.attributes));
      }
  });
})();