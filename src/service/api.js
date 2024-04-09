import axios from 'axios';

export const getJwtToken = () => {
  return localStorage.getItem('jwtToken');
};

export function getTarefasApi() {
    return fetch("https://spring-server.azurewebsites.net/todo/getTarefas");
}


export function getTarefasApiPaged(idPagina) {
    return fetch("https://spring-server.azurewebsites.net/todo/getTarefasPaged?idPagina="+idPagina+"&paginaSize=5");
}


export function createTarefaApi(tarefa) {
    const token = getJwtToken();
    return fetch("https://spring-server.azurewebsites.net/todo/createTarefa", {
        body: JSON.stringify(tarefa),
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    });
}

export function deleteTarefasApi(id) {
    const token = getJwtToken();
    return fetch("https://spring-server.azurewebsites.net/todo/deleteTarefa?idTarefa=" + id, {
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`
        },
        method: "DELETE"
    })
}

export function editTarefaApi(tarefaAEditar) {
    const token = getJwtToken();  
    return fetch("https://spring-server.azurewebsites.net/todo/updateTarefa?tarefaId="+tarefaAEditar.id, {
        body: JSON.stringify(tarefaAEditar),
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "PUT"
    })
}

export function registoApi(emailString,passwordString,dataNascDate) {
    fetch("https://spring-server.azurewebsites.net/user/createUtilizador", {    
  body: JSON.stringify({email: emailString,  password: passwordString,  dataNasc: dataNascDate}),
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json"
  },
  method: "POST"
})
}



const API_BASE_URL = 'https://spring-server.azurewebsites.net';

export const loginApi = (emailString, passwordString) => {
  const url = `${API_BASE_URL}/user/loginUser?email=${emailString}&password=${passwordString}`;

  return axios
    .post(url, null, {
      headers: {
        'accept': '*/*',
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      // Access the response data here
      console.log('Response data:', response.json);

      // Check if the response has the expected properties
      if (response.success) {
        console.log('Success:', response.success);
      }
      if (response.rows) {
        console.log('Rows:', response.rows);
      }

      return response.data;
    })
    .catch(error => {
      console.error('Error in loginApi:', error);
      throw error;
    });
};

/*

curl -X 'GET' \
  'https://spring-server.azurewebsites.net/user/validateUser?email=vasco123silverio%40gmail.com&token=4727' \
  -H 'accept: */
/*  *'  */
