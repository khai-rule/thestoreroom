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
	const [space, setSpace] = useState(null);

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
			//Contentful API Call
			const MClient = createClient({
				//Fetch access token from environment variables
				accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw",
			});
			//API call that requests the specified space
			const space = await MClient.getSpace("94snklam6irp");
			const environment = await space.getEnvironment("master");

			// Create an array of Promises to upload multiple images in parallel
			const uploadPromises = imageFiles.map(async (file: File) => {
				const contentType = file.type;
				const fileName = file.name;
				let asset = await environment.createAssetFromFiles({
					fields: {
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

			// Wait for all the uploads to complete
			const assets = await Promise.all(uploadPromises);
			console.log(assets);
		} catch (error) {
			console.log(error);
		}
	};

	// const handleUpload = async () => {
	// 	console.log("preview", imagePreview);
	// 	console.log("file", imageFiles[0]);

	// 	try {
	// 		//Contentful API Call
	// 		const MClient = createClient({
	// 		  //Fetch access token from environment variables
	// 		  accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw",
	// 		});
	// 		//API call that requests the specified space
	// 		const space = await MClient.getSpace(
	// 		  "94snklam6irp"
	// 		);
	// 		const environment = await space.getEnvironment(
	// 		  "master"
	// 		);

	// 		const file: File = imageFiles[0];
	// 		const contentType = file.type;
	// 		const fileName = file.name;
	// 		let asset : any = await environment.createAssetFromFiles({
	// 		  fields: {
	// 			title: {
	// 			  "en-US": fileName,
	// 			},
	// 			file: {
	// 			  "en-US": {
	// 				contentType,
	// 				fileName,
	// 				file,
	// 			  },
	// 			},
	// 		  },
	// 		});
	// 		asset = await asset.processForAllLocales();
	// 		asset.publish();
	// 		console.log(asset)
	// 	  } catch(error) {
	// 		console.log(error);
	// 	  }
	// };

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
							<CreatePostForm imageFiles={imageFiles} />
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
						<button onClick={handleUpload}>Next</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
