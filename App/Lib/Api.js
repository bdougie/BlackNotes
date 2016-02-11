import Firebase from 'firebase';
import dotenv from 'dotenv'

dotenv();

let url = process.env.FIREBASE_URL;
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

