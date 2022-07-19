import React, { useEffect } from "react";
import{View,Text} from 'react-native';

export default function Logout({navigation}){
     

    useEffect(() => {
       localStorage.removeItem('currentUser');
       navigation.navigate('Login');
    }, []); // effec

return(
    <View>
        <Text>
            Going Sooo Sooooon!!!!
        </Text>
    </View>
)
}