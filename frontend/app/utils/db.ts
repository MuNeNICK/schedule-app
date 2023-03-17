// utils/db.ts
import localforage from 'localforage';

const db = localforage.createInstance({
  name: 'scheduleApp',
  storeName: 'responses',
});

export default db;
