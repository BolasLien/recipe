export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Brand Logo with Pulse Animation */}
        <div className="mb-8">
          <div className="relative w-20 h-20 mx-auto">
            {/* Pulsing Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl animate-pulse opacity-20"></div>
            
            {/* Main Logo Container */}
            <div className="relative w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center">
              {/* Chef Hat Icon */}
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2M4 8h16M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8M4 8l1-1h14l1 1"
                />
              </svg>
            </div>

            {/* Outer Pulse Ring */}
            <div className="absolute -inset-2 border-2 border-orange-300 rounded-3xl animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Simple Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">美味食譜</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
