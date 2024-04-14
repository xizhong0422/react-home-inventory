//Inventory Item in the List
import { Form, Button, Table } from "react-bootstrap";
import { useState, createRef } from 'react';

const InventoryItem = ({ title, content, userId, type, imgSrc, postId }) => {



    return (
        <div className="inventory-item">
            <div className="inventory-item__img">
                <img src={imgSrc} alt={title} />
            </div>
            <div className="inventory-item__content">
                <h3>{title}</h3>
                <p>{content}</p>
                <p>{userId}</p>
                <p>{type}</p>
                <p>{postId}</p>
            </div>
        </div>
    )
}