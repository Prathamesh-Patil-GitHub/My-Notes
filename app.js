//GETTING THE OBJECTS OF ADD BUTTON,TEXT AREA OF NOTES AND SEARCH TEXTFIELD
let addBtn = document.getElementById("addBtn");
let search= document.getElementById("search");
let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");

//REFRESHING THE NOTES BOX FOR PREVIOUS NOTES
document.addEventListener("load",showNotes());

//ADDING FUNCTIONALITY TO THE ADD NOTES BUTTON
addBtn.addEventListener("click", function () {
    if(addTxt.value.trim()==""){
        alert("Cannot Save Empty Note ! Please enter some text in the note :)");
        return;
    }
    let notes = JSON.parse(localStorage.getItem("Notes"));
    //IF THE LOCAL STORAGE IS ACCESSED FIRST TIME IT WILL ASSIGN AN ARRAY TO THE VARIABLE
    if (notes == null)
        notes = [];

    let noteObj={
        title: addTitle.value,
        text: addTxt.value
    };
    notes.push(noteObj);
    //REMOVING THE CONTENT IN THE TEXTAREA AFTER IT IS READ
    addTxt.value = "";
    addTitle.value= "";
    localStorage.setItem("Notes", JSON.stringify(notes));
    //CALLING THE showNotes() FUNCTION TO REFRESH THE AVAILABLE NOTES
    showNotes();
});

//FUNCTIONALITY OF SHOWING THE CREATED NOTES IN THE NOTES BOX
function showNotes() {
    let notes = JSON.parse(localStorage.getItem("Notes"));
    let notesBox = document.getElementById("notesBox");
    notesBox.innerHTML = "";
    if (notes != null) {
        Array.from(notes).forEach(function (element, index) {
            notesBox.innerHTML += `<div class="card mx-3 my-3 notes box-shadow">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button class="btn btn-danger" onclick="deleteNote(${index})">Delete Note</button>
        </div>
    </div>`;
        });
    }
    if(notes==null || notes.length==0){
        notesBox.innerHTML=`<p class="lead my-3">Notes not found | Please add some notes :)</p>`;
    }
}

//FUNCTIONALITY OF DELTING THE SPECIFIC NOTE
function deleteNote(index){
    let notes=JSON.parse(localStorage.getItem("Notes"));
    notes.splice(index,1);
    localStorage.setItem("Notes",JSON.stringify(notes));
    showNotes();
}

//FUNCTIONALITY OF SEARCHING THE NOTES FROM THE SEARCH BAR
search.addEventListener("change",function(){
    let searchString=search.value.toLowerCase();
    // console.log(searchString);
    let notes=document.getElementsByClassName("notes");
    Array.from(notes).forEach(function(element){
        let noteText=element.getElementsByTagName("p")[0].innerText;
        let noteTitle=element.getElementsByTagName("h5")[0].innerText;
        if(noteText.search(new RegExp(searchString,"i"))!=-1 || noteTitle.search(new RegExp(searchString,"i"))!=-1)
            element.style.display="block";
        else   
            element.style.display="none";
    });
});

