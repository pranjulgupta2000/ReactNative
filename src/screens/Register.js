import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, Image, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { database } from '../database/config';
import alert from 'alert';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Entypo';


export default function Register({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [user, setUsers] = useState([]);
    const [image, setImage] = useState(null);
    const [errMsg, setErrMsg] = useState("Enter Information");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            borderRadius: 8
        })

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = () => {
        database
            .ref("usersList")
            .once("value")
            .then((item) => {
                var user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });

                setUsers(user); // updating state
                console.log(user);
            });
    }

    const verifyUser = () => {
        var flag = 0;
        for (let i = 0; i < user.length; i++) {
            if (email == user[i].email)
                flag = 1;
        }
        if (flag == 1) {
            setErrMsg("user already exist");
        } else {
            signup();
            setErrMsg("You are successfully registerd");

        }
    }

    const validation = () => {
        let apos = email.indexOf("@");
        let dotpos = email.lastIndexOf(".");
        if (name == "") {
            setErrMsg("Please enter username");

        } else if (email == "") {
            setErrMsg("Please enter email");

        } else if (password == "") {
            setErrMsg("Please enter password");

        } else if (confirmPassword == "") {
            setErrMsg("Please enter Confirm password");

        } else if (password != confirmPassword) {
            setErrMsg("Passwords must be same");

        } else if (apos < 1 || dotpos - apos < 2) {
            setErrMsg("Enter a valid Email address");
        } else {
            verifyUser();
        }
    };
    const signup = () => {
        const data = {
            id: Number(new Date()),
            name: name,
            email: email,
            password: password,
            image: (!image ? "null" : image)
        };
        database
            .ref("usersList")
            .update({ [data.id]: data })
            .then(() => {
                console.log("Inserted");
            })
            .catch((error) => {
                console.log(error);
            });
        fetchUsers();

        navigation.navigate("Login");
    };

    return (
        <ImageBackground style={styles.imgBackground}
            resizeMode='cover'
            source={{ uri: 'https://www.fonewalls.com/wp-content/uploads/2019/09/Sea-wave-Wallpaper-300x585.jpg' }}>


            <Text>{errMsg}</Text>
            <Text style={styles.heading}> Registration Page</Text>
            <Text style={styles.label}> Name</Text>
            <TextInput style={styles.input} onChangeText={text => setName(text)}
                value={name}
            />
            <Text style={styles.label}> Email*</Text>
            <TextInput style={styles.input} onChangeText={text => setEmail(text)}
                value={email}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Text style={styles.label}> Confirm Password</Text>
            <TextInput style={styles.input} onChangeText={text => setconfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
            />

            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
            <Text style={styles.label}> Upload Image</Text>
            <Icon name='plus' onPress={() => pickImage()} size={30} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {/* </View> */}

            <TouchableOpacity style={styles.Btn} onPress={validation}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },
    heading: {
        fontSize: 20,
    },


    input: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 25,
        width: 250
    },
    label: {
        fontSize: 18,
        paddingTop: 20

    },

    Btn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "skyblue",
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
});