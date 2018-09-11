const remoteURL = "http://localhost:8088"

export default Object.create(null, {
    get: {
        value: function (resources, id) {
            return fetch(`${remoteURL}/${resources}/${id}`).then(e => e.json())
        }
    },
    getAll: {
        value: function (resources) {
            // console.log(`${remoteURL}/${resources}`)
            return fetch(`${remoteURL}/${resources}`).then(e => e.json())
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
            console.log("resources", resources)
            console.log("updateItem", updateItem)
            console.log("id", id)
            return fetch(`${remoteURL}/${resources}/${id}`, {
              method: "PATCH",
              headers: {
                 "Content-Type": "application/json"
              },
              body: JSON.stringify(updateItem)
           }).then(e => e.json())
           .then(() => this.getAll(resources))
        }
     }
})