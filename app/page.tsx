'use client'
import { useState } from 'react'
import { licores } from '../productos'

export default function Home() {
  const [total, setTotal] = useState(0)
  const [carrito, setCarrito] = useState<{nombre: string, precio: number}[]>([])
  const [nombreCliente, setNombreCliente] = useState('')
  const [direccionCliente, setDireccionCliente] = useState('')

  const agregarAlCarrito = (nombre: string, precio: number) => {
    setTotal(prev => prev + precio)
    setCarrito([...carrito, { nombre, precio }])
  }

  const enviarWhatsApp = () => {
    const telefono = "593988872765" // Número del Sr. Jaime Cumbicos
    if (!nombreCliente || !direccionCliente) {
      alert("Por favor, ingresa tu nombre y dirección para la entrega.");
      return;
    }

    const listaProductos = carrito.map(item => `- ${item.nombre} ($${item.precio})`).join('\n')
    const mensaje = `*PEDIDO - LA PATRONA*\n\n` +
                    `👤 *Cliente:* ${nombreCliente}\n` +
                    `📍 *Dirección:* ${direccionCliente}\n\n` +
                    `*Productos:*\n${listaProductos}\n\n` +
                    `💰 *Total a pagar: $${total.toFixed(2)}*\n\n` +
                    `✅ Realizaré la transferencia al Banco de Loja (Ahorros: 0230142x00x).`
    
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-600/30">
      {/* El max-w-md mx-auto centra la app y evita que se vea gigante en PC */}
      <main className="max-w-md mx-auto border-x border-zinc-900 min-h-screen pb-80 shadow-2xl relative bg-black">
        
        {/* HEADER: Logotipo con tamaño controlado */}
        <header className="text-center py-8 flex flex-col items-center border-b border-zinc-800 mb-6 px-4">
          <div className="w-40 h-40 relative mb-4"> 
            <img 
              src="/logo-grande.jpg" 
              alt="Logo La Patrona" 
              className="rounded-full border-4 border-yellow-600 object-cover w-full h-full shadow-lg shadow-yellow-600/20"
            />
          </div>
          <h1 className="text-4xl font-black text-yellow-600 italic uppercase tracking-tighter">La Patrona</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.5em] mt-1">Licorería</p>
        </header>

        {/* CATÁLOGO: 2 columnas fijas */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {licores.map((licor) => (
            <div key={licor.id} className="bg-zinc-900/40 rounded-2xl p-3 border border-zinc-800/50 flex flex-col items-center">
              <div className="h-32 w-full flex items-center justify-center mb-2">
                <img 
                  src={licor.img} 
                  alt={licor.nombre} 
                  className="max-h-full object-contain hover:scale-105 transition-transform" 
                />
              </div>
              <h3 className="text-[10px] font-bold text-center leading-none h-6 flex items-center">{licor.nombre}</h3>
              <p className="text-yellow-500 font-black text-sm my-2">${licor.precio.toFixed(2)}</p>
              <button 
                onClick={() => agregarAlCarrito(licor.nombre, licor.precio)}
                className="w-full bg-yellow-600 active:bg-yellow-700 text-black font-black py-2 rounded-xl text-[9px] uppercase transition-colors"
              >
                + Agregar
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER FIJO: Datos del propietario y Formulario */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-zinc-950/95 backdrop-blur-xl border-t border-yellow-600/30 p-5 z-50">
          <div className="space-y-4">
            
            {/* Información Bancaria */}
            <div className="bg-zinc-900/80 p-3 rounded-xl border border-yellow-600/10 text-center">
              <p className="text-[9px] text-yellow-600 font-bold uppercase tracking-widest">Banco de Loja - Sr. Jaime Cumbicos</p>
              <p className="text-xs text-zinc-100 font-mono">Ahorros: 0230142x00x</p>
            </div>
            
            {/* Campos de Texto para el Cliente */}
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                placeholder="Tu Nombre" 
                value={nombreCliente} 
                onChange={(e) => setNombreCliente(e.target.value)} 
                className="bg-zinc-800/50 rounded-lg p-3 text-xs text-white outline-none focus:ring-1 focus:ring-yellow-600" 
              />
              <input 
                type="text" 
                placeholder="Dirección" 
                value={direccionCliente} 
                onChange={(e) => setDireccionCliente(e.target.value)} 
                className="bg-zinc-800/50 rounded-lg p-3 text-xs text-white outline-none focus:ring-1 focus:ring-yellow-600" 
              />
            </div>

            {/* Total y Botón de WhatsApp */}
            <div className="flex justify-between items-center bg-black/40 p-1 rounded-full border border-zinc-800">
              <div className="pl-4">
                <p className="text-[8px] text-zinc-500 uppercase">Total</p>
                <p className="text-2xl font-black text-yellow-500 leading-none">${total.toFixed(2)}</p>
              </div>
              <button 
                onClick={enviarWhatsApp}
                className="bg-green-600 hover:bg-green-500 px-6 py-4 rounded-full font-black text-[10px] shadow-lg active:scale-95 transition-all"
              >
                ENVIAR PEDIDO
              </button>
            </div>
            
            {/* Firma JAM */}
            <p className="text-center text-[8px] text-zinc-700 font-bold tracking-[0.4em] uppercase">
              Programmed by JAM
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}