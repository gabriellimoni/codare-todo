export default class TodoStructure {
    id = ''
    name = ''
    constructor ({ id, name }={}) {
        if (!id) throw new Error('TodoStructure must receive a ID')
        if (!name) throw new Error('TodoStructure must receive a Name')

        this.id = id
        this.name = name
    }
}