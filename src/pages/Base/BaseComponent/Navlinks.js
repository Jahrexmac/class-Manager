import NavItem from "../../../components/HeaderComponents/NavItem"

export default function Navlink() {
    const navItem = [<NavItem key={1} path="/" name="Home" />,
    <NavItem key={2}  path="/pricing" name="Pricing" />,
    <NavItem key={3}  path="/services" name="Services" />,
    <NavItem key={4}  path="/about" name="About" />,
    <NavItem key={5}  path="/contact" name="Contact" />,
    ]
    return (navItem)

}