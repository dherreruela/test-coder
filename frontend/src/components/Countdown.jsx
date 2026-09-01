import { useState, useEffect } from 'react';

// Fecha objetivo: 15 de agosto de 2025
const TARGET_DATE = new Date('2025-08-15T22:00:00');

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE - new Date();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Días', value: timeLeft.days, color: 'text-neon-cian' },
    { label: 'Horas', value: timeLeft.hours, color: 'text-neon-purple' },
    { label: 'Min', value: timeLeft.minutes, color: 'text-neon-magenta' },
    { label: 'Seg', value: timeLeft.seconds, color: 'text-neon-lime' }
  ];

  return (
    <section id="countdown" className="section-padding py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-white">
          Comienza en
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className={`card-neon p-6 hover:shadow-neon transition-shadow`}
            >
              <div className={`font-display font-black text-4xl md:text-5xl ${unit.color}`}>
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-gray-400 text-sm mt-2 font-medium">{unit.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 mt-8 text-sm">
          🎧 Prepara tu energía, la fiesta está a la vuelta de la esquina.
        </p>
      </div>
    </section>
  );
}

export default Countdown;
