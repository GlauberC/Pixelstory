import React, {useState, useEffect, useCallback} from 'react';
import {View, Alert, FlatList, ActivityIndicator} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';

import {colors} from '../../styles/mainStyles';

import {
  ViewInputTitle,
  InputTitleEditStory,
  BtnTrash,
  ViewContent,
  ImgScene,
  TextScene,
  BtnEditScene,
  BtnAddScene,
  ViewFooterScene,
  TextTime,
} from './styles';

import {
  Container,
  ViewInputButton,
  Btn,
  ContainerListItem as ViewScene,
  InputDescription,
  ViewInputDescription,
  Sep,
  TextErrSuc,
} from '../../styles/globalComponents';

export default function Scenes({navigation}) {
  const [titleStory, setTitleStory] = useState('');
  const [descriptionStory, setDescriptionStory] = useState('');
  const [idStory, setIdStory] = useState('');
  const [scenes, setScenes] = useState([]);
  const [errMode, setErrMode] = useState(false);
  const [msgErrSuc, setMsgErrSuc] = useState('');
  const [firstLoading, setFirstLoading] = useState(false);

  const successMsgChange = useCallback(msg => {
    setErrMode(false);
    setMsgErrSuc(msg);
    if (msg !== '') {
      setTimeout(() => {
        successMsgChange('');
      }, 3000);
    }
  }, []);

  const errMsgChange = useCallback(
    msg => {
      if (msg !== '') {
        setErrMode(true);
        setMsgErrSuc(msg);
        setTimeout(() => {
          successMsgChange('');
        }, 3000);
      }
    },
    [successMsgChange],
  );

  useEffect(() => {
    setTitleStory(navigation.getParam('titleStory'));
    setDescriptionStory(navigation.getParam('descriptionStory'));
    setIdStory(navigation.getParam('idStory'));
  }, [navigation]);

  const startDataLoading = useCallback(async () => {
    try {
      setFirstLoading(true);
      const response = await api.get(
        `/story/${navigation.getParam('idStory')}/scene`,
      );
      const data = response.data.map(scene => ({
        ...scene,
        formattedDate: scene.created_at.slice(0, 10),
      }));
      setScenes(data);
      setFirstLoading(false);
    } catch (err) {
      errMsgChange('There was an error on loading stories');
    }
  }, [errMsgChange, navigation]);

  useEffect(() => {
    startDataLoading();
    successMsgChange('');
  }, [startDataLoading, successMsgChange]);

  function handleDelete() {
    Alert.alert(
      'Delete Story',
      'Do you want to delete this story?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await api.delete(`/story/${navigation.getParam('idStory')}`);
              navigation.goBack();
            } catch (err) {
              errMsgChange('There was an error on delete this story');
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  async function handleEditStory() {
    if (titleStory === '') {
      errMsgChange('The Story title is empty');
    } else if (descriptionStory === '') {
      errMsgChange('The Story description is empty');
    } else if (
      titleStory === navigation.getParam('titleStory') &&
      descriptionStory === navigation.getParam('descriptionStory')
    ) {
      errMsgChange("There wasn't change on this story");
    } else {
      const data = {title: titleStory, description: descriptionStory};
      try {
        await api.put(`/story/${idStory}`, data);
        successMsgChange('The story was edited successfully');
      } catch (err) {
        errMsgChange('There was an error on editing this story');
      }
    }
  }

  async function handleAddScene() {
    try {
      const responsePick = await api.get('/pick');
      const data = {file_id: responsePick.data.id, description: ''};
      const response = await api.post(`story/${idStory}/scene`, data);
      const newData = {
        dataScene: {...response.data, count_refresh: 3},
        idStory,
      };
      navigation.navigate('Scene', newData);
    } catch (err) {
      errMsgChange('There was an error on creating a new scene');
    }
  }
  async function handleEditScene(data) {
    const newData = {dataScene: data, idStory};
    navigation.navigate('Scene', newData);
  }

  return (
    <Container>
      <NavigationEvents onDidFocus={() => startDataLoading()} />
      {firstLoading ? (
        <ActivityIndicator size="large" color={colors.prim2} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <BtnTrash onPress={handleDelete}>
                <Icon name="md-trash" size={22} color={colors.sec2} />
              </BtnTrash>
              <View>
                <ViewInputButton>
                  <ViewInputTitle>
                    <Icon name="md-bookmarks" size={28} color={colors.tert1} />
                    <InputTitleEditStory
                      placeholder="Edit story title"
                      value={titleStory}
                      onChangeText={text => setTitleStory(text)}
                    />
                  </ViewInputTitle>
                  <View style={{flex: 1}}>
                    <Btn onPress={handleEditStory}>
                      <Icon name="md-create" size={28} color={colors.sec2} />
                    </Btn>
                  </View>
                </ViewInputButton>
                <ViewInputDescription>
                  <Icon name="md-list-box" size={28} color={colors.tert1} />
                  <InputDescription
                    multiline
                    numberOfLines={2}
                    placeholder="Edit story description"
                    value={descriptionStory}
                    onChangeText={text => setDescriptionStory(text)}
                  />
                </ViewInputDescription>
              </View>
              {msgErrSuc !== '' && (
                <TextErrSuc errMode={errMode}>{msgErrSuc}</TextErrSuc>
              )}
              <Sep />
            </>
          }
          data={scenes}
          keyExtractor={data => String(data.id)}
          renderItem={({item}) => (
            <ViewScene>
              <ViewContent>
                <ImgScene source={{uri: item.file.url}} />
                <TextScene>{item.description}</TextScene>
              </ViewContent>
              <ViewFooterScene>
                <TextTime>{item.formattedDate}</TextTime>
                <BtnEditScene onPress={() => handleEditScene(item)}>
                  <Icon name="md-create" size={22} color={colors.prim2} />
                </BtnEditScene>
              </ViewFooterScene>
            </ViewScene>
          )}
          ListFooterComponent={
            <>
              <Sep />
              <BtnAddScene onPress={handleAddScene}>
                <Icon name="md-add" size={28} color={colors.sec2} />
              </BtnAddScene>
            </>
          }
        />
      )}
    </Container>
  );
}
