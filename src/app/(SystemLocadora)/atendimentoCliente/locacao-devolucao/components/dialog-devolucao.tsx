import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Button} from '@/components/ui/button';
import { DialogActions, TextField, Typography } from '@/components/ui';

interface DevolucaoDialogProps {
    open: boolean;
    onClose: () => void;
}

const DialogDevolucao: React.FC<DevolucaoDialogProps> = ({ open, onClose }) => {
    const [numeroSerie, setNumeroSerie] = useState<string>('');
    const [dataLocacao, setDataLocacao] = useState<string | null>(null);
    const [dataPrevista, setDataPrevista] = useState<string | null>(null);
    const [valorLocacao, setValorLocacao] = useState<number | null>(null);
    const [dataDevolucao, setDataDevolucao] = useState<string>(new Date().toISOString().split('T')[0]); 
    const [multa, setMulta] = useState<number>(0);
    const [erro, setErro] = useState<string | null>(null);

    const calcularMulta = (dataPrevista: string, dataDevolucao: string): number => {
        const dataPrevistaDate = new Date(dataPrevista);
        const dataDevolucaoDate = new Date(dataDevolucao);
        const diffDias = Math.ceil((dataDevolucaoDate.getTime() - dataPrevistaDate.getTime()) / (1000 * 3600 * 24));

        return diffDias > 0 ? diffDias * 5 : 0; 
    };

    const concluirDevolucao = () => {
        if (!dataLocacao || !dataPrevista || !valorLocacao) {
            setErro('Dados incompletos para concluir a devolução.');
            return;
        }

        if (new Date(dataDevolucao) < new Date(dataLocacao)) {
            setErro('A data de devolução não pode ser menor que a data de locação.');
            return;
        }

        const multaCalculada = calcularMulta(dataPrevista, dataDevolucao);
        setMulta(multaCalculada);

        const valorTotal = valorLocacao + multaCalculada;

        alert(`Devolução registrada com sucesso!
            Data de Locação: ${dataLocacao}
            Data de Devolução Prevista: ${dataPrevista}
            Data de Devolução Efetiva: ${dataDevolucao}
            Valor da Locação: R$${valorLocacao.toFixed(2)}
            Multa: R$${multaCalculada.toFixed(2)}
            Valor Total: R$${valorTotal.toFixed(2)}`);

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Efetuar Devolução</DialogTitle>
            <DialogContent>
                <TextField
                    label="Número de Série do Item"
                    fullWidth
                    margin="normal"
                    value={numeroSerie}
                    onChange={(e) => setNumeroSerie(e.target.value)}
                />
                {erro && <Typography color="error">{erro}</Typography>}
                {dataLocacao && (
                    <div>
                        <Typography>Data de Locação: {dataLocacao}</Typography>
                        <Typography>Data de Devolução Prevista: {dataPrevista}</Typography>
                        <Typography>Valor da Locação: R${valorLocacao?.toFixed(2)}</Typography>
                    </div>
                )}
                <TextField
                    label="Data de Devolução Efetiva"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={dataDevolucao}
                    onChange={(e) => setDataDevolucao(e.target.value)}
                />
                {multa > 0 && <Typography>Multa Calculada: R${multa.toFixed(2)}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={concluirDevolucao} color="primary">
                    Concluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogDevolucao;
