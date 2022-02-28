import React from 'react'
import { FormGrid } from '@formily/semi'

const { GridColumn } = FormGrid
const Cell = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#AAA',
        color: '#FFF',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
      }}
    >
      {children}
    </div>
  )
}
export default () => {
  return (
    <React.Fragment>
      <p>maxColumns 3 + minColumns 2</p>
      <FormGrid maxColumns={3} minColumns={2}>
        <GridColumn gridSpan={4}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxColumns 3</p>
      <FormGrid maxColumns={3}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>minColumns 2</p>
      <FormGrid minColumns={2}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>Null</p>
      <FormGrid>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>minWidth 150 +maxColumns 3</p>
      <FormGrid minWidth={150} maxColumns={3}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxWidth 120+minColumns 2</p>
      <FormGrid maxWidth={120} minColumns={2}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
    </React.Fragment>
  )
}
