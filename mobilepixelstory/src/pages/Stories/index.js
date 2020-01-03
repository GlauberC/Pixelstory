import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';

import {colors} from '../../styles/mainStyles';

import {
  Title,
  TextTime,
  HeaderStory,
  BtnStory,
  ViewContent,
  InputTitleNewStory,
  ViewInputTitle,
} from './styles';

import {
  Container,
  ViewInputButton,
  Btn as BtnAddStory,
  ContainerListItem as ViewStory,
  TextDescription,
  InputDescription,
  ViewInputDescription,
  Sep,
  TextErrSuc,
} from '../../styles/globalComponents';

export default function Stories({navigation}) {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [errMode, setErrMode] = useState(false);
  const [msgErrSuc, setMsgErrSuc] = useState('');
  const [titleNewStory, setTitleNewStory] = useState('');
  const [descriptionNewStory, setDescriptionNewStory] = useState('');

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

  const startDataLoading = useCallback(async () => {
    try {
      setFirstLoading(true);
      setPage(1);
      const response = await api.get(`/story?page=1`);
      setLastPage(response.data.lastPage);
      const data = response.data.data.map(story => ({
        ...story,
        formattedDate: story.created_at.slice(0, 10),
      }));
      setStories(data);
      setFirstLoading(false);
    } catch (err) {
      errMsgChange('There was an error on loading stories');
    }
  }, [errMsgChange]);

  useEffect(() => {
    startDataLoading();
    successMsgChange('');
  }, [startDataLoading, successMsgChange]);

  async function handleNextPage() {
    if (!loading && page < lastPage) {
      try {
        setLoading(true);
        const response = await api.get(`/story?page=${page + 1}`);
        const data = response.data.data.map(story => ({
          ...story,
          formattedDate: story.created_at.slice(0, 10),
        }));
        setStories([...stories, ...data]);
        setPage(page + 1);
        setLoading(false);
        successMsgChange('');
      } catch (err) {
        errMsgChange('There was an error on loading stories');
      }
    }
  }

  async function handleAddStory() {
    if (titleNewStory === '') {
      errMsgChange('The Story title is empty');
    } else if (descriptionNewStory === '') {
      errMsgChange('The Story description is empty');
    } else {
      const data = {title: titleNewStory, description: descriptionNewStory};
      try {
        await api.post('/story', data);
        setTitleNewStory('');
        setDescriptionNewStory('');
        successMsgChange('The story was created successfully');
        startDataLoading();
      } catch (err) {
        errMsgChange('There was an error on creating story');
      }
    }
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
              <View>
                <ViewInputButton>
                  <ViewInputTitle>
                    <Icon name="md-bookmarks" size={28} color={colors.tert1} />
                    <InputTitleNewStory
                      placeholder="New Story Title"
                      value={titleNewStory}
                      onChangeText={text => setTitleNewStory(text)}
                    />
                  </ViewInputTitle>
                  <View style={{flex: 1}}>
                    <BtnAddStory onPress={handleAddStory}>
                      <Icon name="md-add" size={28} color={colors.sec2} />
                    </BtnAddStory>
                  </View>
                </ViewInputButton>
                <ViewInputDescription>
                  <Icon name="md-list-box" size={28} color={colors.tert1} />
                  <InputDescription
                    multiline
                    numberOfLines={2}
                    value={descriptionNewStory}
                    onChangeText={text => setDescriptionNewStory(text)}
                    placeholder="Description"
                  />
                </ViewInputDescription>
              </View>
              {msgErrSuc !== '' && (
                <TextErrSuc errMode={errMode}>{msgErrSuc}</TextErrSuc>
              )}

              <Sep />
            </>
          }
          data={stories}
          keyExtractor={data => String(data.id)}
          onEndReached={handleNextPage}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => (
            <ViewStory>
              <HeaderStory>
                <Title>{item.title}</Title>
                <TextTime>{item.formattedDate}</TextTime>
              </HeaderStory>
              <ViewContent>
                <TextDescription>{item.description}</TextDescription>
                <View style={{flex: 1}}>
                  <BtnStory
                    onPress={() =>
                      navigation.navigate('Scenes', {
                        idStory: item.id,
                        titleStory: item.title,
                        descriptionStory: item.description,
                      })
                    }>
                    <Icon name="md-book" size={24} color={colors.prim2} />
                  </BtnStory>
                </View>
              </ViewContent>
            </ViewStory>
          )}
        />
      )}
      {loading && <ActivityIndicator size="large" color={colors.prim2} />}
    </Container>
  );
}
