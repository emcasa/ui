import {JSDOM} from 'jsdom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})
const dom = new JSDOM('<!doctype html><html><body id="root"></body></html>')

chai.use(sinonChai)

global.window = dom.window
global.document = dom.window.document
global.navigator = {userAgent: 'node.js'}

global.cShould = chai.should()
global.cExpect = chai.expect
