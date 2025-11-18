import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  secondary: '#64748b',
  dark: '#1e293b',
  light: '#f8fafc',
  border: '#e2e8f0',
  lightGray: '#f5f7fa'
};

const Button = ({ children, variant = 'primary', size = 'md', onClick }) => (
  <button
    onClick={onClick}
    style={{
      cursor: 'pointer',
      border: 'none',
      fontFamily: 'inherit',
      fontWeight: 600,
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      backgroundColor: variant === 'primary' ? colors.primary : variant === 'outline' ? 'transparent' : colors.secondary,
      color: variant === 'outline' ? colors.primary : 'white',
      border: variant === 'outline' ? `2px solid ${colors.primary}` : 'none',
      padding: size === 'sm' ? '0.5rem 1rem' : size === 'md' ? '0.75rem 1.5rem' : '1rem 2rem',
      fontSize: size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.125rem'
    }}
    onMouseEnter={(e) => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
  >
    {children}
  </button>
);

const Header = ({ setPage }) => (
  <header style={{ backgroundColor: 'white', borderBottom: `1px solid ${colors.border}`, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
    <h1 onClick={() => setPage('home')} style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.dark, cursor: 'pointer' }}>🍽️ Gastronomy Haven</h1>
    <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <a onClick={() => setPage('home')} style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.secondary, cursor: 'pointer' }}>HOME</a>
      <a onClick={() => setPage('about')} style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.secondary, cursor: 'pointer' }}>About</a>
      <a onClick={() => setPage('contact')} style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.secondary, cursor: 'pointer' }}>Contact</a>
      <a onClick={() => setPage('menu')} style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.secondary, cursor: 'pointer' }}>Menu</a>
      <a onClick={() => setPage('reservations')} style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.secondary, cursor: 'pointer' }}>Reservations</a>
      <a onClick={() => setPage('promotions')} style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.secondary, cursor: 'pointer' }}>Promotions</a>
    </nav>
  </header>
);

const Footer = () => (
  <footer style={{ backgroundColor: colors.dark, color: 'white', padding: '3rem 2rem', marginTop: '3rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
      {[
        { title: 'Descubrir', links: ['Inicio', 'Menú', 'Promociones'] },
        { title: 'Nosotros', links: ['Historia', 'Testimonios', 'Contacto'] },
        { title: 'Legal', links: ['Privacidad', 'Términos'] }
      ].map(section => (
        <div key={section.title}>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>{section.title}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {section.links.map(link => <a key={link} href="#" style={{ opacity: 0.8, fontSize: '0.9rem' }}>{link}</a>)}
          </div>
        </div>
      ))}
    </div>
    <div style={{ borderTop: `1px solid rgba(255, 255, 255, 0.1)`, paddingTop: '2rem', textAlign: 'center', fontSize: '0.85rem', opacity: 0.8 }}>
      <p>© 2025 Gastronomy Haven. All rights reserved.</p>
    </div>
  </footer>
);

const HomePage = ({ setPage }) => (
  <>
    <section style={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '6rem 2rem',
      textAlign: 'center',
      color: 'white',
      minHeight: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Gastronomy Haven: Donde Cada Plato Cuenta una Historia</h2>
      <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', textShadow: '1px 1px 3px rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
        Sumérgete en un viaje culinario inigualable con nuestros exquisitos platos, ingredientes frescos y un ambiente que deleita los sentidos.
      </p>
    </section>

    <section style={{ padding: '2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: colors.dark }}>Nuestras Recomendaciones</h2>
        <p style={{ color: colors.secondary, fontSize: '0.95rem' }}>Descubre los platos estrella que han cautivado a nuestros comensales y se han convertido en los favoritos de la casa.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {[
          { title: 'Vieiras Salteadas', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', desc: 'Delicadas vieiras doradas a la perfección, servidas con una reducción de limón y mantequilla.' },
          { title: 'Filete Mignon', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80', desc: 'Un tierno corte de filete mignon, cocinado al punto y acompañado de espárragos frescos.' },
          { title: 'Selección de Sushi Fresco', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop', desc: 'Una exquisita variedad de sushi y sashimi, preparados con ingredientes más frescos del día.' }
        ].map(dish => (
          <div key={dish.title} style={{ backgroundColor: 'white', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <img src={dish.image} alt={dish.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: colors.dark }}>{dish.title}</h3>
              <p style={{ color: colors.secondary, fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>{dish.desc}</p>
              <button onClick={() => setPage('menu')} style={{ width: '100%', padding: '0.75rem', border: `2px solid ${colors.primary}`, backgroundColor: 'white', color: colors.primary, borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', fontSize: '0.9rem' }} onMouseEnter={(e) => { e.target.style.backgroundColor = colors.primary; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = colors.primary; }}>Ver Plato</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section style={{ padding: '2rem 2rem', backgroundColor: colors.lightGray, maxWidth: '100%', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: colors.dark }}>Promociones Exclusivas</h2>
          <p style={{ color: colors.secondary, fontSize: '0.95rem' }}>Aproveche nuestras ofertas especiales y convierta cada visita en una celebración con experiencias culinarias únicas.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Noche de Vinos', image: 'https://escuelaversailles.com/wp-content/uploads/tipos-de-vino.jpg', desc: 'Disfruta de un 20% de descuento en nuestra selección de vinos premium todos los martes.' },
            { title: 'Postre Gratis', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', desc: 'Recibe un postre de cortesía al la compra de dos platos principales, válido los fines de semana.' },
            { title: 'Almuerzo Ejecutivo', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', desc: 'Menú especial de almuerzo con dos platos y bebida por un precio fijo, de lunes a viernes.' }
          ].map(promo => (
            <div key={promo.title} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${promo.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0.75rem', padding: '2rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '280px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{promo.title}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>{promo.desc}</p>
              <button onClick={() => setPage('promotions')} style={{ padding: '0.75rem 1.5rem', backgroundColor: colors.primary, color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', alignSelf: 'flex-start', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.opacity = '0.9'; }} onMouseLeave={(e) => { e.target.style.opacity = '1'; }}>Reclamar Oferta</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const MenuPage = ({ setPage }) => {
  const [category, setCategory] = useState('Todos');
  const products = [
    { id: 1, title: 'Tabla de Quesos', price: '45.00', category: 'Entrada', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561a1b?w=400&h=300&fit=crop', desc: 'Selección premium de quesos' },
    { id: 2, title: 'Camarones con Tinto', price: '52.00', category: 'Entrada', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', desc: 'Camarones rehogados en salsa' },
    { id: 3, title: 'Salmón Gravlax', price: '48.00', category: 'Entrada', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', desc: 'Salmón curado con eneldo' },
    { id: 4, title: 'Jamón Serrano', price: '38.00', category: 'Entrada', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop', desc: 'Jamón ibérico molido' },
    { id: 5, title: 'Magret de Pato', price: '68.00', category: 'Platos Fuertes', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop', desc: 'Pechuga de pato chamuscada' },
    { id: 6, title: 'Tarta Chocolate', price: '22.00', category: 'Postres', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', desc: 'Chocolate 70% con ganache' },
    { id: 7, title: 'Crema Limoncillo', price: '18.00', category: 'Postres', image: 'https://images.unsplash.com/photo-1488477181946-c5e470ca4d0a?w=400&h=300&fit=crop', desc: 'Postre cremoso de limoncillo' },
    { id: 8, title: 'Agua Mineral', price: '8.00', category: 'Bebidas', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop', desc: 'Agua mineral premium' },
    { id: 9, title: 'Vino Blanco', price: '52.00', category: 'Bebidas', image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=400&h=300&fit=crop', desc: 'Vino blanco europeo' },
    { id: 10, title: 'Café Especialista', price: '6.50', category: 'Bebidas', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=300&fit=crop', desc: 'Café artesanal tostado' }
  ];
  const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);

  return (
    <>
      <section style={{ backgroundColor: colors.light, padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Nuestro Menú Exquisito</h2>
      </section>
      <section style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {['Todos', 'Entrada', 'Platos Fuertes', 'Postres', 'Bebidas'].map(cat => (
            <Button key={cat} variant={category === cat ? 'primary' : 'outline'} onClick={() => setCategory(cat)}>{cat}</Button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filtered.map(product => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }}>
              <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <span style={{ display: 'inline-block', backgroundColor: colors.primary, color: 'white', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '999px', marginBottom: '0.5rem' }}>{product.category}</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{product.title}</h3>
                <p style={{ color: colors.secondary, fontSize: '0.875rem', marginBottom: '1rem' }}>{product.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: colors.primary }}>${product.price}</span>
                  <Button variant="outline" size="sm">Ver más</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const ReservationsPage = () => (
  <>
    <section style={{ backgroundColor: colors.light, padding: '3rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>¡Haz tu Reserva!</h2>
    </section>
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Información</h3>
          <input type="text" placeholder="Nombre" style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
          <input type="email" placeholder="Email" style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
          <input type="tel" placeholder="Teléfono" style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
          <input type="date" style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1.5rem', fontFamily: 'inherit' }} />
          <a href="https://wa.me/573001234567?text=Hola%20Gastronomy%20Haven%20quiero%20reservar" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">💬 Confirmar por WhatsApp</Button>
          </a>
        </div>
        <div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Política</h3>
          {[
            { icon: '⏰', title: 'Tiempo', desc: 'Válidas 15 minutos después' },
            { icon: '✓', title: 'Grupos', desc: 'Tarjeta requerida para grupos' },
            { icon: '📞', title: 'Cancelación', desc: '24 horas anticipación' },
            { icon: '🔐', title: 'Vestimenta', desc: 'Casual elegante' }
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
              <div><h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h4><p style={{ color: colors.secondary, fontSize: '0.9rem' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const PromotionsPage = () => (
  <>
    <section style={{ backgroundColor: '#e0e7ff', padding: '3rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Ofertas Especiales</h2>
    </section>
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Promociones Actuales</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {[
          { icon: '🍸', title: 'Happy Hour', desc: 'Descuentos especiales 5-7 PM' },
          { icon: '✨', title: '2+1 Entradas', desc: 'Compra 2 lleva 1 gratis' },
          { icon: '🎉', title: 'Menú Degustación', desc: '5 platos especiales del chef' },
          { icon: '🥗', title: 'Miércoles 30%', desc: 'Descuento en platos principales' }
        ].map(promo => (
          <div key={promo.title} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{promo.icon}</div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{promo.title}</h4>
            <p style={{ color: colors.secondary, marginBottom: '1rem' }}>{promo.desc}</p>
            <Button variant="primary" size="sm">Reservar</Button>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Próximas Ofertas</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {[
          { icon: '👨‍🍳', title: 'Noche de Tapas', desc: 'Tapas españolas auténticas' },
          { icon: '🍽️', title: 'Brunch Domingo', desc: 'Desayuno internacional' },
          { icon: '👨‍⚕️', title: 'Semana del Chef', desc: 'Menú exclusivo especial' }
        ].map(offer => (
          <div key={offer.title} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{offer.icon}</div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{offer.title}</h4>
            <p style={{ color: colors.secondary }}>{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

const AboutPage = () => (
  <>
    <section style={{ backgroundColor: colors.light, padding: '3rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Acerca de Nosotros</h2>
    </section>
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Nuestra Historia</h3>
          <p style={{ color: colors.secondary, lineHeight: 1.8, marginBottom: '1rem' }}>Gastronomy Haven nace en 2018 con la visión de crear un espacio donde la gastronomía se convierte en una experiencia memorable.</p>
          <p style={{ color: colors.secondary, lineHeight: 1.8 }}>Cada plato es preparado con ingredientes frescos y de la más alta calidad, seleccionados cuidadosamente.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Nuestra Misión</h3>
          <p style={{ color: colors.secondary, lineHeight: 1.8, marginBottom: '1rem' }}>Proporcionar una experiencia gastronómica excepcional que delite los sentidos.</p>
          <p style={{ color: colors.secondary, lineHeight: 1.8 }}>Creemos que la comida es arte, cultura y conexión.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Nuestros Valores</h3>
          <ul style={{ color: colors.secondary, lineHeight: 1.8 }}>
            <li>✓ Excelencia en detalles</li>
            <li>✓ Ingredientes premium</li>
            <li>✓ Atención personalizada</li>
            <li>✓ Innovación</li>
            <li>✓ Responsabilidad social</li>
          </ul>
        </div>
      </div>
      <div style={{ backgroundColor: colors.lightGray, padding: '3rem 2rem', borderRadius: '0.75rem' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Nuestro Equipo</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '👨‍🍳', title: 'Chef Principal', desc: '20 años experiencia' },
            { icon: '👩‍🍳', title: 'Sous Chef', desc: 'Experta en repostería' },
            { icon: '🍷', title: 'Sommelier', desc: 'Maridaje de vinos' }
          ].map(member => (
            <div key={member.title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{member.icon}</div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{member.title}</h4>
              <p style={{ color: colors.secondary, fontSize: '0.9rem' }}>{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <>
      <section style={{ backgroundColor: colors.light, padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Contacto</h2>
      </section>
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Información de Contacto</h3>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <Phone size={24} color={colors.primary} />
                <div><h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Teléfono</h4><p style={{ color: colors.secondary }}>+57 300 123 4567</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <Mail size={24} color={colors.primary} />
                <div><h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Email</h4><p style={{ color: colors.secondary }}>info@gastronomyhaven.com</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin size={24} color={colors.primary} />
                <div><h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Ubicación</h4><p style={{ color: colors.secondary }}>Calle Principal 123, Tunja, Boyacá</p></div>
              </div>
            </div>
            <div style={{ backgroundColor: colors.lightGray, padding: '1.5rem', borderRadius: '0.75rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Horarios</h4>
              <p style={{ color: colors.secondary, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Lunes-Viernes: 12:00 PM - 11:00 PM</p>
              <p style={{ color: colors.secondary, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sábado: 12:00 PM - 12:00 AM</p>
              <p style={{ color: colors.secondary, fontSize: '0.9rem' }}>Domingo: 12:00 PM - 10:00 PM</p>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Envía un Mensaje</h3>
            <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
            <textarea placeholder="Mensaje" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows="5" style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.border}`, borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'inherit', resize: 'vertical' }} />
            <Button variant="primary" size="lg" onClick={() => alert('¡Mensaje enviado! Pronto nos contactaremos.')}>Enviar Mensaje</Button>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  const [page, setPage] = useState('home');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
        img { max-width: 100%; height: auto; display: block; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      <Header setPage={setPage} />

      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'menu' && <MenuPage setPage={setPage} />}
      {page === 'reservations' && <ReservationsPage />}
      {page === 'promotions' && <PromotionsPage />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}

      <Footer />
    </div>
  );
}

export default App;