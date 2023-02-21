const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes() 
  // filter will continue to check even if duplicate is already found
  // const duplicateNotes = notes.filter((note) => note.title === title)
  // find will stop when a duplicate has been found
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const keepNote = notes.filter((note) => note.title !== title)
  if (keepNote.length === notes.length) {
    console.log(chalk.red.inverse('No note found!'))
  } else {
    saveNotes(keepNote)
    console.log(chalk.green.inverse('Note removed!'))
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const readNote = notes.find((note) => note.title === title)
  if (readNote){
    console.log(chalk.green.bold(readNote.title) + '\n', readNote.body)
  } else {
    console.log(chalk.red.bold.inverse('Note does not exist!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.green.bold.inverse('Your notes!'))
  notes.forEach((note) => {
    console.log(note.title)
  })
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (err) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
