import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import DisasterCard from "./components/DisasterCard.jsx";
import InsightCard from "./components/InsightCard.jsx";
import OpportunityCard from "./components/OpportunityCard.jsx";
import WhyItWorksCard from "./components/WhyItWorksCard.jsx";
import ScoreCard from "./components/ScoreCard.jsx";

function App() {
  const article = {
    title: "Mass flooding disrupts food supply chains across major cities",
    description:
      "Flooding has delayed deliveries, damaged transportation routes, and created serious shortages in vulnerable communities.",
    source: "News API",
    date: "April 2026",
  };

  const insight = {
    problem:
      "Communities cannot get essential supplies quickly enough during disasters.",
    affectedGroup:
      "Families, local stores, drivers, city emergency teams",
    urgentNeed:
      "A faster emergency logistics and coordination system",
    marketGap:
      "There is no simple real-time local platform for organizing urgent supply delivery",
  };

  const opportunity = {
    name: "RapidRelief",
    summary:
      "A real-time platform that connects stores, freelance drivers, and local governments to deliver critical supplies during emergencies.",
    targetUsers:
      "Cities, residents, local businesses, emergency response groups",
    revenueModel:
      "Subscriptions, government contracts, and emergency logistics fees",
    whyNow:
      "Climate-related disasters are increasing, and cities need smarter response tools now",
  };

  const reasons = [
    "It solves a real urgent problem using live information",
    "It combines social impact with strong startup potential",
    "It turns breaking news into actionable innovation",
    "It is easy for judges to understand and remember",
  ];

  const scores = {
    impact: 9,
    urgency: 10,
    feasibility: 8,
    innovation: 9,
    overall: 9,
  };

  const handleGenerate = () => {
    alert("Next step: connect this button to your API logic.");
  };

  return (
    <div className="page-shell">
      <Header />
      <HeroSection onGenerate={handleGenerate} />
      <DisasterCard article={article} />
      <InsightCard insight={insight} />
      <OpportunityCard opportunity={opportunity} />
      <WhyItWorksCard reasons={reasons} />
      <ScoreCard scores={scores} />
      <div className="footer-space"></div>
    </div>
  );
}

export default App;
