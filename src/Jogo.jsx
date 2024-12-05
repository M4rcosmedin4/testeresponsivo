import React, { useEffect, useRef,useState, useMemo } from "react";
import esqueleto from './imgs/EsqBase.png';
import guerreirinho from './imgs/BaseGuerreir001.png';
import "./Jogo.css";
import ExibirEnergia from './exibirEnergia';
import ButtomBater from './Imgs/imgBater.png'
import ButtomDefender from './Imgs/imgDefender.png'
import BarraDeVida from "./BarraDeVida";

const Jogo =() => {
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const [tela,setTela] = useState('pc')
  
    const animateImage = () => {
      if (imageRef.current) {
        imageRef.current.classList.add("movendo");
        setTimeout(() => {
          imageRef.current.classList.remove("movendo");
        }, 1000); // Aguarda 1 segundo para voltar
      }
    };
  
    const adjustOrientation = () => {
      if (containerRef.current) {
        if (window.innerHeight > window.innerWidth) {
            setTela('cell')
          // "Gira" a tela 90 graus
          containerRef.current.style.transform = "rotate(90deg)";
        } else {
            setTela('pc')
          // Restaura o estado original
          containerRef.current.style.transform = "rotate(0deg)";
        }
      }
    };
  
    useEffect(() => {
      // Verifica a orientação ao carregar e redimensionar a tela
      adjustOrientation();
      window.addEventListener("resize", adjustOrientation);
      return () => {
        window.removeEventListener("resize", adjustOrientation);
      };
    }, []);
  //
  //logica temporaria
    const verificarClick =()=>{animateImage()}
    const [energia, setEnergia] = useState(0);
  const [EnergMaxima, setEnergMaxima] = useState(100);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setEnergia((prev) => (prev < EnergMaxima ? prev + 1 : prev)); // Incrementa até EnergMaxima
      }, 100);
      return () => clearInterval(interval);
    }, [EnergMaxima]);

//apenas ilustativo, var sem logica por hora
    const [currentIndex, setCurrentIndex] = useState(4);
    const arrayItens = useMemo(() => [' ',' ',' ',' ',' ',' ',' ',' ',' '], []);
    const [divPreta, setDivPreta] = useState(8);
    const handleKeyPress = (event) => {
      if (event.key === "h" || event.key === "H") {
        console.log("Tecla H foi pressionada!");
        setEnergMaxima((prevEnergMaxima) => prevEnergMaxima + 10);
      }
    };
  
    useEffect(() => {
      // Adiciona o listener quando o componente monta
      window.addEventListener("keydown", handleKeyPress);
  
      // Remove o listener quando o componente desmonta
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, []);
    const vida =100
    const vidaMaxima =100
    const monstroHp =100
    const vidaMonstroInicial = 100
    const larguraVida = vida <= 0 ? '0' : `${(vida / vidaMaxima) * 100}%`;
     const larguraVidaEsq = monstroHp <= 0 ? '0' : `${(monstroHp / vidaMonstroInicial) * 100}%`;
const condicaoContainer = true
    return (
      <div ref={containerRef} className="container">
         
        <div className="rectangle">
          <BarraDeVida vidaAtual={vida} vidaMaxima={vidaMaxima} icone="❤️" tela ={tela}/>
          <img
            src={guerreirinho}
            alt="Imagem Esquerda"
            className="image image-left"
            ref={imageRef}
          />
          <BarraDeVida vidaAtual={monstroHp} vidaMaxima={vidaMonstroInicial} icone="💀" tela ={tela} />
          <img
            src={esqueleto}
            alt="Imagem Direita"
            className="image image-right"
          />
          
        </div>
        <section id="barraDeJogo">
          <img className="botao" src={ButtomDefender}/>
          <div id='mini-container'>
               <div id="energia">
               <ExibirEnergia energia={energia} EnergMaxima={EnergMaxima}/> 
               </div>
               <div id="Array">
             {arrayItens.map((item, index) => (
               <div
                 key={index}
                 className={`item ${currentIndex === index ? 'amarelo' : ''} ${
                   currentIndex !== divPreta && index === divPreta ? 'preto' : ''
                 }`}
               ></div>
             ))}
           </div>
           </div>
           <img className="botao" src={ButtomBater}/>
             </section>
      </div>
    );
  };
export default Jogo