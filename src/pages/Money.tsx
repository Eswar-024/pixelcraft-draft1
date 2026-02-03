import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const Money = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);

  // Detect if user is on mobile device
  const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android|iphone|ipad|ipod|mobile/i.test(userAgent.toLowerCase());
  };

  // Generate UPI deep link
  const generateUpiLink = (amountValue: string) => {
    const upiId = import.meta.env.VITE_UPI_ID || "eswar@paytm";
    const upiName = import.meta.env.VITE_UPI_NAME || "Eswar Portfolio";
    const transactionNote = "Portfolio Demo Payment";

    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${amountValue}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  };

  const handlePayment = () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const upiLink = generateUpiLink(amount);

    if (isMobile()) {
      // Mobile: Open UPI app directly
      window.location.href = upiLink;
    } else {
      // Desktop: Show QR code
      setShowQR(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 font-pixel">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 px-4 py-2 text-xs bg-money-green text-white border-2 border-money-violet hover:bg-money-violet transition-colors"
      >
        ← BACK
      </button>

      {/* Main content */}
      <div className="max-w-md w-full space-y-8">
        {!showQR ? (
          <>
            {/* Header text */}
            <div className="text-center space-y-4">
              <h1 className="text-2xl text-money-violet mb-4">
                💰 UPI PAYMENT
              </h1>
              <p className="text-xs text-black leading-relaxed">
                I added this new feature 😄
              </p>
              <p className="text-xs text-black leading-relaxed">
                Send money to test this feature
              </p>
              <p className="text-xs text-black leading-relaxed">
                If the amount is more than ₹2, I'll send it back 😏
              </p>
            </div>

            {/* Input and button */}
            <div className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (₹)"
                className="w-full px-4 py-3 text-sm border-2 border-money-violet focus:outline-none focus:border-money-green bg-white text-black"
              />

              <button
                onClick={handlePayment}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full money-btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PAY VIA UPI
              </button>
            </div>

            {/* Disclaimer */}
            <div className="text-[8px] text-center text-gray-500 mt-8 space-y-1 leading-relaxed">
              <p>UPI payments use deep links.</p>
              <p>Payment confirmation is manual.</p>
              <p>This is a portfolio demo feature.</p>
            </div>
          </>
        ) : (
          <>
            {/* QR Code Display (Desktop) */}
            <div className="text-center space-y-6">
              <h2 className="text-xl text-money-violet mb-4">
                SCAN QR CODE
              </h2>

              <div className="flex justify-center">
                <div className="p-4 bg-white border-4 border-money-violet">
                  <QRCodeSVG
                    value={generateUpiLink(amount)}
                    size={240}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>

              <p className="text-xs text-black leading-relaxed">
                Scan this QR with any UPI app on your phone
              </p>

              <div className="text-sm text-money-green font-bold">
                Amount: ₹{amount}
              </div>

              <button
                onClick={() => setShowQR(false)}
                className="px-6 py-2 text-xs bg-money-violet text-white border-2 border-money-green hover:bg-money-green transition-colors"
              >
                ← CHANGE AMOUNT
              </button>

              {/* Disclaimer */}
              <div className="text-[8px] text-center text-gray-500 mt-8 space-y-1 leading-relaxed">
                <p>UPI payments use deep links.</p>
                <p>Payment confirmation is manual.</p>
                <p>This is a portfolio demo feature.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Money;
