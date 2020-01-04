import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/mainStyles';
import api from '../../services/api';

import {
  ViewBtn,
  HeaderScene,
  ImgScene,
  TextRefresh,
  ViewRefresh,
} from './styles';

import {
  Container,
  ViewInputDescription,
  InputDescription,
  Sep,
  TextErrSuc,
  Btn,
} from '../../styles/globalComponents';

export default function Scene({navigation}) {
  const [idScene, setIdScene] = useState(-1);
  const [descriptionScene, setDescriptionScene] = useState('');
  const [countRefresh, setCountRefresh] = useState(3);
  const [urlScene, setUrlScene] = useState('');
  const [idFile, setIdFile] = useState('');
  const [errMode, setErrMode] = useState(false);
  const [msgErrSuc, setMsgErrSuc] = useState('');

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
    const dataScene = navigation.getParam('dataScene');
    setDescriptionScene(
      dataScene.description === ' ' ? '' : dataScene.description,
    );
    setIdScene(dataScene.id);
    setUrlScene(dataScene.file.url);
    setCountRefresh(dataScene.count_refresh);
    setIdFile(dataScene.file_id);
  }, [navigation]);

  async function handleRefresh() {
    try {
      const response = await api.put(`/scene/${idScene}/refresh`);
      setCountRefresh(response.data.count_refresh);
      setIdFile(response.data.file_id);
      setUrlScene(response.data.file.url);
    } catch (err) {
      if (countRefresh === 0) {
        errMsgChange('There is no refresh remaining');
      } else {
        errMsgChange('There is an error on refresh image');
      }
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`scene/${idScene}`);
      navigation.navigate('Scenes');
    } catch (err) {
      errMsgChange('There is an error on deleting scene');
    }
  }

  async function handleEditScene() {
    if (!descriptionScene || descriptionScene === ' ') {
      errMsgChange('The description field is empty');
    } else {
      try {
        const data = {file_id: idFile, description: descriptionScene};
        await api.put(`scene/${idScene}`, data);
        navigation.navigate('Scenes');
      } catch (err) {
        errMsgChange('There is an error on editing scene');
      }
    }
  }

  return (
    <Container>
      <HeaderScene>
        {urlScene !== '' && <ImgScene source={{uri: urlScene}} />}
        <ViewRefresh>
          <Btn onPress={handleRefresh}>
            <Icon name="md-refresh" size={28} color={colors.sec2} />
          </Btn>
          <TextRefresh>{countRefresh} refresh remaning</TextRefresh>
        </ViewRefresh>
      </HeaderScene>
      <ViewInputDescription>
        <Icon name="md-list-box" size={28} color={colors.tert1} />
        <InputDescription
          multiline
          numberOfLines={4}
          placeholder="Edit story description"
          value={descriptionScene}
          onChangeText={text => setDescriptionScene(text)}
        />
      </ViewInputDescription>
      {msgErrSuc !== '' && (
        <TextErrSuc errMode={errMode}>{msgErrSuc}</TextErrSuc>
      )}
      <Sep />
      <ViewBtn>
        <Btn onPress={handleDelete} style={{backgroundColor: colors.err1}}>
          <Icon name="md-trash" size={28} color={colors.sec2} />
        </Btn>
        <Btn onPress={handleEditScene}>
          <Icon name="md-checkmark" size={28} color={colors.sec2} />
        </Btn>
      </ViewBtn>
    </Container>
  );
}
