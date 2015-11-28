let api = {
  getNotes() {
    let url = `https://blacknotes.firebaseio.com/.json`;
    return fetch(url).then((res) => res.json())
  },
  addNote() {
    let url = `https://blacknotes.firebaseio.com/.json`;
    let note = "New Note"

    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }

};

export default api;

