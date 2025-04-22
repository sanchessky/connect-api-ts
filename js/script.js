//Função ATUALIZAR
function efetuarAtualizacao(){
    alert("Olá word")
}
function atualizar(id, name, email) {
    if (confirm(`Você realmente deseja atualizar o usuário ${name}`) == 1) {
        let frm_atualizar = `
        
    <div class="modal fade" id="atualizarModal" tabindex="-1" aria-labelledby="atualizarModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="atualizarModalLabel">Atualizar Usuário</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!--Inicio do Formulario Atualizar-->
                    <div class="mb-3">
                        <label for="txtId" class="form-label">Id</label>
                        <input type="text" class="form-control" id="txtId" value='${id}' disabled>
                    </div>
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" placeholder="Nome" value='${name}'>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="email"
                            placeholder="E-mail"value='${email}'>
                    </div>
                    <!--Fim do Formulario Atualizar-->
                </div>
                <div class="modal-footer">
                    <!--Inicio botão Atualizar-->
                    <button type="button" class="btn btn-secondary"data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" id="btnAtualizar" onclick="efetuarAtualizacao()" >Atualizar</button>
                    <!--Fim botão Atualizar-->
                </div>
            </div>
        </div>
    </div>     
    
    `;

    document.getElementById("upModal").innerHTML = frm_atualizar;
    }
}



//Função para apagar
function apagar(id) {
    if (confirm("você deseja realmente apagar esse usuário ?") == 1) {
        fetch(`http://127.0.0.1:3000/api/delete/${id}`, {
            method: "DELETE",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((dados) => {
                alert(dados);
                document.location.reload();
            })
            .catch((error) => console.error(error))
    }
}

//função para inserir img e aparecer o botão junto com o fetch para puzar as informações do banco de dados

function carregar() {
    const container = document.querySelector(".container")
    fetch("http://127.0.0.1:3000/api/users")
        .then((res) => res.json())
        .then((dados) => {
            let saida = "";
            dados.map((rs) => {
                saida += `
<div class="card col-3">
    <img src="img/user.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${rs.name}</h5>
            <p class="card-text">${rs.email}</p>
            <a href="#" class="btn btn-primary" id="atualizar" onclick="atualizar(${rs.id},'${rs.name}','${rs.email}')" data-bs-toggle="modal" data-bs-target="#atualizarModal">Atualizar</a>
            <a href="#" class="btn btn-danger" id="deletar" onclick="apagar(${rs.id})">Deletar</a>
         </div>
</div>
            `;
            });
            container.innerHTML = saida;
        })
}
document.body.onload = () => { carregar() }
// Fazer uma referencia ao botão cadastrar que está na pagina index.html
const btnCadastrar = document.querySelector("#btnCadastrar");
btnCadastrar.onclick = () => {
    if (confirm("você deseja cadastrar este cliente ?") == 1) {
        fetch("http://127.0.0.1:3000/api/create", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: document.querySelector("#txtnome").value,
                email: document.querySelector("#txtemail").value
            })
        })
            .then((res) => res.json())
            .then((dados) => {
                alert(dados);
                document.location.reload();
            })
            .catch((erro) => {
                console.error(erro)
            })
    }
}

