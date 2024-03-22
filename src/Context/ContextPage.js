import React, { createContext, useContext, useEffect, useState } from 'react'
// import * as firebase from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { GoogleAuthProvider , getAuth, signInWithRedirect,signInWithPopup, onAuthStateChanged,signOut ,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { collection, addDoc ,getFirestore,serverTimestamp,doc, getDoc,updateDoc,deleteDoc} from "firebase/firestore"; 


const provider = new GoogleAuthProvider();





const firebaseConfig = {
  apiKey: "AIzaSyDy84pdoIC4NsLlbf2ca6kboFRjB4raf7c",
  authDomain: "newblogapp-9fae6.firebaseapp.com",
  projectId: "newblogapp-9fae6",
  storageBucket: "newblogapp-9fae6.appspot.com",
  messagingSenderId: "254225548616",
  appId: "1:254225548616:web:16bcf0800f2bdd0297df7d",
  measurementId: "G-LEBB48CFPN"
};


export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
// const navv=useNavigate()

export const auth = getAuth(app);

const signInWithGoogle=()=>{
  
  signInWithPopup(auth, provider);


}

const signUpWithEmailAndPassword=(email,password)=>{

  createUserWithEmailAndPassword(auth, email, password)
  .then(()=>{
    signOut(auth).then(() => {
      console.log("signout successfull")
      
    }).catch((error) => {
      
    });
    window.location.href = '/login';
  })
  .catch(err=>{console.log(err)})
}

const signinwithemailpassword=(email,password)=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   window.location.href="/"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

const signout=()=>signOut(auth).then(() => {
  console.log("signout successfull")
  
}).catch((error) => {
  
});


const uploadProfilePic = async (file) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user)
  const storageRef = ref(getStorage(), 'profilePictures/' + user.uid);

  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // Update user's profile
  await updateProfile(user, { photoURL: downloadURL });

  return downloadURL; // Return the download URL
};




const fetchBlogPost = async (postId) => {
  const postRef = doc(db, 'blogPosts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    return { id: postSnap.id, ...postSnap.data() };
  } else {
    console.log('No such document!');
    return null;
  }
};



const updateBlogPost = async (postId, updatedData) => {
    try {
      // Reference to the blog post document
            const postRef = doc(db, 'blogPosts', postId);

            // Update the document
            await updateDoc(postRef, updatedData);

            console.log('Blog post updated successfully');
    } catch (error) {
            console.error('Error updating blog post: ', error);
            // You may want to handle the error appropriately here
    }
};





const ContextApp = createContext();
export const Firebase=()=>useContext(ContextApp);





// Function to handle file upload
const createBlogPost = async (title,content,category, file) => {

console.log(file);
  try {
     // Step 1: Upload the image file to Firebase Storage
     const imageRef = ref(storage, `images/${file.name}`);
     const uploadTaskSnapshot = await uploadBytes(imageRef, file);
 
     // Step 2: Get the download URL of the uploaded image
     const imageUrl = await getDownloadURL(imageRef);

     await addDoc(collection(db, "blogPosts"), {
      title,
      content,
      imageUrl,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
      category
    });
console.log("done")
window.location.href("/")

    
  } catch (error) {
    console.error("Error uploading image: and creating blog ", error);
  
  }

 
};




const deleteDocument = async (documentId) => {

    const myCollection = collection(db, 'blogPosts');
    const docRef = doc(myCollection, documentId);
    await deleteDoc(docRef);


}








const ContextPage= ({children}) => {
const [User, setUser] = useState(null);
const UserLogined=auth.currentUser






  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({
        name:currentUser?.displayName,
        email:currentUser?.email
      }); 
     
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
 




  return (
   <ContextApp.Provider value={{deleteDocument,signInWithGoogle,updateBlogPost,signout,User,signUpWithEmailAndPassword,signinwithemailpassword,UserLogined,uploadProfilePic,createBlogPost,fetchBlogPost}}>

{children}

   </ContextApp.Provider>
  )
}

export default ContextPage