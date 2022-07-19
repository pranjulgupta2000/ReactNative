import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Modal, Button
} from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native';
import { getRandomColor, createImageFromInitials } from '../components/CustomImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { database } from '../database/config';

export default function Profile() {

    //const [currentUser, setCurrentUser] = useState(null);
    let currentUser;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [userid, setuserid] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState("");


    useEffect(() => {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setName(currentUser.name);
        setEmail(currentUser.email);
        setImage(currentUser.image);
        setuserid(currentUser.id);
        setPassword(currentUser.password);
        console.log(currentUser.name);
    }, []); // effect will run only once

    const editProfile = () => {
        //setFlag(1);
        setModalVisible(true)
    }
    const hideModal = () => {
        setModalVisible(!modalVisible);

    }
    const updateUser = (userid) => {
        // currentUser.name=name;
        //localStorage.setItem("currentUser", currentUser);
        setModalVisible(!modalVisible);
        const data = {
            id: userid,
            name: name,
            email: email,
            password: password,
            image: image
        };
        console.log("data: " + data);
        database
            .ref("usersList")
            .update({ [data.id]: data })
            .then(() => {
                console.log("Inserted");
            })
            .catch((error) => {
                console.log(error);
            });
        localStorage.setItem("currentUser", JSON.stringify(data));
        console.log(name);
        console.log(userid);
        console.log(email);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={image == "null"
                ? createImageFromInitials(500, name, getRandomColor())
                : { uri: image }} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>
                        {name} <Icon name="edit" onPress={() => editProfile()} size={20} ></Icon></Text>
                    <Text style={styles.info}>{email}</Text>

                </View>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={hideModal}><Ionicons name="close-circle-outline" size={22} /></TouchableOpacity>
                            <Text>Enter new name</Text>
                            <TextInput onChangeText={(text) => setName(text)}

                                placeholder={name} />
                            <Button onPress={() => {
                                updateUser(userid);


                            }}
                                title="Update">
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

