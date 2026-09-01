import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import LineUp from './components/LineUp';
import Location from './components/Location';
import Tickets from './components/Tickets';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fondo decorativo con blur orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl float"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-neon-cian/20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-magenta/20 rounded-full blur-3xl float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Countdown />
          <LineUp />
          <Location />
          <Tickets />
          <RSVPForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
