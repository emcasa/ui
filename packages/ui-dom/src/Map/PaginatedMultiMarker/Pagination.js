import React from 'react'
import Icon from '../../Icon'
import {Pagination} from './styles'

const preventDefault = (fun) => (e) => {
  if (!e.defaultPrevented) e.preventDefault()
  e.stopPropagation()
  if (fun) return fun(e)
}

export default function MultiMarkerPagination({
  onChange,
  points,
  currentIndex,
  color,
  ...props
}) {
  const prevPoint = currentIndex > 0 ? currentIndex - 1 : undefined
  const nextPoint =
    currentIndex < points.length - 1 ? currentIndex + 1 : undefined
  return (
    <Pagination color={color} {...props}>
      <a
        className="arrow"
        onClick={preventDefault(
          !isNaN(prevPoint) && onChange
            ? () => onChange(points[prevPoint], prevPoint)
            : undefined
        )}
      >
        <Icon
          name="chevron-left"
          size={20}
          color={!isNaN(prevPoint) ? color : 'darkSmoke'}
        />
      </a>
      <ul>
        {points.map((point, index) => (
          <li key={point.id}>
            <a
              alt={`ID #${point.id}`}
              className={index == currentIndex ? 'highlight' : undefined}
              onClick={preventDefault(
                onChange ? () => onChange(point, index) : undefined
              )}
            />
          </li>
        ))}
      </ul>
      <a
        className="arrow"
        onClick={preventDefault(
          !isNaN(nextPoint) && onChange
            ? () => onChange(points[nextPoint], nextPoint)
            : undefined
        )}
      >
        <Icon
          name="chevron-right"
          size={20}
          color={!isNaN(nextPoint) ? color : 'darkSmoke'}
        />
      </a>
    </Pagination>
  )
}
