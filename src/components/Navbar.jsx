import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Image
          src="/logo.png"
          alt="Purnyx Studios logo"
          width={148}
          height={44}
          priority
          className="logo-image"
        />
      </div>

      <div className="nav-links">
        <a href="#">Explore</a>
        <a href="#">About</a>
        <a href="#">Contact Us</a>
      </div>
    </nav>
  );
};

export default Navbar;
