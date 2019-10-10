import React from 'react'

import { Container, Column, FlexBox } from 'app/UI'
import Header from './Header'

const App = () => (
  <FlexBox flex direction="column" fullHeight>
    <FlexBox>
      <Header />
    </FlexBox>
    <FlexBox flex grow alignItems="center">
      <Container>
        <Column>
          <p className="text-center">
            Desktop: Ctrl + F to search
            <br />
            Navigate results with UP / DOWN
            <br />
            Hit ENTER to open the issue
          </p>

          <p className="text-center">
            By Yohanes
            <br />
            <a href="https://github.com/yyohanes/react-test-project" target="_blank" rel="noreferrer noopener">Source code</a>
          </p>
        </Column>
      </Container>
    </FlexBox>
  </FlexBox>
)

export default App
