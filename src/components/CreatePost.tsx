import { ModalProps } from "../interface";
import { useState } from "react";
import { createClient } from "contentful";
import CreatePostForm from "./CreatePostForm";
import Carousel from "./Carousel";
import { ChangeEvent } from "react";

const CreatePost = ({ closeModal }: ModalProps) => {
	const client = createClient({
		space: /* process.env.CONTENTFUL_SPACE_ID as string */ "94snklam6irp",
		accessToken:
			/* process.env.CONTENTFUL_ACCESS_TOKEN as string */ "dTG2qI-VcavHdE0tOqs6MsVvQR1EV_-WR5huPpawUKA",
	});

	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imagePreview, setImagePreview] = useState<string[]>([]);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
		let images = event.target.files;
		let imagePreviews = [];
		for (let i = 0; i < images!.length; i++) {
			imagePreviews.push(URL.createObjectURL(images![i]));
		}
		setImageFiles([...imageFiles, ...images!]);
		setImagePreview([...imagePreview, ...imagePreviews]);
	};



	return (
		<div className="fixed h-screen w-screen inset-0 z-50 bg-black bg-opacity-50 md:overflow-auto text-white">
			<button
				className="absolute right-6 top-6 hover:underline"
				onClick={closeModal}
			>
				Close
			</button>
			<div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 w-9/12 h-4/6 bg-primary">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="flex">
						<Carousel imagePreviews={imagePreview} />
						{imageFiles.length !== 0 ? (
							<CreatePostForm />
						) : (
							<input
								type="file"
								multiple
								onChange={handleImageChange}
								accept="image/*"
								max={8}
								min={1}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
