import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        // src="<%=require('./images/logo.svg')%>"
        src={logo}
        alt="лого"
      />
    </header>
  );
}

export default Header;
