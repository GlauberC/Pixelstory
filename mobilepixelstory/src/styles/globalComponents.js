import styled from 'styled-components/native';

import {colors} from './mainStyles';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: ${colors.sec1};
`;
export const ViewInputButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ViewInputDescription = styled.View`
  border-color: ${colors.prim1};
  border-width: 1px;
  background: ${colors.sec2};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 10px;
  elevation: 4;
`;

export const TextDescription = styled.Text`
  color: ${colors.sec1};
  flex: 5;
  font-size: 14px;
  padding-right: 10px;
`;

export const Sep = styled.View`
  margin: 20px 0;
  height: 1px;
  background: ${colors.tert1};
`;

export const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${colors.prim2};
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin: 0 0 10px 5px;
  elevation: 4;
`;
export const InputDescription = styled.TextInput`
  color: ${colors.tert1};
  font-size: 16px;
  padding: 0 20px;
  flex: 1;
`;

export const ContainerListItem = styled.View`
  background: ${colors.prim1};
  padding: 10px;
  border-radius: 4px;
  elevation: 4;
  margin-bottom: 10px;
`;
