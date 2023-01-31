import { useNavigate } from "react-router-dom";

const About = () => {
	const navigate = useNavigate();

	return (
		<div className="fixed inset-0 z-1 bg-primary">
			<button
				className="fixed right-6 top-6 hover:underline text-white"
				onClick={() => navigate(-1)}
			>
				Back
			</button>
			<div className="m-14 text-white">
				<h1 className="text-7xl">The Storeroom</h1>
				<h1 className=" my-4 font-normal">
					The Storeroom offers a curated, high-quality experience for creators
					to showcase their work, connecting them with a community of
					like-minded individuals and potential clients.
				</h1>

				<div className="grid grid-cols-3 gap-4 mt-40">

					<div className="col-span-1">
						<h4 className="mb-4 ">
							"Current platforms are saturated with content, making it hard for
							users to discover quality creators and for creators to stand out.
							Contents engagements are now based on popularity rather than its
							quality. There is a need for a curated platform that prioritises
							quality over quantity, allowing users to easily discover the best
							work from a diverse range of creators and providing a space for
							creators to showcase their work to a discerning audience, helping
							them grow their careers."
						</h4>
						<a
							href="https://drive.google.com/file/d/1c596obaFGIAxDFtZGCgdRXtc7q_AKQDZ/view?usp=sharing"
							target="_blank"
							className="font-semibold"
						>
							Read more
						</a>
					</div>

					<div className="col-span-1 mx-12">
						<h4>If you have any question, feel free to contact me.</h4>
						<a href="mailto:Qai-rule@hotmail.com" className="underline">
							qai-rule@hotmail.com
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
