window.app = window.app or {}

app.FormView = Backbone.View.extend(
  
  el: '.form'
  
  initialize: ->
    form = this
    @model.on 'invalid', (model, errors) ->
      _.each errors, (error, i) ->
        $(form.el).find('#' + error.name).addClass('error').parent().append '<p class="error-text">' + error.message + '</p>'
        return
      return
    @listenTo @model, 'change', @saveLocalStorage
    return
  
  events: 'click #btnSubmit': 'submit'
  
  render: ->
    this
    
  submit: ->
    if $('input').hasClass('error')
      $('input').removeClass('error').parent().find('.error-text').remove()
    if $('textarea').hasClass('error')
      $('textarea').removeClass('error').parent().find('.error-text').remove()
    Vacancy = @$el.find($('#vacancy')).val()
    Surname = @$el.find($('#surname')).val()
    Name = @$el.find($('#name')).val()
    Patronymic = @$el.find($('#patronymic')).val()
    Age = @$el.find($('#age')).val()
    Password = @$el.find($('#password')).val()
    Birthday = @$el.find($('#birthday')).val()
    Resume = @$el.find($('#resume')).val()
    @model.set {
      vacancy: Vacancy
      surname: Surname
      name: Name
      patronymic: Patronymic
      age: Age
      password: Password
      birthday: Birthday
      resume: Resume
    }, validate: true
    return
  
  saveLocalStorage: ->
    localStorage.setItem 'candidate', JSON.stringify(@model.attributes)
    return
)