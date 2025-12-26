document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.querySelector('main'); 
  const botao = document.querySelector('.btn');
  const luzes = document.querySelectorAll('.luz');
  const estrela = document.querySelector('.estrela');
  const estrelaDentro = document.querySelector('.estrela__dentro');
  const estrelaShadow = document.querySelector('.estrela__shadow');
  const textoTitulo = document.querySelector('h1');

  const mensagemFinal = "Feliz Natal! Que seu código compile sem bugs e sua vida rode sem erros.";
  
  let sistemaLigado = false;
  let intervaloPisca = null;
  let intervaloNeve = null; 

  botao.addEventListener('click', () => {
    if (sistemaLigado) {
      desligarTudo();
    } else {
      ligarArvore();
    }
  });

  async function ligarArvore() {
    sistemaLigado = true;
    
    iniciarNeve();

    if(textoTitulo) {
        textoTitulo.innerText = ""; 
        escreverTexto(mensagemFinal);
    }

    for (let i = luzes.length - 1; i >= 0; i--) {
      if (!sistemaLigado) return; 
      luzes[i].classList.add(`ativa__luz--${i}`);
      luzes[i].classList.add('ativa__luz'); 
      await esperar(100); 
    }

    if (!sistemaLigado) return;

    toggleEstrela(true);
    await esperar(500);
    
    luzes.forEach(removeClassesLuz);
    await esperar(300);

    if (!sistemaLigado) return;

    iniciarPiscaPisca();
  }


  function criarFloco() {
    if (!sistemaLigado) return;

    const floco = document.createElement('div');
    floco.classList.add('floco-neve');

    const leftPos = Math.random() * 100; 
    const tamanho = Math.random() * 10 + 5;
    const duracao = Math.random() * 5 + 5; 
    const delay = Math.random() * 2; 

    floco.style.left = `${leftPos}vw`;
    floco.style.width = `${tamanho}px`;
    floco.style.height = `${tamanho}px`;
    floco.style.animationDuration = `${duracao}s`;
    floco.style.animationDelay = `-${delay}s`; 

    mainContainer.appendChild(floco);

    setTimeout(() => {
        floco.remove();
    }, (duracao + delay) * 1000); 
  }

  function iniciarNeve() {
    if (intervaloNeve) return; 
    intervaloNeve = setInterval(criarFloco, 200);
    for(let i=0; i<5; i++) criarFloco();
  }

  function pararNeve() {
    if (intervaloNeve) {
        clearInterval(intervaloNeve);
        intervaloNeve = null;
    }
  }

  async function escreverTexto(texto) {
      for(let i = 0; i < texto.length; i++) {
          if(!sistemaLigado) return;
          textoTitulo.innerHTML += texto.charAt(i);
          await esperar(50);
      }
  }

  function desligarTudo() {
    sistemaLigado = false;
    
    pararNeve(); 

    if (intervaloPisca) clearInterval(intervaloPisca);
    
    luzes.forEach(removeClassesLuz);
    toggleEstrela(false);

    if(textoTitulo) textoTitulo.innerText = "Feliz Natal";
  }
  
  function toggleEstrela(ativar) {
    if (ativar) {
      estrela.classList.add('ativa__estrela');
      estrelaDentro.classList.add('ativa__estrela__dentro');
      estrelaShadow.classList.add('visible');
    } else {
      estrela.classList.remove('ativa__estrela');
      estrelaDentro.classList.remove('ativa__estrela__dentro');
      estrelaShadow.classList.remove('visible');
    }
  }

  function iniciarPiscaPisca() {
    let estadoPar = true;
    alternarLuzes(estadoPar);

    intervaloPisca = setInterval(() => {
        estadoPar = !estadoPar;
        alternarLuzes(estadoPar);
    }, 1000);
  }

  function alternarLuzes(isPar) {
      luzes.forEach((luz, index) => {
        removeClassesLuz(luz);
        const ehPar = index % 2 === 0;
        if (isPar && ehPar) {
          luz.classList.add(`ativa__luz--${index}`);
        } else if (!isPar && !ehPar) {
          luz.classList.add(`ativa__luz--${index}`);
        }
      });
  }

  function removeClassesLuz(elemento) {
    const classesParaRemover = [];
    elemento.classList.forEach(cls => {
      if (cls.includes('ativa__luz')) classesParaRemover.push(cls);
    });
    classesParaRemover.forEach(cls => elemento.classList.remove(cls));
  }

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});