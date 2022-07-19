import React from "react";
import { View, Text, FlatList, Button } from 'react-native';
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
import { useState, useEffect } from "react";
import { database } from "../database/config";
import firebase from "firebase";
import Icon from 'react-native-vector-icons/AntDesign';
import {getRandomColor,createImageFromInitials}  from '../components/CustomImage';

export default function ManageUser({ navigation }) {
    const [Users, setData] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    }, []); // effect will run only once

    const fetchUsers = () => {
        database.ref('usersList').once('value').then((item) => {
            let users = [];
            console.log(item.val());
            item.forEach((childSnapshot) => {
                users.push(childSnapshot.val())
            })
            console.log(users);
            setData(users); // updating state
        })
    }
    const editUser = (id) => {
        navigation.navigate('Edit', { id: id });
    }
    const deleteUser = (id) => {
        console.log(id);
        firebase.database().ref('/usersList/' + id).remove();
        fetchUsers();
    }

    const storyItem = ({ item }) => {
        return (
            <UserInfo>
                <UserImgWrapper>
                    
                    <UserImg source={
                        item.image == "null"
                            ? createImageFromInitials(500, item.name, getRandomColor())
                            : { uri: item.image }
                    } />
                </UserImgWrapper>
                <TextSection>
                    <UserInfoText>
                        <UserName>{item.name}</UserName>
                        <PostTime><Icon name="edit" onPress={() => editUser(item.id)} size={20} ></Icon>
                            || <Icon name="delete" size={20} onPress={() => deleteUser(item.id)}></Icon></PostTime>
                    </UserInfoText>
                    <MessageText>{item.email}</MessageText>
                </TextSection>
            </UserInfo>

        )
    }
    return (
        <Container>
            <FlatList
                data={Users}
                keyExtractor={item => item.id}
                renderItem={storyItem}></FlatList>
        </Container>
    );
}