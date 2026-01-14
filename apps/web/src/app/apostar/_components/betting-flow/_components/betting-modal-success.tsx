import { Trophy, Copy, CheckCircle, QrCode } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";

interface BettingModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  betResult: {
    bet: {
      name: string;
      ticketCode: string | null;
    };
    payment: {
      pixCopyPaste: string;
      pixQrCodeBase64: string;
      amount: number;
    };
  };
  copiedTicket: boolean;
  copiedPix: boolean;
  onCopyTicket: () => void;
  onCopyPix: () => void;
}

export function BettingModalSuccess({
  isOpen,
  onClose,
  betResult,
  copiedTicket,
  copiedPix,
  onCopyTicket,
  onCopyPix,
}: BettingModalSuccessProps) {
  if (!betResult) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="BOOOOORA! QUASE LÁ 🚀" size="xl">
      <div className="p-6 sm:p-10 text-center space-y-8 bg-white">
        <div className="flex items-center justify-center gap-6">
          <div className="w-16 h-16 bg-yellow-400 border border-black flex items-center justify-center rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none">
              REGISTRADO, {betResult.bet.name.split(' ')[0].toUpperCase()}!
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
              PAGUE O PIX PARA VALIDAR SEU JOGO.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-black p-6 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <div className="w-44 h-44 bg-white border border-black flex items-center justify-center relative p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] shrink-0 overflow-hidden">
              {betResult.payment.pixQrCodeBase64 && (
                <img
                  src={`data:image/png;base64,${betResult.payment.pixQrCodeBase64}`}
                  alt="QR Code PIX"
                  className="w-full h-full object-contain"
                />
              )}
              {!betResult.payment.pixQrCodeBase64 && (
                <QrCode className="w-36 h-36 text-black opacity-20" />
              )}
              <div className="absolute inset-0 border-2 border-black/5 pointer-events-none" />
            </div>

            <div className="text-center sm:text-left space-y-3">
              <p className="inline-block text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest leading-normal">VALOR DO JOGO</p>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2 whitespace-nowrap">
                  <span className="text-3xl font-black text-black">R$</span>
                  <span className="text-6xl font-black text-black tracking-tighter">
                    {betResult.payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">PAGAMENTO VIA PIX</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-black text-left uppercase tracking-widest text-black">Copia e Cola</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-gray-50 border border-black px-5 py-4 text-xs font-mono break-all text-left overflow-hidden h-20 flex items-center leading-relaxed">
                {betResult.payment.pixCopyPaste}
              </div>
              <button
                onClick={onCopyPix}
                className="px-8 bg-black text-white border border-black hover:bg-yellow-400 hover:text-black transition-all flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] hover:shadow-none min-w-[80px]"
              >
                {copiedPix ? <CheckCircle className="w-8 h-8" /> : <Copy className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
          <div className="bg-yellow-400 border border-black p-5 rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
            <p className="text-xs font-black text-black uppercase tracking-widest mb-1 text-left">ESTADO DO COMPROVANTE</p>
            <div className="flex items-center justify-between bg-white border border-black px-4 py-2">
              {betResult.bet.ticketCode ? (
                <>
                  <span className="text-2xl font-black text-black font-mono tracking-tighter">{betResult.bet.ticketCode}</span>
                  <button onClick={onCopyTicket} className="p-1 hover:bg-black hover:text-white transition-colors">
                    {copiedTicket ? <CheckCircle className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </button>
                </>
              ) : (
                <span className="text-xs font-black text-black uppercase tracking-tighter py-2">
                  AGUARDANDO PAGAMENTO... ⏳
                </span>
              )}
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full h-auto py-6 text-3xl font-black uppercase italic tracking-tighter bg-black text-white border-2 border-black hover:bg-yellow-400 hover:text-black transition-all rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-6px] hover:translate-y-0"
          >
            CONCLUÍDO
          </Button>
        </div>
      </div>
    </Modal>
  );
}
