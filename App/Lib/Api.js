import Firebase from 'firebase';

let url = // YOUR FIREBASEURL HERE
let ref = new Firebase(url);
let jsonURL = `${url}.json`;

let api = {
  getNotes() {
    return fetch(jsonURL).then((res) => res.json())
  },
  addNote(text, title) {
    ref.push({title: title, body: text});
  },
  updateNote(title, text, id) {
    ref.child(id).set({title: title, body: text});
  },
  deleteNote(text, id) {
    ref.child(id).remove();
  }
};

export default api;

