export default class LocalStorageService {
    initializePersistencyService () {}

    async addTodo (todo) {
        const allTodos = this._getAllTodosJSON()
        allTodos.push(todo)

        this._setAllTodos(allTodos)
    }

    async updateTodo (todo) {
        const allTodos = this._getAllTodosJSON()
        
        const updateIndex = allTodos.map(t => t.id).indexOf(todo.id)
        allTodos.splice(updateIndex, 1, todo)

        this._setAllTodos(allTodos)
    }

    async getAllTodos () {
        const allTodos = this._getAllTodosJSON()
        return allTodos
    }

    async removeTodoById (todoId) {
        let allTodos = this._getAllTodosJSON()
        const filteredTodos = allTodos.filter(todo => todo.id != todoId)
        this._setAllTodos(filteredTodos)
    }

    _getAllTodosJSON () {
        let allTodos = localStorage.getItem('todos')
        if (!allTodos) {
            localStorage.setItem('todos', JSON.stringify([]))
            allTodos = localStorage.getItem('todos')
        }

        const allTodosJSON = JSON.parse(allTodos)
        return allTodosJSON
    }

    _setAllTodos (todos) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}
