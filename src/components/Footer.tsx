import { useNavigate } from "react-router-dom";

const Footer = () => {
	const navigate = useNavigate();

	return (
		<footer className="fixed bottom-10 z-20  text-primary">
			<div className="flex justify-between mx-8 items-center">
				<button
					className="hover:underline active:text-secondary fixed left-8"
					onClick={() => navigate("/about")}
				>
					About Us
				</button>
				<p className="fixed right-8">© 2023 The Storeroom</p>
			</div>
		</footer>
	);
};

export default Footer;
