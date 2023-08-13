import './style.css'
import { sample as badges } from './badge-labeling.sample.js'

document.querySelector('#app').innerHTML = `
  ${badges()}
`
