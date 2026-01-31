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
    if (!nombre || !direccion) return alert("Ingresa nombre y dirección")
    const lista = carrito.map(item => `- ${item.nombre} ($${item.precio})`).join('\n')
    const mensaje = `*PEDIDO LA PATRONA*\n👤: ${nombre}\n📍: ${direccion}\n💬: ${comentario || 'Sin notas'}\n\n*Pedido:*\n${lista}\n\n*Total: $${total.toFixed(2)}*\n\n⚠️ Solo pedidos con transferencia verificada.`
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`)
  }

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <main style={{ maxWidth: '480px', margin: '0 auto', background: '#050505', borderLeft: '1px solid #222', borderRight: '1px solid #222', paddingBottom: '400px' }}>
        
        <header style={{ textAlign: 'center', padding: '40px 20px' }}>
          <img src="/logo-grande.jpg" alt="Logo" style={{ width: '160px', height: '160px', borderRadius: '50%', border: '3px solid #ca8a04', marginBottom: '15px', objectFit: 'cover' }} />
          <h1 style={{ color: '#ca8a04', fontSize: '32px', margin: '0', fontStyle: 'italic' }}>LA PATRONA</h1>
          <p style={{ color: '#555', fontSize: '10px', letterSpacing: '4px' }}>LICORERÍA</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '0 15px' }}>
          {licores.map((licor) => (
            <div key={licor.id} style={{ background: '#111', borderRadius: '20px', padding: '12px', textAlign: 'center', border: '1px solid #222' }}>
              <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={licor.img} alt={licor.nombre} style={{ maxHeight: '100%', maxWidth: '100%' }} />
              </div>
              <h3 style={{ fontSize: '9px', margin: '10px 0' }}>{licor.nombre}</h3>
              <p style={{ color: '#eab308', fontWeight: '900' }}>${licor.precio.toFixed(2)}</p>
              <button onClick={() => agregarAlCarrito(licor.nombre, licor.precio)} style={{ width: '100%', background: '#ca8a04', border: 'none', padding: '8px', borderRadius: '10px', fontWeight: 'bold' }}>+ AGREGAR</button>
            </div>
          ))}
        </div>

        <div style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', background: '#0a0a0a', borderTop: '2px solid #ca8a04', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ background: '#111', padding: '10px', borderRadius: '12px', marginBottom: '15px', textAlign: 'center', border: '1px solid #ca8a0444' }}>
            <p style={{ fontSize: '9px', color: '#ca8a04', fontWeight: 'bold' }}>BANCO DE LOJA - JAIME CUMBICOS</p>
            <p style={{ fontSize: '13px', fontWeight: 'bold', margin: '5px 0' }}>Ahorros: 0230142x00x</p>
            <p style={{ fontSize: '8px', color: '#777' }}>*Pedido verificado solo con comprobante.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ background: '#222', border: 'none', padding: '12px', borderRadius: '10px', color: 'white' }} />
            <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ background: '#222', border: 'none', padding: '12px', borderRadius: '10px', color: 'white' }} />
          </div>
          <input type="text" placeholder="Mensaje adicional" value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ background: '#222', border: 'none', padding: '12px', borderRadius: '10px', color: 'white', width: '100%', marginBottom: '15px', boxSizing: 'border-box' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: '900', color: '#eab308', margin: '0' }}>${total.toFixed(2)}</p>
            <button onClick={enviarWhatsApp} style={{ background: '#16a34a', border: 'none', padding: '15px 25px', borderRadius: '50px', color: 'white', fontWeight: 'bold' }}>PEDIR WHATSAPP</button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '8px', color: '#444', marginTop: '15px' }}>PROGRAMMED BY JAM</p>
        </div>
      </main>
    </div>
  )
}