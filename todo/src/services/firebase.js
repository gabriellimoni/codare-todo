export default class FirebaseService {
    firebaseConfig = {
        apiKey: "AIzaSyDOvUnma4QqurnxhOLnWRdxDO4TEu-RyLo",
        authDomain: "codare---teste.firebaseapp.com",
        databaseURL: "https://codare---teste.firebaseio.com",
        projectId: "codare---teste",
        storageBucket: "codare---teste.appspot.com",
        messagingSenderId: "269296772003",
        appId: "1:269296772003:web:391afa38368355d419f016"
    }
    
    initializePersistencyService () {
        firebase.initializeApp(this.firebaseConfig)
    }

    async addTodo (todo) {
        return await firebase.firestore()
            .collection('todos')
            .doc(String(todo.id))
            .set(Object.assign({}, todo))
    }

    async getAllTodos () {
        const getData =  await firebase.firestore()
            .collection('todos')
            .get()

        const todosData = getData.docs.map(doc => doc.data())
        return todosData
    }

    async removeTodoById (todoId) {
        return await firebase.firestore()
            .collection('todos')
            .doc(String(todoId))
            .delete()
    }

    async addTodo (todo) {
        return await firebase.firestore()
            .collection('todos')
            .doc(String(todo.id))
            .set(Object.assign({}, todo))
    }

    async getAllTodos () {
        const getData =  await firebase.firestore()
            .collection('todos')
            .get()

        const todosData = getData.docs.map(doc => doc.data())
        return todosData
    }

    async removeTodoById (todoId) {
        return await firebase.firestore()
            .collection('todos')
            .doc(String(todoId))
            .delete()
    }
}