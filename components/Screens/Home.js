import React from 'react';
import {AddGroup, GroupCreated, GroupPage, GroupsScreen, JoinGroup} from "../Groups";
import GroupTitle from '../App/GroupTitle'
import CreateTask from "../Tasks/CreateTask";
import {HeaderBackButton} from "@react-navigation/elements";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Goals from "./Goals";

const Stack = createNativeStackNavigator();
export default function Home() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2089dc',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
             }}
        >
            <Stack.Screen
                name="GroupsList"
                component={GroupsScreen}
                options={({}) =>
                    (
                        {
                            title:"Groups",
                            headerLeft: ()=>{},
                            headerBackVisible:false,
                        }
                    )
                }
            />
            <Stack.Screen
                name="Group"
                component={GroupPage}
                options={({route,navigation})=> ({
                    headerTitle: () => <GroupTitle groupId={route.params.id} groupName={route.params.name} groupImage={route.params.image} navigation={navigation}/>,
                    headerBackTitleVisible: false,
                })}
            />
            <Stack.Screen
                name="GroupLeaderboard"
                component={Goals}
                options={({route})=> ({
                    headerTitle: () => <GroupTitle groupId={route.params.groupId} groupName={route.params.name} groupImage={route.params.image} />,
                    headerBackTitleVisible: false,
                })}
            />
            <Stack.Screen
                name="Create Group"
                component={AddGroup}
            />
            <Stack.Screen
                name="Join Group"
                component={JoinGroup}
            />
            <Stack.Screen
                name="Task"
                component={CreateTask}
            />
            <Stack.Screen
                name="Group Created"
                component={GroupCreated}
                options={({navigation}) =>
                    (
                        {
                            headerLeft: () => (<HeaderBackButton onPress={()=> navigation.navigate('GroupsList')}/>),
                            gestureEnabled: false
                        }
                    )
                }
            />
        </Stack.Navigator>
    )
}
