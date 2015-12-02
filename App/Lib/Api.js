let api = {
  getNotes() {
    let url = `https://blacknotes.firebaseio.com/testUser.json`;
    return fetch(url).then((res) => res.json())
  },
  addNote(text) {
    let url = `https://blacknotes.firebaseio.com/testUser.json`;

    return fetch(url, {
      method: 'post',
      body: JSON.stringify(text)
    }).then((res) => res.json());
  },
  deleteNote(text) {
    let url = `https://blacknotes.firebaseio.com/testUser.json`;

    return fetch(url, {
      method: 'delete',
      body: JSON.stringify(text)
    });
  }
};

export default api;

