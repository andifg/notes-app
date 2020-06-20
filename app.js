const notes = require('./notes.js')
const yargs = require('yargs')

// Customize yargs version

yargs.version('1.1.0')


// add, remove, read, list
// create add comand

yargs.command({
    command: 'add',
    describe: 'Add a new note ',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },

        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }

    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote(argv.title)
    }
})

// List command

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler () {
        notes.listNotes()
    }

})

// Read command

yargs.command({
    command: 'read',
    describe: 'Read a special note',
    builder: {
        title:{
            describe: 'Title',
            demandOption: true,
            type: 'string'

        }

    },
    handler(argv) {
        notes.readNote(argv.title)
    }

})

// Das gibts nicht zweimal zurück, sondern sorgt nur dafür, dass Yargs funktioniert
yargs.parse()

// Die Funktion gibt das ganze in Yargs.argv gespeicherte zurück 
// console.log(yargs.argv)

// Anfrage gibt alle in Arguemente zurück
// console.log(process.argv)
