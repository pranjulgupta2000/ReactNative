import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { database } from "../database/config";

export default function EditDocument({ route, navigation }) {

    const { id } = route.params;
    // const [data, setData] = useState([]);
    let data;
    let currentUpload;
    const [fileName, setName] = useState("");
    const [errMsg, setErrMsg] = useState("Enter Information");
    const [fileUri, setFileUri] = useState("");
    const [mimeType, setMimeType] = useState("");
    const [uploadid, setuploadid] = useState("");

    useEffect(() => {
        database.ref('uploadsList').once('value')
            .then((item) => {
                let uploads = [];
                item.forEach(upload => {
                    if (upload.val().id == id) {
                        currentUpload = upload.val();
                    }
                    uploads.push(upload.val());
                });
                console.log(uploads);
                data = uploads;
                console.log(data);
                console.log(currentUpload.fileName);
                setName(currentUpload.fileName);
                //setEmail(currentUser.email);
                setMimeType(currentUpload.mimeType);
                setFileUri(currentUpload.fileUri);
                setuploadid(currentUpload.id);
            })
    }, []);
    const saveDetail = () => {
        if (!fileName) {
            setErrMsg("File Name can't empty");
        }
        else {
            const data = {
                id: uploadid,
                fileName: fileName,
                mimeType: mimeType,
                fileUri: fileUri,
            };
            console.log("data: " + data);
            database
                .ref("uploadsList")
                .update({ [data.id]: data })
                .then(() => {
                    console.log("Inserted");
                })
                .catch((error) => {
                    console.log(error);
                });
            setErrMsg("Changes Successfully");
            navigation.navigate("MyUploads");
        }
    }
    return (
        <ImageBackground style={styles.imgBackground}
            resizeMode='cover'
            source={{ uri: 'https://wallpaperaccess.com/full/1567831.jpg' }}>
            <Text style={styles.heading}>Edit Page</Text>
            <Text>{errMsg}</Text>
            <Text style={styles.label}> File Name</Text>
            <TextInput style={styles.input} onChangeText={text => setName(text)}
                value={fileName} placeholder={fileName}
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