const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Shop App</h3>
        <p>© {new Date().getFullYear()} All rights reserved.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;