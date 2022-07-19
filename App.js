
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./src/navigations/RootNavigation";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import GroupChat from "./src/screens/GroupChat";
import ManageUser from "./src/screens/ManageUser";
import ManageDocuments from "./src/screens/ManageDocuments";
import DrawerNav from "./src/components/Drawer";
import Profile from "./src/screens/Profile";
import Edit from "./src/screens/Edit";
import SharedUploads from "./src/screens/SharedUploads";
import EditDocument from "./src/screens/EditDocument";
import MyUploads from "./src/screens/MyUploads";

const Stack = createStackNavigator();
export default function App() {
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
          <Stack.Screen
            name="GroupChat"
            component={GroupChat}
          />
          <Stack.Screen
            name="ManageUser"
            component={ManageUser}
          />
          <Stack.Screen
            name="ManageDocuments"
            component={ManageDocuments}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNav}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Edit"
            component={Edit}
          />
          <Stack.Screen
            name="ShareUploads"
            component={SharedUploads}
          />
           <Stack.Screen
            name="EditDocument"
            component={EditDocument}
          />
          <Stack.Screen
            name="MyUploads"
            component={MyUploads}
          />
        </Stack.Navigator>
      </NavigationContainer>

  );
};




