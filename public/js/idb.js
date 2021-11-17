let db;
const request = indexedDB.open('social-api', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_user', { autoIncrement: true });
};

request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above), save reference to db in global variable
    db = event .target.result;

    // check if app is online, if yes run checkDatabase() function to send all local db data to api
    if (navigator.onLine) {
        uploadUser();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['new_user'], 'readwrite');

    const userObjectStore = transaction.objectStore('new_user');

    // add record to your store with add method
    userObjectStore.add(record);
}

function uploadUser() {
    // open a transaction on your pending db
    const transaction = db.transaction(['new_user'], 'readwrite');

    // access your pending object store
    const userObjectStore = transaction.objectStore('new_user');

    // get all records from store and set to a variable
    const getAll = userObjectStore.getAll();

    getAll.onsuccess = function() {
        // if there was data in indexedDB's store, let's send it to the api server
        if (getAll.result.length > 0) {
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }

                    const transaction = db.transaction(['new_user'], 'readwrite');
                    const userObjectStore = transaction.objectStore('new_user');
                    // clear all items in your store
                    userObjectStore.clear();
                })
                .catch(err => {
                    // set reference to redirect back here
                    console.log(err);
                });
        }
    };
}

// listen for app coming back online
window.addEventListener('online', uploadUser);