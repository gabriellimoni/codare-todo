import FirebaseService from './src/services/firebase.js'
import LocalStorageService from './src/services/localStorage.js'
import TodoApp from './src/app.js'
import InputHandler from './src/inputHandler.js'

const availablesPersistencyTypes = [
    'localstorage',
    'firebase',
]

export default class Main {
    _persistencyType = ''
    _persistencyService = null
    _app = null

    constructor (persistencyType='localstorage') {
        if (!availablesPersistencyTypes.includes(persistencyType))
            throw new Error(`Persistency type ${persistencyType} not available`)

        this._persistencyType = persistencyType
    }

    async run () {
        this._setPersistencyService()
        
        this._app = new TodoApp('TodoList', this._persistencyService)
        await this._app.initializeTodoApp()
        
        const inputHandler = new InputHandler('TodoInput', this._app)
        inputHandler.initializeInputHandler()
    }

    _setPersistencyService () {
        switch (this._persistencyType) {
            case 'localstorage': 
                this._persistencyService = new LocalStorageService()
                break
            case 'firebase':
                this._persistencyService = new FirebaseService()
                break
        }

        if (!this._persistencyService) throw new Error('Cannot run without persistency service')
        this._persistencyService.initializePersistencyService()
    }
}
