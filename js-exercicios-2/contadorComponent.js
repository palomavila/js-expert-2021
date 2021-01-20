(() => {
  const BTN_REINICIAR = "btnReiniciar";
  const ID_CONTADOR = "contador";
  const VALOR_CONTADOR = 100;
  const PERIODO_INTERVALO = 10;
  
  class ContadorComponente {
    constructor() {
      this.inicializar();
    };
  
    prepararContadorProxy() {
      const handler = {
        set: (currentContext, propertyKey, newValue) => {
          console.log({currentContext, propertyKey, newValue});
          // parar todo o processamento
          if(!currentContext.valor) {
            currentContext.efetuarParada();
          };
  
          currentContext[propertyKey] = newValue;
          return true;
        },
      };
      const contador = new Proxy({
        valor: VALOR_CONTADOR,
        efetuarParada: () => {}
      }, handler);
  
      return contador;
    };
  
    atualizarTexto = ({ elementoContador, contador }) => () => {
      const identificadorTexto = '$$contador';
      let textoPadrao = `Starting in <strong>${identificadorTexto}</strong> seconds...`;
    
      // contador.valor === 0 ? 
      // elementoContador.innerHTML = textoPadrao = 'Your timer is finished!' :
      elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--);
    };
  
    agendarParadaContador({ elementoContador, idIntervalo }) {
      
      return () => {
        clearInterval(idIntervalo);
  
        elementoContador.innerHTML = "Timer interrupted!";
        this.desabilitarBotao(false);
      };
    };
  
    prepararBotao(elementoBotao, iniciarFn) {
      elementoBotao.addEventListener('click', iniciarFn.bind(this));
  
      return (valor = true) => {
        const atributo = 'disabled';
  
        if(valor) {
          elementoBotao.setAttribute(atributo, valor) 
          return
        }
        elementoBotao.removeAttribute(atributo);
      };
    };
  
    inicializar() {
      const elementoContador = document.getElementById(ID_CONTADOR);
      const contador = this.prepararContadorProxy();
      
      const argumentos = {
        elementoContador,
        contador
      };
  
      const fn = this.atualizarTexto(argumentos);
      const idIntervalo = setInterval(fn, PERIODO_INTERVALO);
    
      { //* para desabilitar o botao
        const elementoBotao = document.getElementById(BTN_REINICIAR);
        const desabilitarBotao = this.prepararBotao(elementoBotao, this.inicializar);
        desabilitarBotao();
       
        const argumentos = { elementoContador, idIntervalo };
        // const desabilitarBotao = () => console.log('Desabilitou...');
        const pararContadorFn = this.agendarParadaContador.apply({desabilitarBotao}, [argumentos]);
        contador.efetuarParada = pararContadorFn;
      }
    
    };
  };

  window.ContadorComponente = ContadorComponente; 
  
})();
