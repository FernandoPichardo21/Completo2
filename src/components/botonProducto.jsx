"use client";
import { useRouter } from 'next/navigation'; 

export default function Boton() {
    const router = useRouter(); 

    const nueva = () => {
        
        router.push('/productos/nuevo');
    };

    return (
        <button onClick={nueva}>Nuevo Producto</button>
    );
}