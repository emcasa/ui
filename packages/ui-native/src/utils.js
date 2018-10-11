import React from 'react'
import ReactNative from 'react-native'
import omit from 'lodash.omit'

const styleProps = [
  'height',
  'width',
  'borderColor',
  'borderRadius',
  'opacity',
  'borderWidth'
]

/**
 * Omit props react-native style props handled by styled-system
 */
export const safe = (Target, propsToOmit = styleProps) => {
  const Component = (props) => <Target {...omit(props, propsToOmit)} />
  Component.displayName = `Safe(${Target.displayName || Target.name})`
  return Component
}

const aliases = `ActivityIndicator ActivityIndicatorIOS ART Button DatePickerIOS DrawerLayoutAndroid
 Image ImageBackground ImageEditor ImageStore KeyboardAvoidingView ListView MapView Modal NavigatorIOS
 Picker PickerIOS ProgressBarAndroid ProgressViewIOS ScrollView SegmentedControlIOS Slider
 SliderIOS SnapshotViewIOS Switch RecyclerViewBackedScrollView RefreshControl SafeAreaView StatusBar
 SwipeableListView SwitchAndroid SwitchIOS TabBarIOS Text TextInput ToastAndroid ToolbarAndroid
 Touchable TouchableHighlight TouchableNativeFeedback TouchableOpacity TouchableWithoutFeedback
 View ViewPagerAndroid WebView FlatList SectionList VirtualizedList`

/* Define a getter for each alias which simply gets the reactNative component
 * and passes it to `safe` */
aliases.split(/\s+/m).forEach((alias) =>
  Object.defineProperty(safe, alias, {
    enumerable: true,
    configurable: false,
    get() {
      return safe(ReactNative[alias])
    }
  })
)
