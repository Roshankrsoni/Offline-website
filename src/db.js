import PouchDB from 'pouchdb';

var db = new PouchDB('todos');


export async function addTodo(todos) {
     todos.map(t => {
        var todo = {
            _id: new Date().toISOString(),
            ...t
        }
          return db.put(todo, function callback(err, result) {
            if (!err) {
              console.log('Successfully posted a todo!');
            }
          });
    })
}


export async function showTodos() {
    let allTodos = await db.allDocs({include_docs: true, descending: true});
    let notes = [];

    allTodos.rows.forEach(n=> notes[n.id] = n.doc);
    notes = Object.entries(notes);
    return notes.map(t=> t[1]);;
  }
