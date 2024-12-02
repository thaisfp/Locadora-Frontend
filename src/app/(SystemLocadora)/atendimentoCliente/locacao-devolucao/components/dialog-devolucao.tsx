import React from 'react';
import { Locacao } from '@/model/locacao';

interface DialogDevolucaoProps {
  locacao: Locacao;
  onFechar: () => void;
  onDevolucaoEfetuar: (idLocacao: string) => void;
}

const DialogDevolucao: React.FC<DialogDevolucaoProps> = ({ locacao, onFechar, onDevolucaoEfetuar }) => {
  const calcularMulta = () => {
    if (locacao.dtDevolucaoEfetiva && new Date(locacao.dtDevolucaoEfetiva) > new Date(locacao.dtDevolucaoPrevista)) {
      const atraso = Math.floor((new Date(locacao.dtDevolucaoEfetiva).getTime() - new Date(locacao.dtDevolucaoPrevista).getTime()) / (1000 * 3600 * 24));
      return locacao.multaCobrada ? locacao.multaCobrada + atraso * 10 : atraso * 10;
    }
    return 0;
  };

  return (
    <div>
      <h2>Devolução da Locação</h2>
      <p>Cliente: {locacao.cliente.nome}</p>
      <p>Item: {locacao.item.nome}</p>
      <p>Data de Locação: {new Date(locacao.dtLocacao).toLocaleDateString()}</p>
      <p>Data de Devolução Prevista: {new Date(locacao.dtDevolucaoPrevista).toLocaleDateString()}</p>
      <p>Data de Devolução Efetiva: {locacao.dtDevolucaoEfetiva ? new Date(locacao.dtDevolucaoEfetiva).toLocaleDateString() : 'Pendente'}</p>
      <p>Multa a Pagar: R${calcularMulta()}</p>
      <button onClick={() => onDevolucaoEfetuar(locacao.idLocacao)}>Efetuar Devolução</button>
      <button onClick={onFechar}>Fechar</button>
    </div>
  );
};

export default DialogDevolucao;
