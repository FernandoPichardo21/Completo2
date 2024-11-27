'use client'; 

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const { id } = params; 
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });

    const router = useRouter();
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/productos/buscarPorId/${id}`);
                setProducto(response.data);
                setLoading(false);
                setFormData({
                    nombre: response.data.nombre,
                    precio: response.data.precio,
                    stock: response.data.stock
                });
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                setLoading(false); 
            }
        };

        if (id) {
            fetchProducto();
        }
    }, [id]);

    const guardarProducto = async (e) => {
        e.preventDefault();
    
        const updatedData = {};
        if (formData.nombre) updatedData.nombre = formData.nombre;
        if (formData.precio) updatedData.precio = formData.precio;
        if (formData.stock) updatedData.stock = formData.stock;
    
        console.log('Datos a enviar:', updatedData); 
    
        try {
            const response = await axios.put(`http://localhost:3000/productos/editarProducto/${id}`, updatedData);
           
            router.push('/productos/mostrar'); 
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto');
        }
    };
    

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

    return (
        <div className="m-0 row row-justify-content">
            <form onSubmit={guardarProducto} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Producto</h1>
                    </div>
                    <div className="card-body">
                        <input
                            style={{ height: "70px" }}
                            className="form-control mb-3"
                            type="text"
                            id="nombre"
                            placeholder="Nombre "
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            autoFocus
                        />
                        <input
                            style={{ height: "70px" }}
                            className="form-control mb-3"
                            type="number"
                            id="precio"
                            placeholder="Precio "
                            value={formData.precio}
                            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                        />
                        <input
                            style={{ height: "70px" }}
                            className="form-control mb-3"
                            type="number"
                            id="stock"
                            placeholder="Stock "
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{ height: "50px" }} className="btn btn-primary col-12">Actualizar producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Page;
