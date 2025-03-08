document.addEventListener("DOMContentLoaded", loadNotes);

const addNoteButton = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

addNoteButton.addEventListener("click", addNote);

function addNote(content = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.addEventListener("input", saveNotes);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    note.appendChild(textarea);
    note.appendChild(deleteButton);
    notesContainer.appendChild(note);
    
    saveNotes();
}

function saveNotes() {
    const notes = Array.from(document.querySelectorAll("textarea")).map(note => note.value);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => addNote(note));
}
