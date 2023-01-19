import React, { useState } from "react";
import { ImagePreviewsProps } from "../interface";

const Carousel: React.FC<ImagePreviewsProps> = ({ imagePreviews }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<div>
			<img src={imagePreviews[currentIndex]} alt="" />
			{imagePreviews.length > 1 ? (
				<>
					<button onClick={() => setCurrentIndex(currentIndex - 1)}>
						Previous
					</button>
					<button onClick={() => setCurrentIndex(currentIndex + 1)}>
						Next
					</button>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Carousel;
