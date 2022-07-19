
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, StatusBar, TextInput } from "react-native";
import axios from "axios";
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
import { Searchbar } from "react-native-paper";


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState('');
  const [filterData, usersFiltersData] = useState([]);

  const getUsers = () => {
    setIsLoading(true);
    axios.get(`https://randomuser.me/api/?page=${currentPage}&results=20`)
      .then(res => {
        //setUsers(res.data.results);
        setUsers([...users, ...res.data.results]);
        setIsLoading(false);
        // usersFiltersData(users);
      });
  };
  const contains = ({ name, email }, query) => {
    const { first, last } = name;
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
    return false;
  };

  const renderItem = ({ item }) => {
    return (
      <UserInfo>
        <UserImgWrapper>
          <UserImg source={{ uri: item.picture.large }} />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            {/* //<UserName>{item.name}</UserName> */}
            <Text style={styles.txtNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
            <PostTime>12:03</PostTime>
          </UserInfoText>
          <MessageText>{item.email}</MessageText>
        </TextSection>
      </UserInfo>
    );
  };

  const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const searchUser = (textToSearch) => {
    usersFiltersData(users.filter(item => item.name.first.toUpperCase().includes(textToSearch.toUpperCase())));
  }

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <>
      <StatusBar backgroundColor="black" />
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => {
          setInput(text);
          searchUser(text);
        }}
        value={input}
      />

      <Container>
        <FlatList
          // ListHeaderComponent={renderHeader}
          data={filterData.length == 0 ? users : filterData}
          renderItem={renderItem}
          keyExtractor={item => item.email}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </Container>

    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default Dashboard;

