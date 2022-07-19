import React from 'react';
import { View, TextInput, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { database } from '../database/config';

export default function Login({ navigation }) {

    const [email, emailChange] = useState("");
    const [password, passwordChange] = useState("");
    const [submitError, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState("Enter Information");
    var apos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var i=0;
    useEffect(() => {
        database.ref('usersList').once('value').then((item) => {
            var users = [];
            item.forEach((childSnapshot) => {
                users.push(childSnapshot.val())
            })
            console.log(users);
            setUsers(users); // updating state
        })
        
    }, []); // effect will run only once

    postMessage = () => {
        let flag = 0;
        let pos;

        if (!email || !password) {
            setErrMsg("Fields can't empty");
        }
        else if (apos < 1 || dotpos - apos < 2) {
            setErrMsg("Email is not valid");
        }
        else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == email) {
                    if (users[i].password == password) {
                        flag = 1;
                        // iduser=users[i].id;
                        localStorage.setItem("currentUser", JSON.stringify(users[i]));
                    }
                }
            }
            if (flag == 1) {
                setErrMsg('Login Successfully');
                navigation.navigate('Drawer');
            }
            else {
                setErrMsg('User Not Found');
            }
        }
    }
    //window.location.reload();
    return (
        
        <ImageBackground style={styles.imgBackground}
            resizeMode='cover'
            source={{ uri: 'https://wallpaperaccess.com/full/1567831.jpg' }}>
            <Text>{errMsg}</Text>
            <Text style={styles.heading}> Login Page</Text>
            <Text style={styles.label}> Email*</Text>
            <TextInput style={styles.input} onChangeText={text => emailChange(text)}
                value={email}
            />

            <Text style={styles.label}> Password*</Text>
            <TextInput style={styles.input} onChangeText={text => passwordChange(text)}
                value={password}
                secureTextEntry={true}
            />

            <Button
                style={styles.button}
                onPress={() => postMessage()} title="Login">

            </Button>

            <Text
                style={styles.registerTextStyle}
                onPress={() => {
                    navigation.navigate('Register')
                }}>
                New Here? Register
            </Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // width: '100%',
        // height: '100%',


    },
    secondContainer: {
        alignItems: 'center',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 25,
        width: 250,
        borderRadius: 20
    },
    label: {
        fontSize: 18,
        paddingTop: 20

    },
    button: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 60,
        marginBottom: 25,
        padding: 10,
    },
    heading: {
        fontSize: 40,
        //backgroundColor:'red'
    },
    registerTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
        color: 'Black'
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
})