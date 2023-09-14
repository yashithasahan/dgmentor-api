const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');


const app = express();
const port = process.env.PORT || 3000;


const serviceAccount = require('./serviceAccountKey.json');
//const { UserRecord } = require('firebase-admin/lib/auth/user-record');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());

app.post('/dgmentor/register', (req,res)=>{
    const{email,password}=req.body;


    admin.auth().createUser({
        email:email,
        password:password,
    })
    .then((UserRecord)=>{
        console.log('User registered with UID: ${userRecord.uid}');

        res.status(200).json({message: 'User registerd successfully'});
    })
    .catch((error)=>{
        console.error('Error creating user:',error);

        res.status(500).json({ message: 'User registration failed' });
    });

});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})