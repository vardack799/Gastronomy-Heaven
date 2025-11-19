import React, { useState } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';




const Button = ({ children, variant = 'primary', size = 'md', onClick }) => {
  const className = `c-btn c-btn--${variant} c-btn--${size}`;
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

const Header = ({ setPage }) => (
  <header className="c-header">
    <h1 onClick={() => setPage('home')} className="c-header__logo">
      🍽️ Gastronomy Haven
    </h1>
    <nav className="c-header__nav">
      <a onClick={() => setPage('home')} className="c-header__nav-link">HOME</a>
      <a onClick={() => setPage('about')} className="c-header__nav-link">About</a>
      <a onClick={() => setPage('contact')} className="c-header__nav-link">Contact</a>
      <a onClick={() => setPage('menu')} className="c-header__nav-link">Menu</a>
      <a onClick={() => setPage('reservations')} className="c-header__nav-link">Reservations</a>
      <a onClick={() => setPage('promotions')} className="c-header__nav-link">Promotions</a>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="c-footer">
    <div className="c-footer__content">
      {[
        { title: 'Descubrir', links: ['Inicio', 'Menú', 'Promociones'] },
        { title: 'Nosotros', links: ['Historia', 'Testimonios', 'Contacto'] },
        { title: 'Legal', links: ['Privacidad', 'Términos'] }
      ].map(section => (
        <div key={section.title}>
          <h4 className="c-footer__section-title">{section.title}</h4>
          <div className="c-footer__links">
            {section.links.map(link => (
              <a key={link} href="#" className="c-footer__link">{link}</a>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="c-footer__bottom">
      <p>© 2025 Gastronomy Haven. All rights reserved.</p>
    </div>
  </footer>
);

const HomePage = ({ setPage }) => (
  <>
    <section 
      className="c-hero" 
      style={{backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80)'}}
    >
      <div className="c-hero__content">
        <h2 className="c-hero__title">Gastronomy Haven: Donde Cada Plato Cuenta una Historia</h2>
        <p className="c-hero__description">
          Sumérgete en un viaje culinario inigualable con nuestros exquisitos platos, ingredientes frescos y un ambiente que deleita los sentidos.
        </p>
      </div>
    </section>

    <section className="u-p-xl">
      <div className="o-container">
        <div className="u-text-center u-mb-3xl">
          <h2 className="u-mb-sm">Nuestras Recomendaciones</h2>
          <p className="u-color-secondary">Descubre los platos estrella que han cautivado a nuestros comensales y se han convertido en los favoritos de la casa.</p>
        </div>
        <div className="o-grid o-grid--3col u-mb-3xl">
          {[
            { title: 'Vieiras Salteadas', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', desc: 'Delicadas vieiras doradas a la perfección, servidas con una reducción de limón y mantequilla.' },
            { title: 'Filete Mignon', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80', desc: 'Un tierno corte de filete mignon, cocinado al punto y acompañado de espárragos frescos.' },
            { title: 'Selección de Sushi Fresco', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop', desc: 'Una exquisita variedad de sushi y sashimi, preparados con ingredientes más frescos del día.' }
          ].map(dish => (
            <div key={dish.title} className="c-card">
              <img src={dish.image} alt={dish.title} className="c-card__image" />
              <div className="c-card__body">
                <h3 className="c-card__title">{dish.title}</h3>
                <p className="c-card__description">{dish.desc}</p>
                <Button variant="outline" size="sm" onClick={() => setPage('menu')}>Ver Plato</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="u-p-xl u-bg-light-gray">
      <div className="o-container">
        <div className="u-text-center u-mb-3xl">
          <h2 className="u-mb-sm">Promociones Exclusivas</h2>
          <p className="u-color-secondary">Aproveche nuestras ofertas especiales y convierta cada visita en una celebración con experiencias culinarias únicas.</p>
        </div>
        <div className="o-grid o-grid--3col">
          {[
            { title: 'Noche de Vinos', image: 'https://escuelaversailles.com/wp-content/uploads/tipos-de-vino.jpg', desc: 'Disfruta de un 20% de descuento en nuestra selección de vinos premium todos los martes.' },
            { title: 'Postre Gratis', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', desc: 'Recibe un postre de cortesía al la compra de dos platos principales, válido los fines de semana.' },
            { title: 'Almuerzo Ejecutivo', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', desc: 'Menú especial de almuerzo con dos platos y bebida por un precio fijo, de lunes a viernes.' }
          ].map(promo => (
            <div key={promo.title} className="c-promo-card" style={{backgroundImage: `url(${promo.image})`}}>
              <div className="c-promo-card__content">
                <h3 className="c-promo-card__title">{promo.title}</h3>
                <p className="c-promo-card__description">{promo.desc}</p>
                <Button variant="primary" size="sm" onClick={() => setPage('promotions')}>Reclamar Oferta</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const MenuPage = ({ setPage, setSelectedProduct }) => {
  const [category, setCategory] = useState('Todos');
  const products = [
   { id: 1, title: 'Tabla de Quesos', price: '45.00', category: 'Entrada', image: 'https://www.ellitoral.com/images/2025/07/29/RxLK8cnIp_1300x655__1.jpg', desc: 'Una cuidada selección de quesos nacionales e importados, acompañados de frutos secos,mermeladas y pan de masa madre.' },
    { id: 2, title: 'Carpaccio de Res con Trufa', price: '52.00', category: 'Entrada', image: 'https://torontoforyou.com/wp-content/uploads/2024/06/halal-restaurant-1-1024x768.jpg', desc: 'Finas láminas de solomillo de res, aderezadas con aceite de trufa blanca, rúcula y lascas de parmesano.' },
    { id: 3, title: 'Salmón Glaseado con Miso', price: '48.00', category: 'Entrada', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=700&q=80', desc: 'Filete de salmón fresco glaseado con salsa de miso dulce, servido sobre una cama de arroz salvaje y espárragos verdes.' },
    { id: 4, title: 'Risotto de Setas Silvestres', price: '38.00', category: 'Entrada', image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/ae3985103873365.5f56cbf1263f3.jpg', desc: 'Cremoso risotto arborio con una mezcla de setas silvestres de temporada, queso pecorino y un toque de perejil fresco.' },
    { id: 5, title: 'Magret de Pato con Frutos Rojos', price: '68.00', category: 'Platos Fuertes', image: 'https://i.pinimg.com/736x/c3/23/11/c323113ea2c9df5dee953cd30c09322e.jpg', desc: 'Pechuga de pato sellada a la perfección, acompañada de una reducción de frutos rojos y puré de boniato.' },
    { id: 6, title: 'Tarta Chocolate', price: '22.00', category: 'Postres', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', desc: 'Intensa tarta de chocolate amargo con un centro suave, acompañada de helado de vainilla casero y un coulis de frambuesa.' },
    { id: 7, title: 'Crema Limoncillo', price: '18.00', category: 'Postres', image: 'https://okdiario.com/img/2020/01/22/crema-de-limon-facil-de-preparar.jpg', desc: 'Clásico postre cremoso de limoncillo' },
    { id: 8, title: 'Agua Mineral', price: '8.00', category: 'Bebidas', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop', desc: 'Botella de agua mineral de manantial VOSS, disponible con o sin gas.' },
    { id: 9, title: 'Selección de Vinos de la Casa', price: '52.00', category: 'Bebidas', image: 'https://img.archiexpo.es/images_ae/photo-mg/126391-16499328.jpg', desc: 'Consulta a nuestro sommelier para una recomendación de nuestra selección de vinos tintos, blancos y rosados.' },
    { id: 10, title: 'Café Especialista', price: '6.50', category: 'Bebidas', image: 'https://fotografias.lasexta.com/clipping/cmsimages01/2021/11/23/9C11CA0B-A7E7-4BCD-9D47-E12D7ACA3F7E/103.jpg?crop=1000,750,x153,y0&width=1200&height=900&optimize=low&format=webply', desc: 'Disfruta de nuestra selección de cafés de origen único, preparados por los mejores baristas.' }
  ];
  const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);

  return (
    <>
      <section className="u-bg-light u-p-2xl u-text-center">
        <h2>Nuestro Menú Exquisito</h2>
      </section>
      <section className="u-p-3xl">
        <div className="o-container">
          <div className="o-flex o-flex--center o-flex--gap-md o-flex--wrap u-mb-3xl">
            {['Todos', 'Entrada', 'Platos Fuertes', 'Postres', 'Bebidas'].map(cat => (
              <Button key={cat} variant={category === cat ? 'primary' : 'outline'} onClick={() => setCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="o-grid o-grid--4col">
            {filtered.map(product => (
              <div key={product.id} className="c-card">
                <img src={product.image} alt={product.title} className="c-card__image" />
                <div className="c-card__body">
                  <span className="c-card__badge">{product.category}</span>
                  <h3 className="c-card__title">{product.title}</h3>
                  <p className="c-card__description">{product.desc}</p>
                  <div className="c-card__footer">
                    <span className="c-card__price">${product.price}</span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)} >Ver más</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ReservationsPage = () => (
  <>
    <section className="u-bg-light u-p-2xl u-text-center">
      <h2>¡Haz tu Reserva!</h2>
    </section>
    <section className="u-p-4xl">
      <div className="o-container">
        <div className="o-grid o-grid--2col">
          <div>
            <h3 className="u-mb-xl">Información</h3>
            <input type="text" placeholder="Nombre" className="c-form__input" />
            <input type="email" placeholder="Email" className="c-form__input" />
            <input type="tel" placeholder="Teléfono" className="c-form__input" />
            <input type="date" className="c-form__input" />
            <a href="https://wa.me/573001234567?text=Hola%20Gastronomy%20Haven%20quiero%20reservar" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">💬 Confirmar por WhatsApp</Button>
            </a>
          </div>
          <div>
            <h3 className="u-mb-xl">Política</h3>
            {[
              { icon: '⏰', title: 'Tiempo', desc: 'Válidas 15 minutos después' },
              { icon: '✔', title: 'Grupos', desc: 'Tarjeta requerida para grupos' },
              { icon: '📞', title: 'Cancelación', desc: '24 horas anticipación' },
              { icon: '👔', title: 'Vestimenta', desc: 'Casual elegante' }
            ].map(item => (
              <div key={item.title} className="c-policy-item">
                <div className="c-policy-item__icon">{item.icon}</div>
                <div>
                  <h4 className="c-policy-item__title">{item.title}</h4>
                  <p className="c-policy-item__text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

const PromotionsPage = () => (
  <>
    <section className="u-p-2xl u-text-center" style={{backgroundColor: '#e0e7ff'}}>
      <h2>Ofertas Especiales</h2>
    </section>
    <section className="u-p-4xl">
      <div className="o-container">
        <h3 className="u-text-center u-mb-xl">Promociones Actuales</h3>
        <div className="o-grid o-grid--3col u-mb-4xl">
          {[
            { icon: '🍸', title: 'Happy Hour', desc: 'Descuentos especiales 5-7 PM' },
            { icon: '✨', title: '2+1 Entradas', desc: 'Compra 2 lleva 1 gratis' },
            { icon: '🎉', title: 'Menú Degustación', desc: '5 platos especiales del chef' },
            { icon: '🥗', title: 'Miércoles 30%', desc: 'Descuento en platos principales' }
          ].map(promo => (
            <div key={promo.title} className="c-feature">
              <div className="c-feature__icon">{promo.icon}</div>
              <h4 className="c-feature__title">{promo.title}</h4>
              <p className="c-feature__description">{promo.desc}</p>
              <Button variant="primary" size="sm">Reservar</Button>
            </div>
          ))}
        </div>
        <h3 className="u-text-center u-mb-xl">Próximas Ofertas</h3>
        <div className="o-grid o-grid--3col">
          {[
            { icon: '👨‍🍳', title: 'Noche de Tapas', desc: 'Tapas españolas auténticas' },
            { icon: '🍽️', title: 'Brunch Domingo', desc: 'Desayuno internacional' },
            { icon: '👨‍🍳', title: 'Semana del Chef', desc: 'Menú exclusivo especial' }
          ].map(offer => (
            <div key={offer.title} className="c-feature">
              <div className="c-feature__icon">{offer.icon}</div>
              <h4 className="c-feature__title">{offer.title}</h4>
              <p className="c-feature__description">{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const AboutPage = () => (
  <>
    <section className="u-bg-light u-p-2xl u-text-center">
      <h2>Acerca de Nosotros</h2>
    </section>
    <section className="u-p-4xl">
      <div className="o-container">
        <div className="o-grid o-grid--3col u-mb-4xl">
          <div>
            <h3 className="u-mb-md">Nuestra Historia</h3>
            <p className="u-color-secondary u-mb-md">Gastronomy Haven nace en 2018 con la visión de crear un espacio donde la gastronomía se convierte en una experiencia memorable.</p>
            <p className="u-color-secondary">Cada plato es preparado con ingredientes frescos y de la más alta calidad, seleccionados cuidadosamente.</p>
          </div>
          <div>
            <h3 className="u-mb-md">Nuestra Misión</h3>
            <p className="u-color-secondary u-mb-md">Proporcionar una experiencia gastronómica excepcional que delite los sentidos.</p>
            <p className="u-color-secondary">Creemos que la comida es arte, cultura y conexión.</p>
          </div>
          <div>
            <h3 className="u-mb-md">Nuestros Valores</h3>
            <ul className="u-color-secondary">
              <li>✓ Excelencia en detalles</li>
              <li>✓ Ingredientes premium</li>
              <li>✓ Atención personalizada</li>
              <li>✓ Innovación</li>
              <li>✓ Responsabilidad social</li>
            </ul>
          </div>
        </div>
        <div className="u-bg-light-gray u-p-3xl" style={{borderRadius: 'var(--border-radius-md)'}}>
          <h3 className="u-text-center u-mb-xl">Nuestro Equipo</h3>
          <div className="o-grid o-grid--3col">
            {[
              { icon: '👨‍🍳', title: 'Chef Principal', desc: '20 años experiencia' },
              { icon: '👩‍🍳', title: 'Sous Chef', desc: 'Experta en repostería' },
              { icon: '🍷', title: 'Sommelier', desc: 'Maridaje de vinos' }
            ].map(member => (
              <div key={member.title} className="u-text-center">
                <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>{member.icon}</div>
                <h4 className="u-font-semibold u-mb-sm">{member.title}</h4>
                <p className="u-color-secondary" style={{fontSize: '0.9rem'}}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <>
      <section className="u-bg-light u-p-2xl u-text-center">
        <h2>Contacto</h2>
      </section>
      <section className="u-p-4xl">
        <div className="o-container">
          <div className="o-grid o-grid--2col">
            <div>
              <h3 className="u-mb-xl">Información de Contacto</h3>
              <div className="u-mb-xl">
                <div className="c-info-box">
                  <div className="c-info-box__icon">
                    <Phone size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="c-info-box__title">Teléfono</h4>
                    <p className="c-info-box__text">+57 300 123 4567</p>
                  </div>
                </div>
                <div className="c-info-box">
                  <div className="c-info-box__icon">
                    <Mail size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="c-info-box__title">Email</h4>
                    <p className="c-info-box__text">info@gastronomyhaven.com</p>
                  </div>
                </div>
                <div className="c-info-box">
                  <div className="c-info-box__icon">
                    <MapPin size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="c-info-box__title">Ubicación</h4>
                    <p className="c-info-box__text">Calle Principal 123, Tunja, Boyacá</p>
                  </div>
                </div>
              </div>
              <div className="u-bg-light-gray u-p-lg" style={{borderRadius: 'var(--border-radius-md)'}}>
                <h4 className="u-font-semibold u-mb-md">Horarios</h4>
                <p className="u-color-secondary u-mb-sm" style={{fontSize: '0.9rem'}}>Lunes-Viernes: 12:00 PM - 11:00 PM</p>
                <p className="u-color-secondary u-mb-sm" style={{fontSize: '0.9rem'}}>Sábado: 12:00 PM - 12:00 AM</p>
                <p className="u-color-secondary" style={{fontSize: '0.9rem'}}>Domingo: 12:00 PM - 10:00 PM</p>
              </div>
            </div>
            <div>
              <h3 className="u-mb-xl">Envía un Mensaje</h3>
              <input 
                type="text" 
                placeholder="Nombre" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
                className="c-form__input" 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} 
                className="c-form__input" 
              />
              <textarea 
                placeholder="Mensaje" 
                value={form.message} 
                onChange={(e) => setForm({...form, message: e.target.value})} 
                className="c-form__textarea"
              />
              <Button variant="primary" size="lg" onClick={() => alert('¡Mensaje enviado! Pronto nos contactaremos.')}>
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <X size={24} />
        </button>
        
        <img 
          src={product.image} 
          alt={product.title} 
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        />
        
        <span className="c-card__badge">{product.category}</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0.5rem 0' }}>
          {product.title}
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: '700', marginBottom: '1rem' }}>
          ${product.price}
        </p>
        
        <p style={{ color: 'var(--color-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
          {product.desc}
        </p>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
            Información Adicional
          </h3>
          <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem' }}>
            Este delicioso plato es preparado con los ingredientes más frescos y de la más alta calidad.
            Perfecto para compartir con amigos y familia.
          </p>
        </div>
        
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onClose}
          style={{ marginTop: '1.5rem', width: '100%' }}
        >
          Añadir al Pedido
        </Button>
      </div>
    </div>
  );
};


function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div style={{ minHeight: '100vh' }}>
  

      <Header setPage={setPage} />

      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'menu' && <MenuPage setPage={setPage}
        setSelectedProduct={setSelectedProduct}
      />}
      {page === 'reservations' && <ReservationsPage />}
      {page === 'promotions' && <PromotionsPage />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}

      <Footer />
      {}
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

    </div>
  );
}

export default App;
