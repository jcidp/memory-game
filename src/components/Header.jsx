import "../styles/Header.scss";

function Header() {
    return <header className="header">
        <h1 className="header__title">Poke Memory</h1>
        <div className="header__instructions-container">
            <button className="header__instructions">How to play?</button>
        </div>
    </header>
}

export default Header;