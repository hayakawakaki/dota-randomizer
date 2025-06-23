import { LINKS } from "@/constant";
import Logo from "@/components/Logo";
import "@css/components/header.css";

function Header() {
  return (
    <header className="app-header shadow-container">
      <div className="header-container">
        <h1 className="header-title">Dota Hero Randomizer</h1>
        <div className="header-brand">
          <Logo />
        </div>
        <div className="header-icons">
          {LINKS.map((item, index) => (
            <a href={item.link} target="_blank" key={`header-icon-${index}`}>
              <i>
                <item.icon />
              </i>
              <p>{item.label}</p>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
