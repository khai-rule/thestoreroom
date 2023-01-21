import React, { useState } from "react";
import { ImagePreviewsProps } from "../utilities/interface";

const Carousel: React.FC<ImagePreviewsProps> = ({ imagePreviews }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
			<img
				src={imagePreviews[currentIndex]}
				alt="preview"
				className="flex m-auto max-h-96"
			/>

			{imagePreviews.length > 1 ? (
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
					<div className="flex justify-between mx-4">
						<button
							className="text-black"
							onClick={() => setCurrentIndex(currentIndex - 1)}
						>
							Previous
						</button>
						<button
							className="text-black"
							onClick={() => setCurrentIndex(currentIndex + 1)}
						>
							Next
						</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Carousel;
