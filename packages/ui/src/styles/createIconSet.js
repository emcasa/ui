export function Icon(iconName, {props = {}, render, path, width, height}) {
  return {
    iconName,
    props,
    render,
    icon: [width, height, [], '', path]
  }
}

export default function IconSet(icons) {
  return Object.entries(icons).reduce(
    (icons, [name, def]) => ({...icons, [name]: Icon(name, def)}),
    {}
  )
}
