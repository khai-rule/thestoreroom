import { ModalProps } from "../interface";
import { useState } from 'react';
import { createClient } from 'contentful';
import { useDropzone } from 'react-dropzone';

const CreatePost = ({ closeModal }: ModalProps) => {



	return (
		<div className="fixed h-screen w-screen inset-0 z-50 bg-black bg-opacity-50 md:overflow-auto">
			<button
				className="absolute right-6 top-6 text-white hover:underline"
				onClick={closeModal}
			>
				Close
			</button>
			<div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 w-9/12 h-4/6 bg-primary">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<p>Drag photos and videos here</p>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
