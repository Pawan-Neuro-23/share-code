import { useState, useEffect } from 'react';

export default function WelcomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay for the button fade-in effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Adjust the delay as needed (500ms here)

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-white overflow-hidden relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3')",
      }}
    >
      {/* Dark linear gradient overlay on the background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.6) 15%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 85%)",
        }}
      ></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Welcome to Mountain Explorer
        </h1>
        <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Embark on a journey to discover breathtaking peaks, serene valleys, and unforgettable adventures in the world's most majestic mountain ranges.
        </p>
        <button
          className={`bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-1000 ease-in-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '1000ms' }} // Delay added for a smoother fade-in
        >
          Get Started
        </button>
      </div>
    </div>
  );
}