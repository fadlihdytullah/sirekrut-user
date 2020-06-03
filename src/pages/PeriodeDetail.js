import React, { Fragment } from 'react'
import axios from 'axios'
import { message, Empty, Skeleton } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PositionList from './PositionList'
import { AppContext } from '../context/AppContext'
import { TIMELINES_API, POSITIONS_API, config } from '../config'
import { formatDate } from '../utils'

function PeriodeDetail() {
  const { appState, dispatchApp } = React.useContext(AppContext)
  const history = useHistory()
  const params = useParams()

  const handleFetchTimelineDetails = async () => {
    try {
      dispatchApp({ type: 'FETCH_POSITIONS_INIT' })

      const response = await axios.get(TIMELINES_API.getSingle(params.id))
      const result = response.data

      if (result.success) {
        const fetchPosition = async () => {
          const data = result.data.positions.map(async position => {
            const res = await axios.get(POSITIONS_API.getSingle(position.id))
            return res.data.data
          })
          const promiseDone = Promise.all(data)
          return promiseDone
        }
        const positionsData = await fetchPosition()

        console.log(positionsData, 'iniasdada')
        dispatchApp({
          type: 'FETCH_POSITIONS_SUCCESS',
          payload: { positions: positionsData },
        })
      } else {
        throw new Error(result.errors)
      }
    } catch (error) {
      message.error(error.message)

      dispatchApp({
        type: 'FETCH_POSITIONS_FAILURE',
        payload: { error: error.message },
      })
    }
  }

  React.useEffect(
    () => {
      handleFetchTimelineDetails()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Fragment>
      <PageHeader title='Rekrutmen Staff' subtitle={!appState.loading ? `Tersedia ${appState.positions.length} posisi` : null} />
      {appState.loading ? (
        <Skeleton />
      ) : !appState.positions.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <PositionList data={appState.positions} />
      )}
    </Fragment>
  )
}

export default PeriodeDetail
