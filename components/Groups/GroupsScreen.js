import React from 'react';
import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';
import GroupsList from "./GroupsList";
import groupScreenStyles from "./groupScreenStyles";

export default function GroupsScreen({navigation}){
    const handlePress=(group)=>{
        navigation.navigate("Group",{name:group.name,group})
    }
    
    return(
        <View style={groupScreenStyles.container}>
            <GroupsList handlePress={handlePress}/>
            <View>
                <FAB
                    icon={{ name: 'add', color: 'white' }}
                    color="#00aced" style={groupScreenStyles.floatingButtonPlus}
                    onPress={() => { navigation.navigate("Create Group")}}
                />
                <FAB
                    icon={{ name: 'link', color: 'white' }}
                    color="#00aced" style={groupScreenStyles.floatingButtonLink}
                    onPress={() => { navigation.navigate("Join Group")}}
                />
            </View>
        </View>
    );
};
