import React, { Fragment } from 'react'
import { capitalize } from '../utils'
import PositionItem from './PositionItem'

function PositionList(props) {
  return (
    <Fragment>
      {props.data &&
        props.data.map(data => (
          <PositionItem
            key={data.id}
            data={{
              id: data.id,
              title: data.name,
              minimumGPA: data.minimumGPA,
              minimumGraduation: capitalize(data.minimumGraduate),
              details: data.details,
              studyPrograms: data.studyPrograms,
            }}
          />
        ))}
    </Fragment>
  )
}

export default PositionList
