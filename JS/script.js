const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Lista de personagens do jogo
const characters = [
  'diego',
  'diegoDois',
  'diegoTres',
  'diegoQuatro',
  'candido',
  'candidoDois',
  'helder',
  'helderDois',
];

// Função pra criar as cartas no HTML
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Variáveis pra armazenar cartas selecionadas
let firstCard = '';
let secondCard = '';

// Função pra verificar se o jogo terminou
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

// Função pra verificar se as cartas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    // Adiciona a classe disabled-card pra mostrar que a carta foi encontrada
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    // Limpa as variáveis das cartas selecionadas
    firstCard = '';
    secondCard = '';

    // Verifica se o jogo terminou
    checkEndGame();

  } else {
    // Se as cartas não forem iguais, esconde as cartas depois de um intervalo
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      // Limpa as variáveis das cartas selecionadas
      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

// Função para revelar uma carta quando clicar nela
const revealCard = ({ target }) => {

  // Verifica se a carta já foi revelada
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  // Se a primeira carta ainda não foi selecionada
  if (firstCard === '') {

    // Adiciona a classe reveal-card para mostrar a carta
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {
// Se a segunda carta ainda não foi selecionada

    // Adiciona a classe reveal-card para mostrar a carta
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    // Verifica se as cartas são iguais
    checkCards();

  }
}

// Função para criar uma carta com um personagem
const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  // Define a imagem de fundo da parte da frente da carta
  front.style.backgroundImage = `url('../HTML/${character}.jpg')`;

  // Adiciona as partes da frente e de trás à carta
  card.appendChild(front);
  card.appendChild(back);

  
  card.addEventListener('click', revealCard);
   // Adiciona um atributo de dados para armazenar o personagem associado à carta
  card.setAttribute('data-character', character)

  return card;
}

// Função para carregar o jogo
const loadGame = () => {
  // Duplica a lista de personagens para criar pares de cartas
  const duplicateCharacters = [...characters, ...characters];

  // Embaralha a lista de personagens
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  // Para cada personagem, cria uma carta e a adiciona à grade do jogo
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

// Função para iniciar o temporizador
const startTimer = () => {

   // Inicia um intervalo para atualizar o temporizador a cada segundo
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

// Função executada quando a janela é carregada
window.onload = () => {
  startTimer();
  loadGame();
}

// Função para recarregar a página
function refreshPage() {
    location.reload(true);
}
