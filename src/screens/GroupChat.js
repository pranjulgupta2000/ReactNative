import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import { database } from '../database/config';
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
import { getRandomColor, createImageFromInitials } from '../components/CustomImage';

export default function GroupChat() {
    const [message, setMssg] = useState("");
    const [errMsg, setErrMsg] = useState();
    const [Messages, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        //setImage(currentUser.image);
        //setName(currentUser.name);
        fetchMessages();
        // setFinalImage(
        //     image == "null"
        //         ? createImageFromInitials(500, name, getRandomColor())
        //         : { uri: image }
        // )

    }, []); // effect will run only once

    const fetchMessages = () => {
        database.ref('chatList').once('value').then((item) => {
            let users = [];
            console.log(item.val());
            item.forEach((childSnapshot) => {
                users.push(childSnapshot.val())
            })
            console.log(users);
            setData(users); // updating state
        })
    }


    const storyItem = ({ item }) => {
        return (
            <UserInfo>
                <UserImgWrapper>
                    {/* <UserImg source={{ uri: item.image }} /> */}
                    <UserImg source={
                        item.image == "null"
                            ? createImageFromInitials(500, item.userName, getRandomColor())
                            : { uri: item.image }
                    } />
                </UserImgWrapper>
                <TextSection>
                    <UserInfoText>
                        <UserName>{item.userName}</UserName>
                        <PostTime>{item.time}</PostTime>
                    </UserInfoText>
                    <MessageText>{item.message}</MessageText>
                </TextSection>
            </UserInfo>
        )
    }

    postMessage = () => {
        let today = new Date();
        // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes();
        console.log(currentUser.name);
        if (!message) {
            setErrMsg("Message can't be empty");
        } else {
            const data = {
                id: Number(new (Date)),
                time: time,
                userName: currentUser.name,
                message: message,
                image: currentUser.image
            };

            database.ref('chatList').update({ [data.id]: data }).then(() => {
                console.log("Inserted");
            }).catch((error) => {
                console.log(error);
            });

            fetchMessages();
        }
        // window.location.reload();
    }


    return (
        <View style={styles.container}>
            <div style={{ height: '500px' }}>
                <Text>{errMsg}</Text>
                <Container>
                    <FlatList
                        data={Messages}
                        keyExtractor={item => item.id}
                        renderItem={storyItem}>
                    </FlatList>
                </Container>
            </div>
            <div>
                <View style={styles.buttons}>
                    <Text style={{
                        marginRight: '11px', marginTop: '5px'
                    }}>{currentUser ? currentUser.name : ""}</Text>
                    <TextInput style={styles.input} onChangeText={text => setMssg(text)}
                        value={message} placeholder="Type here"
                    />
                    <Icon name="direction" onPress={() => postMessage()} size={30} style={{ marginRight: '4px' }} ></Icon>
                </View>
            </div >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%',

    },
    xyz: {
        height: '575px',
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: '90%',
        height: 80,
        //marginBottom: '0',
        // width: '100%',
        position: 'fixed',
        bottom: 0,
        // backgroundColor: 'red',
        // display: block,
        // flexWrap: 'wrap',
        // marginT: '0px 50px 50px -150px',
        marginLeft: '-165px'

    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        height: 30,
        borderRadius: 20
    },


})