//not part of main Application 



// src/utils/offlineStorage.js
import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'aquaweb_offline',
});

// Push a report to the queue
export const queueReport = async (report) => {
  const reports = (await store.getItem('reports')) || [];
  reports.push(report);
  await store.setItem('reports', reports);
};

// Fetch queued reports
export const getQueuedReports = async () => {
  return (await store.getItem('reports')) || [];
};

// Clear all queued reports
export const clearQueue = async () => {
  await store.removeItem('reports');
};
