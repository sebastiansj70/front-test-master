import React, { useState } from 'react'
import './Header.css';
import logo from '../../../public/assets/logo.png'

interface HeaderProps {
    onSearch: (query: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        onSearch(value)
    }


    return (
        <header className="header-container">
            <div className="logo">
                <img src={logo} alt="Logo" loading='lazy' />
            </div>
            <div className="search-bar">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search by name or author..."
                />
            </div>
        </header>
    )
}

export default Header
