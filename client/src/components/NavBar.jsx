export default function NavBar() {
    
    return(
        <nav>
            <a href="/">Logo</a>
            <input type="checkbox" id="menu-toggle" />
            <menu id="nav-menu">
                <a href="/mismates">Mismates</a>
                <a href="/users/logout">Sign out</a>
            </menu>
        </nav>
    )
}