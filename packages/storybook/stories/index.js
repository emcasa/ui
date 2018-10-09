import Button from './Button/stories'

export default (storybook, ui) => {
  [Button].forEach((story) => story(storybook, ui))
}
