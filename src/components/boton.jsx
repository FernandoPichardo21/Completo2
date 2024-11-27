"use client";
import { useRouter } from 'next/navigation'; 

export default function Boton() {
    const router = useRouter(); 

    const nueva = () => {
        
        router.push('/usuarios/nuevo');
    };

    return (
        <button onClick={nueva}>Nuevo usuario</button>
    );
}