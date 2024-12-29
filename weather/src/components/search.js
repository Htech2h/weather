import { useState } from 'react';
import './styles.css';
export default function SearchBar(props){
    const [city, setCity] = useState('');

    function handleChange(e){
        setCity(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.changeCity(city);
    }

    return (
        <form onSubmit={handleSubmit}>
        <input onChange={handleChange} id="search" type="text" placeholder="seach city" />
        <input className="button" type="submit" value="Search"/>
        </form>
    );
}