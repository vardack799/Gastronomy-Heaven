import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';
// API Base URL
const API_BASE_URL = 'https://gastronomy-back.vercel.app/api';
//http://localhost:3001/api


const Button = ({ children, variant = 'primary', size = 'md', onClick }) => {
  const className = `c-btn c-btn--${variant} c-btn--${size}`;
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

const Header = ({ setPage, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (page) => {
    setPage(page);
    setIsMobileMenuOpen(false); // Cerrar menú al navegar
  };

  return (
    <header className="c-header">
      <h1 onClick={() => handleNavClick('home')} className="c-header__logo">
        🍽️ Gastronomy Heaven
      </h1>
      
      {/* Desktop Navigation */}
      <nav className="c-header__nav c-header__nav--desktop">
        <a onClick={() => handleNavClick('home')} className={`c-header__nav-link ${currentPage === 'home' ? 'c-header__nav-link--active' : ''}`}>HOME</a>
        <a onClick={() => handleNavClick('about')} className={`c-header__nav-link ${currentPage === 'about' ? 'c-header__nav-link--active' : ''}`}>About</a>
        <a onClick={() => handleNavClick('contact')} className={`c-header__nav-link ${currentPage === 'contact' ? 'c-header__nav-link--active' : ''}`}>Contact</a>
        <a onClick={() => handleNavClick('menu')} className={`c-header__nav-link ${currentPage === 'menu' ? 'c-header__nav-link--active' : ''}`}>Menu</a>
        <a onClick={() => handleNavClick('reservations')} className={`c-header__nav-link ${currentPage === 'reservations' ? 'c-header__nav-link--active' : ''}`}>Reservations</a>
        <a onClick={() => handleNavClick('promotions')} className={`c-header__nav-link ${currentPage === 'promotions' ? 'c-header__nav-link--active' : ''}`}>Promotions</a>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="c-header__mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className={`c-hamburger ${isMobileMenuOpen ? 'c-hamburger--active' : ''}`}>
          <span className="c-hamburger__line"></span>
          <span className="c-hamburger__line"></span>
          <span className="c-hamburger__line"></span>
        </span>
      </button>

      {/* Mobile Navigation */}
      <nav className={`c-header__nav c-header__nav--mobile ${isMobileMenuOpen ? 'c-header__nav--mobile-open' : ''}`}>
        <a onClick={() => handleNavClick('home')} className={`c-header__nav-link ${currentPage === 'home' ? 'c-header__nav-link--active' : ''}`}>HOME</a>
        <a onClick={() => handleNavClick('about')} className={`c-header__nav-link ${currentPage === 'about' ? 'c-header__nav-link--active' : ''}`}>About</a>
        <a onClick={() => handleNavClick('contact')} className={`c-header__nav-link ${currentPage === 'contact' ? 'c-header__nav-link--active' : ''}`}>Contact</a>
        <a onClick={() => handleNavClick('menu')} className={`c-header__nav-link ${currentPage === 'menu' ? 'c-header__nav-link--active' : ''}`}>Menu</a>
        <a onClick={() => handleNavClick('reservations')} className={`c-header__nav-link ${currentPage === 'reservations' ? 'c-header__nav-link--active' : ''}`}>Reservations</a>
        <a onClick={() => handleNavClick('promotions')} className={`c-header__nav-link ${currentPage === 'promotions' ? 'c-header__nav-link--active' : ''}`}>Promotions</a>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="c-header__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="c-footer">
    <div className="c-footer__content">
      {[
        { title: 'Explora', links: ['Nuestros Servicios', 'Menú', 'Promociones', 'Reservas'] },
        { title: 'Contacto', links: ['Contáctanos', 'Ubicación', 'Horarios'] },
        { title: 'Legal', links: ['Política de Privacidad', 'Términos de Servicio'] }
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
      <p>© 2025 Gastronomy Heaven. All rights reserved.</p>
    </div>
  </footer>
);

const HomePage = ({ setPage, categoryClicks, setSelectedProduct, onProductClick }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos destacados basados en preferencias del usuario
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          
          // Determinar la categoría activa (con 2 o más clicks)
          const activeCategory = getActiveCategory(categoryClicks);
          
          let recommendedProducts;
          
          if (activeCategory) {
            // Filtrar productos de la categoría activa
            const categoryProducts = data.data.filter(product => product.category === activeCategory);
            
            if (categoryProducts.length >= 3) {
              // Si hay suficientes productos en la categoría, tomar los 3 con mejor calificación
              recommendedProducts = categoryProducts
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3);
            } else {
                // Si no hay suficientes, completar con productos de otras categorías
                const otherProducts = data.data
                  .filter(product => product.category !== activeCategory)
                  .sort((a, b) => b.rating - a.rating);
              
              recommendedProducts = [...categoryProducts, ...otherProducts].slice(0, 3);
            }
          } else {
            // Si no hay clicks previos, mostrar los mejor calificados
            recommendedProducts = data.data
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3);
          }
          
          const transformedProducts = recommendedProducts.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            category: product.category,
            price: product.price,
            // Mantener todos los datos para el modal
            fullProduct: {
              id: product.id,
              title: product.name,
              price: product.price.toFixed(2),
              category: product.category,
              image: product.image,
              desc: product.description,
              ingredients: product.ingredients,
              allergens: product.allergens,
              rating: product.rating,
              reviews: product.reviews,
              preparationTime: product.preparationTime,
              difficulty: product.difficulty,
              spicyLevel: product.spicyLevel,
              available: product.available
            }
          }));
          
          setFeaturedProducts(transformedProducts);
        } else {
          throw new Error('API no disponible');
        }
      } catch (error) {
        console.error('Error loading featured products:', error);
        // Fallback con productos de ejemplo
        setFeaturedProducts([
          { 
            id: 1, 
            name: 'Vieiras Salteadas', 
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', 
            description: 'Delicadas vieiras doradas a la perfección, servidas con una reducción de limón y mantequilla.',
            category: 'Platos Fuertes',
            price: 25.00,
            fullProduct: {
              id: 1,
              title: 'Vieiras Salteadas',
              price: '25.00',
              category: 'Platos Fuertes',
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
              desc: 'Delicadas vieiras doradas a la perfección, servidas con una reducción de limón y mantequilla.'
            }
          },
          { 
            id: 2, 
            name: 'Filete Mignon', 
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80', 
            description: 'Un tierno corte de filete mignon, cocinado al punto y acompañado de espárragos frescos.',
            category: 'Platos Fuertes',
            price: 32.00,
            fullProduct: {
              id: 2,
              title: 'Filete Mignon',
              price: '32.00',
              category: 'Platos Fuertes',
              image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80',
              desc: 'Un tierno corte de filete mignon, cocinado al punto y acompañado de espárragos frescos.'
            }
          },
          { 
            id: 3, 
            name: 'Selección de Sushi Fresco', 
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop', 
            description: 'Una exquisita variedad de sushi y sashimi, preparados con ingredientes más frescos del día.',
            category: 'Platos Fuertes',
            price: 28.00,
            fullProduct: {
              id: 3,
              title: 'Selección de Sushi Fresco',
              price: '28.00',
              category: 'Platos Fuertes',
              image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
              desc: 'Una exquisita variedad de sushi y sashimi, preparados con ingredientes más frescos del día.'
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [categoryClicks]);

  // Función para determinar la categoría activa (con 2 o más clicks)
  const getActiveCategory = (clicks) => {
    if (!clicks || Object.keys(clicks).length === 0) return null;
    
    // Buscar la categoría que tenga 2 o más clicks
    const activeCategory = Object.entries(clicks).find(([category, count]) => count >= 2);
    
    return activeCategory ? activeCategory[0] : null;
  };

  return (
    <>
    <section 
      className="c-hero c-hero--with-bg u-bg-hero" 
    >
        <div className="c-hero__content">
          <h2 className="c-hero__title">Gastronomy Heaven: Donde Cada Plato Cuenta una Historia</h2>
          <p className="c-hero__description">
            Sumérgete en un viaje culinario inigualable con nuestros exquisitos platos, ingredientes frescos y un ambiente que deleita los sentidos.
          </p>
        </div>
      </section>

      <section className="u-p-xl">
        <div className="o-container">
        <div className="u-text-center u-mb-3xl">
          <h2 className="u-mb-sm">Nuestras Recomendaciones</h2>
          <p className="u-color-secondary">
            {getActiveCategory(categoryClicks) 
              ? `Basado en tus preferencias, te recomendamos estos platos de ${getActiveCategory(categoryClicks)}.`
              : 'Descubre los platos estrella que han cautivado a nuestros comensales y se han convertido en los favoritos de la casa.'
            }
          </p>
        </div>
          <div className="o-grid o-grid--3col u-mb-3xl">
            {loading ? (
              <div className="u-text-center u-p-xl u-grid-full-width">
                <p>Cargando recomendaciones...</p>
              </div>
            ) : (
              featuredProducts.map((dish, index) => (
                <div key={dish.id || index} className="c-card">
                  <img src={dish.image} alt={dish.name} className="c-card__image" />
                  <div className="c-card__body">
                    <h3 className="c-card__title">{dish.name}</h3>
                    <p className="c-card__description">{dish.description}</p>
                    <Button variant="outline" size="sm" onClick={() => {
                      onProductClick(dish.category);
                      setSelectedProduct(dish.fullProduct);
                    }}>Ver Plato</Button>
                  </div>
                </div>
              ))
            )}
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
};

const MenuPage = ({ setPage, setSelectedProduct, onProductClick }) => {
  const [category, setCategory] = useState('Todos');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  // Cargar productos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener productos
        const productsResponse = await fetch(`${API_BASE_URL}/products`);
        if (!productsResponse.ok) {
          throw new Error('Error al cargar productos');
        }
        const productsData = await productsResponse.json();
        
        // Obtener categorías
        const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
        if (!categoriesResponse.ok) {
          throw new Error('Error al cargar categorías');
        }
        const categoriesData = await categoriesResponse.json();
        
        // Transformar datos para compatibilidad con el componente existente
        const transformedProducts = productsData.data.map(product => ({
          id: product.id,
          title: product.name,
          price: product.price.toFixed(2),
          category: product.category,
          image: product.image,
          desc: product.description,
          // Datos adicionales de la API
          ingredients: product.ingredients,
          allergens: product.allergens,
          rating: product.rating,
          reviews: product.reviews,
          preparationTime: product.preparationTime,
          difficulty: product.difficulty,
          spicyLevel: product.spicyLevel,
          available: product.available
        }));
        
        setProducts(transformedProducts);
        setCategories(['Todos', ...categoriesData.data.map(cat => cat.name)]);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        // Fallback: usar datos de ejemplo si la API no está disponible
        setProducts([
          { id: 1, title: 'Producto de ejemplo', price: '0.00', category: 'Ejemplo', image: 'https://via.placeholder.com/400x300', desc: 'La API no está disponible. Inicia el servidor backend.' }
        ]);
        setCategories(['Todos', 'Ejemplo']);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar productos por categoría
  const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);

  // Mostrar estado de carga
  if (loading) {
    return (
      <>
        <section className="u-bg-light u-p-2xl u-text-center">
          <h2>Nuestro Menú Exquisito</h2>
        </section>
        <section className="u-p-3xl">
          <div className="o-container u-text-center">
            <div className="u-p-3xl">
              <h3>Cargando productos...</h3>
              <p>Por favor espera mientras cargamos nuestro delicioso menú.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Mostrar estado de error
  if (error) {
    return (
      <>
        <section className="u-bg-light u-p-2xl u-text-center">
          <h2>Nuestro Menú Exquisito</h2>
        </section>
        <section className="u-p-3xl">
          <div className="o-container u-text-center">
            <div className="u-p-3xl">
              <h3>⚠️ Error al cargar el menú</h3>
              <p>{error}</p>
              <p>Asegúrate de que el servidor backend esté ejecutándose en http://localhost:3001</p>
              <Button onClick={() => window.location.reload()}>Reintentar</Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="u-bg-light u-p-2xl u-text-center">
        <h2>Nuestro Menú Exquisito</h2>
        <p>Descubre nuestros {products.length} deliciosos platos</p>
      </section>
      <section className="u-p-3xl">
        <div className="o-container">
          <div className="o-flex o-flex--center o-flex--gap-md o-flex--wrap u-mb-3xl">
            {categories.map(cat => (
              <Button key={cat} variant={category === cat ? 'primary' : 'outline'} onClick={() => setCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="o-grid o-grid--4col">
            {filtered.length > 0 ? (
              filtered.map(product => (
                <div key={product.id} className="c-card">
                  <img src={product.image} alt={product.title} className="c-card__image" />
                  <div className="c-card__body">
                    <span className="c-card__badge">{product.category}</span>
                    <h3 className="c-card__title">{product.title}</h3>
                    <p className="c-card__description">{product.desc}</p>
                    <div className="c-card__footer">
                      <span className="c-card__price">${product.price}</span>
                      <Button variant="outline" size="sm" onClick={() => {
                        onProductClick(product.category);
                        setSelectedProduct(product);
                      }} >Ver más</Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="u-text-center u-p-xl u-grid-full-width">
                <h3>No hay productos en esta categoría</h3>
                <p>Selecciona otra categoría para ver más productos.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const ReservationsPage = () => {
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: ''
  });

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const { name, email, phone, date } = reservationForm;
    
    let message = "¡Hola Gastronomy Heaven! Quiero hacer una reserva con los siguientes datos:\n\n";
    
    if (name) message += `👤 Nombre: ${name}\n`;
    if (email) message += `📧 Email: ${email}\n`;
    if (phone) message += `📞 Teléfono: ${phone}\n`;
    if (date) message += `📅 Fecha: ${date}\n`;
    
    message += "\n¡Espero su confirmación! Gracias.";
    
    return encodeURIComponent(message);
  };

  return (
    <>
      <section className="u-bg-light u-p-2xl u-text-center">
        <h2>¡Haz tu Reserva!</h2>
      </section>
      <section className="u-p-4xl">
        <div className="o-container">
          <div className="o-grid o-grid--2col">
            <div>
              <h3 className="u-mb-xl">Información</h3>
              <input 
                type="text" 
                placeholder="Nombre" 
                className="c-form__input"
                value={reservationForm.name}
                onChange={(e) => setReservationForm({...reservationForm, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="c-form__input"
                value={reservationForm.email}
                onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Teléfono" 
                className="c-form__input"
                value={reservationForm.phone}
                onChange={(e) => setReservationForm({...reservationForm, phone: e.target.value})}
              />
              <input 
                type="date" 
                className="c-form__input"
                value={reservationForm.date}
                onChange={(e) => setReservationForm({...reservationForm, date: e.target.value})}
              />
              <a 
                href={`https://wa.me/573108108175?text=${generateWhatsAppMessage()}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
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
};

const PromotionsPage = ({ setPage }) => (
  <>
    <section className="u-p-2xl u-text-center c-promotions-header">
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
              <Button variant="primary" size="sm" onClick={() => setPage('reservations')}>Reservar</Button>
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
    {/* Hero Section */}
    <section className="c-about-hero">
      <div className="o-container">
        <h1 className="c-about-hero__title">Transforma Tu Experiencia Gastronómica</h1>
        <p className="c-about-hero__subtitle">
          Te invitamos a que disfrutes de una nueva y divertida sensación con nuestra familia. En 
          Gastronomy Haven, cada plato cuenta una historia, cada visita crea un recuerdo.
        </p>
      </div>
    </section>

    {/* Journey Steps */}
    <section className="c-journey-section">
      <div className="o-container">
        <h2 className="c-journey-title">Tu Viaje en Gastronomy Haven</h2>
        
        <div className="c-journey-steps">
          {/* Step 1 */}
          <div className="c-journey-step">
            <div className="c-journey-step__number">1</div>
            <div className="c-journey-step__content">
              <h3 className="c-journey-step__title">Explora el Menú</h3>
              <p className="c-journey-step__text">
                Navega a través de nuestra variada selección de delicias gastronómicas. Descubre desde entradas 
                exquisitas hasta postres tentadores, todo presentado con fotografías de alta calidad y descripciones 
                detalladas para que tu elección sea siempre la mejor.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="c-journey-step">
            <div className="c-journey-step__number">2</div>
            <div className="c-journey-step__content">
              <h3 className="c-journey-step__title">Haz tu Reserva</h3>
              <p className="c-journey-step__text">
                Con nuestro sistema de reservas intuitivo, selecciona tu fecha, hora y número de invitados con 
                facilidad. Confirma tu mesa en solo unos clics y recibe una confirmación inmediata, preparándote 
                para una experiencia culinaria sin estrés.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="c-journey-step">
            <div className="c-journey-step__number">3</div>
            <div className="c-journey-step__content">
              <h3 className="c-journey-step__title">Vive la Experiencia en Nuestro Restaurante</h3>
              <p className="c-journey-step__text">
                Relájate y disfruta de la atmósfera acogedora y elegante. Nuestro personal atento se encargará de 
                que cada momento sea especial, desde el primer saludo hasta el último bocado, garantizando que cada visita sea 
                memorable y llena de momentos inolvidables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="c-features-section">
      <div className="o-container">
        <h2 className="c-features-title">¿Por Qué Elegirnos?</h2>
        
        <div className="c-features-grid">
          {/* Feature 1 */}
          <div className="c-feature-card">
            <div className="c-feature-card__icon">🕐</div>
            <h3 className="c-feature-card__title">Atención 24/7</h3>
            <p className="c-feature-card__text">
              Nuestro equipo siempre está disponible para atenderte y responder que tu experiencia 
              sea impecable en cualquier momento.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="c-feature-card">
            <div className="c-feature-card__icon">♿</div>
            <h3 className="c-feature-card__title">Fácil Accesibilidad</h3>
            <p className="c-feature-card__text">
              Diseñado para ser accesible desde cualquier dispositivo, garantizando una navegación 
              fluida y una experiencia óptima.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="c-feature-card">
            <div className="c-feature-card__icon">🎁</div>
            <h3 className="c-feature-card__title">Promociones Personalizadas</h3>
            <p className="c-feature-card__text">
              Descuentos exclusivos, 
              adaptados a tus preferencias 
              para una experiencia única.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="c-feature-card">
            <div className="c-feature-card__icon">✓</div>
            <h3 className="c-feature-card__title">Reservas Rápidas y Automatizadas</h3>
            <p className="c-feature-card__text">
              Con nuestro sistema eficiente, 
              haz reservas de manera 
              instantánea.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ContactPage = () => {
  return (
    <>
      <section className="u-bg-light u-p-2xl u-text-center c-contact-section">
        <h2>Contáctanos</h2>
      </section>
      
      {/* Mapa */}
      <section className="c-contact-map">
        <img 
          src="/ubi.png" 
          alt="Ubicación Gastronomy Heaven" 
          className="c-contact-map__image"
        />
      </section>

      {/* Información de contacto */}
      <section className="c-contact-info">
        <div className="c-contact-cards-grid">
          {/* Dirección */}
          <div className="c-contact-card">
            <div className="c-contact-card__icon">
              <MapPin size={24} color="#2196F3" />
            </div>
            <h3 className="c-contact-card__title">Dirección</h3>
            <p className="c-contact-card__text">Calle Ficticia 123</p>
            <p className="c-contact-card__text">Colonia Centro</p>
            <p className="c-contact-card__text">Ciudad Ejemplo, CP 12345</p>
          </div>

          {/* Teléfono */}
          <div className="c-contact-card">
            <div className="c-contact-card__icon">
              <Phone size={24} color="#2196F3" />
            </div>
            <h3 className="c-contact-card__title">Teléfono</h3>
            <p className="c-contact-card__text">+52 555 123 4567</p>
            <p className="c-contact-card__text">+52 555 890 1234</p>
          </div>

          {/* Email */}
          <div className="c-contact-card">
            <div className="c-contact-card__icon">
              <Mail size={24} color="#2196F3" />
            </div>
            <h3 className="c-contact-card__title">Email</h3>
            <p className="c-contact-card__text">info@gastronomyhaven.com</p>
            <p className="c-contact-card__text">reservas@gastronomyhaven.com</p>
          </div>
        </div>
      </section>
    </>
  );
};

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="modal-close-button"
        >
          <X size={24} />
        </button>
        
        <img 
          src={product.image} 
          alt={product.title} 
          className="modal-image"
        />
        
        <span className="c-card__badge">{product.category}</span>
        <h2 className="modal-title">
          {product.title}
        </h2>
        <p className="modal-price">
          ${product.price}
        </p>
        
        <p className="modal-description">
          {product.desc}
        </p>
        
        <div className="modal-additional-info">
          <h3>
            Información Adicional
          </h3>
          <p>
            Este delicioso plato es preparado con los ingredientes más frescos y de la más alta calidad.
            Perfecto para compartir con amigos y familia.
          </p>
        </div>
        
      </div>
    </div>
  );
};


function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryClicks, setCategoryClicks] = useState(() => {
    // Cargar clicks desde localStorage al inicializar
    const saved = localStorage.getItem('gastronomyHeaven_categoryClicks');
    return saved ? JSON.parse(saved) : {};
  });

  // Scroll to top cuando cambia la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [page]);

  // Función helper para cambiar página con scroll to top
  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Scroll inmediato para mejor UX
    window.scrollTo(0, 0);
  };

  // Función para manejar clicks en productos
  const handleProductClick = (category) => {
    setCategoryClicks(prevClicks => {
      // Si ya hay una categoría con 2 clicks y es diferente a la actual, resetear todo
      const currentActiveCategory = Object.keys(prevClicks).find(cat => prevClicks[cat] >= 2);
      
      let newClicks;
      
      if (currentActiveCategory && currentActiveCategory !== category) {
        // Resetear todo y empezar con la nueva categoría
        newClicks = {
          [category]: 1
        };
      } else {
        // Continuar sumando a la categoría actual
        newClicks = {
          ...prevClicks,
          [category]: (prevClicks[category] || 0) + 1
        };
      }
      
      // Guardar en localStorage
      localStorage.setItem('gastronomyHeaven_categoryClicks', JSON.stringify(newClicks));
      
      return newClicks;
    });
  };


  return (
    <div className="c-app-container">
  

      <Header setPage={handlePageChange} currentPage={page} />

      {page === 'home' && <HomePage 
        setPage={handlePageChange} 
        categoryClicks={categoryClicks}
        setSelectedProduct={setSelectedProduct}
        onProductClick={handleProductClick}
      />}
      {page === 'menu' && <MenuPage setPage={handlePageChange}
        setSelectedProduct={setSelectedProduct}
        onProductClick={handleProductClick}
      />}
      {page === 'reservations' && <ReservationsPage />}
      {page === 'promotions' && <PromotionsPage setPage={handlePageChange} />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}

      <Footer />
      
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

    </div>
  );
}

export default App;
