import React, {useState,useEffect} from 'react'
import {View} from 'react-native'
import {Image, Text, Input, Button, useTheme, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {groupService} from '../../services';
import styles from './styles';

export default function JoinGroup({navigation}) {
    const {theme} = useTheme();
    const LineWidth = 290;
    const [inviteCode, setInviteCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [IsDisable, setIsDisable] = useState(true);

    useEffect(() => {
        inviteCode? setIsDisable(false) : setIsDisable(true)
    }, [inviteCode])

    const handleSubmit = () => {
        setIsLoading(true);
        const promiseGroup = groupService.joinGroup(inviteCode);
        promiseGroup.then(result =>{
            setIsLoading(false);
            navigation.navigate('GroupsList');
        })
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <View style={{alignItems: "center", display: "flex", marginTop: '10%'}}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    Join Group
                </Text>
                <Input
                    containerStyle={{width: LineWidth}}
                    placeholder='Invite Code'
                    leftIcon={{type: 'font-awesome', name: 'link'}}
                    onChangeText={value => setInviteCode(value)}
                />
                <Button
                    title={'Join Group'}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={handleSubmit}
                    loading={isLoading}
                    disabled={IsDisable}
                />
            </View>
        </KeyboardAwareScrollView>
    )
};