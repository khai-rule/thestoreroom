import { ModalProps } from "../utilities/interface";
import { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import Carousel from "./Carousel";
import { ChangeEvent } from "react";
import { createClient } from "contentful-management";
import { File } from "../utilities/interface";

const CreatePost = ({ closeModal }: ModalProps) => {
	const client = createClient({
		// space: "94snklam6irp",
		accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw", // contentful management
	});

	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imagePreview, setImagePreview] = useState<string[]>([]);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const files = event.target.files;
		const previews = [];
		for (let i = 0; i < files!.length; i++) {
			previews.push(URL.createObjectURL(files![i]));
		}
		setImageFiles([...imageFiles, ...files!]);
		setImagePreview([...imagePreview, ...previews]);

		console.log("preview", imagePreview);
		console.log("file", imageFiles);
	};

	const handleUpload = async () => {
		try {
			const MClient = createClient({
				accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw",
			});
			const space = await MClient.getSpace("94snklam6irp");
			const environment = await space.getEnvironment("master");

			const uploadPromises = imageFiles.map(async (file: any | File) => {
				const contentType = file.type;
				const fileName = file.name;
				let asset = await environment.createAssetFromFiles({
					fields: {
						description: {
							"en-US": fileName,
						},
						title: {
							"en-US": fileName,
						},
						file: {
							"en-US": {
								contentType,
								fileName,
								file,
							},
						},
					},
				});
				asset = await asset.processForAllLocales();
				asset.publish();
				return asset;
			});

			const assets = await Promise.all(uploadPromises);
			console.log(assets);
			const sanitisedSys = assets.map((asset) => {
				return {
					sys: {
						type: "Link",
						linkType: "Asset",
						id: asset.sys.id,
					},
				};
			});
			console.log(sanitisedSys);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="fixed h-screen w-screen inset-0 z-50 bg-black bg-opacity-50 md:overflow-auto text-white">
			<button
				className="absolute right-6 top-6 hover:underline"
				onClick={closeModal}
			>
				Close
			</button>
			{imageFiles.length !== 0 ? (
				<></>
			) : (
				<div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 w-9/12 h-4/6 bg-primary grid grid-flow-col rounded-3xl">
					<input
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						type="file"
						multiple
						onChange={handleImageChange}
						accept="image/*"
						max={8}
						min={1}
					/>
				</div>
			)}

			{/* If there is image */}

			{imageFiles.length !== 0 ? (
				<div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0">
					<div className="relative grid-item bg-white w-9/12 left-1/2 -translate-x-1/2 rounded-t-3xl">
						<div className="flex justify-between">
							<h4 className="py-2 mx-5 text-black">Back</h4>
							<h4
								onClick={handleUpload}
								className="py-2 mx-5 text-primary font-semibold cursor-pointer"
							>
								Share
							</h4>
						</div>
					</div>
					<div className="flex align-middle justify-center">
						<div className="relative grid-item bg-white w-5/12 aspect-square rounded-bl-3xl object-contain">
							<Carousel imagePreviews={imagePreview} />
						</div>

						<CreatePostForm imageFiles={imageFiles} />
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default CreatePost;
