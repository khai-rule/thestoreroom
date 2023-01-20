import { ModalProps } from "../utilities/interface";
import { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import Carousel from "./Carousel";
import { ChangeEvent } from "react";
import { createClient } from "contentful-management";
import { createReadStream } from "fs";
import internal, { Stream } from "stream";


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
		console.log("preview", imagePreview);
		console.log("file", imageFiles[0]);
	
		try {
			//Contentful API Call
			const MClient = createClient({
			  //Fetch access token from environment variables
			  accessToken: "CFPAT-A6jfpI6MkmfBymBooRWgT4L8Fa-6ng0BLo0hGUmdpuw",
			});
			//API call that requests the specified space
			const space = await MClient.getSpace(
			  "94snklam6irp"
			);
			const environment = await space.getEnvironment(
			  "master"
			);
		  
			const file: any = imageFiles[0];
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
			console.log(asset)
		  } catch(error) {
			console.log(error);
		  }				
	};

	// const handleUpload = async () => {
	// 	console.log("preview", imagePreview);
	// 	console.log("file", imageFiles);

	// 	const space = await client.getSpace("94snklam6irp");
	// 	const environment = await space!.getEnvironment("master");
	// 	const file = imageFiles[0];

	// 	const asset =  environment.createAsset({
	// 		fields: {
	// 			title: {
	// 				"en-US": "My Image",
	// 			},
	// 			file: {
	// 				"en-US": {
	// 					contentType: file.type,
	// 					fileName: file.name,
	// 					file,
	// 				},
	// 			},
	// 		},
	// 	});
	// 	.then((asset) => asset.processForAllLocales())
	// 	.then((asset) => asset.publish())
	// 	.catch(console.error);

		// try {
		//   if (!space) {
		// 	const s = await client.getSpace("94snklam6irp");
		// 	setSpace(s);
		//   }

		// 	const space = await client.getSpace("94snklam6irp");

		// const environment = await space!.getEnvironment("master");

		// 	for (let i = 0; i < imageFiles.length; i++) {
		// 		const asset = await environment.createAsset({
		// 			fields: {
		// 				title: {
		// 					"en-US": `Asset ${i}`,
		// 				},
		// 				file: {
		// 					"en-US": {
		// 						contentType: imageFiles[i].type,
		// 						fileName: imageFiles[i].name,
		// 						upload: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
		// 					},
		// 				},
		// 			},

		// 		});
		// 		console.log(imageFiles)
		// 		console.log(imagePreview)
		// 		await asset.processForAllLocales();
		// 		await asset.publish();
		// 	}

		// 	alert("Upload complete!");
		// } catch (err) {
		// 	console.error(err);
		// }

		// client
		// 	.getSpace("94snklam6irp")
		// 	.then((space) => space.getEnvironment("master"))
		// 	.then((environment) => {
		// 		const fileData = {
		// 			fields: {
		// 				title: {
		// 					"en-US": "Berlin",
		// 				},
		// 				file: {
		// 					"en-US": {
		// 						contentType: "image/jpeg",
		// 						fileName: "berlin_english.jpg",
		// 						upload:
		// 						imagePreview[0],
		// 					},
		// 				},
		// 			},
		// 		};

		// 		environment.createAsset(fileData).then(function(asset: any) {
		// 			asset.processForAllLocales().then(function(processedAsset: any) {
		// 				processedAsset.publish().then(function(publishedAsset: any) {
		// 					console.log(publishedAsset);
		// 				});
		// 			});
		// 		});
		// 	});
 //!
		// const fileName = 'myFile.svg'
		// const fileToUpload = __dirname + '/' + fileName

		// // UPLOAD/CREATE ASSET PORTION
		// const space = client.getSpace("94snklam6irp")
		// const uploadedAsset = space
		// 	.then((space) => {
		// 		return space.createAssetFromFiles({ // this first posts the asset to 'uploads', then finally posts the asset to 'assets'
		// 			fields: {
		// 				title: {
		// 					'en-US': 'my file'
		// 				},
		// 				description: {
		// 					'en-US': 'file description'
		// 				},
		// 				file: {
		// 					'en-US': {
		// 						contentType: 'image/svg+xml',
		// 						fileName: fileName,
		// 						file: fs.createReadStream(fileToUpload)
		// 					}
		// 				}
		// 			}
		// 		})
		// 		.then((asset: any) => {
		// 			return asset.processForAllLocales() // this is the processing part
		// 				.then((asset : any) => asset.publish()) // this is what actually publishes the asset created
		// 		})
		// 	})
		// 	.catch(console.error)

		// // ASSET CREATION/UPLOAD ASSOCIATION PORTION
		// Promise.all([space, uploadedAsset])
		// 	.then(([space, assetToAttach]) => {
		// 		space.createAsset({ // a direct call to post the asset to 'assets' rather than uploads first
		// 				fields: {
		// 					title: {
		// 						'en-US': 'asset name'
		// 					},
		// 					file: {
		// 						'en-US': {
		// 							contentType: 'image/svg+xml',
		// 							fileName: fileName,
		// 							uploadFrom: {
		// 								'sys': {
		// 									'type': 'Link',
		// 									'linkType': 'Upload',
		// 									'id': assetToAttach.sys.id
		// 								}
		// 							}
		// 						}
		// 					}
		// 				}
		// 			})
		// 			.then((asset: any) => asset.processForAllLocales()) // im not publishing the asset like i did in the previous example
		// 			.then((asset: any) => console.log(asset))
		// 			.catch(console.error)
		// 	})
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
