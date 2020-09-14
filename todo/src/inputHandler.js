export default class InputHandler {
    _inputActionsMap = {}
    _inputElement = document.getElementById('')
    _todoApp = null
    _editingTodo = null

    constructor (inputId, todoApp) {
        if (!inputId) throw new Error('InputHandler constructor must receive a inputId')
        if (!todoApp) throw new Error('InputHandler constructor must receive a todoApp')

        this._inputElement = document.getElementById(inputId)
        this._todoApp = todoApp
    }

    initializeInputHandler () {
        this._inputElement.addEventListener('keydown', (e) => this._handleInputKeyDown(e))
        document.addEventListener('setEditingTodoEvent', (e) => this._handleSetEditingTodo(e))
        
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

    _handleSetEditingTodo (event) {
        const editingTodo = event.detail
        if (!editingTodo) return

        this._editingTodo = editingTodo
        this._inputElement.value = editingTodo.name
        this._inputElement.focus()
    }
    
    _handleEnterKeyDown () {
        const inputValue = String(this._inputElement.value).trim()
        if (inputValue === '') return this._clearInput()
    
        if (this._editingTodo)
            this._handleUpdateTodoByName(inputValue)
        else 
            this._handleCreateTodoByName(inputValue)
    
        this._clearInput()
    }

    _handleUpdateTodoByName (todoName) {
        this._editingTodo.name = todoName
        this._todoApp.updateTodo(this._editingTodo)
    }

    _handleCreateTodoByName (todoName) {
        const todo = this._todoApp.factoryCreateTodo(todoName)
        this._todoApp.addTodo(todo)
    }
    
    _handleEscapeKeyDown () {
        this._clearInput()
    }
    
    _clearInput () {
        this._inputElement.value = ''
        this._editingTodo = null
    }
}