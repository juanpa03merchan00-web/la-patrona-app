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
    <div className="min-h-screen bg-black text-white">
      {/* EL SECRETO ESTÁ AQUÍ: 'max-w-md mx-auto' obliga a la app a no ser gigante en PC */}
      <main className="max-w-md mx-auto min-h-screen pb-96 border-x border-zinc-900 shadow-2xl relative">
        
        {/* HEADER: El div 'w-48 h-48' bloquea el tamaño del logo */}
        <header className="text-center py-10 flex flex-col items-center border-b border-zinc-800 px-4">
          <div className="w-48 h-48 relative mb-6">
            <img 
              src="/logo-grande.jpg" 
              alt="Logo La Patrona" 
              className="rounded-full border-4 border-yellow-600 object-cover w-full h-full shadow-2xl"
            />
          </div>
          <h1 className="text-4xl font-black text-yellow-600 italic uppercase">La Patrona</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.5em] mt-1">Licorería</p>
        </header>

        {/* CATÁLOGO: 'grid-cols-2' para que las botellas no sean gigantes */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {licores.map((licor) => (
            <div key={licor.id} className="bg-zinc-900/50 rounded-3xl p-4 border border-zinc-800 flex flex-col items-center">
              <div className="h-40 w-full flex items-center justify-center mb-3">
                <img src={licor.img} alt={licor.nombre} className="max-h-full object-contain" />
              </div>
              <h3 className="text-[10px] font-bold text-center h-8 flex items-center leading-tight uppercase">{licor.nombre}</h3>
              <p className="text-yellow-500 font-black text-sm my-2">${licor.precio.toFixed(2)}</p>
              <button 
                onClick={() => agregarAlCarrito(licor.nombre, licores.find(l => l.nombre === licor.nombre)?.precio || 0)}
                className="w-full bg-yellow-600 text-black font-black py-3 rounded-2xl text-[10px] uppercase active:scale-95 transition-all"
              >
                + AGREGAR
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER FIJO: Siempre centrado con el contenedor 'max-w-md' */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-zinc-950/95 backdrop-blur-xl border-t border-yellow-600/30 p-6 z-50">
          <div className="space-y-4">
            <div className="bg-zinc-900/80 p-3 rounded-xl border border-yellow-600/20 text-center">
              <p className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest">Banco de Loja - Jaime Cumbicos</p>
              <p className="text-xs text-white font-mono">Ahorros: 0230142x00x</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Tu Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="bg-zinc-800 rounded-xl p-4 text-xs text-white outline-none focus:ring-1 focus:ring-yellow-600 w-full" />
              <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="bg-zinc-800 rounded-xl p-4 text-xs text-white outline-none focus:ring-1 focus:ring-yellow-600 w-full" />
            </div>

            <div className="flex justify-between items-center bg-black/50 p-2 rounded-full border border-zinc-800">
              <p className="text-3xl font-black text-yellow-500 pl-4">${total.toFixed(2)}</p>
              <button onClick={enviarWhatsApp} className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-full font-black text-[11px] shadow-lg shadow-green-900/40">
                PEDIR AHORA
              </button>
            </div>
            <p className="text-center text-[8px] text-zinc-700 font-bold tracking-[0.4em] uppercase">Programmed by JAM</p>
          </div>
        </div>
      </main>
    </div>
  )
}