const remoteURL = "https://woah-server.herokuapp.com"

export default Object.create(null, {
    get: {
        value: function (resources, id) {
            return fetch(`${remoteURL}/${resources}/${id}`)
            .then(e => e.json())
        }
    },
    getAll: {
        value: function (resources) {
            return fetch(`${remoteURL}/${resources}`)
            .then(e => e.json())
        }
    },
    getAllCharactersByUserID: {
        value: (userID, resources) => {
            return fetch(`${remoteURL}/${resources}?userID=${userID}&&_sort=level&_order=desc`)
            .then(e => e.json())
        }
    },
    delete: {
        value: function (resources, id) {
            return fetch(`${remoteURL}/${resources}/${id}`, {
                method: "DELETE"
            })
            .then(e => e.json())
            .then(() => fetch(`${remoteURL}/${resources}`))
            .then(e => e.json()) 
        }
    },
    post: {
        value: function (resources, newItem) {
            return fetch(`${remoteURL}/${resources}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            }).then(e => e.json())
            .then(() => this.getAll(resources))
        }
    },
    update: {
        value: function (resources, updateItem, id) {
            return fetch(`${remoteURL}/${resources}/${id}`, {
              method: "PATCH",
              headers: {
                 "Content-Type": "application/json"
              },
              body: JSON.stringify(updateItem)
           }).then(e => e.json())
        }
     }
})
