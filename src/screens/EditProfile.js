import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View, Text, StyleSheet, TouchableOpacity,ImageBackground } from "react-native";
import { database } from "../database/config";

export default function EditProfile({ route, navigation }) {

    const { id } = route.params;
    // const [data, setData] = useState([]);
    let data;
    let currentUser;
    const [selectedUser, setSelectedUser] = useState(null);
    const [name, setName] = useState("");
    const [errMsg, setErrMsg] = useState("Enter Information");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const[userid,setuserid]=useState("");

    useEffect(() => {
        database.ref('usersList').once('value')
            .then((item) => {
                let users = [];
                item.forEach(user => {
                    if (user.val().id == id) {
                        currentUser = user.val();
                    }
                    users.push(user.val());
                });
                console.log(users);
                data = users;
                console.log(data);
                console.log(currentUser.name);
                setName(currentUser.name);
                setEmail(currentUser.email);
                setImage(currentUser.image);
                setPassword(currentUser.password);
                setuserid(currentUser.id);
            })
    }, []);
    const saveDetail = () => {
        if (!name) {
            setErrMsg("Name can't empty");
        }
        else {
            console.log(image);
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
            navigation.navigate("ManageUser");
        }
    }


    return (
        <ImageBackground style={styles.imgBackground}
        resizeMode='cover'
        source={{ uri: 'https://www.fonewalls.com/wp-content/uploads/2019/09/Sea-wave-Wallpaper-300x585.jpg' }}>
        
            <Text style={styles.heading}>Edit Page</Text>
            <Text>{errMsg}</Text>
            <Text style={styles.label}> Name</Text>
            <TextInput style={styles.input} onChangeText={text => setName(text)}
                value={name} placeholder={name}
            />
            <TouchableOpacity style={styles.Btn} onPress={saveDetail}>
                <Text style={styles.loginText}>Save</Text>
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
        // backgroundColor:'yellow'
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
})