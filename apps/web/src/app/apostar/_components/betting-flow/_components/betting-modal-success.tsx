import { Trophy, Copy, CheckCircle, QrCode, AlertTriangle, PartyPopper } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";

interface BettingModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  betResult: {
    bet: {
      id: number;
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

const formatTicketCode = (code: string | null): string => {
  if (!code) return "--- ---";
  const numericCode = code.replace(/\D/g, '').padStart(6, '0');
  return `${numericCode.slice(0, 3)} ${numericCode.slice(3, 6)}`;
};

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

  const isPaid = !!betResult.bet.ticketCode;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isPaid ? "PAGAMENTO CONFIRMADO! 🎉" : "BOOOOORA! QUASE LÁ 🚀"}
      size="xl"
    >
      <div className="p-6 sm:p-10 text-center space-y-8 bg-white">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-6">
          <div className="w-16 h-16 bg-yellow-400 border border-black flex items-center justify-center rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
            {isPaid ? <PartyPopper className="w-8 h-8 text-black" /> : <Trophy className="w-8 h-8 text-black" />}
          </div>
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black leading-none">
              {isPaid ? "BILHETE VALIDADO!" : `REGISTRADO, ${betResult.bet.name.split(' ')[0].toUpperCase()}!`}
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
              {isPaid ? "BOA SORTE NA DISPUTA!" : "PAGUE O PIX PARA VALIDAR SEU JOGO."}
            </p>
          </div>
        </div>

        {!isPaid ? (
          /* PENDING PAYMENT VIEW */
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

            <div className="bg-yellow-100 border border-yellow-400 p-4 flex items-start gap-4 text-left">
              <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0" />
              <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-wide leading-relaxed">
                APÓS O PAGAMENTO, ESTA TELA SERÁ ATUALIZADA AUTOMATICAMENTE COM O SEU CÓDIGO DE BILHETE.
              </p>
            </div>
          </div>
        ) : (
          /* PAID / CONFIRMED VIEW */
          <div className="space-y-8 py-4">
            <div className="bg-green-50 border-2 border-green-500 p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(34,197,94,0.1)]">
              <div className="space-y-2">
                <p className="text-xs font-black text-green-700 uppercase tracking-widest">SEU CÓDIGO OFICIAL</p>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative group">
                    <span className="text-7xl font-black text-black tracking-tighter bg-white border-2 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      {formatTicketCode(betResult.bet.ticketCode)}
                    </span>
                    {copiedTicket && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 text-xs font-black uppercase tracking-widest animate-bounce border-2 border-white shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
                        COPIADO! ✅
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onCopyTicket();
                    }}
                    variant="outline"
                    className="border-black hover:bg-black hover:text-white rounded-none font-bold uppercase tracking-widest text-xs relative"
                  >
                    {copiedTicket ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedTicket ? "COPIADO!" : "COPIAR CÓDIGO"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-6 rotate-[-1deg] shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]">
              <div className="flex items-center gap-4 text-left">
                <AlertTriangle className="w-10 h-10 text-yellow-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase italic tracking-tighter">ATENÇÃO: SALVE SEU CÓDIGO!</p>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-tight">
                    TIRE UM PRINT OU COPIE O CÓDIGO ACIMA. ELE É A SUA ÚNICA COMPROVAÇÃO DE PARTICIPAÇÃO NO BOLÃO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Action */}
        <Button
          onClick={onClose}
          className={`w-full h-auto py-6 text-2xl sm:text-3xl font-black uppercase italic tracking-tighter transition-all rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-6px] hover:translate-y-0 ${isPaid
            ? "bg-green-500 text-white hover:bg-black"
            : "bg-black text-white hover:bg-yellow-400 hover:text-black"
            }`}
        >
          {isPaid ? "IR PARA O RANKING" : "CONCLUÍDO"}
        </Button>
      </div>
    </Modal>
  );
}
