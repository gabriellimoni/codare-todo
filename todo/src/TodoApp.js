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
        const todoListItemElement = this._createTodoListItemElement(todo)
        this._listElement.appendChild(todoListItemElement)
    }

    _throwsIfNotTodoStructure (todo) {
        const isTodoStructure = todo instanceof TodoStructure
        if (!isTodoStructure) throw new Error('Object received is not a TodoStructure Object')
    }

    _createTodoListItemElement (todo) {
        const todoListItemElement = this._getTodoListItemElement(todo)
        const todoTextElement = this._getTodoTextElement(todo)
        const todoExcludeElement = this._getTodoExcludeElement(todo)

        todoListItemElement.appendChild(todoTextElement)
        todoListItemElement.appendChild(todoExcludeElement)

        return todoListItemElement
    }

    _getTodoListItemElement (todo) {
        const todoListItemElement = document.createElement('li')
        todoListItemElement.id = todo.id
        todoListItemElement.onclick = (e) => {
            e.stopPropagation()
            this._setEditingTodo(todo.id)
        }
    
        return todoListItemElement
    }

    _setEditingTodo (todoId) {
        const editingTodo = this._allTodos.find(todo => todo.id == todoId)
        if (!editingTodo) return
        
        const setEditingTodoEvent = new CustomEvent('setEditingTodoEvent', { detail: editingTodo })
        document.dispatchEvent(setEditingTodoEvent)
    }
    
    _getTodoTextElement (todo) {
        const todoTextElement = document.createElement('span')
        todoTextElement.innerText = todo.name
    
        return todoTextElement
    }
    
    _getTodoExcludeElement (todo) {
        const todoExcludeElement = document.createElement('button')
        todoExcludeElement.innerText = 'X'
        todoExcludeElement.onclick = async (e) => {
            e.stopPropagation()
            await this._removeTodoById(todo.id)
        }
    
        return todoExcludeElement
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

    async updateTodo (todo) {
        this._throwsIfNotTodoStructure(todo)

        await this._persistencyService.updateTodo(todo)

        const updateIndex = this._allTodos.map(t => t.id).indexOf(todo.id)
        this._allTodos.splice(updateIndex, 1, todo)

        this._renderAllTodos()
    }
}

