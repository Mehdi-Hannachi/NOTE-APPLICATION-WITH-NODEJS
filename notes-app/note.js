const fs = require('fs')

const fetchNotes = () => {
    try {
       return JSON.parse(fs.readFileSync('notes-db.json'))
    } catch (error) {
        return []
    }
}

const getNote = title => fetchNotes().filter((note) => note.title === title)

const saveNote = notes => fs.writeFileSync('notes-db.json',JSON.stringify(notes))





// const displayNote = (note) => {
//         console.log(`Title: ${note.title}`)
//         console.log(`Body: ${note.body}`)
//         console.log(`*********************`)
// }

const listNotes = () => {
    let notes = fetchNotes();
    notes.map(note => {
         console.log(`Title: ${note.title}`)
        console.log(`Body: ${note.body}`)
        console.log(`*********************`)
    })
}




const addNote = (title,body) => {
    let notes = fetchNotes()
    let note = {
        title, 
        body
    }
    if(!getNote(title).length) {
        notes.push(note)
        saveNote(notes)
        return
    }
    console.log('Note existing')
}


const findNote = title => {
    // return getNote(title).length ? displayNote(getNote(title)) : console.log('Note not found')
        return getNote(title).length ? console.log(getNote(title)) : console.log('Note not found')

}

const deleteNote = title => {
    if(getNote(title).length) {
        let notes = fetchNotes().filter((note) => note.title !== title)
        saveNote(notes)
        console.log('Task Deleted succesfully')
    } else {
        console.log('This task doesn\'t exist')
    }
    
}

module.exports = {
    findNote,
    listNotes,
    addNote,
    deleteNote
}