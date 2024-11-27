'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const { id } = params; 
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        usuario: '',
        password: ''
    });

    const router = useRouter();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/buscarPorId/${id}`);
                setUsuario(response.data);
                setLoading(false);
                setFormData({
                    nombre: response.data.nombre,
                    usuario: response.data.usuario,
                    password: '' 
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false); 
            }
        };

        if (id) {
            fetchUsuario();
        }
    }, [id]);

    const guardarUsuario = async (e) => {
        e.preventDefault();
    
        const updatedData = {};
        if (formData.nombre) updatedData.nombre = formData.nombre;
        if (formData.usuario) updatedData.usuario = formData.usuario;
        if (formData.password) {
            const { hash, salt } = encriptarPassword(formData.password);
            updatedData.password = hash; 
            updatedData.salt = salt;
        }
    
        console.log('Datos a enviar:', updatedData); 
    
        try {
            const response = await axios.put(`http://localhost:3000/usuarios/editarUsuario/${id}`, updatedData);
            
            router.push('/usuarios/mostrar'); 
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error al actualizar el usuario');
        }
    };
    

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!usuario) {
        return <p>Usuario no encontrado.</p>;
    }
 
    return (
        <div className="m-0 row row-justify-content">
            <form onSubmit={guardarUsuario} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input
                            style={{ height: "60px" }}
                            className="form-control mb-3"
                            type="text"
                            id="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            autoFocus
                        />
                        <input
                            style={{ height: "60px" }}
                            className="form-control mb-3"
                            type="text"
                            id="usuario"
                            placeholder="Usuario"
                            value={formData.usuario}
                            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                        />
                        <input
                            style={{ height: "60px" }}
                            className="form-control mb-3"
                            type="text"
                            id="password"
                            placeholder="Password"
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{ height: "50px" }} className="btn btn-primary col-12">Actualizar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Page;


