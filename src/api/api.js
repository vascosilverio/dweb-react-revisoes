export function getTarefasApi(){
    return fetch("https://spring-server.azurewebsites.net/todo/getTarefas");
}

export function createTarefaApi(obj){
    return fetch("https://spring-server.azurewebsites.net/todo/createTarefa", {
        body: JSON.stringify(obj),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        method: "POST"
      });
}