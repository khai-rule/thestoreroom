import React from "react";
import { MoreOptionsProps } from "../utilities/interface";


const PostsDetailsMoreOptions: React.FC<MoreOptionsProps> = ({
	isOpen,
	setOpen,
    linkCopiedToastify
}) => {
	if (!isOpen) return null;

	const copyURL = () => {
		navigator.clipboard.writeText(window.location.href);
        setOpen(false)
		linkCopiedToastify();
	};

	return (
		<div
			data-aos="fade-in"
			data-aos-duration="600"
			data-aos-easing="ease-in-out"
			data-aos-once="true"
		>
			<div className="fixed inset-0 z-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
				<div className="absolute bg-white rounded-lg py-2 px-12 flex flex-col">
					<button
						className="block px-4 py-3 text-black"
						onClick={() => console.log("Share clicked")}
					>
						Share to...
					</button>
					<button className="block px-4 py-3 text-black" onClick={copyURL}>
						Copy Link
					</button>
					<button
						className="block px-4 py-3 text-black"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
				</div>
			</div>

		</div>
	);
};

export default PostsDetailsMoreOptions;
