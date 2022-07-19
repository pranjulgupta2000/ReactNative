import React from "react";
import { View, Text, Button, StyleSheet, FlatList, Share } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState, useEffect, useCallback } from "react";
import { database } from "../database/config";
import {
    Container,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    MessageText,
    TextSection,
    PostTime
} from '../styles/MessageStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import firebase from "firebase";
import { navigationRef } from "../navigations/RootNavigation";


export default function MyUploads({ navigation }) {
    const [fileName, setFileName] = useState("");
    const [uploading, startUploading] = useState(false);
    const [uploads, setUploads] = useState([]);
    const [fileUri, setFileUri] = useState("");
    const [mimeType, setMimeType] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        fetchUploads();
    }, []);

    const fetchUploads = () => {
        database
            .ref("uploadsList")
            .once("value")
            .then((item) => {
                var uploads = [];
                item.forEach((childSnapshot) => {
                    uploads.push(childSnapshot.val());
                });

                setUploads(uploads); // updating state
                console.log(uploads);
            });
    }
    const pickFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: '*/*'
        });

        console.log(result);

        if (!result.cancelled) {
            setFileName(result.name);
            setFileUri(result.uri);
            setMimeType(result.mimeType);

        }
    };
    const uploadFile = () => {
        if (mimeType != "application/pdf" && mimeType != "application/msword" && mimeType != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            setErrMsg("pdf/doc are allowed");
            //<Toast visible:true>Thanks for subscribing!</Toast>
        }

        else {
            const data = {
                id: Number(new Date()),
                fileUri: fileUri,
                fileName: fileName,
                mimeType: mimeType
            };
            database
                .ref("uploadsList")
                .update({ [data.id]: data })
                .then(() => {
                    console.log("Inserted");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchUploads();
    }
    const deleteDocument = (id) => {
        console.log(id);
        firebase.database().ref('/uploadsList/' + id).remove();
        fetchUploads();
    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
            alert("Web browser do not support");
      }
    }
    const editDocument = (id) => {
        navigation.navigate('EditDocument', { id: id });
    }


    const storyItem = ({ item }) => {
        return (

            <UserInfo>
                <TextSection>
                    <UserInfoText>
                        <UserName>{item.fileName}</UserName>
                        <PostTime><Icon name="edit" size={20} onPress={() => editDocument(item.id)} ></Icon>||
                            <Icon name="delete" size={20} onPress={() => deleteDocument(item.id)}></Icon>
                            || <Icons name="share" size={20} onPress={() => onShare()}></Icons></PostTime>
                    </UserInfoText>
                    <MessageText>{item.mimeType}</MessageText>
                </TextSection>
            </UserInfo>

        )
    }

    return (

        <View style={styles.container}>
            <div style={{ height: '575px' }}>
                <Text style={styles.error}>{errMsg}</Text>

                <Container>
                    <FlatList
                        data={uploads}
                        keyExtractor={item => item.id}
                        renderItem={storyItem}>
                    </FlatList>
                </Container>
            </div>
            <div>
                <View style={styles.downUpload}>
                    <TextSection>
                        <UserInfoText>
                            <UserName> <Button title="Pick a file from mobile" onPress={pickFile} /></UserName>
                            <PostTime>{fileName}
                            </PostTime>
                        </UserInfoText>
                        <MessageText><Button title="Upload" onPress={uploadFile} /></MessageText>
                    </TextSection>
                </View>
            </div >
        </View >
    )
}

const styles = StyleSheet.create({
    downUpload: {
        // marginTop: "285px",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%',

    },
    error: {
        flex: 1,
        alignItems: 'center'
    }
})