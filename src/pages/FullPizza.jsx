import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizzaById() {
            try {
                const { data } = await axios.get(
                    `https://62987839de3d7eea3c68151b.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (e) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }

        fetchPizzaById();
    }, []);

    if (!pizza) {
        return <>Загрузка...</>;
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}₴</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

export default FullPizza;
