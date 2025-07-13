import React, { useState } from 'react';
import { Heart, QrCode, X, Copy, Check } from 'lucide-react';

const DonationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Esta información puede ser configurada desde el backend o variables de entorno
  const donationInfo = {
    qrImageUrl: '/images/donation-qr.png', // QR code image (you can replace this)
    walletAddress: 'CER-YAPE-PLIN-91234567', // Example wallet/phone number
    message: 'Apoya a tu comunidad de CERranos 💚',
    phone: '912-345-678', // For Yape/Plin
    methods: [
      { name: 'Yape', icon: '📱', color: 'bg-purple-500', description: 'Código QR o teléfono' },
      { name: 'Plin', icon: '💳', color: 'bg-blue-500', description: 'Código QR o teléfono' },
      { name: 'BCP', icon: '🏦', color: 'bg-red-500', description: 'Transferencia bancaria' },
      { name: 'Interbank', icon: '🏛️', color: 'bg-blue-600', description: 'Transferencia bancaria' }
    ]
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Donation Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          aria-label="Hacer una donación"
        >
          <Heart className="h-6 w-6 group-hover:animate-pulse" fill="currentColor" />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  💚 Donar a CER
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Apoya a CER
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Message */}
              <div className="text-center mb-6">
                <p className="text-gray-700 mb-4">
                  {donationInfo.message}
                </p>
                <p className="text-sm text-gray-500">
                  Tu apoyo nos ayuda a seguir creando contenido de calidad para toda la comunidad CERranos.
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 rounded-lg p-6 text-center mb-6">
                <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg shadow-inner flex items-center justify-center border-2 border-dashed border-gray-300">
                  {/* Actual QR Code */}
                  <img 
                    src={donationInfo.qrImageUrl} 
                    alt="QR Code para donación" 
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="text-center hidden">
                    <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">QR Code no disponible</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Escanea el código QR con tu app de pagos favorita
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Métodos de Pago Disponibles
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {donationInfo.methods.map((method, index) => (
                    <div
                      key={index}
                      className={`${method.color} text-white rounded-lg p-4 shadow-md`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm opacity-90">{method.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thank You Note */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 text-sm">
                  <span className="font-semibold">¡Muchas gracias!</span> Cada donación nos ayuda a mejorar el programa y crear más contenido para la comunidad CERranos.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span>� CER</span>
                <span>•</span>
                <span>📺 RORO Network</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationModal;
