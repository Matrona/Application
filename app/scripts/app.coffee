window.app = window.app or {}

$ ->
  candidate = new app.Application()
  newFormView = new app.FormView(model: candidate)
  candidateView = new app.ApplicationView(model: candidate)
  
  $('.application-wrap').append candidateView.render().el
  return