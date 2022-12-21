import React from 'react'
import Image from 'next/image';
import { useSession, signIn } from "next-auth/react"
import media from '../../assets/media.png';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { closeModal } from '../../redux/slice/modalSlice';
import { useDispatch } from 'react-redux';

const CreatePost = () => {
    const { data: session } = useSession();
    const captionRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const [image, setImage] = React.useState(null);
    const dispatch = useDispatch();

    const uploadPost = async () => {
        if (session) {
            const docRef = await addDoc(collection(db, `posts`), {
                profileImg: session?.user?.image,
                username: session?.user?.name,
                caption: captionRef.current.value,
                timestamp: serverTimestamp(),
            })

            const imagePath = ref(storage, `posts/${docRef.id}/image`);
            await uploadString(imagePath, image, 'data_url').then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imagePath);
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL,
                });
            });

            captionRef.current.value = null;
            dispatch(closeModal(false));
        } else {
            signIn();
        }
    }

    const addImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result)
        }
    }

    return (
        <>
            <div className="mt-2 text-center">
                <button className="border-0 outline-0" onClick={() => imageRef.current.click()}>
                    {
                        image ? <><img src={image} alt="post" /></> : <Image
                            src={media}
                            className="mx-auto hover:scale-90 duration-200 cursor-pointer"
                            width={200}
                            alt="add post"

                        />
                    }
                    <input type="file" className="hidden" onChange={(e) => addImage(e)} ref={imageRef} />
                </button>
            </div>
            <div className="mt-2 text-center">
                <input
                    type="text"
                    className="text-gray-500 text-regular outline-none w-full text-center"
                    placeholder="Please enter a caption"
                    ref={captionRef}
                />
            </div>

            <div className="mt-4 text-center">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={uploadPost}
                >
                    Upload post
                </button>
            </div>
        </>
    )
}

export default CreatePost