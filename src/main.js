const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNote().forEach(note => {
    const noteElement = createNotesElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
    
});

addNoteButton.addEventListener("click", () => addnote());

function getNote() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));s
}

function createNotesElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty sticky Note";

    element.addEventListener("change", () =>{
        updateNote(id, element.value);
     });

     element.addEventListener("dblclick", () =>{
         const doDelete = confirm("Are you sure you want to delete this sticky note?");

         if (doDelete) {
             deleteNote(id, element);
         }

     });

    return element;

}

function addnote() {
    const Notes = getNote();
    const noteObject = {
        id: Math.floor(Math.random() *100000),
        content: ""
    };

    const noteElement = createNotesElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    Notes.push(noteObject);
    saveNotes(Notes);


}

function updateNote(id, newContent) {
    const notes = getNote ();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);

}

function deleteNote(id, element) {
   const notes = getNote().filter(note => note.id != id);

   saveNotes(notes);
   notesContainer.removeChild(element);


}