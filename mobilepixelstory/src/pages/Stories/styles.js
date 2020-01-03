import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors} from '../../styles/mainStyles';
import {
  InputDescription,
  ViewInputDescription,
} from '../../styles/globalComponents';

export const Title = styled.Text`
  font-size: 18px;
  color: ${colors.sec2};
`;
export const HeaderStory = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
export const TextTime = styled.Text`
  font-size: 12px;
  color: ${colors.sec1};
`;

export const ViewContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const InputTitleNewStory = styled(InputDescription)`
  flex: 1;
`;

export const TextErrSuc = styled.Text`
  text-align: center;
  text-transform: uppercase;
  color: ${props => (props.errMode ? colors.err1 : colors.suc1)};
`;

export const ViewInputTitle = styled(ViewInputDescription)`
  flex: 6;
`;

export const BtnStory = styled(RectButton)`
  background: ${colors.sec2};
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 20px;
`;
