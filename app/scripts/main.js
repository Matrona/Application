(function() {

  window.App = {
    Models: {},
    Views: {}
  };


  App.Models.Application = Backbone.Model.extend({
      defaults: { 
        vacancy: '',
        surname: '',
        name: '',
        patronymic: '',
        age: '',
        password: ''
      },

      initialize: function () {
        var attrs = JSON.parse(localStorage.getItem('candidate'));
        this.set(attrs);
      },

      validate: function(attrs, options) {

        var vacancyFilter = /^[а-яА-Яa-zA-z]+$/;
        var cyrillicFilter = /^[а-яА-Я]+$/;
        var ageFilter = /[0-9]$/;
        var passwordFilter = /[0-9]{10}$/;
        var errors = [];

        if (!vacancyFilter.test(attrs.vacancy)) {
          errors.push({
            name: 'vacancy', 
            message: 'Пожалуйста, введите название вакансии без цифр.'
          });
        }
        if (!cyrillicFilter.test(attrs.surname)) {
          errors.push({
            name: 'surname', 
            message: 'Пожалуйста, используйте только русские буквы.'
          });
        }
        if (!cyrillicFilter.test(attrs.name)) {
          errors.push({
            name: 'name', 
            message: 'Пожалуйста, используйте только русские буквы.'
          });
        }
        if (!cyrillicFilter.test(attrs.patronymic)) {
          errors.push({
            name: 'patronymic', 
            message: 'Пожалуйста, используйте только русские буквы.'
          });
        }
        if (!ageFilter.test(attrs.age)) {
          errors.push({
            name: 'age', 
            message: 'Введите положительное число от 0 до 100.'
          });
        }
        if (!passwordFilter.test(attrs.password)) {
          errors.push({
            name: 'password', 
            message: 'Введите 10 цифр (номер и серия российского папорта).'
          });
        }
       
        if(errors.length > 0) {
           return errors;
        } else {
        return false;
        }
      }
  });

  App.Views.Form = Backbone.View.extend({
      el: '.form',

      initialize: function() {
        var form = this;
        this.model.on('invalid', function(model, errors) {
          _.each(errors, function(error, i) {
            $(form.el).find('.error').parent().find('.error-text').remove();
            $(form.el).find('.error').removeClass('error');
            $(form.el).find('#' + error.name).addClass('error').parent().append('<p class="error-text">' + error.message + '</p>');
          });
        });
        this.model.on('change', function() {
          $(form.el).find('.error').parent().find('.error-text').remove();
          $(form.el).find('.error').removeClass('error');
          this.render;
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

        var Vacancy = this.$el.find($("#vacancy")).val();
        var Surname = this.$el.find($("#surname")).val();
        var Name = this.$el.find($("#name")).val();
        var Patronymic = this.$el.find($("#patronymic")).val();
        var Age = this.$el.find($("#age")).val();
        var Password = this.$el.find($('#password')).val();

        this.model.set({
          vacancy: Vacancy,
          surname: Surname,
          name: Name,
          patronymic: Patronymic,
          age: Age,
          password: Password
        }, {
          validate : true
        })
      },

      saveLocalStorage: function() {
        localStorage.setItem('candidate', JSON.stringify(this.model.attributes));
      }
  });

  App.Views.Application = Backbone.View.extend({
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


  $(document).ready(function () {

      var candidate = new App.Models.Application();
      var newFormView = new App.Views.Form({model: candidate});
      var candidateView = new App.Views.Application({model: candidate});

      $(".application-wrap").append(candidateView.render().el);

  });


}());