import React, { useState, useMemo } from "react";

const CATEGORIAS = [
  { id: "consolas", label: "Consolas y videojuegos", icon: "🕹️" },
  { id: "computadoras", label: "Computadoras y accesorios", icon: "💻" },
  { id: "audio", label: "Radios, TV y audio vintage", icon: "📻" },
  { id: "juguetes", label: "Juguetes y figuras", icon: "🧸" },
  { id: "musica", label: "Vinilos, casetes y CDs", icon: "🎵" },
  { id: "revistas", label: "Revistas, cómics e historia", icon: "📚" },
];

const ESTADOS = ["Excelente", "Muy bueno", "Bueno", "Regular", "Para restaurar"];
const MARCAS = ["Atari","Nintendo","Sega","Sony","Commodore","Apple","IBM","Grundig","Pioneer","Fisher-Price","Mattel","Hasbro","Marvel","DC Comics","Nacional"];

const PRODUCTOS_INIT = [
  { CodigoProducto:1, Categoria:"consolas", Marca:"Atari", AnioFabricacion:1977, Estado:"Bueno", Precio:12500, Stock:1, Destacado:true, nombreProducto:"Atari 2600 + 5 Juegos", descripcion:"Consola clásica con joystick y cartuchos originales de Pac-Man y Space Invaders.", imagen:"🕹️", vendedor:"RetroKing", rating:4.8, certificado:true },
  { CodigoProducto:2, Categoria:"consolas", Marca:"Nintendo", AnioFabricacion:1989, Estado:"Muy bueno", Precio:8900, Stock:2, Destacado:true, nombreProducto:"Game Boy Original DMG-01", descripcion:"Primera generación del Game Boy portátil. Funcional, incluye Tetris original.", imagen:"🎮", vendedor:"VintageGames", rating:4.5, certificado:true },
  { CodigoProducto:3, Categoria:"audio", Marca:"Sony", AnioFabricacion:1985, Estado:"Excelente", Precio:4500, Stock:3, Destacado:false, nombreProducto:"Walkman Sony WM-10", descripcion:"Reproductora portátil de cassette en perfecto estado. Incluye auriculares originales.", imagen:"📻", vendedor:"AudioRetro", rating:4.9, certificado:false },
  { CodigoProducto:4, Categoria:"computadoras", Marca:"Commodore", AnioFabricacion:1982, Estado:"Bueno", Precio:18000, Stock:1, Destacado:true, nombreProducto:"Commodore 64", descripcion:"Computadora doméstica más vendida de la historia. Incluye manuales y datasette.", imagen:"💻", vendedor:"TecnoAntiguo", rating:4.7, certificado:true },
  { CodigoProducto:5, Categoria:"musica", Marca:"Nacional", AnioFabricacion:1968, Estado:"Muy bueno", Precio:9500, Stock:2, Destacado:false, nombreProducto:"Vinilos The Beatles — 3 LPs", descripcion:"Colección de 3 álbumes originales en excelente estado de reproducción.", imagen:"🎵", vendedor:"DiscoVerde", rating:5.0, certificado:false },
  { CodigoProducto:6, Categoria:"juguetes", Marca:"Mattel", AnioFabricacion:1980, Estado:"Bueno", Precio:3200, Stock:5, Destacado:false, nombreProducto:"Hot Wheels Track Set", descripcion:"Pista original de Hot Wheels con 12 autos de la época, caja original incluida.", imagen:"🧸", vendedor:"JuguetesRetro", rating:4.3, certificado:false },
  { CodigoProducto:7, Categoria:"revistas", Marca:"Marvel", AnioFabricacion:1975, Estado:"Regular", Precio:6800, Stock:3, Destacado:false, nombreProducto:"Spider-Man Amazing #150", descripcion:"Cómic Marvel original de 1975, primera edición. Estado regular con conservación aceptable.", imagen:"📚", vendedor:"ComicMundo", rating:4.6, certificado:true },
  { CodigoProducto:8, Categoria:"computadoras", Marca:"Apple", AnioFabricacion:1984, Estado:"Para restaurar", Precio:35000, Stock:1, Destacado:true, nombreProducto:"Apple Macintosh 128K", descripcion:"El Mac original de 1984. Requiere restauración pero arranca. Pieza de colección única.", imagen:"🖥️", vendedor:"TecnoAntiguo", rating:4.9, certificado:true },
  { CodigoProducto:9, Categoria:"audio", Marca:"Pioneer", AnioFabricacion:1979, Estado:"Excelente", Precio:22000, Stock:1, Destacado:false, nombreProducto:"Amplificador Pioneer SA-508", descripcion:"Amplificador hi-fi vintage restaurado. Sonido cálido excepcional. 40W RMS por canal.", imagen:"🔊", vendedor:"AudioRetro", rating:4.8, certificado:false },
  { CodigoProducto:10, Categoria:"consolas", Marca:"Sega", AnioFabricacion:1990, Estado:"Muy bueno", Precio:7200, Stock:2, Destacado:false, nombreProducto:"Sega Mega Drive + 3 Juegos", descripcion:"Consola Mega Drive con controles originales y cartuchos de Sonic, Streets of Rage y FIFA.", imagen:"🎮", vendedor:"VintageGames", rating:4.4, certificado:false },
  { CodigoProducto:11, Categoria:"juguetes", Marca:"Hasbro", AnioFabricacion:1984, Estado:"Bueno", Precio:5600, Stock:2, Destacado:false, nombreProducto:"Transformers G1 Optimus Prime", descripcion:"Figura original de 1984 con caja. Completo con todos los accesorios de la primera generación.", imagen:"🤖", vendedor:"JuguetesRetro", rating:4.7, certificado:true },
  { CodigoProducto:12, Categoria:"musica", Marca:"Sony", AnioFabricacion:1992, Estado:"Excelente", Precio:1800, Stock:8, Destacado:false, nombreProducto:"Pack 10 Casetes Sony HF-S90", descripcion:"Casetes vírgenes tipo II sellados de fábrica. Ideales para grabación de alta fidelidad.", imagen:"📼", vendedor:"DiscoVerde", rating:4.2, certificado:false },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{overflow-x:hidden;}
  .app{font-family:'Inter',sans-serif;background:#0f0e0c;min-height:100vh;color:#e8e0d0;width:100%;overflow-x:hidden;}
  /* NAV */
  .nav{background:#0f0e0c;border-bottom:1px solid #1e1c18;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:200;}
  .logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:#d4a843;cursor:pointer;}
  .logo span{color:#e8e0d0;}
  .nav-links{display:flex;gap:0.25rem;}
  .nav-btn{background:none;border:none;color:#7a7060;font-size:0.8rem;padding:0.4rem 0.7rem;border-radius:4px;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;}
  .nav-btn:hover,.nav-btn.active{color:#d4a843;background:#1a1914;}
  .nav-right{display:flex;gap:0.5rem;align-items:center;}
  .cart-btn{background:#d4a843;color:#0f0e0c;border:none;padding:0.45rem 1rem;border-radius:4px;font-weight:600;font-size:0.8rem;cursor:pointer;font-family:'Inter',sans-serif;}
  .cart-btn:hover{background:#e8bc55;}
  /* HERO */
  .hero{padding:4rem 2rem 3rem;text-align:center;background:#0f0e0c;border-bottom:1px solid #1a1710;}
  .hero-label{font-size:0.7rem;letter-spacing:.25em;text-transform:uppercase;color:#d4a843;margin-bottom:.8rem;}
  .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,5vw,4rem);font-weight:900;color:#e8e0d0;line-height:1.05;margin-bottom:.8rem;}
  .hero-title em{color:#d4a843;font-style:normal;}
  .hero-sub{color:#6a6055;font-size:.9rem;max-width:480px;margin:0 auto 1.5rem;line-height:1.6;}
  .hero-cta{background:#d4a843;color:#0f0e0c;border:none;padding:.7rem 1.8rem;font-size:.85rem;font-weight:700;border-radius:4px;cursor:pointer;font-family:'Inter',sans-serif;}
  /* CATEGORÍAS ICONO */
  .cat-bar{display:flex;gap:.5rem;padding:1rem 1.5rem;overflow-x:auto;border-bottom:1px solid #1a1710;background:#0f0e0c;}
  .cat-icon-btn{display:flex;flex-direction:column;align-items:center;gap:.2rem;background:#141310;border:1px solid #1e1c18;border-radius:8px;padding:.6rem .9rem;cursor:pointer;min-width:90px;transition:all .2s;}
  .cat-icon-btn:hover,.cat-icon-btn.active{border-color:#d4a843;background:#1a1710;}
  .cat-icon-btn .ic{font-size:1.4rem;}
  .cat-icon-btn span{font-size:.62rem;color:#7a7060;text-align:center;line-height:1.3;}
  .cat-icon-btn.active span{color:#d4a843;}
  /* LAYOUT PRINCIPAL */
  .main-layout{display:grid;grid-template-columns:240px 1fr;min-height:calc(100vh - 60px);}
  /* SIDEBAR */
  .sidebar{background:#0a0908;border-right:1px solid #1a1710;padding:1.2rem;position:sticky;top:60px;height:calc(100vh - 60px);overflow-y:auto;}
  .sidebar h4{font-size:.7rem;color:#4a4035;text-transform:uppercase;letter-spacing:.15em;margin-bottom:.8rem;margin-top:1.2rem;}
  .sidebar h4:first-child{margin-top:0;}
  .filter-input{width:100%;background:#141310;border:1px solid #1e1c18;color:#e8e0d0;padding:.5rem .7rem;border-radius:4px;font-size:.82rem;font-family:'Inter',sans-serif;margin-bottom:.5rem;}
  .filter-input:focus{outline:none;border-color:#d4a843;}
  .filter-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:.3rem;}
  .range-val{font-size:.75rem;color:#d4a843;font-weight:600;}
  .filter-select{width:100%;background:#141310;border:1px solid #1e1c18;color:#e8e0d0;padding:.5rem .7rem;border-radius:4px;font-size:.82rem;font-family:'Inter',sans-serif;margin-bottom:.5rem;}
  .filter-select:focus{outline:none;border-color:#d4a843;}
  .price-row{display:flex;gap:.4rem;align-items:center;}
  .price-inp{width:100%;background:#141310;border:1px solid #1e1c18;color:#e8e0d0;padding:.45rem .6rem;border-radius:4px;font-size:.78rem;font-family:'Inter',sans-serif;}
  .clear-btn{width:100%;margin-top:1rem;background:none;border:1px solid #2a2820;color:#7a7060;padding:.5rem;border-radius:4px;font-size:.78rem;cursor:pointer;font-family:'Inter',sans-serif;}
  .clear-btn:hover{border-color:#d4a843;color:#d4a843;}
  /* GRID */
  .grid-area{padding:1.2rem;}
  .results-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;}
  .results-count{font-size:.82rem;color:#6a6055;}
  .sort-select{background:#141310;border:1px solid #1e1c18;color:#e8e0d0;padding:.4rem .6rem;border-radius:4px;font-size:.78rem;font-family:'Inter',sans-serif;}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1rem;}
  /* CARD */
  .card{background:#141310;border:1px solid #1e1c18;border-radius:8px;overflow:hidden;cursor:pointer;transition:border-color .2s,transform .2s;}
  .card:hover{border-color:#2a2820;transform:translateY(-2px);}
  .card-img{background:#1a1914;height:130px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;position:relative;}
  .badge-dest{position:absolute;top:.4rem;right:.4rem;background:#d4a843;color:#0f0e0c;font-size:.6rem;font-weight:700;padding:.15rem .4rem;border-radius:3px;}
  .badge-cert{position:absolute;top:.4rem;left:.4rem;background:#1a3a28;border:1px solid #2a6a3a;color:#5abf7a;font-size:.6rem;padding:.15rem .4rem;border-radius:3px;}
  .card-body{padding:.8rem;}
  .card-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem;}
  .card-cat{font-size:.62rem;color:#d4a843;text-transform:uppercase;letter-spacing:.1em;}
  .card-year{font-size:.62rem;color:#4a4035;}
  .card-name{font-family:'Playfair Display',serif;font-size:.92rem;font-weight:700;color:#e8e0d0;margin-bottom:.3rem;line-height:1.3;}
  .card-brand{font-size:.72rem;color:#6a6055;margin-bottom:.5rem;}
  .card-bottom{display:flex;align-items:center;justify-content:space-between;}
  .card-price{font-size:1.1rem;font-weight:700;color:#d4a843;}
  .card-estado{font-size:.65rem;color:#7a7060;background:#1a1914;padding:.15rem .4rem;border-radius:3px;}
  .card-stars{font-size:.65rem;color:#d4a843;margin-bottom:.5rem;}
  .card-actions{display:flex;gap:.4rem;margin-top:.6rem;}
  .btn-fav{background:#141310;border:1px solid #1e1c18;color:#7a7060;padding:.4rem;border-radius:4px;cursor:pointer;font-size:.8rem;flex:0 0 auto;}
  .btn-fav.active,.btn-fav:hover{border-color:#d4a843;color:#d4a843;}
  .btn-add{flex:1;background:#1a1914;border:1px solid #1e1c18;color:#e8e0d0;padding:.4rem;border-radius:4px;cursor:pointer;font-size:.75rem;font-family:'Inter',sans-serif;transition:all .2s;}
  .btn-add:hover{background:#d4a843;border-color:#d4a843;color:#0f0e0c;font-weight:600;}
  .btn-add:disabled{opacity:.4;cursor:not-allowed;}
  /* MODAL */
  .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:300;display:flex;align-items:flex-start;justify-content:center;padding:2rem 1rem;overflow-y:auto;}
  .modal{background:#141310;border:1px solid #2a2820;border-radius:10px;max-width:560px;width:100%;padding:1.5rem;}
  .modal-close{float:right;background:none;border:none;color:#6a6055;font-size:1.2rem;cursor:pointer;}
  .modal-emoji{font-size:4rem;text-align:center;display:block;margin:.5rem 0;}
  .modal-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:900;color:#e8e0d0;margin-bottom:.3rem;}
  .modal-meta{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin-bottom:.8rem;}
  .pill{background:#1a1914;border:1px solid #1e1c18;color:#7a7060;font-size:.68rem;padding:.2rem .5rem;border-radius:3px;}
  .pill-gold{background:#2a2518;border-color:#d4a843;color:#d4a843;}
  .pill-green{background:#1a2a1a;border-color:#2a5a2a;color:#5abf5a;}
  .modal-desc{color:#9a9080;font-size:.85rem;line-height:1.7;margin-bottom:1rem;}
  .modal-seller{display:flex;align-items:center;gap:.6rem;background:#1a1914;border-radius:6px;padding:.6rem .8rem;margin-bottom:1rem;}
  .seller-avatar{width:32px;height:32px;border-radius:50%;background:#2a2518;display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#d4a843;font-weight:700;}
  .seller-info{flex:1;}
  .seller-name{font-size:.82rem;color:#e8e0d0;font-weight:500;}
  .seller-rating{font-size:.7rem;color:#d4a843;}
  .modal-cert{background:#1a2a1a;border:1px solid #2a5a2a;border-radius:6px;padding:.7rem .9rem;margin-bottom:1rem;font-size:.78rem;color:#5abf5a;}
  .modal-price{font-size:1.6rem;font-weight:700;color:#d4a843;margin-bottom:.8rem;}
  .modal-actions{display:flex;gap:.6rem;}
  .btn-modal-fav{background:#1a1914;border:1px solid #1e1c18;color:#7a7060;padding:.6rem 1rem;border-radius:4px;cursor:pointer;font-size:.85rem;}
  .btn-modal-fav:hover,.btn-modal-fav.active{border-color:#d4a843;color:#d4a843;}
  .btn-modal-add{flex:1;background:#d4a843;color:#0f0e0c;border:none;padding:.6rem;border-radius:4px;font-weight:700;font-size:.9rem;cursor:pointer;font-family:'Inter',sans-serif;}
  /* CARRITO */
  .page{padding:1.5rem;max-width:680px;margin:0 auto;}
  .page-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;color:#e8e0d0;margin-bottom:1.5rem;}
  .cart-item{display:flex;align-items:center;gap:.8rem;padding:.8rem 0;border-bottom:1px solid #1a1710;}
  .ci-emoji{font-size:2rem;}
  .ci-info{flex:1;}
  .ci-name{font-weight:600;color:#e8e0d0;font-size:.88rem;}
  .ci-sub{font-size:.72rem;color:#6a6055;margin-top:.1rem;}
  .ci-price{color:#d4a843;font-weight:700;}
  .ci-rm{background:none;border:none;color:#4a4035;cursor:pointer;font-size:1rem;}
  .ci-rm:hover{color:#d4a843;}
  .cart-total{text-align:right;padding:1rem 0;font-size:1.3rem;font-weight:700;color:#d4a843;}
  .checkout-btn{width:100%;background:#d4a843;color:#0f0e0c;border:none;padding:.9rem;font-size:.95rem;font-weight:700;border-radius:4px;cursor:pointer;font-family:'Inter',sans-serif;}
  .empty-state{text-align:center;padding:4rem 0;color:#4a4035;}
  .empty-state .es-icon{font-size:3rem;margin-bottom:.8rem;}
  /* FAVORITOS */
  .fav-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1rem;margin-top:.5rem;}
  /* HISTORIAL */
  .order-item{background:#141310;border:1px solid #1e1c18;border-radius:6px;padding:1rem;margin-bottom:.8rem;}
  .order-header{display:flex;justify-content:space-between;margin-bottom:.5rem;}
  .order-id{font-family:monospace;font-size:.75rem;color:#d4a843;}
  .order-status{font-size:.72rem;padding:.15rem .5rem;border-radius:3px;}
  .status-env{background:#1a2a3a;border:1px solid #2a4a6a;color:#5a9abf;}
  .status-ok{background:#1a2a1a;border:1px solid #2a5a2a;color:#5abf5a;}
  .order-items{font-size:.82rem;color:#9a9080;}
  .order-total{font-size:.88rem;color:#d4a843;font-weight:700;margin-top:.4rem;}
  /* PERFIL */
  .profile-card{background:#141310;border:1px solid #1e1c18;border-radius:8px;padding:1.2rem;margin-bottom:1rem;}
  .profile-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;}
  .profile-avatar{width:56px;height:56px;border-radius:50%;background:#2a2518;display:flex;align-items:center;justify-content:center;font-size:1.4rem;color:#d4a843;font-weight:700;}
  .profile-name{font-family:'Playfair Display',serif;font-size:1.1rem;color:#e8e0d0;}
  .profile-type{font-size:.75rem;color:#7a7060;margin-top:.2rem;}
  .profile-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;}
  .stat-box{background:#1a1914;border-radius:6px;padding:.6rem;text-align:center;}
  .stat-val{font-size:1.2rem;font-weight:700;color:#d4a843;}
  .stat-lbl{font-size:.65rem;color:#6a6055;margin-top:.2rem;}
  .review-item{background:#1a1914;border-radius:6px;padding:.8rem;margin-bottom:.6rem;}
  .review-top{display:flex;justify-content:space-between;margin-bottom:.3rem;}
  .review-user{font-size:.8rem;font-weight:600;color:#e8e0d0;}
  .review-stars{font-size:.75rem;color:#d4a843;}
  .review-text{font-size:.8rem;color:#9a9080;line-height:1.5;}
  /* PUBLICAR */
  .pub-form{background:#141310;border:1px solid #1e1c18;border-radius:8px;padding:1.2rem;}
  .pub-form h3{font-family:'Playfair Display',serif;font-size:1rem;color:#d4a843;margin-bottom:1rem;}
  .field{margin-bottom:.9rem;}
  .field label{display:block;font-size:.7rem;color:#7a7060;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.3rem;}
  .field .req{color:#d4a843;}
  .field input,.field select,.field textarea{width:100%;background:#0f0e0c;border:1px solid #1e1c18;color:#e8e0d0;padding:.55rem .75rem;border-radius:4px;font-size:.83rem;font-family:'Inter',sans-serif;}
  .field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:#d4a843;}
  .field-row{display:grid;grid-template-columns:1fr 1fr;gap:.7rem;}
  .submit-btn{background:#d4a843;color:#0f0e0c;border:none;padding:.65rem 1.5rem;border-radius:4px;font-weight:700;font-size:.85rem;cursor:pointer;font-family:'Inter',sans-serif;}
  .notif{position:fixed;bottom:1.2rem;right:1.2rem;background:#d4a843;color:#0f0e0c;padding:.6rem 1rem;border-radius:6px;font-weight:700;font-size:.82rem;z-index:400;}
  .footer{border-top:1px solid #1a1710;text-align:center;padding:1.5rem;color:#2a2820;font-size:.72rem;}
  input[type=range]{width:100%;accent-color:#d4a843;}

  /* ─── RESPONSIVE / MOBILE ─────────────────────────────────────────── */
  .sidebar-mobile-header{display:none;}
  .sidebar-close{display:none;}
  .sidebar-overlay{display:none;}
  .filters-toggle-mobile{display:none;}
  .apply-btn-mobile{display:none;}

  @media (max-width: 860px){
    .nav{padding:0 .8rem;height:54px;flex-wrap:wrap;}
    .logo{font-size:1.15rem;}
    .nav-links{order:3;width:100%;justify-content:flex-start;overflow-x:auto;gap:0;padding-bottom:.3rem;-webkit-overflow-scrolling:touch;}
    .nav-links::-webkit-scrollbar{display:none;}
    .nav-btn{font-size:.72rem;padding:.35rem .55rem;white-space:nowrap;flex:0 0 auto;}
    .nav-right{order:2;}
    .cart-btn{font-size:.75rem;padding:.4rem .8rem;}

    .hero{padding:2.2rem 1rem 1.8rem;}
    .hero-label{font-size:.6rem;letter-spacing:.15em;}
    .hero-sub{font-size:.82rem;padding:0 .5rem;}
    .hero-cta{padding:.65rem 1.5rem;font-size:.8rem;}

    .cat-bar{padding:.8rem 1rem;gap:.4rem;}
    .cat-icon-btn{min-width:74px;padding:.5rem .6rem;}
    .cat-icon-btn .ic{font-size:1.2rem;}
    .cat-icon-btn span{font-size:.58rem;}

    .main-layout{display:block;}
    .sidebar{
      position:fixed; top:0; left:0; height:100vh; width:82%; max-width:320px;
      transform:translateX(-100%); transition:transform .25s ease;
      z-index:500; box-shadow:4px 0 24px rgba(0,0,0,.6);
      display:flex; flex-direction:column;
    }
    .sidebar.open{transform:translateX(0);}
    .sidebar-mobile-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;padding-bottom:.8rem;border-bottom:1px solid #1a1710;}
    .sidebar-close{display:block;background:none;border:none;color:#7a7060;font-size:1.2rem;cursor:pointer;}
    .sidebar-overlay{display:block;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:450;}
    .apply-btn-mobile{display:block;width:100%;margin-top:.6rem;background:#d4a843;color:#0f0e0c;border:none;padding:.7rem;border-radius:4px;font-weight:700;font-size:.85rem;cursor:pointer;font-family:'Inter',sans-serif;}

    .filters-toggle-mobile{display:inline-flex;align-items:center;gap:.3rem;background:#141310;border:1px solid #2a2820;color:#d4a843;padding:.4rem .8rem;border-radius:5px;font-size:.78rem;cursor:pointer;font-family:'Inter',sans-serif;}
    .results-bar{flex-wrap:wrap;gap:.6rem;}
    .results-count{font-size:.75rem;order:3;width:100%;}
    .sort-select{font-size:.75rem;flex:1;}

    .grid-area{padding:.8rem;}
    .grid{grid-template-columns:repeat(2,1fr);gap:.6rem;}
    .card-img{height:96px;font-size:2.3rem;}
    .card-body{padding:.55rem;}
    .card-name{font-size:.78rem;}
    .card-brand{font-size:.65rem;}
    .card-price{font-size:.92rem;}
    .card-estado{font-size:.58rem;padding:.1rem .3rem;}
    .card-actions{flex-direction:column;gap:.3rem;}
    .btn-fav{align-self:flex-end;}
    .btn-add{font-size:.7rem;padding:.45rem;}

    .modal-bg{padding:0;align-items:flex-end;}
    .modal{max-width:100%;border-radius:14px 14px 0 0;max-height:92vh;padding:1.2rem;}
    .modal-emoji{font-size:3rem;}
    .modal-title{font-size:1.1rem;}
    .modal-price{font-size:1.3rem;}
    .modal-actions{flex-direction:column;}
    .btn-modal-fav{width:100%;}

    .page{padding:1rem;}
    .page-title{font-size:1.3rem;margin-bottom:1rem;}
    .fav-grid{grid-template-columns:repeat(2,1fr);gap:.6rem;}

    .field-row{grid-template-columns:1fr;gap:0;}
    .pub-form{padding:1rem;}
    .profile-stats{gap:.4rem;}
    .stat-val{font-size:1rem;}

    .notif{left:.8rem;right:.8rem;bottom:.8rem;text-align:center;}
  }

  @media (max-width: 420px){
    .grid{grid-template-columns:1fr 1fr;}
    .hero-title{font-size:1.9rem;}
    .nav-btn{font-size:.68rem;padding:.3rem .45rem;}
  }
`;

const PEDIDOS = [
  { id:"RV-2024-0041", fecha:"12/05/2024", items:["Game Boy Original DMG-01"], total:8900, estado:"Entregado" },
  { id:"RV-2024-0038", fecha:"03/05/2024", items:["Walkman Sony WM-10","Pack 10 Casetes Sony HF-S90"], total:6300, estado:"En camino" },
];
const REVIEWS = [
  { user:"ColeccionistaBA", stars:"★★★★★", texto:"Excelente vendedor, el producto llegó tal como se describió. Muy recomendable." },
  { user:"RetroFan90", stars:"★★★★☆", texto:"Buena comunicación y envío rápido. El Walkman funcionaba perfecto." },
];

function Stars({ n }) {
  return <span>{"★".repeat(Math.round(n))}{"☆".repeat(5-Math.round(n))}</span>;
}

function ProductCard({ p, onVer, onAgregar, favoritos, toggleFav }) {
  return (
    <div className="card" onClick={() => onVer(p)}>
      <div className="card-img">
        <span>{p.imagen}</span>
        {p.Destacado && <span className="badge-dest">DESTACADO</span>}
        {p.certificado && <span className="badge-cert">✓ CERT.</span>}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-cat">{CATEGORIAS.find(c=>c.id===p.Categoria)?.label.split(" ")[0]}</span>
          <span className="card-year">{p.AnioFabricacion}</span>
        </div>
        <div className="card-name">{p.nombreProducto}</div>
        <div className="card-brand">{p.Marca}</div>
        <div className="card-stars"><Stars n={p.rating} /> {p.rating.toFixed(1)}</div>
        <div className="card-bottom">
          <span className="card-price">${p.Precio.toLocaleString("es-AR")}</span>
          <span className="card-estado">{p.Estado}</span>
        </div>
        <div className="card-actions">
          <button className={`btn-fav ${favoritos.includes(p.CodigoProducto)?"active":""}`}
            onClick={e=>{e.stopPropagation();toggleFav(p.CodigoProducto);}}>♥</button>
          <button className="btn-add" disabled={p.Stock===0}
            onClick={e=>{e.stopPropagation();onAgregar(p);}}>
            {p.Stock>0?"Agregar al carrito":"Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ p, onClose, onAgregar, favoritos, toggleFav }) {
  if (!p) return null;
  const isFav = favoritos.includes(p.CodigoProducto);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <span className="modal-emoji">{p.imagen}</span>
        <div className="modal-title">{p.nombreProducto}</div>
        <div className="modal-meta">
          <span className="pill pill-gold">{CATEGORIAS.find(c=>c.id===p.Categoria)?.label}</span>
          <span className="pill">{p.Marca}</span>
          <span className="pill">{p.AnioFabricacion}</span>
          <span className="pill">{p.Estado}</span>
          {p.certificado && <span className="pill pill-green">✓ Autenticidad certificada</span>}
        </div>
        <p className="modal-desc">{p.descripcion}</p>
        <div className="modal-seller">
          <div className="seller-avatar">{p.vendedor[0]}</div>
          <div className="seller-info">
            <div className="seller-name">{p.vendedor}</div>
            <div className="seller-rating"><Stars n={p.rating} /> {p.rating.toFixed(1)} — Vendedor verificado</div>
          </div>
        </div>
        {p.certificado && (
          <div className="modal-cert">
            ✓ <strong>Certificado digital #RV-{p.CodigoProducto.toString().padStart(6,"0")}</strong> — Autenticidad verificada por RetroVerse. Este artículo cuenta con registro de certificación de originalidad.
          </div>
        )}
        <div className="modal-price">${p.Precio.toLocaleString("es-AR")} <span style={{fontSize:".8rem",color:"#6a6055",fontWeight:400}}>ARS · Stock: {p.Stock}</span></div>
        <div className="modal-actions">
          <button className={`btn-modal-fav ${isFav?"active":""}`} onClick={()=>toggleFav(p.CodigoProducto)}>{isFav?"♥ Guardado":"♡ Favorito"}</button>
          <button className="btn-modal-add" onClick={()=>{onAgregar(p);onClose();}}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

function TiendaView({ productos, carrito, setCarrito, favoritos, toggleFav }) {
  const [catActiva, setCatActiva] = useState(null);
  const [busq, setBusq] = useState("");
  const [marca, setMarca] = useState("");
  const [estado, setEstado] = useState("");
  const [anioMin, setAnioMin] = useState(1960);
  const [anioMax, setAnioMax] = useState(2000);
  const [precioMax, setPrecioMax] = useState(40000);
  const [sort, setSort] = useState("dest");
  const [detalle, setDetalle] = useState(null);
  const [notif, setNotif] = useState(null);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const agregar = p => {
    setCarrito(prev => prev.find(x=>x.CodigoProducto===p.CodigoProducto) ? prev : [...prev,p]);
    setNotif(p.nombreProducto); setTimeout(()=>setNotif(null),2000);
  };

  const limpiar = () => { setCatActiva(null); setBusq(""); setMarca(""); setEstado(""); setAnioMin(1960); setAnioMax(2000); setPrecioMax(40000); };

  const filtrados = useMemo(() => {
    let r = [...productos];
    if (catActiva) r = r.filter(p=>p.Categoria===catActiva);
    if (busq) r = r.filter(p=>p.nombreProducto.toLowerCase().includes(busq.toLowerCase())||p.Marca.toLowerCase().includes(busq.toLowerCase()));
    if (marca) r = r.filter(p=>p.Marca===marca);
    if (estado) r = r.filter(p=>p.Estado===estado);
    r = r.filter(p=>p.AnioFabricacion>=anioMin && p.AnioFabricacion<=anioMax);
    r = r.filter(p=>p.Precio<=precioMax);
    if (sort==="dest") r.sort((a,b)=>b.Destacado-a.Destacado);
    if (sort==="precio_asc") r.sort((a,b)=>a.Precio-b.Precio);
    if (sort==="precio_desc") r.sort((a,b)=>b.Precio-a.Precio);
    if (sort==="anio") r.sort((a,b)=>a.AnioFabricacion-b.AnioFabricacion);
    return r;
  }, [productos,catActiva,busq,marca,estado,anioMin,anioMax,precioMax,sort]);

  return (
    <div>
      {notif && <div className="notif">✓ {notif} agregado al carrito</div>}
      <div className="hero">
        <div className="hero-label">Objetos con historia · Tecnología retro · Coleccionables auténticos</div>
        <h1 className="hero-title">Retro<em>Verse</em></h1>
        <p className="hero-sub">Donde los objetos del pasado encuentran nuevos dueños. Vintage auténtico, tecnología de otra era.</p>
        <button className="hero-cta" onClick={()=>{
          const el = document.getElementById("grid-catalogo");
          if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
        }}>Explorar colección</button>
      </div>
      <div className="cat-bar">
        {CATEGORIAS.map(c=>(
          <button key={c.id} className={`cat-icon-btn ${catActiva===c.id?"active":""}`} onClick={()=>setCatActiva(catActiva===c.id?null:c.id)}>
            <span className="ic">{c.icon}</span>
            <span>{c.label.split(" ").slice(0,2).join(" ")}</span>
          </button>
        ))}
      </div>
      <div className="main-layout">
        <aside className={`sidebar ${filtrosAbiertos ? "open" : ""}`}>
          <div className="sidebar-mobile-header">
            <h4 style={{margin:0}}>Filtros</h4>
            <button className="sidebar-close" onClick={()=>setFiltrosAbiertos(false)}>✕</button>
          </div>
          <h4>Buscar</h4>
          <input className="filter-input" placeholder="Nombre o marca..." value={busq} onChange={e=>setBusq(e.target.value)} />
          <h4>Marca</h4>
          <select className="filter-select" value={marca} onChange={e=>setMarca(e.target.value)}>
            <option value="">Todas las marcas</option>
            {MARCAS.map(m=><option key={m}>{m}</option>)}
          </select>
          <h4>Estado</h4>
          <select className="filter-select" value={estado} onChange={e=>setEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            {ESTADOS.map(e=><option key={e}>{e}</option>)}
          </select>
          <h4>Año de fabricación</h4>
          <div className="filter-row"><span style={{fontSize:".72rem",color:"#6a6055"}}>Desde</span><span className="range-val">{anioMin}</span></div>
          <input type="range" min="1950" max="2005" value={anioMin} onChange={e=>setAnioMin(+e.target.value)} style={{width:"100%",marginBottom:".5rem"}} />
          <div className="filter-row"><span style={{fontSize:".72rem",color:"#6a6055"}}>Hasta</span><span className="range-val">{anioMax}</span></div>
          <input type="range" min="1950" max="2005" value={anioMax} onChange={e=>setAnioMax(+e.target.value)} style={{width:"100%"}} />
          <h4>Precio máximo</h4>
          <div className="filter-row"><span style={{fontSize:".72rem",color:"#6a6055"}}>Hasta</span><span className="range-val">${precioMax.toLocaleString("es-AR")}</span></div>
          <input type="range" min="0" max="40000" step="500" value={precioMax} onChange={e=>setPrecioMax(+e.target.value)} style={{width:"100%"}} />
          <button className="clear-btn" onClick={limpiar}>Limpiar filtros</button>
          <button className="apply-btn-mobile" onClick={()=>setFiltrosAbiertos(false)}>Ver resultados</button>
        </aside>
        {filtrosAbiertos && <div className="sidebar-overlay" onClick={()=>setFiltrosAbiertos(false)}></div>}
        <div className="grid-area" id="grid-catalogo">
          <div className="results-bar">
            <button className="filters-toggle-mobile" onClick={()=>setFiltrosAbiertos(true)}>🔍 Filtros</button>
            <span className="results-count">{filtrados.length} productos encontrados</span>
            <select className="sort-select" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="dest">Destacados primero</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
              <option value="anio">Más antiguos primero</option>
            </select>
          </div>
          <div className="grid">
            {filtrados.map(p=><ProductCard key={p.CodigoProducto} p={p} onVer={setDetalle} onAgregar={agregar} favoritos={favoritos} toggleFav={toggleFav} />)}
            {filtrados.length===0 && <div className="empty-state" style={{gridColumn:"1/-1"}}><div className="es-icon">🔍</div><p>Sin resultados. Probá otros filtros.</p></div>}
          </div>
        </div>
      </div>
      <Modal p={detalle} onClose={()=>setDetalle(null)} onAgregar={agregar} favoritos={favoritos} toggleFav={toggleFav} />
    </div>
  );
}

function CarritoView({ carrito, setCarrito }) {
  const total = carrito.reduce((s,p)=>s+p.Precio,0);
  return (
    <div className="page">
      <div className="page-title">Carrito de compras</div>
      {carrito.length===0
        ? <div className="empty-state"><div className="es-icon">🛒</div><p>Tu carrito está vacío</p></div>
        : <>
            {carrito.map(p=>(
              <div key={p.CodigoProducto} className="cart-item">
                <div className="ci-emoji">{p.imagen}</div>
                <div className="ci-info">
                  <div className="ci-name">{p.nombreProducto}</div>
                  <div className="ci-sub">{p.Marca} · {p.AnioFabricacion} · {p.Estado}</div>
                </div>
                <div className="ci-price">${p.Precio.toLocaleString("es-AR")}</div>
                <button className="ci-rm" onClick={()=>setCarrito(prev=>prev.filter(x=>x.CodigoProducto!==p.CodigoProducto))}>✕</button>
              </div>
            ))}
            <div className="cart-total">Total: ${total.toLocaleString("es-AR")} ARS</div>
            <button className="checkout-btn" onClick={()=>alert("¡Gracias por tu compra en RetroVerse! 🕹️")}>Finalizar compra</button>
          </>
      }
    </div>
  );
}

function FavoritosView({ favoritos, productos, onAgregar, toggleFav }) {
  const favProds = productos.filter(p=>favoritos.includes(p.CodigoProducto));
  const notifs = favProds.filter(p=>p.Stock<=2).slice(0,2);
  return (
    <div className="page">
      <div className="page-title">Lista de favoritos</div>
      {favProds.length===0
        ? <div className="empty-state"><div className="es-icon">♡</div><p>Aún no guardaste ningún producto</p></div>
        : <>
            {notifs.length>0 && (
              <div style={{marginBottom:"1.2rem"}}>
                {notifs.map(p=>(
                  <div key={p.CodigoProducto} style={{background:"#1a1710",border:"1px solid #2a2518",borderRadius:"6px",padding:".7rem .9rem",marginBottom:".5rem",fontSize:".8rem",color:"#d4a843",display:"flex",alignItems:"center",gap:".5rem"}}>
                    🔔 <span>{p.Stock===1 ? `¡Última unidad de "${p.nombreProducto}"! Quedan pocas piezas disponibles.` : `"${p.nombreProducto}" tiene stock limitado (${p.Stock} unidades).`}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="fav-grid">
              {favProds.map(p=><ProductCard key={p.CodigoProducto} p={p} onVer={()=>{}} onAgregar={onAgregar} favoritos={favoritos} toggleFav={toggleFav} />)}
            </div>
          </>
      }
    </div>
  );
}

function HistorialView() {
  return (
    <div className="page">
      <div className="page-title">Historial de pedidos</div>
      {PEDIDOS.map(o=>(
        <div key={o.id} className="order-item">
          <div className="order-header">
            <span className="order-id">#{o.id}</span>
            <span className={`order-status ${o.estado==="Entregado"?"status-ok":"status-env"}`}>{o.estado}</span>
          </div>
          <div className="order-items">{o.items.join(", ")}</div>
          <div className="order-total">${o.total.toLocaleString("es-AR")} ARS · {o.fecha}</div>
        </div>
      ))}
    </div>
  );
}

function PerfilView() {
  return (
    <div className="page">
      <div className="page-title">Mi perfil</div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">CL</div>
          <div>
            <div className="profile-name">Coleccionista Local</div>
            <div className="profile-type">Coleccionista · Miembro desde 2023</div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-box"><div className="stat-val">12</div><div className="stat-lbl">Compras</div></div>
          <div className="stat-box"><div className="stat-val">4.9</div><div className="stat-lbl">Reputación</div></div>
          <div className="stat-box"><div className="stat-val">3</div><div className="stat-lbl">Ventas</div></div>
        </div>
      </div>
      <div className="profile-card">
        <h3 style={{fontFamily:"'Playfair Display',serif",color:"#d4a843",fontSize:"1rem",marginBottom:"1rem"}}>Valoraciones recibidas</h3>
        {REVIEWS.map((r,i)=>(
          <div key={i} className="review-item">
            <div className="review-top"><span className="review-user">{r.user}</span><span className="review-stars">{r.stars}</span></div>
            <div className="review-text">{r.texto}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PublicarView({ setProductos }) {
  const [form, setForm] = useState({ nombreProducto:"", Categoria:"consolas", Marca:"", AnioFabricacion:"", Estado:"Bueno", Precio:"", Stock:"1", descripcion:"" });
  const [ok, setOk] = useState(false);
  const ch = e => setForm(p=>({...p,[e.target.name]:e.target.value}));
  const submit = () => {
    if (!form.nombreProducto||!form.Precio) return alert("Completá nombre y precio");
    const nuevo = { ...form, CodigoProducto: Date.now(), Precio:parseFloat(form.Precio), Stock:parseInt(form.Stock), AnioFabricacion:parseInt(form.AnioFabricacion)||2000, Destacado:false, imagen:"📦", rating:0, certificado:false, vendedor:"Vos" };
    setProductos(prev=>[...prev,nuevo]);
    setOk(true); setTimeout(()=>setOk(false),3000);
    setForm({ nombreProducto:"", Categoria:"consolas", Marca:"", AnioFabricacion:"", Estado:"Bueno", Precio:"", Stock:"1", descripcion:"" });
  };
  return (
    <div className="page">
      <div className="page-title">Publicar artículo</div>
      {ok && <div className="notif" style={{position:"relative",bottom:"auto",right:"auto",display:"inline-block",marginBottom:"1rem"}}>✓ Publicación creada exitosamente</div>}
      <div className="pub-form">
        <h3>Datos del artículo</h3>
        <div className="field"><label>Nombre del artículo <span className="req">★</span></label><input name="nombreProducto" value={form.nombreProducto} onChange={ch} placeholder="Ej: Atari 2600 con joystick"/></div>
        <div className="field-row">
          <div className="field"><label>Categoría</label><select name="Categoria" value={form.Categoria} onChange={ch}>{CATEGORIAS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
          <div className="field"><label>Marca</label><input name="Marca" value={form.Marca} onChange={ch} placeholder="Atari, Nintendo..."/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Año de fabricación</label><input name="AnioFabricacion" type="number" value={form.AnioFabricacion} onChange={ch} placeholder="1985"/></div>
          <div className="field"><label>Estado</label><select name="Estado" value={form.Estado} onChange={ch}>{ESTADOS.map(e=><option key={e}>{e}</option>)}</select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Precio ARS <span className="req">★</span></label><input name="Precio" type="number" value={form.Precio} onChange={ch} placeholder="5000"/></div>
          <div className="field"><label>Stock disponible</label><input name="Stock" type="number" value={form.Stock} onChange={ch}/></div>
        </div>
        <div className="field"><label>Descripción detallada</label><textarea name="descripcion" value={form.descripcion} onChange={ch} rows={4} placeholder="Describí el estado, accesorios incluidos, historia del objeto..."/></div>
        <div className="field">
          <label>Fotografías</label>
          <div style={{background:"#0f0e0c",border:"1px dashed #2a2820",borderRadius:"4px",padding:"1.5rem",textAlign:"center",color:"#4a4035",fontSize:".82rem"}}>
            📷 Arrastrá imágenes aquí o hacé click para subir<br/><span style={{fontSize:".72rem"}}>(JPG, PNG — máx. 10MB por foto)</span>
          </div>
        </div>
        <button className="submit-btn" onClick={submit}>Publicar artículo</button>
      </div>
    </div>
  );
}

export default function App() {
  const [vista, setVista] = useState("tienda");
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState(PRODUCTOS_INIT);

  const toggleFav = id => setFavoritos(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const agregar = p => setCarrito(prev=>prev.find(x=>x.CodigoProducto===p.CodigoProducto)?prev:[...prev,p]);

  const nav = [
    {id:"tienda",label:"Tienda"},
    {id:"favoritos",label:`Favoritos (${favoritos.length})`},
    {id:"historial",label:"Mis pedidos"},
    {id:"publicar",label:"Publicar"},
    {id:"perfil",label:"Mi perfil"},
  ];

  return (
    <div className="app">
      <style>{styles}</style>
      <nav className="nav">
        <div className="logo" onClick={()=>setVista("tienda")}>Retro<span>Verse</span></div>
        <div className="nav-links">{nav.map(n=><button key={n.id} className={`nav-btn ${vista===n.id?"active":""}`} onClick={()=>setVista(n.id)}>{n.label}</button>)}</div>
        <div className="nav-right">
          <button className="cart-btn" onClick={()=>setVista("carrito")}>🛒 {carrito.length}</button>
        </div>
      </nav>
      {vista==="tienda" && <TiendaView productos={productos} carrito={carrito} setCarrito={setCarrito} favoritos={favoritos} toggleFav={toggleFav} />}
      {vista==="carrito" && <CarritoView carrito={carrito} setCarrito={setCarrito} />}
      {vista==="favoritos" && <FavoritosView favoritos={favoritos} productos={productos} onAgregar={agregar} toggleFav={toggleFav} />}
      {vista==="historial" && <HistorialView />}
      {vista==="perfil" && <PerfilView />}
      {vista==="publicar" && <PublicarView setProductos={setProductos} />}
      <footer className="footer">RetroVerse · e-Commerce de objetos vintage y coleccionables · Actividad Formativa N.º 2 · AED UTN FRRe 2026</footer>
    </div>
  );
}