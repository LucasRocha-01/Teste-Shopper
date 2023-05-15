import styled from 'styled-components'

export const TrProducts = styled.tr`
  border: 10px #000000 solid;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  overflow: hidden;

  &:nth-child(odd) {
    background-color: transparent;
  }
  &:nth-child(even) {
    background-color: #cccccc;
  }
`

export const TableProducts = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
  text-align: start;

  tr {
    td {
      height: 40px;
      &:nth-child(1) {
        text-align: center;
      }
      &:nth-child(2) {
        width: 500px;
      }
    }
  }
`
