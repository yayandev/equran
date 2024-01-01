"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

let links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Developer",
    link: "https://github.com/yayandev",
  },
];

function NavbarLayout() {
  const pathname = usePathname();
  return (
    <Navbar fluid rounded className="bg-gray-800 text-white">
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Al - Quran
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {links.map((link, index) => (
          <Navbar.Link
            key={index}
            className="text-white active:font-bold active:text-white"
            active={pathname == link.link ? true : false}
            as={Link}
            href={link.link}
          >
            {link.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarLayout;
