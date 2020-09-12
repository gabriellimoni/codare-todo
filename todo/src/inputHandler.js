export default class InputHandler {
    _inputActionsMap = {}
    _inputElement = document.getElementById('')
    _todoApp = null

    constructor (inputId, todoApp) {
        if (!inputId) throw new Error('InputHandler constructor must receive a inputId')
        if (!todoApp) throw new Error('InputHandler constructor must receive a todoApp')

        this._inputElement = document.getElementById(inputId)
        this._todoApp = todoApp
    }

    initializeInputHandler () {
        this._inputElement.addEventListener('keydown', (e) => this._handleInputKeyDown(e))
        this._inputActionsMap = {
            'Enter': () => this._handleEnterKeyDown(),
            'Escape': () => this._handleEscapeKeyDown(),
        }
    }

    _handleInputKeyDown (event) {
        const key = event.key
        const action = this._inputActionsMap[key]
        if (action) action()
    }
    
    _handleEnterKeyDown () {
        const inputValue = String(this._inputElement.value).trim()
        if (inputValue === '') return
    
        const todo = this._todoApp.factoryCreateTodo(inputValue)
        this._todoApp.addTodo(todo)
    
        this._clearInput()
    }
    
    _handleEscapeKeyDown () {
        this._clearInput()
    }
    
    _clearInput () {
        this._inputElement.value = ''
    }
}