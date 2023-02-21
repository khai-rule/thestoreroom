export interface Creator {
	creator: {
		email: string;
	};
}

export interface CreatePostForms {
	title: string;
	caption: string;
	tags: string[];
}

export interface ImageFilesProps {
	imageFiles: File[];
	formRef: {
		current: () => void;
	};
}

export interface ImageFields {
	fields: {
		title: string;
		file: {
			url: string;
		};
	};
}

export interface ImagePreviewsProps {
	imagePreviews: string[];
}

export interface HomeFeedProps {
	posts: Record<string, any>[];
	display: string;
	setDisplay: React.Dispatch<React.SetStateAction<string>>;
	grid: boolean;
}

export interface HomeDisplayProps {
	display: string;
	setDisplay: React.Dispatch<React.SetStateAction<string>>;
	grid: boolean;
	setGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PostsGalleryProps {
	matchingPost: string | any;
	// code: string | undefined;
}

export interface PostsDetailsProps {
	matchingPost: string | any;
	setUpdate: React.Dispatch<React.SetStateAction<number>>;
}

export interface Image {
	sys: {
		id: string;
	};
}

export interface allImage {
	sys: {
		id: string;
	};
	fields: {
		file: {
			url: string;
		};
	};
}

export interface CommentsForm {
	comment: string;
}

export interface Comments {
	fields: {
		comment: string;
		creator: {
			sys: {
				id: string;
			};
			fields: {
				firstName: string;
				artistName: string;
				lastName: string;
			};
		};
	};
}

export interface File {
	//TODO
}

export interface Post {
	fields: {
		title: string;
		caption: string;
		images: [];
	};
	sys: {
		id: string;
	};
}

export interface ProfilePostsProps {
	matchingCreator: {
		fields: {
			posts: [];
		};
		sys: object;
	};
}

export interface ProfileHeadProps {
	matchingCreator: {
		fields: {
			email: string;
			firstName: string;
			artistName: string;
			lastName: string;
			title: string;
			bio: string;
			website: string;
			instagram: string;
		};
	};
}

export interface UseRef {
	current: HTMLElement | null;
}

export interface MoreOptionsProps {
	linkCopiedToastify: () => void;
	matchingPost: {
		fields: {
			creator: {
				sys: {
					id: string;
				};
			};
		};
	};
}

export interface FormSubmit {
	current: (arg?: any) => void;
}

export interface ConfirmDeleteProps {
	matchingPost: {
		fields: {
			creator: {
				sys: {
					id: string;
				};
				fields: {
					artistName: string;
				};
			};
		};
		sys: {
			id: string;
		};
	};
}

export interface ProfileForm {
	input: string;
	firstName: string;
	lastName: string;
	artistName: string;
	email: string;
	bio: string;
	title: string;
	website: string;
	instagram: string;
}

export interface EditPostImagesProps {
	setUpdate: React.Dispatch<React.SetStateAction<number>>;
	matchingPost: {
		sys: {
			id: string;
		};
		fields: {
			images: [];
		};
	};
}

export interface EditPostProps {
	formRef: {
		current: () => void;
	};
	setUpdate: React.Dispatch<React.SetStateAction<number>>;
	matchingPost:
		| {
				fields: {
					title: string;
					caption: string;
					tags: string;
					creator: {
						fields: {
							firstName: string;
							artistName: string;
							lastName: string;
						};
					};
				};
		  }
		| any;
}

export interface FullScreenDisplayProps {
	openDisplay: boolean;
	setOpenDisplay: React.Dispatch<React.SetStateAction<boolean>>;
	imagePreviews: string[];
	display: string;
}


export interface Action {
	type: string;
	payload: {
		api: string
		data: any
	}
}

export interface UseSelectorState {
	loadingStatus: string;
}
