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
            <a href="#" class="btn btn-primary" id="atualizar" >Atualizar</a>
            <a href="#" class="btn btn-danger" id="deletar" >Deletar</a>
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
            method:"POST",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name:document.querySelector("#txtnome").value,
                email:document.querySelector("#txtemail").value
            })
        })
        .then((res)=>res.json())
        .then((dados)=>{
            alert(dados);
            document.location.reload();
        })
        .catch((erro)=>{
            console.error(erro)
        })
    }
}