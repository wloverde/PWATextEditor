import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const text = db.transaction('jate', 'readwrite');
  const store = text.objectStore('jate');
  await store.put({ content }); // Assuming 'content' is an object you want to store
  await text.done;
  console.log('Data added to the database.');
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  const db = await openDB('jate', 1);
  const text = db.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const data = await store.getAll();
  await text.done;
  return data;
};

initdb();
