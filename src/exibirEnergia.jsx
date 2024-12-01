import React, { useEffect, useState } from 'react';
import EnergImg3 from './Imgs/EnergImg3.png';
import EnergImg2 from './Imgs/EnergImg2.png';
import EnergImg1 from './Imgs/EnergImg1.png';
import EnergImg4 from './Imgs/EnergImg4.png';
import EnergImg5 from './Imgs/EnergImg5.png';

// Caminhos das imagens
const energyImages = {
  0: EnergImg3, // Nenhuma energia
  1: EnergImg2, // 5 de energia
  2: EnergImg1, // 10 de energia
  3: EnergImg4, // Nenhuma energia extra (para EnergiaMaxima > 100)
  4: EnergImg5  // 5 de energia extra (para EnergiaMaxima > 100)
};

export default function ExibirEnergia({ energia, EnergMaxima }) {
  const [slots, setSlots] = useState([]);

  // Atualiza os slots com base na energia e energia máxima
  useEffect(() => {
    const updateSlots = (energy, maxEnergy) => {
      const numberOfSlots = Math.ceil(maxEnergy / 10); // Calcula o número total de slots
      let remainingEnergy = energy;
      const newSlots = Array(numberOfSlots).fill(0);

      for (let i = 0; i < newSlots.length; i++) {
        if (remainingEnergy >= 10) {
          newSlots[i] = 2; // Preenche com 10 de energia
          remainingEnergy -= 10;
        } else if (remainingEnergy >= 5) {
          newSlots[i] = 1; // Preenche com 5 de energia
          remainingEnergy -= 5;
        }

        // Gerencia os slots extras para EnergMaxima > 100
        if (maxEnergy > 100 && i >= 10) {
          if (newSlots[i] === 0) newSlots[i] = 3; // Nenhuma energia extra
          else if (newSlots[i] === 1) newSlots[i] = 4; // 5 de energia extra
        }
      }

      return newSlots;
    };

    setSlots(updateSlots(energia, EnergMaxima));
  }, [energia, EnergMaxima]); // Recalcula sempre que energia ou EnergMaxima mudam

  // Calcula o tamanho proporcional das imagens
  const slotWidthPercentage = 100 / Math.ceil(EnergMaxima / 10);

  // Renderiza os slots com imagens
  return (
    <div>
      <div
        id="linhaDeEnergia"
        style={{
          display: 'flex',
          justifyContent: 'center', // Espaço pequeno entre as imagens
          width: '100%', // Ocupa todo o espaço disponível
        }}
      >
        {slots.map((value, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 ${slotWidthPercentage}%`, // Define a largura proporcional
              height: '50px', // Altura fixa
            }}
          >
            <img
              src={energyImages[value]}
              alt={`Energia ${value}`}
              style={{
                width: '100%', // Largura proporcional
                height: '100%', // Altura fixa
                objectFit: 'contain', // Ajusta o tamanho da imagem
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
