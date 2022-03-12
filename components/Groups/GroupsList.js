import React, {useEffect, useState} from 'react'
import {ScrollView, View, ActivityIndicator, StyleSheet} from 'react-native'
import {ListItem, Icon,} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {userService} from "../../services";
import {getData} from "../../utils/asyncStorageUtils";

export default function GroupsList() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const userGroups = userService.getUserGroups(getData("Access Token"));
        userGroups.then(groups => {
            setGroups(groups);
            setIsLoading(false)
        })
    }, [groups]);

    return (
        <View style={styles.list}>
            <ScrollView>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicatorWrapper}/>
                {groups.map((group, i) => (
                    <ListItem key={i} bottomDivider>
                        <Icon name="user-circle-o" type="font-awesome" color="#4366b"/>
                        <ListItem.Content>
                            <ListItem.Title style={{color: '#4366b6'}}>
                                {group.name}
                            </ListItem.Title>
                            <ListItem.Subtitle>{group.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </View>
    )
}