import React, { useEffect, useRef,useState } from "react";
import esqueleto from './imgs/EsqBase.png';
import guerreirinho from './imgs/BaseGuerreir001.png';
import "./Jogo.css";
import ExibirEnergia from './exibirEnergia';

const Jogo =() => {
    const imageRef = useRef(null);
    const containerRef = useRef(null);
  
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
          // "Gira" a tela 90 graus
          containerRef.current.style.transform = "rotate(90deg)";
        } else {
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
  
    return (
      <div ref={containerRef} className="container">
        <div className="rectangle">
          <img
            src={guerreirinho}
            alt="Imagem Esquerda"
            className="image image-left"
            ref={imageRef}
          />
          <img
            src={esqueleto}
            alt="Imagem Direita"
            className="image image-right"
          />
        </div>
        <section id="barraDeJogo">
               <div id="energia">
               <ExibirEnergia energia={energia} EnergMaxima={EnergMaxima}/> 
               </div>
               <div id="barra">
             
             
           </div>
             </section><button id="buttonverificar" onClick={verificarClick} >
               Bater
             </button>
             <button onClick={() => setEnergMaxima(EnergMaxima + 10)}>Aumentar Energia Máxima</button>
      </div>
    );
  };
export default Jogo