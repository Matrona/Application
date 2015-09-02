window.app = window.app or {}

app.Application = Backbone.Model.extend(
  defaults:
    vacancy: ''
    surname: ''
    name: ''
    patronymic: ''
    age: ''
    password: ''
    birthday: ''
    resume: ''

  initialize: ->
    attrs = JSON.parse(localStorage.getItem('candidate'))
    @set attrs
    return

  validate: (attrs, options) ->
    vacancyFilter = /^[а-яА-Яa-zA-z]+$/
    cyrillicFilter = /^[а-яА-Я]+$/
    ageFilter = /[0-9]$/
    passwordFilter = /[0-9]{10}$/
    dateFilter = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/
    errors = []

    if !vacancyFilter.test(attrs.vacancy)
      errors.push
        name: 'vacancy'
        message: 'Пожалуйста, введите название вакансии без цифр.'

    if !cyrillicFilter.test(attrs.surname)
      errors.push
        name: 'surname'
        message: 'Пожалуйста, используйте только русские буквы.'

    if !cyrillicFilter.test(attrs.name)
      errors.push
        name: 'name'
        message: 'Пожалуйста, используйте только русские буквы.'

    if !cyrillicFilter.test(attrs.patronymic)
      errors.push
        name: 'patronymic'
        message: 'Пожалуйста, используйте только русские буквы.'

    if !ageFilter.test(attrs.age)
      errors.push
        name: 'age'
        message: 'Введите положительное число от 0 до 100.'

    if !passwordFilter.test(attrs.password)
      errors.push
        name: 'password'
        message: 'Введите 10 цифр (номер и серия российского папорта).'

    if !dateFilter.test(attrs.birthday)
      errors.push
        name: 'birthday'
        message: 'Дата введена неверно. Введите дату в формате ДД.ММ.ГГГГ'

    if attrs.resume.trim() == ''
      errors.push
        name: 'resume'
        message: 'Пожалуйста, напишите немного о себе.'

    if errors.length > 0
      errors
    else
      false
)