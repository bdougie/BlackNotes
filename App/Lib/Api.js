import Firebase from 'firebase';

let url = 'https://blacknotes.firebaseio.com/testUser';
let notesRef = new Firebase(url);
let jsonURL = `${url}.json`;

let api = {
  getNotes() {
    return fetch(jsonURL).then((res) => res.json())
  },
  addNote(text) {
    return fetch(jsonURL, {
      method: 'post',
      body: JSON.stringify(text)
    })
    .then(() => console.log('Note Added'))
    .catch((error) => console.log(error));
  },
  updateNote(text, id) {
    notesRef.child(id).set(text);
  },
  deleteNote(text, id) {
    notesRef.child(id).remove();
  }
};

export default api;

