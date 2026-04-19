import Header from "./components/ui/Header.jsx";
import HeroSection from "./components/ui/HeroSection.jsx";
import "./styles/ui.css";

function App() {
  return (
    <div className="site-page">
      <Header />
      <main className="site-main">
        <HeroSection />
      </main>
    </div>
  );
}

export default App;
