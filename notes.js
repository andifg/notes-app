const fs = require('fs')
const chalk = require('chalk')

// Finction to add a new Note, first the existing notes get loaded by calling the load Notes Function
// Second the function note.filter returns each note title that is equal with the title sended by the request call 
// If the title isn't already in the list the notes.push functions adds the new title and body to the string 

const addNote = (title, body) => {
    const notes = loadNotes()
    //    We use notes.find instead of notes.filter because notes.filter searches the whole array for the results. Notes.find stops after the first match
    // const duplicateNotes = notes.filter((note) => note.title === title)

    const duplicateNote = notes.find((note) => note.title === title)
    
    
    debugger
    
    if (duplicateNote === undefined) {

        notes.push({
            title: title,
            body: body

        })

        saveNotes(notes)
        // console.log(notes)
        console.log(chalk.bgGreen('New note was saved'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}


const ListNotes = () => {

    const notes = loadNotes()
    console.log(chalk.bgGreen('Your Notes:'))
    notes.forEach((Element) => {
        console.log(Element.title)
    })


}


const readNote = (title) => {
    const notes = loadNotes()
    const find = notes.find((note) => note.title === title)

    if (find === undefined) {

        console.log(chalk.bgRed('Title ' + title + ' is not known!'))

    } else {
        console.log(chalk.bgGreen(find.title) + "\n" + find.body)


    }

}


const removeNote = (title) => {
    const firstNotes = loadNotes()
    const newNotes = firstNotes.filter((note) => note.title !== title)

    if (firstNotes.length === newNotes.length) {
        console.log(chalk.bgRed(('Title is unknown')))

    }
    else {
        console.log(newNotes)
        console.log(chalk.bgGreen(('Title ' + title + ' was deleted')))
        saveNotes(newNotes)


    }

}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        console.log(dataJson)
        return JSON.parse(dataJson)

    }
    catch (e) {
        return []
    }

}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: ListNotes,
    readNote: readNote
}
