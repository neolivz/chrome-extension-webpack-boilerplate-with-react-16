import styled, {injectGlobal} from 'styled-components'

injectGlobal`
  @font-face {
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0;
  }
`

export const PopupRoot = styled.div`
  min-width: 400px;
  min-height: 100px;
`