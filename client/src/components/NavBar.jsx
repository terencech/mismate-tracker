export default function NavBar() {
    
    return(
        <nav>
            <a href="/">Logo</a>
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" id="menu-button-container">
                <div id="menu-button" />
            </label>
            <menu id="nav-menu">
                <a href="/mismates">Mismates</a>
                <a href="/users/logout">Sign out</a>
            </menu>
        </nav>
    )
}