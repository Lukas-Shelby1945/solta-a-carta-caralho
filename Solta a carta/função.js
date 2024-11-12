let contador = 0;
let chancePerder = 0;
let chanceDuplicar = 0;

const imagemMovimento = document.getElementById("imagemMovimento");
const resultadoTexto = document.getElementById("resultado");

// Funções de cálculo de chance
function calcularChancePerder() {
    chancePerder = Math.min(100, chancePerder + 5);
}

function calcularChanceDuplicar() {
    chanceDuplicar = Math.min(100, chanceDuplicar + 1);
}

function determinarClasse(numeroAleatorio) {
    const classes = {
        23: 'Perdeu Muito',
        55: 'Perdeu Pouco',
        73: 'Ganhou Pouco',
        101: 'Ganhou Muito'
    };

    if (numeroAleatorio <= chancePerder) {
        return 'Perdeu Tudo';
    }

    if (numeroAleatorio > 100 - chanceDuplicar) {
        return 'Duplica';
    }

    for (const limite in classes) {
        if (numeroAleatorio <= limite) {
            return classes[limite];
        }
    }

    return 'Duplica';
}

function gerarFuncaoAleatoria() {
    contador++;
    calcularChancePerder();
    calcularChanceDuplicar();

    const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    const classe = determinarClasse(numeroAleatorio);

    resultadoTexto.textContent = `Resultado: ${classe}`;
    moverImagem(classe);

    if (classe === 'Perdeu Tudo') {
        chancePerder = 0;
    }
    if (classe === 'Duplica') {
        chanceDuplicar = 0;
    }
}

// Função para mover a imagem com base na classe
function moverImagem(classe) {
    let posicaoX;

    switch (classe) {
        case 'Perdeu Muito':
            posicaoX = '10%';
            break;
        case 'Perdeu Pouco':
            posicaoX = '30%';
            break;
        case 'Ganhou Pouco':
            posicaoX = '60%';
            break;
        case 'Ganhou Muito':
            posicaoX = '80%';
            break;
        case 'Perdeu Tudo':
            posicaoX = '0%';
            break;
        case 'Duplica':
            posicaoX = '100%';
            break;
    }

    imagemMovimento.style.transform = `translateX(${posicaoX})`;
}

// Evento de clique para iniciar a função de giro
document.getElementById("girar").addEventListener("click", gerarFuncaoAleatoria);
