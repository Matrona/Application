window.app = window.app or {}

app.ApplicationView = Backbone.View.extend(
  
  tagName: 'div'
  template: _.template($('#application').html())
  
  initialize: ->
    @listenTo @model, 'change', @updateApplication
    return
  
  render: ->
    template = @template(@model.toJSON())
    @$el.html template
    this
    
  updateApplication: ->
    template = @template(@model.toJSON())
    @$el.html template
    return
)