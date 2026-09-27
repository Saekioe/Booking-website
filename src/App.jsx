import { useEffect, useRef, useState } from 'react'
import './App.css'

const Logo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10" />
    <path d="M12 10C12 10 6 10 6 5C11 5 12 10 12 10Z" />
    <path d="M12 13C12 13 18 13 18 8C13 8 12 13 12 13Z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M14.5 8.5h2V5.3h-2c-2 0-3.5 1.6-3.5 3.6v1.6H9v3h2v6.5h3v-6.5h2.3l.7-3H14V9c0-.3.2-.5.5-.5Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.4" />
    <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M15 3.5v10.7a3.3 3.3 0 1 0 1.6 2.8V7.2l2.9-.8V3.7l-4.5-.2Z" />
  </svg>
)

const initialForm = { name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '2', notes: '' }

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [loaded, setLoaded] = useState(false)
  const [booked, setBooked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [activePlace, setActivePlace] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const cardsRef = useRef([])

  // Play the hero entrance once, right after the page mounts
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(t)
  }, [])

  // Keep the nav in sync with whichever section is on screen
  useEffect(() => {
    const sections = ['home', 'about', 'explore', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Close the modal on Escape and stop the page from scrolling behind it
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [modalOpen])

  // Reveal each card as it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach((card) => card && observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleBooking = () => {
    setBooked(true)
    scrollToSection('explore')
    setTimeout(() => setBooked(false), 1800)
  }

  const openBooking = (name) => {
    setActivePlace(name)
    setSubmitted(false)
    setFormData(initialForm)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setActivePlace(null)
    setSubmitted(false)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(closeModal, 2200)
  }

  return (
    <div className="Box">
      <div className="nav">
        <div className="brand" onClick={() => scrollToSection('home')}>
          <span className="brand-icon"><Logo /></span>
          <span className="brand-name">StayNest</span>
        </div>
        <div className="nav-links">
          <div
            className={`navtext ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </div>
          <div
            className={`navtext ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            About
          </div>
          <div
            className={`navtext ${activeSection === 'explore' ? 'active' : ''}`}
            onClick={() => scrollToSection('explore')}
          >
            Explore
          </div>
          <div
            className={`navtext ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </div>
        </div>
      </div>

      <div className={`firstPage ${loaded ? 'loaded' : ''}`} id="home">
        <img src="/src/assets/img1.png" alt="Cozy staycation home" />
        <div className="coat"></div>
        <div className="centerimg">
          <img src="/src/assets/img5.jpg" alt="Featured stay" />
        </div>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
        <div className="line4"></div>
        <div className="header">
          <h6>
            Your
            <br /> weekend,
            <br /> somewhere <br />
            else.
          </h6>
        </div>
        <div className="subheader">
          <p>
            Discover cozy spaces designed for rest,
            <br /> relaxation, and unforgettable moments.
            <br />
            Whether you're planning a weekend getaway, a romantic escape,
            <br /> a family vacation, or simply need a peaceful place to recharge,
            <br />
            StayNest offers comfortable stays that feel like a home away from home.
          </p>
        </div>
        <div className={`button ${booked ? 'booked' : ''}`} onClick={handleBooking}>
          {booked ? "Let's go!" : 'Book your stay'}
        </div>
      </div>

      <div className="secondPage" id="about">
        <div className="left">
          <h5>About staynest</h5>
          <h6>
            A Little Escape Can Go <br /> a Long Way
          </h6>
          <p>
            Life can get busy. Sometimes, all you need is a quiet room, a comfortable
            <br /> bed, good food, and a place where you can forget about your daily
            <br /> responsibilities for a while.
            <br /> <br />
            StayNest provides carefully selected staycation spaces where guests can
            <br /> relax, spend quality time with loved ones, celebrate special occasions, or
            <br /> simply enjoy some well-deserved personal time.
            <br />
            <br />
            From cozy studio rooms to spacious private villas, every StayNest property
            <br /> is designed to provide comfort, convenience, and a memorable experience.
          </p>
        </div>
        <div className="right">
          <img src="/src/assets/img33.png" alt="Staynest villa interior" />
        </div>
      </div>

      <div className="thirdPage" id="explore">
        <div className="heading">
          <h5>HANDPICKED FOR YOU</h5>
          <h6>Select places to stay</h6>
          <p>Three easy escapes, each with its own pace and point of view</p>
        </div>

        <div className="cards">
          <div className="card" ref={(el) => (cardsRef.current[0] = el)}>
            <img src="/src/assets/card1.jpg" alt="Beachfront room" />
            <div className="card-content">
              <h6>Beachfront Bliss</h6>
              <p>Wake up to the sound of waves and enjoy stunning ocean views from your private balcony.</p>
              <button className="card-book-btn" onClick={() => openBooking('Beachfront Bliss')}>
                Book this place
              </button>
            </div>
          </div>

          <div className="card" ref={(el) => (cardsRef.current[1] = el)}>
            <img src="/src/assets/card2.jpg" alt="City apartment" />
            <div className="card-content">
              <h6>Urban Oasis</h6>
              <p>Experience the vibrant city life while staying in a modern, stylish apartment in the heart of downtown.</p>
              <button className="card-book-btn" onClick={() => openBooking('Urban Oasis')}>
                Book this place
              </button>
            </div>
          </div>

          <div className="card" ref={(el) => (cardsRef.current[2] = el)}>
            <img src="/src/assets/card3.jpg" alt="Countryside cottage" />
            <div className="card-content">
              <h6>Country Retreat</h6>
              <p>Escape to the countryside and unwind in a charming cottage surrounded by nature.</p>
              <button className="card-book-btn" onClick={() => openBooking('Country Retreat')}>
                Book this place
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <span className="brand-icon footer-icon"><Logo /></span>
              <span className="footer-name">StayNest</span>
            </div>
            <p>Thoughtfully chosen stays for slow weekends, restorative escapes, and journeys worth remembering.</p>
            <div className="footer-socials">
              <a className="social-icon" href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a className="social-icon" href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a className="social-icon" href="#" aria-label="Music"><NoteIcon /></a>
            </div>
          </div>

          <div className="footer-col">
            <h6>EXPLORE</h6>
            <span onClick={() => scrollToSection('home')}>Home</span>
            <span onClick={() => scrollToSection('about')}>About</span>
            <span onClick={() => scrollToSection('explore')}>Places</span>
            <span onClick={() => scrollToSection('contact')}>Contact</span>
            <span onClick={handleBooking}>Book a Stay</span>
          </div>

          <div className="footer-col">
            <h6>SAY HELLO</h6>
            <a href="mailto:hello@staynest.example">hello@staynest.example</a>
            <a href="tel:+639123456789">+63 912 345 6789</a>
            <span>Manila, Philippines</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 StayNest. All rights reserved.</p>
          <p>Privacy &middot; Terms &middot; Guest policy</p>
        </div>
      </footer>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              &times;
            </button>

            {!submitted ? (
              <>
                <h6 className="modal-title">Book {activePlace}</h6>
                <p className="modal-subtitle">
                  Share your details and we'll follow up to confirm your dates.
                </p>
                <form className="modal-form" onSubmit={handleFormSubmit}>
                  <label>
                    Full name
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
                  </label>
                  <label>
                    Phone
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
                  </label>
                  <div className="modal-row">
                    <label>
                      Check-in
                      <input type="date" name="checkIn" value={formData.checkIn} onChange={handleFormChange} required />
                    </label>
                    <label>
                      Check-out
                      <input type="date" name="checkOut" value={formData.checkOut} onChange={handleFormChange} required />
                    </label>
                  </div>
                  <label>
                    Guests
                    <input type="number" name="guests" min="1" max="12" value={formData.guests} onChange={handleFormChange} />
                  </label>
                  <label>
                    Notes (optional)
                    <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows="2" />
                  </label>
                  <button type="submit" className="modal-submit">
                    Confirm booking
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <h6>Request sent</h6>
                <p>
                  Thanks{formData.name ? `, ${formData.name}` : ''}. We'll email you to confirm your stay at{' '}
                  {activePlace}.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App