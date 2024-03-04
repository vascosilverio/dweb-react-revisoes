export function getTarefasApi(){
    return fetch("https://spring-server.azurewebsites.net/todo/getTarefas");
}


export function createTarefaApi(tarefa) {
    return fetch("https://spring-server.azurewebsites.net/todo/createTarefa", {
        body: JSON.stringify(tarefa),
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        method: "POST"
    });
}

export function deleteTarefasApi(id) {
    return fetch("https://spring-server.azurewebsites.net/todo/deleteTarefa?idTarefa="+id, {
        headers: {
            Accept: "*/*"
        },
        method: "DELETE"
    })
}