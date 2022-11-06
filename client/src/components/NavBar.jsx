import { useState } from 'react';

export default function NavBar() {
    
    const [ collapsed, setCollapsed ] = useState(false);

    function toggleMenu() {
        if (collapsed) setCollapsed(false);
        else setCollapsed(true);
        console.log(collapsed);
    }

    return(
        <nav>
            <a href="/">Logo</a>
            <button id="menu-toggle" onClick={ toggleMenu }>Toggle</button>
            <menu id="nav-menu">
                <a href="/mismates">Mismates</a>
                <a href="/users/logout">Sign out</a>
            </menu>
        </nav>
    )
}