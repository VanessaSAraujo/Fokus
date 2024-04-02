const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const comecarBt = document.querySelector('.app__card-primary-button')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarIcone = document.querySelector('#start-pause img')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('/sons/luna-rise-part-one.mp3')

const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco', 'foco.png');
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto', 'descanso-curto.png');
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo', 'descanso-longo.png');
    longoBt.classList.add('active')
});


function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)
    
    switch (contexto) {
        case "foco":
            // se acrescentar um + antes do = ele dublica o que está entre as crases, é ótimo para fazer listas
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarIcone.setAttribute('src', `/imagens/pause.png`)  
    //textContent só serve para alterar o texto
    iniciarOuPausarBt.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarIcone.setAttribute('src', `/imagens/play_arrow.png`)  
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}



mostrarTempo()