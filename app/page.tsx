'use client'
import { useState } from 'react'
import { licores } from '../productos'

export default function Home() {
  const [total, setTotal] = useState(0)
  const [carrito, setCarrito] = useState<{nombre: string, precio: number}[]>([])
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [comentario, setComentario] = useState('')

  const agregarAlCarrito = (nombreItem: string, precio: number) => {
    setTotal(prev => prev + precio)
    setCarrito([...carrito, { nombre: nombreItem, precio }])
  }

  const enviarWhatsApp = () => {
    const telefono = "593988872765" 
    if (!nombre || !direccion) return alert("Por favor, ingresa tu nombre y dirección.")
    
    const lista = carrito.map(item => `- ${item.nombre} ($${item.precio})`).join('\n')
    const mensaje = `*PEDIDO LA PATRONA*\n👤 *Cliente:* ${nombre}\n📍 *Dirección:* ${direccion}\n💬 *Nota:* ${comentario || 'Ninguna'}\n\n*Pedido:*\n${lista}\n\n*Total: $${total.toFixed(2)}*\n\n⚠️ _Se enviará comprobante del Banco de Loja para verificación._`
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`)
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <main style={{ maxWidth: '480px', margin: '0 auto', background: '#0a0a0a', minHeight: '100vh', paddingBottom: '400px', borderLeft: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
        
        {/* HEADER */}
        <header style={{ textAlign: 'center', padding: '30px 20px' }}>
          <img src="/logo-grande.jpg" alt="Logo" style={{ width: '150px', height: '150px', borderRadius: '50%', border: '3px solid #ca8a04', marginBottom: '10px', objectFit: 'cover' }} />
          <h1 style={{ color: '#ca8a04', fontSize: '28px', margin: '0', fontWeight: '900', fontStyle: 'italic' }}>LA PATRONA</h1>
          <p style={{ color: '#555', fontSize: '9px', letterSpacing: '4px', marginTop: '4px' }}>LICORERÍA</p>
        </header>

        {/* CATÁLOGO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 10px' }}>
          {licores.map((licor) => (
            <div key={licor.id} style={{ background: '#111', borderRadius: '15px', padding: '10px', textAlign: 'center', border: '1px solid #222' }}>
              <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={licor.img} alt={licor.nombre} style={{ maxHeight: '100%', maxWidth: '100%' }} />
              </div>
              <h3 style={{ fontSize: '9px', margin: '8px 0', height: '20px' }}>{licor.nombre}</h3>
              <p style={{ color: '#eab308', fontWeight: '900', fontSize: '14px' }}>${licor.precio.toFixed(2)}</p>
              <button onClick={() => agregarAlCarrito(licor.nombre, licor.precio)} style={{ width: '100%', background: '#ca8a04', border: 'none', padding: '8px', borderRadius: '8px', color: 'black', fontWeight: '900', fontSize: '9px', cursor: 'pointer' }}>+ AGREGAR</button>
            </div>
          ))}
        </div>

        {/* FOOTER FIJO CORREGIDO */}
        <footer style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', background: 'rgba(5, 5, 5, 0.98)', borderTop: '2px solid #ca8a04', padding: '15px', boxSizing: 'border-box', zIndex: '1000', boxShadow: '0 -10px 20px rgba(0,0,0,0.8)' }}>
          
          <div style={{ background: 'rgba(202, 138, 4, 0.1)', border: '1px solid #ca8a0444', padding: '8px', borderRadius: '10px', marginBottom: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '8px', color: '#ca8a04', fontWeight: 'bold', margin: '0' }}>BANCO DE LOJA - JAIME CUMBICOS</p>
            <p style={{ fontSize: '12px', color: '#fff', margin: '3px 0', fontWeight: 'bold' }}>Ahorros: 0230142x00x</p>
            <p style={{ fontSize: '7px', color: '#777', margin: '0' }}>*Solo con transferencia y comprobante verificado.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <input type="text" placeholder="Tu Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: 'white', fontSize: '11px', outline: 'none' }} />
              <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: 'white', fontSize: '11px', outline: 'none' }} />
            </div>
            <input type="text" placeholder="Mensaje adicional (hielo, vasos...)" value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: 'white', fontSize: '11px', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '8px', color: '#666', margin: '0' }}>TOTAL</p>
              <p style={{ fontSize: '26px', fontWeight: '900', color: '#eab308', margin: '0' }}>${total.toFixed(2)}</p>
            </div>
            <button onClick={enviarWhatsApp} style={{ background: '#16a34a', border: 'none', padding: '12px 20px', borderRadius: '50px', color: 'white', fontWeight: '900', fontSize: '11px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(22,163,74,0.3)' }}>
               REALIZAR PEDIDO
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '8px', color: '#333', marginTop: '10px', letterSpacing: '3px' }}>PROGRAMMED BY JAM</p>
        </footer>
      </main>
    </div>
  )
}