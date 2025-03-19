import styled from 'styled-components';

import { Order } from './index';
import NavArrowUp from '../../assets/nav-arrow-up.svg';
import NavArrowDown from '../../assets/nav-arrow-down.svg';

function SortIcon({ order }: { order: Order }) {
  return order == 'asc' ? (
    <Icon src={NavArrowUp} alt="Nav arrow up" />
  ) : (
    <Icon src={NavArrowDown} alt="Nav arrow down" />
  );
}

const Icon = styled.img`
  width: 20px;
`;

export { SortIcon };
