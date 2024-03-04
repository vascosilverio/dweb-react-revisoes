export function getTarefasAPI() {
    return fetch("https://spring-server.azurewebsites.net/todo/getTarefas");
}

export function createTarefaAPI(tarefa) {
    return fetch("https://spring-server.azurewebsites.net/todo/createTarefa", {
        body: JSON.stringify(tarefa),
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        method: "POST"
    });
}

export function deleteTarefasAPI(id) {
    return fetch("https://spring-server.azurewebsites.net/todo/deleteTarefa?idTarefa="+id, {
        headers: {
            Accept: "*/*"
        },
        method: "DELETE"
    })
}