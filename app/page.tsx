'use client'
import { useState } from 'react'
import { licores } from '../productos'

export default function Home() {
  const [total, setTotal] = useState(0)
  const [carrito, setCarrito] = useState<{nombre: string, precio: number}[]>([])
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')

  const agregarAlCarrito = (nombreItem: string, precio: number) => {
    setTotal(prev => prev + precio)
    setCarrito([...carrito, { nombre: nombreItem, precio }])
  }

  const enviarWhatsApp = () => {
    const telefono = "593988872765" 
    if (!nombre || !direccion) return alert("Ingresa nombre y dirección")
    const lista = carrito.map(item => `- ${item.nombre} ($${item.precio})`).join('\n')
    const mensaje = `*PEDIDO LA PATRONA*\n👤: ${nombre}\n📍: ${direccion}\n\n*Pedido:*\n${lista}\n\n*Total: $${total.toFixed(2)}*`
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`)
  }

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* CONTENEDOR CON ANCHO BLOQUEADO */}
      <main style={{ maxWidth: '450px', margin: '0 auto', borderLeft: '1px solid #27272a', borderRight: '1px solid #27272a', paddingBottom: '350px' }}>
        
        {/* HEADER: LOGO ACHICADO A LA FUERZA */}
        <header style={{ textAlign: 'center', padding: '40px 20px', borderBottom: '1px solid #27272a' }}>
          <div style={{ width: '180px', height: '180px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #ca8a04' }}>
            <img 
              src="/logo-grande.jpg" 
              alt="Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h1 style={{ color: '#ca8a04', fontSize: '32px', margin: '0', textTransform: 'uppercase', fontStyle: 'italic' }}>La Patrona</h1>
          <p style={{ color: '#71717a', fontSize: '10px', letterSpacing: '4px', margin: '5px 0 0' }}>LICORERÍA</p>
        </header>

        {/* CATÁLOGO EN 2 COLUMNAS REALES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '20px' }}>
          {licores.map((licor) => (
            <div key={licor.id} style={{ background: '#18181b', borderRadius: '20px', padding: '15px', textAlign: 'center', border: '1px solid #27272a' }}>
              <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <img src={licor.img} alt={licor.nombre} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: '10px', margin: '5px 0', height: '30px' }}>{licor.nombre}</h3>
              <p style={{ color: '#eab308', fontWeight: '900', margin: '5px 0' }}>${licor.precio.toFixed(2)}</p>
              <button 
                onClick={() => agregarAlCarrito(licor.nombre, licor.precio)}
                style={{ width: '100%', background: '#ca8a04', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}
              >
                + AGREGAR
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER SIEMPRE CENTRADO */}
        <div style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '450px', background: 'rgba(9, 9, 11, 0.95)', borderTop: '1px solid #ca8a0444', padding: '20px', boxSizing: 'border-box', zIndex: '100' }}>
          <div style={{ background: '#18181b', padding: '10px', borderRadius: '15px', textAlign: 'center', marginBottom: '15px' }}>
            <p style={{ fontSize: '9px', color: '#ca8a04', fontWeight: 'bold', margin: '0' }}>Banco de Loja - Jaime Cumbicos</p>
            <p style={{ fontSize: '12px', color: 'white', margin: '5px 0' }}>Ahorros: 0230142x00x</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <input type="text" placeholder="Tu Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ background: '#27272a', border: 'none', padding: '12px', borderRadius: '10px', color: 'white', fontSize: '12px' }} />
            <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ background: '#27272a', border: 'none', padding: '12px', borderRadius: '10px', color: 'white', fontSize: '12px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: '900', color: '#eab308', margin: '0' }}>${total.toFixed(2)}</p>
            <button onClick={enviarWhatsApp} style={{ background: '#16a34a', border: 'none', padding: '15px 30px', borderRadius: '50px', color: 'white', fontWeight: '900', fontSize: '10px', cursor: 'pointer' }}>
              ENVIAR PEDIDO
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '8px', color: '#3f3f46', marginTop: '15px', letterSpacing: '3px' }}>PROGRAMMED BY JAM</p>
        </div>
      </main>
    </div>
  )
}