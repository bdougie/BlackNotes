let api = {
  getNotes() {
    let url = `https://blacknotes.firebaseio.com/.json`;
    return fetch(url).then((res) => res.json())
  },
  addNote(text) {
    let url = `https://blacknotes.firebaseio.com/.json`;

    return fetch(url, {
      method: 'post',
      body: JSON.stringify(text)
    }).then((res) => res.json());
  }

};

export default api;

