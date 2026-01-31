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
    if (!nombre || !direccion) return alert("Escribe nombre y dirección")
    
    const lista = carrito.map(item => `- ${item.nombre} ($${item.precio})`).join('\n')
    const mensaje = `*PEDIDO LA PATRONA*\n👤: ${nombre}\n📍: ${direccion}\n\n*Pedido:*\n${lista}\n\n*Total: $${total.toFixed(2)}*\n\n✅ Comprobante de Banco de Loja en camino.`
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`)
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 pb-72">
      <header className="text-center py-6 flex flex-col items-center border-b border-zinc-800 mb-8">
        <img 
          src="/logo-grande.jpg" 
          alt="Logo La Patrona" 
          className="w-40 h-40 rounded-full border-4 border-yellow-600 shadow-2xl shadow-yellow-900/40 object-cover mb-4"
        />
        <h1 className="text-4xl font-black text-yellow-600 italic uppercase">La Patrona</h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.5em]">Licorería</p>
      </header>

      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {licores.map((licor) => (
          <div key={licor.id} className="bg-zinc-900/50 rounded-3xl p-4 border border-zinc-800 flex flex-col items-center">
            <img src={licor.img} alt={licor.nombre} className="h-32 object-contain mb-3" />
            <h3 className="text-[10px] font-bold text-center leading-tight mb-1">{licor.nombre}</h3>
            <p className="text-yellow-500 font-black text-sm">${licor.precio.toFixed(2)}</p>
            <button onClick={() => agregarAlCarrito(licor.nombre, licor.precio)} className="mt-3 w-full bg-yellow-600 text-black font-black py-2 rounded-xl text-[9px] uppercase">Agregar</button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-zinc-900/95 backdrop-blur-lg border-t border-yellow-600/30 p-4 z-50">
        <div className="max-w-md mx-auto space-y-3">
          <div className="bg-zinc-800/80 p-2 rounded-xl border border-yellow-600/20 text-center">
            <p className="text-[9px] text-yellow-500 font-bold uppercase tracking-tighter">Banco de Loja - Jaime Cumbicos</p>
            <p className="text-[10px] text-white font-mono">Ahorros: 0230142x00x</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Tu Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="bg-zinc-800 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-yellow-600" />
            <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="bg-zinc-800 rounded-xl p-3 text-xs text-white outline-none focus:ring-1 focus:ring-yellow-600" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-black text-yellow-500">${total.toFixed(2)}</p>
            <button onClick={enviarWhatsApp} className="bg-green-600 px-6 py-3 rounded-full font-black text-[10px]">PEDIR WHATSAPP</button>
          </div>
          <p className="text-center text-[8px] text-zinc-600 font-bold tracking-[0.3em] uppercase">Programmed by JAM</p>
        </div>
      </div>
    </main>
  )
}