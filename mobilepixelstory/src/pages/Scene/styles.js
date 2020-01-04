import styled from 'styled-components/native';
import {colors} from '../../styles/mainStyles';

export const ViewBtn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
`;

export const HeaderScene = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ImgScene = styled.Image`
  width: 64px;
  height: 64px;
  margin-right: 20px;
`;
export const ViewRefresh = styled.View`
  justify-content: center;
  align-self: center;
  padding-top: 32px;
`;
export const TextRefresh = styled.Text`
  text-align: center;
  width: 60px;
  font-size: 12px;
  color: ${colors.tert1};
  margin-top: -5px;
`;
