import React, { useState } from "react";
import { ImagePreviewsProps } from "../utilities/interface";

const Carousel: React.FC<ImagePreviewsProps> = ({ imagePreviews }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

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
		<div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
			<img
				src={imagePreviews[currentIndex]}
				alt="preview"
				className="flex m-auto max-h-[40rem]"
			/>

			{imagePreviews.length > 1 ? (
				<div className="absolute inset-0 flex items-center justify-center">

					{currentIndex === 0 ? (
						<></>
					) : (
						<button
							className="absolute bg-primary rounded-full p-2 left-4 hover:opacity-75 active:opacity-90"
							onClick={() => setCurrentIndex(currentIndex - 1)}
						>
							{leftArrow}
						</button>
					)}
					{currentIndex === imagePreviews.length - 1 ? (
						<></>
					) : (
						<button
							className="absolute bg-primary rounded-full p-2 right-4 hover:opacity-75 active:opacity-90"
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
	);
};

export default Carousel;
