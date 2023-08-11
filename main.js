import './style.css'
import { sample as badges } from './badge-labeling'

document.querySelector('#app').innerHTML = `
  ${badges()}
`
