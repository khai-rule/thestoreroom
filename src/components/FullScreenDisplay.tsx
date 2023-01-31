import { useState } from "react";
import { FullScreenDisplayProps } from "../utilities/interface";

const FullScreenDisplay : React.FC<FullScreenDisplayProps>= ({
	openDisplay,
	setOpenDisplay,
	imagePreviews,
    display
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);


	if (!openDisplay) return null;

	const leftArrow = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			className="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 19.5L8.25 12l7.5-7.5"
				stroke="white"
			/>
		</svg>
	);
	const rightArrow = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			className="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M8.25 4.5l7.5 7.5-7.5 7.5"
				stroke="white"
			/>
		</svg>
	);

	return (
		<>
			<div className="absolute inset-0  bg-white">
				<button
					className="fixed top-6 right-6 hover:underline z-10 text-primary"
					onClick={() => setOpenDisplay(false)}
				>
					Close
				</button>
				<div className="grid place-items-center h-screen">
					<img
						src={imagePreviews[currentIndex]}
						alt="preview"
						className="w-full"
					/>
                    </div>

					{imagePreviews.length > 1 ? (
						<div className="fixed inset-0 flex items-center justify-center">
							{currentIndex === 0 ? (
								<></>
							) : (
								<button
									className="fixed bg-primary rounded-full p-2 left-8 hover:opacity-75 active:opacity-90"
									onClick={() => setCurrentIndex(currentIndex - 1)}
								>
									{leftArrow}
								</button>
							)}
							{currentIndex === imagePreviews.length - 1 ? (
								<></>
							) : (
								<button
									className="fixed bg-primary rounded-full p-2 right-8 hover:opacity-75 active:opacity-90"
									onClick={() => setCurrentIndex(currentIndex + 1)}
								>
									{rightArrow}
								</button>
							)}
						</div>
					) : (
						<></>
					)}
				</div>
			
		</>
	);
};

export default FullScreenDisplay;
