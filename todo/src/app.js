import TodoStructure from './data/TodoStructure.js'

export default class TodoApp {
    _listElement = document.getElementById('')
    _persistencyService = null
    _allTodos = []

    constructor (listId, persistencyService) {
        if (!listId) throw new Error('TodoApp constructor must receive a listId')
        if (!persistencyService) throw new Error('TodoApp constructor must receive a persistencyService')
        
        this._listElement = document.getElementById(listId)
        this._persistencyService = persistencyService
    }

    async initializeTodoApp () {
        await this._loadInitialTodos()
    }

    async _loadInitialTodos () {
        const allTodosDb = await this._persistencyService.getAllTodos()
        const allTodosStruct = allTodosDb.map(todo => new TodoStructure(todo))
        this._allTodos = allTodosStruct

        this._renderAllTodos()
    }

    _renderAllTodos () {
        this._clearTodoList()
        this._allTodos.forEach(todo => {
            this._renderTodo(todo)
        })
    }

    _clearTodoList() {
        this._listElement.innerHTML = ''
    }

    _renderTodo (todo) {
        this._throwsIfNotTodoStructure(todo)

        const todoElement = document.createElement('li')
        todoElement.innerHTML = todo.name
        todoElement.id = todo.id
        todoElement.onclick = async () => await this._removeTodoById(todoElement.id)

        this._listElement.appendChild(todoElement)
    }

    _throwsIfNotTodoStructure (todo) {
        const isTodoStructure = todo instanceof TodoStructure
        if (!isTodoStructure) throw new Error('Object received is not a TodoStructure Object')
    }

    async _removeTodoById (todoId) {
        await this._persistencyService.removeTodoById(todoId)
        this._allTodos = this._allTodos.filter(todo => todo.id != todoId)
        this._renderAllTodos()
    }

    async addTodo (todo) {
        this._throwsIfNotTodoStructure(todo)

        await this._persistencyService.addTodo(todo)

        this._allTodos.push(todo)
        this._renderAllTodos()
    }

    factoryCreateTodo (name) {
        const id = this._getNewId()
        
        return new TodoStructure({
            id,
            name,
        })
    }

    _getNewId () {
        return Date.now()
    }
}

