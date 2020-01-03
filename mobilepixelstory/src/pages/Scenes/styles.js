import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';
import {colors} from '../../styles/mainStyles';

import {
  InputDescription,
  ViewInputDescription,
  Btn,
} from '../../styles/globalComponents';

export const ViewInputTitle = styled(ViewInputDescription)`
  flex: 6;
`;
export const InputTitleEditStory = styled(InputDescription)`
  flex: 1;
`;

export const BtnTrash = styled(Btn)`
  background: ${colors.err1};
  width: 30px;
  height: 30px;
  margin-bottom: 20px;
  align-self: center;
  elevation: 4;
`;

export const TextErrSuc = styled.Text`
  text-align: center;
  text-transform: uppercase;
  color: ${props => (props.errMode ? colors.err1 : colors.suc1)};
`;

export const ViewContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ImgScene = styled.Image`
  width: 64px;
  height: 64px;
  margin-right: 20px;
`;
export const TextScene = styled.Text`
  flex: 6;
  padding-right: 10px;
  font-size: 16px;
  color: ${colors.sec1};
`;
export const BtnEditScene = styled(RectButton)`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background: ${colors.sec2};
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin: 10px 10px 0 0;
  elevation: 8;
`;

export const BtnAddScene = styled(Btn)`
  align-self: center;
`;
export const ViewFooterScene = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TextTime = styled.Text`
  font-size: 12px;
  color: ${colors.sec1};
`;
