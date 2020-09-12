import FirebaseService from './src/services/firebase.js'
import TodoApp from './src/app.js'
import InputHandler from './src/inputHandler.js'

main()
async function main () {
    const firebaseService = new FirebaseService()
    firebaseService.initializePersistencyService()
    
    const app = new TodoApp('TodoList', firebaseService)
    await app.initializeTodoApp()
    
    const inputHandler = new InputHandler('TodoInput', app)
    inputHandler.initializeInputHandler()
}