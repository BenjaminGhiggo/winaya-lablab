import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOHQCCjvTkfRSgs0pURCx5-arRLmGlnrM",
  authDomain: "winaya-tech.firebaseapp.com",
  projectId: "winaya-tech",
  storageBucket: "winaya-tech.firebasestorage.app",
  messagingSenderId: "712002030080",
  appId: "1:712002030080:web:73ad3cd3bdcc1eb7dea6e5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);