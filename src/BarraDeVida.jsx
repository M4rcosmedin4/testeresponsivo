import 'bootstrap/dist/css/bootstrap.min.css'; // Certifique-se de importar o CSS do Bootstrap

const BarraDeVida = ({ vidaAtual, vidaMaxima, icone, tela }) => {
  const porcentagemVida = Math.max(0, (vidaAtual / vidaMaxima) * 100); // Garantindo que a porcentagem não seja negativa

  return (
    <div className="d-flex align-items-center life-bar">
      <span className="me-2">{icone}</span> {/* Ícone com espaçamento */}
      <div className="w-100">
        <div className="progress" style={{height: tela === 'pc' ? '3vh' : '5vw' ,}}> {/* Altura ajustável */}
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${porcentagemVida}%` }}
            aria-valuenow={vidaAtual}
            aria-valuemin="0"
            aria-valuemax={vidaMaxima}
          >
            {vidaAtual}/{vidaMaxima}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraDeVida;
