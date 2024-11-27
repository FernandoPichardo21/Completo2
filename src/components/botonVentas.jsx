"use client";
import { useRouter } from 'next/navigation'; 

export default function Boton() {
    const router = useRouter();

    const nueva = () => {
        router.push('/ventas/nuevo');
    };

    return (
        <button onClick={nueva}>Nueva Venta</button>
    );
}










































