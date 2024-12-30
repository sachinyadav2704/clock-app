import { useState, useEffect } from 'react';
import './App.css';

function App() {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
   const [time, setTime] = useState(new Date());

   useEffect(() => {
      localStorage.setItem('theme', theme);
   }, [theme]);

   useEffect(() => {
      const timer = setInterval(() => {
         setTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
   };

   const hours = time.getHours();
   const minutes = time.getMinutes();
   const seconds = time.getSeconds();
   const ampm = hours >= 12 ? 'PM' : 'AM';
   const hour12 = hours % 12 || 12;

   return (
      <div className={`app ${theme}`}>
         <div className="theme-toggle">
            <button onClick={toggleTheme}>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme</button>
         </div>

         <div className="clock-container">
            {/* Analog Clock */}
            <div className="analog-clock">
               <div className="dial">
                  <div className="hour-hand" style={{ transform: `rotate(${hours * 30 + minutes * 0.5 - 90}deg)` }}></div>
                  <div className="minute-hand" style={{ transform: `rotate(${minutes * 6 - 90}deg)` }}></div>
                  <div className="second-hand" style={{ transform: `rotate(${seconds * 6 - 90}deg)` }}></div>
                  <div className="center-dot"></div>
               </div>
            </div>

            {/* Digital Clock */}
            <div className="digital-clock">
               <span className="digital-hand">{hour12.toString().padStart(2, '0')}:</span>
               <span className="digital-minute">{minutes.toString().padStart(2, '0')}:</span>
               <span className="digital-second">{seconds.toString().padStart(2, '0')}</span>
               <span className="digital-ampm">{ampm}</span>
            </div>
         </div>
      </div>
   );
}

export default App;
