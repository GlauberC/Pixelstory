import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import api from '../../services/api';

import {
  Container,
  ViewStory,
  Header,
  Title,
  BtnStory,
  TextBtnStory,
  ViewDescription,
  TextDescription,
  ViewNewStory,
  InputTitleNewStory,
  InputDescriptionNewStory,
} from './styles';

export default function Stories({navigation}) {
  const [stories, setStories] = useState([]);
  const [titleNewStory, setTitleNewStory] = useState('');
  const [descriptionNewStory, setDescriptionNewStory] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/story?page=1');
      setStories(response.data.data);
    }
    fetchData();
  }, []);

  async function handleAddStory() {
    const data = {title: titleNewStory, description: descriptionNewStory};
    try {
      await api.post('/story', data);
      setTitleNewStory('');
      setDescriptionNewStory('');
    } catch (err) {}
  }

  return (
    <Container>
      <ViewNewStory>
        <Header>
          <InputTitleNewStory
            value={titleNewStory}
            onChangeText={text => setTitleNewStory(text)}
          />
          <BtnStory>
            <TextBtnStory onPress={handleAddStory}>Adicionar</TextBtnStory>
          </BtnStory>
        </Header>
        <InputDescriptionNewStory
          value={descriptionNewStory}
          onChangeText={text => setDescriptionNewStory(text)}
        />
      </ViewNewStory>
      <FlatList
        data={stories}
        keyExtractor={data => String(data.id)}
        renderItem={({item}) => (
          <ViewStory>
            <Header>
              <Title>StoryTitle</Title>
              <BtnStory>
                <TextBtnStory>Entrar</TextBtnStory>
              </BtnStory>
            </Header>
            <ViewDescription>
              <TextDescription>
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                Lorem ipsum Lorem ipsum Lorem ipsum
              </TextDescription>
            </ViewDescription>
          </ViewStory>
        )}
      />
    </Container>
  );
}
