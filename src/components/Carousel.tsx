import React, { useState } from "react";

interface Props {
	imagePreviews: string[];
}

const Carousel: React.FC<Props> = ({ imagePreviews }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<div>
			<img src={imagePreviews[currentIndex]} alt="" />
			{imagePreviews.length !== 0 ? (
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
