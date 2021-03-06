import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {Image, Text, Input, Button, useTheme, Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {groupService} from '../../services';
import * as ImagePicker from "expo-image-picker";
import {PhotoPickerWithMenu} from "../App";
import {uploadImage} from "../../services/ImageUploadService";
import {createImageFormData} from "../../utils/dateUtils";

export default function AddGroup({navigation}) {
    const {theme} = useTheme();
    const LineWidth = 290
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [IsDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [imageBase64, setImageBase64] = useState(null);

    useEffect(() => {
        groupName&&image ? setIsDisable(false) : setIsDisable(true)
    }, [groupName,image])

    const handleSubmit = async () => {
        setIsLoading(true);
        const form = createImageFormData(image, imageBase64)
        const imageRes = await uploadImage(form);
        const imagePath = imageRes.path;
        const group = {groupName, description, image: imagePath};
        const result = await groupService.createGroup(group);
        navigation.navigate('Group Created', result);
        setIsLoading(false);
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                 style={{flex: 1}}
                                 showsVerticalScrollIndicator={false}>
            <View style={{alignItems: "center", display: "flex", marginTop: '10%'}}>
                <Text
                    h1
                    h1Style={{color: theme?.colors?.primary}}
                >
                    Create Group
                </Text>
                <PhotoPickerWithMenu
                    avatarIcon='group'
                    image={image}
                    setImageBase64={setImageBase64}
                    setImage={setImage}
                />
                <Input
                    containerStyle={{width: LineWidth}}
                    placeholder='Name'
                    leftIcon={{type: 'font-awesome', name: 'users'}}
                    onChangeText={value => setGroupName(value)}
                />
                <Input
                    containerStyle={{width: LineWidth}}
                    placeholder='Description'
                    leftIcon={{type: 'font-awesome', name: 'comments-o'}}
                    onChangeText={value => setDescription(value)}
                />
                <Button
                    title={'Create Group'}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    disabled={IsDisable}
                    onPress={handleSubmit}
                    loading={isLoading}
                />
            </View>
        </KeyboardAwareScrollView>
    )
};