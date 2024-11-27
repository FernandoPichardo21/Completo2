"use client";
import Link from "next/link";
import axios from "axios";

export default function CancelarVenta({ id }) {
    async function cancelar() {
        const url = `http://localhost:3000/ventas/cancelarVenta/${id}`;
        
        try {
            await axios.put(url, { estatus: 'cancelado' });
            window.location.replace("/ventas/mostrar");
        } catch (error) {
            console.error("Error al cancelar la venta:", error);
        }
    }

    return (
        <Link href="#" onClick={cancelar}>
            Cancelar
        </Link>
    );
}
