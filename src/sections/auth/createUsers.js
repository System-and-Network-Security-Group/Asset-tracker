import { collection, addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { db } from './firebaseConfig.js';

const createUsers = async () => {
  const users = [
    { email: 'admin@gmail.com', pin: '12345' },
    { email: 'proofficer@gmail.com', pin: '56789' },
    // Add more users as needed
  ];

  for (const user of users) {
    try {
      const hashedPin = await bcrypt.hash(user.pin, 10);
      await addDoc(collection(db, 'users'), {
        email: user.email,
        pin: hashedPin,
      });
      console.log(`User ${user.email} created`);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
};

createUsers();
