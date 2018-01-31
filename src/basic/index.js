/**
 * Created by apple on 2017/6/19.
 */
import collapse from './Collapse'
import collapseGroup from './CollapseGroup'
import collapseTransition from './CollapseTransition'
import pageBar from './PageBar/PageBar'
import pageWrap from './PageWrap/PageWrap'
import picker from './Picker/Picker'
import progress from './Progress/Progress'
import radio from './Radio/Radio'
import sliderRow from './SliderRow/SliderRow'
import swtich from './Swtich/Swtich'
import tree from './Tree/Tree'
import inputSpeech from './InputSpeech'
import checkboxGroup from './checkboxGroup'
import checkbox from './checkbox'
import Tabs from './tabs'
import Tab from './tab'
import Loading from './loading'
import TouchRipple from './touch_ripple'
import Icon from './icon'
import Time from './time'
import View from './view'
import Btn from './btn'
import Carousel from './Carousel'
import VideoGroup from './videoGroup'
import navbar from './navbar'
import group from './group'

const components = {
  'ytCollapse': collapse,
  'ytCollapseGroup': collapseGroup,
  'ytCollapseTransition': collapseTransition,
  'vPageBar': pageBar,
  'vPageWrap': pageWrap,
  'vPicker': picker,
  'vProgress': progress,
  'vRadio': radio,
  'vSliderRow': sliderRow,
  'vSwtich': swtich,
  'vTree': tree,
  'vInputSpeech': inputSpeech,
  'ytCheckboxGroup': checkboxGroup,
  'ytCheckbox': checkbox,
  'ytTabs': Tabs,
  'ytTab': Tab,
  'ytLoading': Loading,
  'ytTouchRipple': TouchRipple,
  'ytTime': Time,
  'ytIcon': Icon,
  'ytView': View,
  'ytBtn': Btn,
  'ytVideoGroup': VideoGroup,
  'ytCarousel': Carousel,
  'ytNavbar': navbar,
  'ytGroup': group
}

export default {
  install (Vue) {
    for (let key in components) {
      Vue.component(key, components[key])
    }
  }
}

