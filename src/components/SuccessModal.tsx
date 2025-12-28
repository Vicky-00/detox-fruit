import BlendingAnimation from "./BlendingAnimation";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Animation Container */}
                <div className="relative w-32 h-32 flex items-center justify-center bg-emerald-50 rounded-full pointer-events-none p-4">
                    <BlendingAnimation />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Order Successful! 🎉</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Your custom healthy blend is being prepared with fresh ingredients. Stay hydrated!
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-transform active:scale-95"
                >
                    Awesome, thanks!
                </button>
            </div>
        </div>
    );
}
