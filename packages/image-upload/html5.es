import ImageUpload from './ImageUpload'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default DragDropContext(HTML5Backend)(ImageUpload)