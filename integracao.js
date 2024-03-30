document.addEventListener('DOMContentLoaded', function(){
    fetchNews()
})

window.onload = function () {
    fetchNews()
}

async function fetchNews(){
    try{
        const response = await axios.get("http://localhost:3000/selecoes")
        console.log(response.data)
        const noticias = response.data
        updateRecentNewsList(noticias)
    }catch(error){
        console.error("Erro ao buscar notícias", error)
    }
}

function updateRecentNewsList(noticias){
    const recentPostsDiv = document.querySelector('.postsrecents')
    recentPostsDiv.innerHTML = '';
    const startIndex = noticias.length > 3 ? noticias.length - 3 : 0;
    for (let i = startIndex;i<noticias.length;i++){
        const noticia = noticias[i];
        
        const newItem = document.createElement('div')
        newItem.className = 'new-item'

        const title = document.createElement('h2')
        title.className = 'article'
        title.textContent = noticia.tema

        newItem.appendChild(title)

        recentPostsDiv.appendChild(newItem)
    }
}

function updateNewsList(noticias){
    if(noticias.length>0){
        document.getElementById('primeiro').textContent = noticias[0] ? noticias[0].tema:''
        document.getElementById('segundo').textContent = noticias[1] ? noticias[1].tema:''
        document.getElementById('terceiro').textContent = noticias[2] ? noticias[2].tema:''
    }else{
        console.log('Não há notícias para mostrar')
    }
}

async function addPublish(event){
    event.preventDefault()
    console.log('Função addPublish chamada!')
    const title = document.getElementById('title').value 
    const publication = document.getElementById('publication').value 
    try{
        const response = await axios({
            method: "POST",
            url: "http://localhost:3000/selecoes",
            data: {tema: title, noticia: publication},
            headers: {"Content-Type": "application/json"}
        })
        console.log('Dados publilcados', response.data)
        document.getElementById('title').value = ''
        document.getElementById('publication').value = ''
        window.location.reload()
    }
    catch(error){
        console.error('Erro na publicação', error)
    }
}

async function loadNewsDetails(){
    try{
        const response = await axios.get('http://localhost:3000/selecoes')
        const noticias = response.data
        const ultimasNotcias = noticias[noticias.length - 1]

        document.getElementById("tema").textContent = ultimasNotcias.tema || "Título indisponível"
        document.getElementById("noticia").textContent = ultimasNotcias.noticia
        if(noticias.imagem && document.querySelector('.postImage')){
            document.querySelector('.postImage').src = noticias.imagem 
        }
    }catch(error){
        console.error('Erro ao carregar os detalhes da notícia', error)
    }
}

async function deletePubli(event){
    event.preventDefault()
    console.log('Função deletePubli chamada')
    try{
        const loc = await axios.get('http://localhost:3000/selecoes')
        const noticias = loc.data
        const idnoticiashow = noticias[noticias.length-1].id
        const resp = await axios({
            method: "DELETE",
            url: `http://localhost:3000/selecoes/${idnoticiashow}`,
            headers: {"Content-Type": "application/json"}
        })
        console.log('Notícia deletada', resp.data)
        window.location.reload()
    }catch(error){
        console.error('Não foi possível deletar a publicação', error)
    }
}

//primeiro é necessário escrver na caixa de texto encima e depois no botão da notícia para modificá-la
async function updatePubli(event){
    event.preventDefault()
    console.log('Função updatePubli chamada')
    const titulo = document.getElementById('title').value
    const publicacao = document.getElementById('publication').value
    try{
        const loc = await axios.get('http://localhost:3000/selecoes')
        const noticias = loc.data
        const idnoticiashow = noticias[noticias.length-1].id
        const resp = await axios({
            method: "PUT",
            url: `http://localhost:3000/selecoes/${idnoticiashow}`,
            data: {tema: titulo, noticia: publicacao},
            headers: {"Content-Type": "application/json"}
        })
        console.log('Dados atualizados', resp.data)
        window.location.reload()
    }catch(error){
        console.error('Não foi possível atualizar os dados', error)
    }
}

document.addEventListener('DOMContentLoaded', loadNewsDetails)
